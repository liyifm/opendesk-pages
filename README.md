# OpenDesk Pages

The official site and documentation for the [OpenDesk](https://gitcode.com/IntelliOS/OpenDesk) project.

This site is built with Astro, Starlight, and MDX. It publishes static files from `dist/` through GitHub Actions and GitHub Pages.

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

Open `http://127.0.0.1:8093/` after the dev server starts.

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

GitHub Actions builds and deploys the site on pushes to `main` or `master`.

The production site is published at `https://opendesk.bitclub.ai`. GitHub Pages should be configured with `Build and deployment -> Source: GitHub Actions`.

More operational details are in [docs/site-operations.md](docs/site-operations.md).
