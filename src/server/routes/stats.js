import { adminGuard } from '../lib/auth.js'

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

export const register = (app) => {
  app.get('/stats', adminGuard, statsHandler)
  app.get('/stats/', adminGuard, statsHandler)
}