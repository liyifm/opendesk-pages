// IP 加盐哈希（SHA-256，盐取自 env.IP_HASH_SALT），防止库泄漏时反查真实 IP。
// 同一 IP 生成相同哈希，可无损做来源维度的聚合；无 IP 或未配置盐时返回 null。
export const hashIp = async (ip, salt) => {
  if (!ip || !salt) return null
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${salt}:${ip}`))
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

// 从请求解析来源 IP：生产环境取 CF-Connecting-IP，本地回退 x-forwarded-for。
export const clientIp = (c) =>
  c.req.header('cf-connecting-ip') ??
  c.req.header('x-forwarded-for')?.split(',')[0]?.trim() ??
  null