import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

// 旧开发文档链接（/docs/contribute、/docs/integration、/docs/plugins/development）跳转到新的 /docs/dev/ 路径。
// 旧站点所有 URL 均带尾斜杠（trailingSlash: always），静态主机的非规范形式请求由服务器补斜杠后命中。
const devDocMoves = [
  ['contribute', 'dev'],
  ['contribute/architecture', 'dev/architecture'],
  ['contribute/howto', 'dev/howto'],
  ['contribute/prepare', 'dev/prepare'],
  ['contribute/cli', 'dev/cli'],
  ['contribute/desktop', 'dev/desktop'],
  ['contribute/config-format', 'dev/config-format'],
  ['contribute/logging', 'dev/logging'],
  ['contribute/node-api', 'dev/node-api'],
  ['contribute/acp-server-api', 'dev/acp-server-api'],
  ['contribute/opencode-server-api', 'dev/opencode-server-api'],
  ['contribute/otel', 'dev/otel'],
  ['integration/headless', 'dev/headless'],
  ['plugins/development', 'dev/plugins'],
  ['plugins/development/tool', 'dev/plugins/tool'],
  ['plugins/development/mcp', 'dev/plugins/mcp'],
  ['plugins/development/skills', 'dev/plugins/skills'],
  ['plugins/development/hooks', 'dev/plugins/hooks'],
  ['plugins/development/agents', 'dev/plugins/agents'],
  ['plugins/development/browser', 'dev/plugins/browser'],
  ['plugins/development/commands', 'dev/plugins/commands'],
  ['plugins/development/debug-publish', 'dev/plugins/debug-publish'],
];
const redirects = Object.fromEntries(
  devDocMoves.map(([from, to]) => [`/docs/${from}/`, `/docs/${to}/`]),
);

export default defineConfig({
  site: 'https://opendesk.matrix.openharmony.cn',
  // Production deploys at the domain root, so public page assets intentionally use root-absolute URLs.
  trailingSlash: 'always',
  devToolbar: {
    enabled: false,
  },
  redirects,
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
        Footer: './src/components/starlight/Footer.astro',
        TableOfContents: './src/components/starlight/TableOfContents.astro',
        Sidebar: './src/components/starlight/Sidebar.astro',
      },
      sidebar: [
        // ===== 使用文档（/docs/*）=====
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
          ]
        },
        {
          label: '进阶场景',
          items: [
            { label: '执行长程任务', slug: 'docs/introduction/long-horizon' },
            { label: '编码场景优化', slug: 'docs/advanced/coding' },
            { label: '调整显示效果', slug: 'docs/advanced/display' },
            { label: '技能分析与测试', slug: 'docs/advanced/skill-analysis' },
            { label: '导入导出系统配置', slug: 'docs/advanced/config-export' },
          ]
        },
        {
          label: '鸿蒙PC专属',
          items: [
            { label: '连接到融合开发引擎', slug: 'docs/ohpc/linux' },
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
            { label: '插件使用', slug: 'docs/plugins' },
          ],
        },
        // ===== 开发文档（/docs/dev/*）=====
        {
          label: '架构与贡献',
          items: [
            { label: '架构介绍', slug: 'docs/dev/architecture' },
            { label: '如何参与贡献', slug: 'docs/dev/howto' },
            { label: '准备开发环境', slug: 'docs/dev/prepare' },
          ],
        },
        {
          label: '开发上手',
          items: [
            { label: 'OpenDesk Cli 开发', slug: 'docs/dev/cli' },
            { label: 'OpenDesk Desktop 开发', slug: 'docs/dev/desktop' },
            { label: '配置文件格式', slug: 'docs/dev/config-format' },
          ],
        },
        {
          label: '集成到其他平台',
          items: [
            { label: '无头模式', slug: 'docs/dev/headless' },
            { label: 'Node 协议', slug: 'docs/dev/node-api' },
            { label: 'ACP 协议', slug: 'docs/dev/acp-server-api' },
            { label: 'OpenCode 协议', slug: 'docs/dev/opencode-server-api' },
          ],
        },
        {
          label: '调试与观测',
          items: [
            { label: '使用日志系统', slug: 'docs/dev/logging' },
            { label: '通过 OTel 进行全链路监测', slug: 'docs/dev/otel' },
          ],
        },
        {
          label: '插件开发指南',
          items: [
            { label: '插件结构概述', slug: 'docs/dev/plugins' },
            { label: '在插件中添加工具', slug: 'docs/dev/plugins/tool' },
            { label: '在插件中挂载 MCP', slug: 'docs/dev/plugins/mcp' },
            { label: '在插件中添加 Skills', slug: 'docs/dev/plugins/skills' },
            { label: '在插件中使用钩子', slug: 'docs/dev/plugins/hooks' },
            { label: '在插件中贡献子 Agent', slug: 'docs/dev/plugins/agents' },
            { label: '在插件中注入浏览器提示', slug: 'docs/dev/plugins/browser' },
            { label: '扩展自定义命令', slug: 'docs/dev/plugins/commands' },
            { label: '插件的调试与发布', slug: 'docs/dev/plugins/debug-publish' },
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
