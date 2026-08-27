# OpenDesk Pages

The official site and documentation for the [OpenDesk](https://gitcode.com/IntelliOS/OpenDesk) project.

This site is built with Astro, Starlight, and MDX. It publishes static files from `dist/` together with Pages Functions (Hono) through Cloudflare Pages.

## Requirements

- Node.js 22.16.0 or newer
- pnpm 11.5.2, managed through Corepack

The repository includes `.nvmrc` and `packageManager` metadata for consistent local installs.

## Local Development

```bash
corepack enable
corepack pnpm install
corepack pnpm dev --host 127.0.0.1 --port 8093
```

Open `http://127.0.0.1:8093/` after the dev server starts. The dev server mounts the Hono API through `@hono/vite-dev-server`, so API routes are available as well — e.g. `POST http://127.0.0.1:8093/api/heartbeat/`. Note that the site uses `trailingSlash: always`, so **API paths must end with a slash in dev**; the production Functions accept both forms.

### API

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/heartbeat` | POST | OpenDesk 设备心跳上报。`os`（windows/macos/harmonyos...）、`device_type`（设备类型）、`device_id`（设备标识）、`client_type`（客户端类型，如 desktop-app/cli）必填，body JSON 或 query 均可。服务端记录 `time`（收到时间）与 `ip_hash`（来源 IP 按 `IP_HASH_SALT` 加盐 SHA-256，防库泄漏反查），追加写入 Cloudflare D1 `heartbeats` 表（binding `opendesk-stats-db`）；`astro dev` 无 D1 binding，直接返回确认（不落库）。 |
| `/api/stats` | GET | 心跳统计（仅管理员）。返回全量/最近一天/最近七天的去重设备数与按 `device_type` 分组数量。 |
| `/api/feedback/submit` | POST | 提交用户反馈。`multipart/form-data`：`type`（`feature`\|`bug`，必填）、`content`（必填）、`contact`（可选，联系方式）、`attachments`（可选，最多 5 个、单个 ≤1MB）。主记录写入 `feedback` 表，附件以 BLOB 写入 `feedback_attachments` 表。 |
| `/api/feedback/list` | GET | 反馈列表（仅管理员）。按时间倒序，附件仅返回文件名（不返回文件数据）。可选 `?limit=`（默认 50，上限 200）。 |

### API code layout

Hono 路由按路径拆分在 `src/server/` 下，每个文件只负责自己的路由：

```
src/server/
├── hono-app.js              # 组装：createApi() 挂载各路由模块
├── hono-dev-server-entry.js # dev server 入口
├── lib/
│   ├── ip-hash.js           # hashIp / clientIp
│   └── auth.js              # adminGuard（管理员鉴权）
└── routes/
    ├── hello.js             # GET  /api/hello
    ├── heartbeat.js         # POST /api/heartbeat
    ├── stats.js             # GET  /api/stats（admin）
    └── feedback.js          # POST /api/feedback
```

### Admin-only endpoints

管理员接口（`/api/stats`）通过 Bearer token 鉴权：请求携带 `Authorization: Bearer <token>`（或 `x-admin-token` 头），与服务端 `ADMIN_TOKEN` 一致才放行，否则 401。`ADMIN_TOKEN` 在 Cloudflare dashboard 的 **Settings → Variables and Secrets** 配置；本地 `wrangler pages dev` 从 `.dev.vars` 读取（已 gitignore）。未配置 token 时接口返回 503。`astro dev` 不提供 D1 与 token，stats 需用 `pnpm pages:dev` 验证。

## Build

```bash
corepack pnpm build
```

The generated site is written to `dist/`.

To preview the production build locally:

```bash
corepack pnpm preview
```

## Deployment

The site is served by Cloudflare Pages:

- **Git integration**: connect the repository in the Cloudflare Pages dashboard; Cloudflare runs `pnpm build` and serves `dist/`. The custom domain `opendesk.matrix.openharmony.cn` is configured in the dashboard.
- **CLI**: `pnpm pages:deploy` builds the site and uploads it through Wrangler. `wrangler.toml` declares `pages_build_output_dir = "./dist"`; API routes live in `functions/`.

`pnpm pages:dev` runs `wrangler pages dev` for an exact replica of the production runtime (build + Functions).

More operational details are in [docs/site-operations.md](docs/site-operations.md).
