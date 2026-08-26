import { handle } from 'hono/cloudflare-pages'
import { createApi } from '../../src/server/hono-app.js'

// 生产入口：共享 Hono app 自带 basePath('/api')，原样 handle 导出为 Pages Functions。
export const onRequest = handle(createApi())