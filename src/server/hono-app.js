import { Hono } from 'hono'
import { register as registerHello } from './routes/hello.js'
import { register as registerHeartbeat } from './routes/heartbeat.js'
import { register as registerStats } from './routes/stats.js'
import { register as registerFeedback } from './routes/feedback.js'
import { register as registerAccount } from './routes/account.js'

// 所有 /api/* 请求统一交由 Hono 处理（唯一事实来源）：
// - 开发环境：@hono/vite-dev-server 用 exclude 放行 /api 前缀，原样交给 app；
// - 生产环境：functions/api/[[route]].js 直接 handle(app) 导出为 Pages Functions。
// 各路由按路径拆分在 src/server/routes/ 下，此处仅组装。
// 每条路由同时注册带尾斜杠变体：astro dev 的 trailingSlash 前置校验只放行斜杠结尾的
// /api/* 请求，而生产环境两种情况都会到达，保持两端行为一致。
export function createApi() {
  const app = new Hono().basePath('/api')

  registerHello(app)
  registerHeartbeat(app)
  registerStats(app)
  registerFeedback(app)
  registerAccount(app)

  app.notFound((c) => c.json({ error: 'Not Found' }, 404))
  return app
}