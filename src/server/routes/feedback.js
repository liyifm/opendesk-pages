import { clientIp, hashIp } from '../lib/ip-hash.js'
import { adminGuard } from '../lib/auth.js'

// 反馈附件限制：最多 5 个、单个 ≤ 1MB（D1 行存储上限内，防滥用）。
const MAX_ATTACHMENTS = 5
const MAX_ATTACHMENT_BYTES = 1024 * 1024

// /api/feedback/submit：提交用户反馈（feature / bug），multipart/form-data 上传附件。
// 字段：type（feature|bug，必填）、content（必填）、contact（可选）、attachments（可选，一个或多个文件）。
// 主记录写入 feedback 表，附件以 BLOB 写入 feedback_attachments 表（feedback_id 外键关联）。
const submitHandler = async (c) => {
  let form
  try {
    form = await c.req.formData()
  } catch {
    return c.json({ error: 'expected multipart/form-data body' }, 400)
  }

  const type = typeof form.get('type') === 'string' ? form.get('type') : null
  const content = typeof form.get('content') === 'string' ? form.get('content') : null
  const contact = typeof form.get('contact') === 'string' ? form.get('contact').trim() || null : null
  if (type !== 'feature' && type !== 'bug') {
    return c.json({ error: "type must be 'feature' or 'bug'" }, 400)
  }
  if (!content?.trim()) {
    return c.json({ error: 'content is required' }, 400)
  }

  const attachments = form.getAll('attachments').filter((f) => f instanceof File)
  if (attachments.length > MAX_ATTACHMENTS) {
    return c.json({ error: `at most ${MAX_ATTACHMENTS} attachments are allowed` }, 400)
  }
  for (const f of attachments) {
    if (f.size > MAX_ATTACHMENT_BYTES) {
      return c.json({ error: `attachment "${f.name}" exceeds ${MAX_ATTACHMENT_BYTES} bytes` }, 400)
    }
  }

  const time = new Date().toISOString()
  const ipHash = await hashIp(clientIp(c), c.env?.IP_HASH_SALT)

  const db = c.env?.['opendesk-stats-db']
  let id = null
  if (db) {
    const result = await db
      .prepare('INSERT INTO feedback (type, content, contact, time, ip_hash) VALUES (?, ?, ?, ?, ?)')
      .bind(type, content.trim(), contact, time, ipHash)
      .run()
    id = result.meta.last_row_id

    for (const f of attachments) {
      await db
        .prepare(
          'INSERT INTO feedback_attachments (feedback_id, filename, content_type, size, data) VALUES (?, ?, ?, ?, ?)',
        )
        .bind(id, f.name, f.type, f.size, new Uint8Array(await f.arrayBuffer()))
        .run()
    }
  }

  return c.json({ ok: true, id, type, attachments: attachments.length, ...(contact ? { contact } : {}) })
}

// /api/feedback/list（仅管理员）：返回已提交反馈列表，按时间倒序；附件只含文件名，不返回数据。
const listHandler = async (c) => {
  const db = c.env?.['opendesk-stats-db']
  if (!db) return c.json({ error: 'statistics require D1; unavailable in this environment' }, 503)

  const limit = Math.min(Math.max(Number(c.req.query('limit')) || 50, 1), 200)

  const [{ results: feedbacks }, { results: attachments }] = await Promise.all([
    db
      .prepare('SELECT id, type, content, contact, time FROM feedback ORDER BY id DESC LIMIT ?')
      .bind(limit)
      .all(),
    db.prepare('SELECT feedback_id, filename FROM feedback_attachments ORDER BY id').all(),
  ])

  const byFeedback = new Map()
  for (const a of attachments) {
    if (!byFeedback.has(a.feedback_id)) byFeedback.set(a.feedback_id, [])
    byFeedback.get(a.feedback_id).push(a.filename)
  }

  return c.json({
    ok: true,
    items: feedbacks.map((r) => ({
      id: r.id,
      type: r.type,
      content: r.content,
      contact: r.contact,
      time: r.time,
      attachments: byFeedback.get(r.id) ?? [],
    })),
  })
}

export const register = (app) => {
  app.post('/feedback/submit', submitHandler)
  app.post('/feedback/submit/', submitHandler)
  app.get('/feedback/list', adminGuard, listHandler)
  app.get('/feedback/list/', adminGuard, listHandler)
}