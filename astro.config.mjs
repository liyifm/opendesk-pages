import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://opendesk.bitclub.ai',
  // Production deploys at the domain root, so public page assets intentionally use root-absolute URLs.
  trailingSlash: 'always',
  devToolbar: {
    enabled: false,
  },
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
      customCss: ['./src/styles/starlight.css', './src/styles/header.css'],
      components: {
        Head: './src/components/starlight/Head.astro',
        Header: './src/components/starlight/Header.astro',
        TableOfContents: './src/components/starlight/TableOfContents.astro',
      },
      sidebar: [
        {
          label: '快速开始',
          items: [
            { label: 'OpenDesk Cli', slug: 'docs/quickstart/cli' },
            { label: 'OpenDesk 桌面版', slug: 'docs/quickstart/desktop' },
            { label: '在 VS Code 中使用 OpenDesk', slug: 'docs/quickstart/vscode' },
          ],
        },
        {
          'label': '常用功能',
          'items': [
            { label: '初始化配置', slug: 'docs/introduction/config' },
            { label: '发起第一个任务', slug: 'docs/introduction/chat' },
            { label: '管理任务状态', slug: 'docs/introduction/chat2' },
            { label: '使用工作空间', slug: 'docs/introduction/workspace' },
            { label: '配置搜索引擎', slug: 'docs/introduction/search' },
            { label: '调整安全模式', slug: 'docs/introduction/mode' },
            { label: '连接到微信/飞书', slug: 'docs/introduction/im' },
            { label: '使用技能 (Skills)', slug: 'docs/introduction/skill' },
            { label: '使用MCP服务器', slug: 'docs/introduction/mcp' },
            { label: '定时任务', slug: 'docs/introduction/cron' },
            { label: '浏览器自动化', slug: 'docs/introduction/browser' },
            { label: '执行长程任务', slug: 'docs/introduction/long-horizon' },
          ]
        },
        {
          label: '进阶场景',
          items: [
            { label: '编码场景优化', slug: 'docs/advanced/coding' },
            { label: '调整显示效果', slug: 'docs/advanced/display' },
            { label: '技能分析与测试', slug: 'docs/advanced/skill-analysis' },
            { label: '导入导出系统配置', slug: 'docs/advanced/config-export' },
          ]
        },
        {
          label: '完整使用手册',
          items: [
            { label: 'OpenDesk Cli', slug: 'docs/manual/cli' },
            {
              label: 'OpenDesk 桌面版',
              items: [
                { label: 'Desktop 使用手册', slug: 'docs/manual/desktop' },
                { label: '快速上手', slug: 'docs/manual/desktop/quickstart' },
                { label: '功能指南', slug: 'docs/manual/desktop/tools' },
                { label: '技能系统', slug: 'docs/manual/desktop/skills' },
                { label: '使用案例', slug: 'docs/manual/desktop/use-cases' },
                { label: '最佳实践', slug: 'docs/manual/desktop/best-practices' },
                { label: '常见问题', slug: 'docs/manual/desktop/faq' },
              ],
            },
          ],
        },
        {
          label: '开发者指南',
          items: [
            { label: '架构介绍', slug: 'docs/contribute/architecture' },
            { label: '如何参与贡献', slug: 'docs/contribute/howto' },
            { label: '准备开发环境', slug: 'docs/contribute/prepare' },
            { label: 'OpenDesk Cli 开发上手', slug: 'docs/contribute/cli' },
            { label: 'OpenDesk Desktop 开发上手', slug: 'docs/contribute/desktop' },
            { label: '配置文件格式', slug: 'docs/contribute/config-format' },
            {
              label: '集成到其他平台',
              items: [
                { label: '无头模式', slug: 'docs/integration/headless' },
                { label: 'Node 协议', slug: 'docs/contribute/node-api' },
                { label: 'ACP 协议', slug: 'docs/contribute/acp-server-api' },
                { label: 'OpenCode 协议', slug: 'docs/contribute/opencode-server-api' }
              ],
            },
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
