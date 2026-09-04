// /api/account/*：反向代理到 OPENDESK_ACCOUNT_ENDPOINT 配置的后端（Cloudflare Pages 环境变量）。
// 映射规则：去掉 URL 中的 /api/account 前缀后，拼接到 endpoint 末尾。
// 例如 OPENDESK_ACCOUNT_ENDPOINT=http://124.220.55.7/api/ 时，
// 访问 /api/account/v1 等价于请求 http://124.220.55.7/api/v1。
export const register = (app) => {
  // Hono 的 * 通配符不生成命名参数，需用完整请求路径剥离 basePath + /account 前缀。
  const prefix = `${app._basePath === '/' ? '' : app._basePath}/account`

  const accountProxy = async (c) => {
    const endpoint = c.env?.OPENDESK_ACCOUNT_ENDPOINT ?? globalThis.process?.env?.OPENDESK_ACCOUNT_ENDPOINT
    if (!endpoint) {
      return c.json({ error: 'OPENDESK_ACCOUNT_ENDPOINT is not configured' }, 502)
    }

    // account 前缀之外剩余路径（'v1'、'v1/users' 等），不含开头与结尾的 '/'。
    const rest = c.req.path.slice(prefix.length).replace(/^\/+|\/+$/g, '')
    const base = endpoint.replace(/\/+$/, '')
    // 保留原始 query string（如 ?token=xxx）。
    const target = `${base}/${rest}${new URL(c.req.url).search}`

    // 原样转发方法、请求头、请求体；Host 自动替换为目标后端。
    const resp = await fetch(target, c.req.raw)
    return c.body(resp.body, { status: resp.status, headers: resp.headers })
  }

  app.all('/account/*', accountProxy)
  app.all('/account', accountProxy)
}