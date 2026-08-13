---
title: "OpenDesk 0.3.3：内嵌幻灯片编辑器、文件链接预览、安全网关策略控制台"
date: "2026-08-13T10:30:00+08:00"
category: "stable-release"
version: "0.3.3"
downloads:
  cli: "npm install -g \"@bitclub.ai/opendesk-cli@0.3.3\""
  windows:
    url: "https://gitcode.com/openharmony-robot/OpenDesk/releases/download/v0.3.3/opendesk-win-x86-0.3.3.msi"
    label: "Windows x86 安装包"
  harmonyos:
    url: "https://appgallery.huawei.com/app/detail?id=com.develop.opensource.ohpcd.opendesk&channelId=SHARE&source=appshare"
    label: "HarmonyOS 安装链接"
  macos:
    url: "https://gitcode.com/openharmony-robot/OpenDesk/releases/download/v0.3.3/opendesk-darwin-arm64-0.3.3.dmg"
    label: "MacOS 安装包 (仅支持M系列芯片)"
summary: "文件资源管理器内嵌幻灯片编辑器，支持 AI 生成与演示；对话中自动解析文件链接并弹出预览；安全网关内嵌策略控制台并新增恶意技能归因记账；个人画像与记忆支持可视化编辑。"
---

# OpenDesk 0.3.3 正式版本更新内容

## 主要更新

相对于 0.3.2 版本，在 0.3.3 版本中我们完成了以下更新:

### UI设计与用户体验优化

- 基于 [GenOffice](https://github.com/genspark-ai/genoffice) 二次开发并发布了 [@bitclub.ai/opendesk-office](https://www.npmjs.com/package/@bitclub.ai/opendesk-office), 支持在文件资源管理器中内嵌完整的幻灯片（PPT）编辑器，可直接在 OpenDesk 内创建和编辑演示文稿，支持 AI 生成幻灯片、演示者视图、动画、图表、墨迹等能力，打开时自动聚焦工作区并在侧边栏重开时保留布局；
- 支持在对话中自动解析消息中的文件路径，点击文件后在右侧打开大屏预览;
- 消息代码块新增一键复制按钮，修复深色模式下代码块显示问题；
- 支持消息快捷工具栏，用户消息支持直接编辑与重新生成，智能体消息支持一键 fork 任务等；
- 首页输入框内容自动记忆，支持一键清除；
- 关闭主窗口时弹出确认对话框，避免误触丢失正在进行的工作；
- 支持启动时异步初始化，优化启动时间;

### 新功能

- 个人画像与记忆支持可视化编辑，可在记忆面板中直接增删改画像、工作区记忆与全局事实记忆；
- 安全网关增加策略控制台，实时查看拦截状态并配置策略；
- 新增 HarmonyOS 技能回退（fallback）策略与日落机制，结合内置恢复知识库，提升鸿蒙设备上技能执行的健壮性;
- 在大模型请求中增加通用的尾部卡片（tail card）机制，并重构 hook 系统，方便未来各种插件都可以通过尾部卡片向大模型推理过程增加 hints；
- (Cli) 支持 `opendesk serve --mode opencode` 支持使用 `--use-config-permissions` 来配置外置的权限规则;
- (Cli) 禁用所有消息在 Cli 模式下的 Markdown 到 HTML 的渲染，规避 marked 偶发的正则表达式将 Cli 事件循环卡死的问题;

### 其他问题修复

- 任务分组使用更新时间排序，同时将上周的任务调整为最近7天的任务;
- 修复模型校验中 `max_tokens` 与 `max_completion_tokens` 的兼容问题，该问题影响部分 OpenAI 模型可用性校验功能；
- 非开发者模式下隐藏调试菜单；

## 如何升级

对于 Cli 版本，请运行 `npm install -g "@bitclub.ai/opendesk-cli@0.3.3"` 即可将当前 opendesk 升级到最新的稳定版本，或者进入 opendesk 之后，输入 `/upgrade` 命令即可。桌面端可直接在 [这里](/download/) 下载。
