# 2026-06-09 Post-Migration Site Updates

> Archived: this change record is retained for review history only and is not part of the published website.

## Status

| Item | Status |
| --- | --- |
| Scope | Post-migration homepage, navigation, deployment, and asset follow-up |
| Current state | Completed |
| Primary branch | `codex/preview-jekyll-pages` |
| Site-change commit under review | `fcdf6cd` |
| Preview deployment | `https://zhaohernando-code.github.io/` |

## Summary

After the Astro + Starlight + MDX migration reached an Astro-only baseline, the site received several follow-up fixes for product polish, deployment confidence, and first-load performance.

## Changes Recorded For Review

### Navigation And Docs Entry

- The top navigation label changed from `快速开始` to `使用文档`.
- The `使用文档` tab links to `/docs/quickstart/cli/`, matching the homepage `快速开始` call to action.
- The top navigation active state now uses `activePath: '/docs/'`, so it remains active across all `/docs/*` pages.
- External navigation entries such as `技能广场` and `代码仓` remain external links and do not participate in internal active-state matching.
- The active state remains underline-only; no pill or background active style was reintroduced.

### Homepage And Layout Follow-Up

- The homepage remains Astro component based: `HomeHero`, `WorkflowSection`, `ChannelsSection`, `GallerySection`, `CliSection`, and `HomePager`.
- Desktop keeps the JavaScript page-snapping interaction.
- Narrow and mobile layouts continue to use natural flow layout rather than scroll snapping.
- The homepage `快速开始` button intentionally keeps the public label while routing to the documentation path `/docs/quickstart/cli/`.

### Static Image Compression

The first attempted performance change that added alternative image loading behavior was reverted because it made images feel slower and caused visual regressions. The accepted follow-up was limited to static asset compression and direct path updates.

Accepted image changes:

| Asset | Current path | Approx size after change | Notes |
| --- | --- | ---: | --- |
| Homepage banner | `public/assets/images/common/banner.jpg` | 325 KB | Recompressed in place |
| Homepage GUI screenshot | `public/assets/images/quickstart/firsttime_gui.jpg` | 74 KB | Replaces deleted `firsttime_gui.png` |
| Batch file scenario | `public/assets/images/gallery/file_batch.jpg` | 292 KB | Replaces deleted `file_batch.png` |
| File organize scenario | `public/assets/images/gallery/file_organize.jpg` | 243 KB | Replaces deleted `file_organize.png` |
| File transfer scenario | `public/assets/images/gallery/file_transfer.jpg` | 244 KB | Replaces deleted `file_transfer.png` |
| Linux VM screenshot | `public/assets/images/manual/linuxvm.png` | 602 KB | Recompressed in place to preserve the public URL |

The change intentionally did not add:

- `<picture>` wrappers;
- `srcset`;
- CSS `image-set()`;
- speculative tab prefetching;
- route-level loading behavior changes.

Large GIF demonstrations remain unchanged to avoid changing product demo behavior.

### Deployment And Validation

Local validation performed before pushing:

```bash
corepack pnpm build
corepack pnpm check:links
```

Additional checks:

- Removed PNG references were scanned with `rg` and were not found in `src`, `public`, `docs`, or generated `dist`.
- Generated `dist` HTML references the new JPG paths.
- Pagefind search index generation completed during the production build.
- Claude + DeepSeek review returned PASS for the navigation active-state logic and updated image references.

Preview deployment:

- Personal preview repository: `zhaohernando-code/zhaohernando-code.github.io`.
- Preview-only config changes: `site` changed to `https://zhaohernando-code.github.io` and `public/CNAME` removed.
- GitHub Pages preview validation run `27218305914` completed successfully.
- Online checks confirmed the new JPG assets returned 200 and the deleted old PNG paths returned 404.

Production configuration remains:

- `astro.config.mjs` site: `https://opendesk.matrix.openharmony.cn`;
- `public/CNAME`: `opendesk.matrix.openharmony.cn`;
- GitHub Pages deployment from `dist/` through `.github/workflows/deploy.yml`.

## Review Notes

- `src/content/docs/docs/contribute/prepare.mdx` still references `firsttime.png`; that file remains present and was not part of the deleted `firsttime_gui.png` replacement.
- The migration plan and Phase 0 inventory are historical archive documents. Current operational truth should be checked against `README.md`, `docs/site-operations.md`, `astro.config.mjs`, and `.github/workflows/deploy.yml`.
