# Site Operations

This repository contains the OpenDesk website and documentation site.

## Current Stack

- Astro builds the static site.
- Starlight renders the documentation pages under `/docs/`.
- MDX is enabled for documentation and content pages.
- Pagefind is generated during production builds for local site search.
- GitHub Actions deploys the built `dist/` artifact to GitHub Pages.

The previous Jekyll site layout and deployment flow have been removed. Do not add `_config.yml`, `Gemfile`, `_layouts`, `_includes`, or branch-based Pages deployment back to this repository.

## Local Development

```bash
corepack enable
corepack pnpm install
corepack pnpm dev --host 127.0.0.1 --port 8093
```

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
| Custom domain | `public/CNAME` |
| GitHub Pages static passthrough | `public/.nojekyll` |
| Search experience | Starlight Pagefind production index |
| Static assets under `assets/` | Stable files under `public/assets/` |

Before merging a migration or content refresh, run:

```bash
corepack pnpm build
corepack pnpm check:links
```

`pnpm check:links` catches missing local pages, images, scripts, styles, and generated assets referenced by the built HTML.

## GitHub Pages Deployment

The deployment workflow is `.github/workflows/deploy.yml`.

It runs on pushes to `main` or `master` and performs:

1. `actions/setup-node` using `.nvmrc`.
2. `corepack enable`.
3. `pnpm install --frozen-lockfile`.
4. `pnpm build`.
5. `pnpm check:links`.
6. Upload of `dist/` through `actions/upload-pages-artifact`.
7. Deployment through `actions/deploy-pages`.

Repository settings required on `liyifm/opendesk-pages`:

- GitHub Actions enabled.
- GitHub Pages source set to `GitHub Actions`.
- Workflow permissions allow Pages deployment through `pages: write` and `id-token: write`.
- Custom domain set to `opendesk.bitclub.ai`, matching `public/CNAME`.

`public/.nojekyll` is kept so GitHub Pages serves Astro assets exactly as generated.
