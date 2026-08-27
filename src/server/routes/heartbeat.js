import { clientIp, hashIp } from '../lib/ip-hash.js'

// OpenDesk 设备心跳上报。
// os（操作系统）、device_type（设备类型）、device_id（设备标识）、client_type（客户端类型）
// 必填，body JSON 或 query 均可。服务端补充 time（收到时间戳）与 ip_hash（来源 IP 的
// 加盐哈希），append 写入 D1（heartbeats 表，binding: opendesk-stats-db）。
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
  const ipHash = await hashIp(clientIp(c), c.env?.IP_HASH_SALT)

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

export const register = (app) => {
  app.post('/heartbeat', heartbeatHandler)
  app.post('/heartbeat/', heartbeatHandler)
}