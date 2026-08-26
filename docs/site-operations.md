# Site Operations

This repository contains the OpenDesk website and documentation site.

## Current Stack

- Astro builds the static site.
- Starlight renders the documentation pages under `/docs/`.
- MDX is enabled for documentation and content pages.
- Pagefind is generated during production builds for local site search.
- Cloudflare Pages serves the `dist/` build and runs Pages Functions (Hono) under `functions/`.

The previous Jekyll site layout and deployment flow have been removed. Do not add `_config.yml`, `Gemfile`, `_layouts`, `_includes`, or branch-based Pages deployment back to this repository.

## Local Development

```bash
corepack enable
corepack pnpm install
corepack pnpm dev --host 127.0.0.1 --port 8093
```

Since the site uses `trailingSlash: always`, API paths must end with a slash in dev (`/api/heartbeat/`); the production Functions accept both forms. Do not change `trailingSlash` to fix this — the production URL scheme depends on it.

The development server does not include the production Pagefind index. Run a production build and preview when testing search.

## Production Build

```bash
corepack pnpm build
corepack pnpm check:links
corepack pnpm preview
```

The build output is written to `dist/`. The directory is ignored by git and should not be committed.

`pnpm check:links` scans generated HTML in `dist/` and fails on missing internal links.

## Release Notes

Release notes are static content files under `src/content/release-notes/`.

Each note must be Markdown or MDX and include this front matter:

```md
---
title: "2026.6.09 日构建更新"
date: "2026-06-09T09:00:00+08:00"
category: "nightly-release"
---
```

The build uses `src/content.config.ts` to load the `releaseNotes` collection. `src/pages/news.astro` renders the list page, and `src/pages/news/[slug].astro` generates one static page per note.

The same collection also generates `/feed.xml` through `src/pages/feed.xml.ts`.

Do not add new release notes to the old Jekyll path `_posts/release_notes/`. Convert them to the Astro content collection path above.

## Migration Parity Checks

The old Jekyll site had several mechanisms that are easy to miss during the Astro migration. Keep these mapped in the new site:

| Old Jekyll mechanism | Current Astro mechanism |
| --- | --- |
| `_posts/release_notes/` release posts | `src/content/release-notes/` collection, `/news/`, `/news/[slug]/` |
| `jekyll-feed` | `src/pages/feed.xml.ts` |
| Minimal Mistakes copy script | Starlight Expressive Code copy buttons |
| `404.html` | `src/pages/404.astro` |
| Search experience | Starlight Pagefind production index |
| Static assets under `assets/` | Stable files under `public/assets/` |

Before merging a migration or content refresh, run:

```bash
corepack pnpm build
corepack pnpm check:links
```

`pnpm check:links` catches missing local pages, images, scripts, styles, and generated assets referenced by the built HTML.

## Deployment

The site is deployed to Cloudflare Pages. Astro builds the static site into `dist/`, and Cloudflare Pages additionally executes the Functions in `functions/`:

- All `/api/*` requests route through the Hono application in `functions/api/[[route]].js`.
- The Hono app is exported through `handle(app)` from `hono/cloudflare-pages`, with `.basePath('/api')`.

### Heartbeat storage (D1)

`POST /api/heartbeat` appends device heartbeats as one row per call into the Cloudflare D1 database `opendesk-stats` (binding name `opendesk-stats-db`, table `heartbeats`: auto-increment `id`, `os`/`device_type`/`device_id` from the client, `time` and `ip_hash` recorded server-side). The client IP is salted-hashed (SHA-256 with the `IP_HASH_SALT` secret) before storage, so the raw IP is never persisted — same IP still yields the same hash for source-based aggregation. Queries for "latest state per device" group by `device_id` with `MAX(time)`. The binding is configured in the Cloudflare dashboard (Settings → Bindings) for production; `wrangler.toml` additionally declares the same binding with a placeholder `database_id` so local `wrangler pages dev` and `wrangler d1` commands work against a local SQLite copy in `.wrangler/state`.

Apply schema changes locally with:

```bash
corepack pnpm exec wrangler d1 migrations apply opendesk-stats --local
```

Table schema lives in `migrations/`. `astro dev` has no D1 binding, so heartbeat calls there return a confirmation without persisting (the code degrades gracefully when `c.env['opendesk-stats-db']` is absent).

### Statistics endpoint

`GET /api/stats` aggregates `heartbeats`: total and last-1d/last-7d distinct device counts, plus per-`device_type` breakdowns (time-window filters use the server-written ISO `time`). The endpoint is admin-only: it requires `Authorization: Bearer <token>` matching `ADMIN_TOKEN`, otherwise 401 (or 503 when the token is unconfigured). `ADMIN_TOKEN` and `IP_HASH_SALT` are secrets — set them in the Cloudflare dashboard (Settings → Variables and Secrets, type Secret); local `wrangler pages dev` reads them from `.dev.vars` (gitignored).

Local verification (serves the production build *and* the Functions, so the API behaves as on Cloudflare):

```bash
corepack pnpm build
corepack pnpm check:links
corepack pnpm pages:dev
```

Two equivalent ways to publish:

1. **Git integration (recommended)**: connect the repository in the Cloudflare Pages dashboard. Cloudflare runs `pnpm build` and serves `dist/`.
2. **CLI**: authenticate with `wrangler login`, then run `corepack pnpm pages:deploy`.

`wrangler.toml` declares `pages_build_output_dir = "./dist"` so Wrangler knows which directory to upload. The custom domain `opendesk.matrix.openharmony.cn` is mapped to the production deployment in the dashboard (production branch: `main`).

## Preview Deployments

Cloudflare Pages automatically creates a preview deployment with a unique `*.pages.dev` URL for every pull request and non-production branch, so no per-branch config changes are needed.

Keep the production branch on:

- `site: 'https://opendesk.matrix.openharmony.cn'` in `astro.config.mjs`;
- the custom domain mapped to the production deployment in the dashboard.
