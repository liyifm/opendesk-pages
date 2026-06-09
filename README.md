# OpenDesk Pages

The official site and documentation for the [OpenDesk](https://gitcode.com/IntelliOS/OpenDesk) project.

This site is built with Astro, Starlight, and MDX. It publishes static files from `dist/`, so it can be deployed by GitHub Pages or any static hosting platform.

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

GitHub Actions builds and deploys the site on pushes to `main` or `master`. The workflow:

1. installs Node and pnpm through Corepack;
2. runs `pnpm install --frozen-lockfile`;
3. runs `pnpm build`;
4. uploads `dist/` to GitHub Pages.

The custom domain is declared in `public/CNAME`, and `public/.nojekyll` disables GitHub Pages' Jekyll processing for the published artifact.
