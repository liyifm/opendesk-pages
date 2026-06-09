import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://opendesk.bitclub.ai',
  // Production deploys at the domain root, so public page assets intentionally use root-absolute URLs.
  trailingSlash: 'ignore',
  integrations: [
    starlight({
      title: 'OpenDesk',
      description: 'Personal AI operator for desktop workflows.',
      favicon: '/favicon.ico',
      logo: {
        src: './src/assets/images/cli-logo.png',
        alt: 'OpenDesk',
      },
      pagefind: true,
      // Site-level fallback is provided by src/pages/404.astro, which builds to dist/404.html.
      disable404Route: true,
      customCss: ['./src/styles/starlight.css'],
      sidebar: [
        {
          label: '快速开始',
          items: [
            { label: 'Opendesk Cli', slug: 'docs/quickstart/cli' },
            { label: 'Opendesk Desktop (桌面版)', slug: 'docs/quickstart/desktop' },
          ],
        },
        {
          label: '进阶场景',
          items: [{ label: '插件使用', slug: 'docs/plugins' }],
        },
        {
          label: '完整使用手册',
          items: [
            { label: 'Opendesk Cli', slug: 'docs/manual/cli' },
            { label: 'Opendesk Desktop (桌面版)', slug: 'docs/desktop' },
          ],
        },
        {
          label: '开发者指南',
          items: [
            { label: '架构介绍', slug: 'docs/contribute/architecture' },
            { label: '准备开发环境', slug: 'docs/contribute/prepare' },
            { label: 'Opendesk Cli 开发上手', slug: 'docs/contribute/cli' },
            { label: 'Opendesk Desktop 开发上手', slug: 'docs/contribute/desktop' },
            { label: '官网技术栈迁移方案', slug: 'docs/contribute/astro-starlight-mdx-migration' },
            { label: 'Astro 迁移 Phase 0 盘点', slug: 'docs/contribute/astro-migration-phase-0-inventory' },
          ],
        },
      ],
      social: [
        {
          icon: 'gitlab',
          label: 'GitCode',
          href: 'https://gitcode.com/IntelliOS/OpenDesk',
        },
      ],
    }),
    mdx(),
    sitemap(),
  ],
});
