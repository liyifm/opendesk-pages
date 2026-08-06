---
title: "OpenDesk 0.3.2：全新设计系统、多模型组合使用、MCP懒加载"
date: "2026-08-06T15:00:00+08:00"
category: "stable-release"
version: "0.3.2"
downloads:
  cli: "npm install -g \"@bitclub.ai/opendesk-cli@0.3.2\""
  windows:
    url: "https://gitcode.com/openharmony-robot/OpenDesk/releases/download/v0.3.2/opendesk-win-x86-0.3.2.msi"
    label: "Windows x86 安装包"
  harmonyos:
    url: "https://appgallery.huawei.com/app/detail?id=com.develop.opensource.ohpcd.opendesk&channelId=SHARE&source=appshare"
    label: "HarmonyOS 安装链接"
  macos:
    url: "https://gitcode.com/openharmony-robot/OpenDesk/releases/download/v0.3.2/opendesk-darwin-arm64-0.3.2.dmg"
    label: "MacOS 安装包 (仅支持M系列芯片)"
summary: "桌面端引入全新设计系统重构；通过多模型组合提升性能降低，降低使用成本；大规模 MCP 服务延迟加载，减少无效上下文开销。"
---

# OpenDesk 0.3.2 正式版本更新内容

## 主要更新

相对于 0.3.1 版本，在 0.3.2 版本中我们完成了以下更新:

### UI设计与用户体验优化

- 引入全新的 UI/UX 设计语言，重构了包含左侧边栏、主任务界面、设置页面等一系列用户界面的外观；
- 左侧边栏任务列表支持按时间/工作空间的分类模式，支持任务收藏功能；
- 左上角新增深色模式快捷切换开关，一键切换深色/浅色/自动模式；
- 新增托盘菜单全屏切换入口；
- 任务视图中新增消息上下跳转按钮，快速跳转到之前的用户消息位置；

### 新功能

- 支持配置默认视觉模型和快速对话模型;
- 默认视觉模型配置后，即使对话模型不支持视觉(e.g. glm-5.2), OpenDesk也可以调用 `AskImage` 工具来读取和分析图片，实现强编码模型与强多模态模型的配合;
- 配置快速对话模型之后，代码仓探索，任务自动命名，异常中断恢复等简单任务都适用快速模型完成，帮用户降低 token 成本;

### 已有功能优化

- MCP工具支持懒加载，当用户安装了大量 MCP 服务的时候，会自动通过 MCP 搜索工具进行工具查找和按需暴露，降低 token 开销;
- 安全网关功能的所有依赖项静态打包，确保安全网关成为一个开箱即可使用的功能;
- 支持配置模型的最大输出 Token 数（Max Output Tokens），桌面端与 TUI 均可设置；
- 修复连续交互覆盖最早待回顾起点的问题，避免记忆回顾遗漏；
- 鸿蒙 PC 上默认工作区改为 `$HOME/Documents/opendesk`, 避免 OpenDesk 创建的文件在其他应用中可能无法打开的情况；

### 其他问题修复

- 修复 HTML 预览高度受限的问题，在对话界面中可以直接预览较大的 HTML 文件和 SVG 文件，也可以在通过系统打开方式一键打开；
- 大文件文本提取过程迁移至 Worker 线程，避免阻塞主线程；
- 修复消息回退时废弃文件缓存状态未重载的问题；
- 修复工具调用携带可修复的错误参数时 arg_string 缺失的问题；
- 工作区模态对话框支持原生文件选择器；
- (Cli) 优化 /model 命令的显示，支持直接在弹出窗口中选择模型；

## 如何升级

对于 Cli 版本，请运行 `npm install -g "@bitclub.ai/opendesk-cli@0.3.2"` 即可将当前 opendesk 升级到最新的稳定版本，或者进入 opendesk 之后，输入 `/upgrade` 命令即可。桌面端可直接在 [这里](/download/) 下载。
