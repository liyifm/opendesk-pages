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
corepack pnpm preview
```

The build output is written to `dist/`. The directory is ignored by git and should not be committed.

## GitHub Pages Deployment

The deployment workflow is `.github/workflows/deploy.yml`.

It runs on pushes to `main` or `master` and performs:

1. `actions/setup-node` using `.nvmrc`.
2. `corepack enable`.
3. `pnpm install --frozen-lockfile`.
4. `pnpm build`.
5. Upload of `dist/` through `actions/upload-pages-artifact`.
6. Deployment through `actions/deploy-pages`.

Repository settings required on `liyifm/opendesk-pages`:

- GitHub Actions enabled.
- GitHub Pages source set to `GitHub Actions`.
- Workflow permissions allow Pages deployment through `pages: write` and `id-token: write`.
- Custom domain set to `opendesk.bitclub.ai`, matching `public/CNAME`.

`public/.nojekyll` is kept so GitHub Pages serves Astro assets exactly as generated.
