// 管理员鉴权中间件：校验 Authorization: Bearer <token>（或 x-admin-token 头）与
// env.ADMIN_TOKEN（生产在 dashboard Secrets 配置，本地在 .dev.vars）一致。
// 未配置 token 时拒绝访问（503），避免无鉴权裸奔。
export const adminGuard = async (c, next) => {
  const expected = c.env?.ADMIN_TOKEN
  if (!expected) return c.json({ error: 'admin token not configured' }, 503)

  const token =
    c.req.header('authorization')?.replace(/^Bearer\s+/i, '') ?? c.req.header('x-admin-token')
  if (!token || token !== expected) return c.json({ error: 'unauthorized' }, 401)

  await next()
}