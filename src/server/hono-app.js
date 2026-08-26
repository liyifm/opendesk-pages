import { Hono } from 'hono'

// 所有 /api/* 请求统一交由 Hono 处理（唯一事实来源）：
// - 开发环境：@hono/vite-dev-server 用 exclude 放行 /api 前缀，原样交给 app；
// - 生产环境：functions/api/[[route]].js 直接 handle(app) 导出为 Pages Functions。
// 每条路由同时注册带尾斜杠变体：astro dev 的 trailingSlash 前置校验只放行斜杠结尾的
// /api/* 请求，而生产环境两种情况都会到达，保持两端行为一致。
const helloHandler = (c) => c.json({ message: 'Hello from Hono on Cloudflare Pages!' })

// IP 加盐哈希（SHA-256，盐取自 env.IP_HASH_SALT），防止库泄漏时反查真实 IP。
// 同一 IP 生成相同哈希，可无损做来源维度的聚合；无 IP 或未配置盐时返回 null。
const hashIp = async (ip, salt) => {
  if (!ip || !salt) return null
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${salt}:${ip}`))
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

// OpenDesk 设备心跳上报。
// os（操作系统）、device_type（设备类型）、device_id（设备标识）、client_type（客户端类型）
// 必填，body JSON 或 query 均可。服务端补充 time（收到时间戳）与 ip_hash（来源 IP 的
// 加盐哈希，生产环境取 CF-Connecting-IP，本地回退 x-forwarded-for），append 写入 D1
//（heartbeats 表，binding: opendesk-stats-db）。
// 在无 D1 binding 的环境（如 astro dev 的 vite dev server）优雅降级为纯确认。
const heartbeatHandler = async (c) => {
  let os
  let deviceType
  let deviceId
  let clientType
  try {
    const body = await c.req.json()
    if (typeof body.os === 'string') os = body.os
    if (typeof body.device_type === 'string') deviceType = body.device_type
    if (typeof body.device_id === 'string') deviceId = body.device_id
    if (typeof body.client_type === 'string') clientType = body.client_type
  } catch {
    // 无 body 或非 JSON 时退回 query 参数
  }
  os = os ?? c.req.query('os')
  deviceType = deviceType ?? c.req.query('device_type')
  deviceId = deviceId ?? c.req.query('device_id')
  clientType = clientType ?? c.req.query('client_type')

  if (!os || !deviceType || !deviceId || !clientType) {
    return c.json({ error: 'os, device_type, device_id and client_type are required' }, 400)
  }

  const time = new Date().toISOString()
  const rawIp =
    c.req.header('cf-connecting-ip') ??
    c.req.header('x-forwarded-for')?.split(',')[0]?.trim() ??
    null
  const ipHash = await hashIp(rawIp, c.env?.IP_HASH_SALT)

  const db = c.env?.['opendesk-stats-db']
  if (db) {
    await db
      .prepare(
        'INSERT INTO heartbeats (os, device_type, device_id, client_type, time, ip_hash) VALUES (?, ?, ?, ?, ?, ?)',
      )
      .bind(os, deviceType, deviceId, clientType, time, ipHash)
      .run()
  }

  return c.json({ ok: true, os, device_type: deviceType, device_id: deviceId, client_type: clientType, time })
}

// 管理员鉴权：校验 Authorization: Bearer <token>（或 x-admin-token 头）与
// env.ADMIN_TOKEN（生产在 dashboard Secrets 配置，本地在 .dev.vars）一致。
// 未配置 token 时拒绝访问（503），避免无鉴权裸奔。
const adminGuard = async (c, next) => {
  const expected = c.env?.ADMIN_TOKEN
  if (!expected) return c.json({ error: 'admin token not configured' }, 503)

  const token =
    c.req.header('authorization')?.replace(/^Bearer\s+/i, '') ?? c.req.header('x-admin-token')
  if (!token || token !== expected) return c.json({ error: 'unauthorized' }, 401)

  await next()
}

// /api/stats：设备心跳统计（仅管理员）。
// 返回曾经打卡（全量）、最近一天、最近七天的去重设备数，以及按 device_type 分组数量。
const statsHandler = async (c) => {
  const db = c.env?.['opendesk-stats-db']
  if (!db) return c.json({ error: 'statistics require D1; unavailable in this environment' }, 503)

  const hour = 3600 * 1000
  const dayAgo = new Date(Date.now() - 24 * hour).toISOString()
  const weekAgo = new Date(Date.now() - 7 * 24 * hour).toISOString()

  const countByType = (rows) =>
    Object.fromEntries(rows.map((r) => [r.device_type ?? 'unknown', r.devices]))

  const [total, totalByType, day, dayByType, week, weekByType] = await Promise.all([
    db.prepare('SELECT COUNT(DISTINCT device_id) AS devices FROM heartbeats').first(),
    db
      .prepare('SELECT device_type, COUNT(DISTINCT device_id) AS devices FROM heartbeats GROUP BY device_type')
      .all(),
    db
      .prepare('SELECT COUNT(DISTINCT device_id) AS devices FROM heartbeats WHERE time >= ?')
      .bind(dayAgo)
      .first(),
    db
      .prepare('SELECT device_type, COUNT(DISTINCT device_id) AS devices FROM heartbeats WHERE time >= ? GROUP BY device_type')
      .bind(dayAgo)
      .all(),
    db
      .prepare('SELECT COUNT(DISTINCT device_id) AS devices FROM heartbeats WHERE time >= ?')
      .bind(weekAgo)
      .first(),
    db
      .prepare('SELECT device_type, COUNT(DISTINCT device_id) AS devices FROM heartbeats WHERE time >= ? GROUP BY device_type')
      .bind(weekAgo)
      .all(),
  ])

  return c.json({
    ok: true,
    total: { devices: total.devices, by_type: countByType(totalByType.results) },
    last_1d: { devices: day.devices, by_type: countByType(dayByType.results) },
    last_7d: { devices: week.devices, by_type: countByType(weekByType.results) },
  })
}

export function createApi() {
  const app = new Hono().basePath('/api')

  app.get('/hello', helloHandler)
  app.get('/hello/', helloHandler)
  app.post('/heartbeat', heartbeatHandler)
  app.post('/heartbeat/', heartbeatHandler)
  app.get('/stats', adminGuard, statsHandler)
  app.get('/stats/', adminGuard, statsHandler)

  app.notFound((c) => c.json({ error: 'Not Found' }, 404))
  return app
}