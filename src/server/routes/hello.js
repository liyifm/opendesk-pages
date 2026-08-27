const helloHandler = (c) => c.json({ message: 'Hello from Hono on Cloudflare Pages!' })

export const register = (app) => {
  app.get('/hello', helloHandler)
  app.get('/hello/', helloHandler)
}