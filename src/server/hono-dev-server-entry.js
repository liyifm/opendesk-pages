import { createApi } from './hono-app.js'

// vite-dev-server 专用入口：/api 前缀请求原样交给该实例处理。
export default createApi()