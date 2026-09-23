---
title: "OpenDesk 0.3.7：用户自选 Shell， Windows 动态沙箱和插件系统增强"
date: "2026-09-23T12:00:00+08:00"
category: "stable-release"
version: "0.3.7"
downloads:
  cli: "npm install -g \"@bitclub.ai/opendesk-cli@0.3.7\""
  windows:
    x86:
      url: "https://gitcode.com/openharmony-robot/OpenDesk/releases/download/v0.3.7/opendesk-win-x86-0.3.7.exe"
      label: "Windows x86 安装包"
    arm64:
      url: "https://gitcode.com/openharmony-robot/OpenDesk/releases/download/v0.3.7/opendesk-win-arm64-0.3.7.exe"
      label: "Windows ARM64 安装包"
  harmonyos:
    url: "https://appgallery.huawei.com/app/detail?id=com.develop.opensource.ohpcd.opendesk&channelId=SHARE&source=appshare"
    label: "HarmonyOS 安装链接"
  macos:
    arm64:
      url: "https://gitcode.com/openharmony-robot/OpenDesk/releases/download/v0.3.7/opendesk-darwin-arm64-0.3.7.dmg"
      label: "macOS 安装包 (Apple 芯片)"
    x86:
      url: "https://gitcode.com/openharmony-robot/OpenDesk/releases/download/v0.3.7/opendesk-darwin-x86-0.3.7.dmg"
      label: "macOS 安装包 (Intel 芯片)"
summary: "新增 Windows dynobox 动态沙箱，插件系统支持接入自定义 MCP 提供商和 Skill 提供商；任务支持批量导入导出，并包含长对话渲染性能优化与多项稳定性修复"
---

# OpenDesk 0.3.7 正式版本更新内容

## 主要更新

相对于 0.3.6 版本，在 0.3.7 版本中我们完成了以下更新:

## UI设计与用户体验优化

- 输入框功能栏宽度不足时支持横向滚动访问全部功能，并适配深色主题滚动条样式;
- 代码编辑器背景跟随消息面板主题，文件预览面板统一使用等宽字体;
- 文件胶囊仅对显式的 Markdown 链接渲染，避免误识别;
- 任务状态悬浮窗的"需要交互"状态在交互提示处理后正确撤除;
- 新增浏览器、MCP 管理、待办管理与技能管理等模块的多语言支持;
- 对话支持 Mermaid 图表渲染;
- 桌面端输入框新增技能与自动补全预览卡片，悬停或方向键导航时展示完整描述; 在多条消息排队时，支持鼠标拖拽调整排队消息的顺序;

## 新功能

- 桌面端和 Cli 支持用户在设置界面中选择执行命令使用的 Shell;
- 在 Windows 桌面端下, 当用户使用 PowerShell 时支持动态沙箱和文件删除找回功能，在开启后，被 Agent 删除的文件会自动进入回收站功能;
- MCP 与技能注册表解耦为独立插件实现，插件系统新增外观 (Appearance) 能力，支持通过插件定制 OpenDesk 的名称，图标和描述文本;
- 任务支持批量导入与导出;
- 集成内置 WPS 演示 (WPS Slides) 插件，提供七个 WPS 场景工具，当前仅在 Windows 版本可用;
- 对话新增消息快速导航，长对话中可快速跳转定位;
- 消息渠道新增会话级"始终允许"权限（仅在当前会话内生效，不跨任务持久化），并完善微信与飞书的权限交互;
- Linux版本桌面端主窗口支持圆角与自绘窗口阴影, 与其他系统版本保持体验一致;
- OpenHarmony 终端优先使用 zsh 交互模式，并自动过滤 shell 集成中的部分无意义的错误信息;

## 其他问题修复

- 桌面端任务视图长历史渲染性能，长 Markdown 流式渲染与滚动跟随表现优化;
- grep 工具改为流式读取，降低大目录扫描时的内存占用;
- 修复切换模型时的焦点冲突，以及任务内切换模型推理力度不生效的问题;
- 模型推理预算改为在回合开始时统一解析，修复多轮迭代中推理力度不一致的问题；DeepSeek-v4.1-flash 不再提供 medium 推理力度;
- 修复 Cli 状态栏模型信息无法及时刷新的问题;
- 修复权限校验中 POSIX 绝对路径被错误锚定到盘符的问题，shell 命令路径在权限检查前统一规范化;
- 修复 Windows 文件授权按钮短名称显示问题;
- 修复嵌入模型探测未遵循超时设置的问题，未配置嵌入模型时不再挂载语义搜索工具;
- 记忆回顾任务的读取不再增加记忆热度，新增记忆维护工具，回顾改写记忆时保留热度与身份信息;
- 渠道入站消息会话保持在后台运行，切换任务时不再强制前置窗口;
- 修复设置页与侧边栏切换后文件预览状态丢失的问题;
- 修复侧边栏右键子菜单意外隐藏的问题;
- 修复文件路径补全始错误绑定到全局工作区的问题;
- 修复浏览器画中画模式下视口高度异常的问题，无需截图快照时 URL 变更也正常上报;
- 修复 CLI 导出任务时的崩溃问题，导出路径支持 `~` 符号;
- 面向部分新模型在调用 Skill 中工具时缺失工具名的问题进行参数自动纠错;
- 任务信息不再写入系统日志，避免敏感信息泄露;
- 修复安全网关恶意技能黑名单弹窗忽略按钮无响应的问题;
- 模型服务商名称新增唯一性校验，重命名服务商时级联更新关联模型;
- 修复鸿蒙 PC 上输出内容过长导致界面卡死以及输出信息占用内存较大导致应用崩溃的问题;
- 修复已有任务正在操作浏览器时，左侧边栏反复收起的问题（外部浏览器同样适用）;
- 修复浏览器打开时切换预览模式会意外展开右侧边栏的问题;
- 修复文件无法在左侧边栏展开时直接预览的问题;
- 修复生成 HTML 卡片时页面全屏占满、直接替换应用界面内容的问题;
- 修复左下角反馈按钮始终显示红点、"反馈"文字无法隐藏的问题;
- 修复绝对路径中包含 `..` 时权限弹窗误报的问题;
- 修复 Windows 权限弹窗中的路径被当作 URL 解析，导致中文被转义为百分号编码的问题;
- 提供银河麒麟 (Kirin) Linux 平台的运行与打包脚本;
- 修复 Windows 桌面端旧版本无法直接覆盖安装新版本的问题;
- 修复 Windows 上生成的文件卡片 (pill) 指向不存在路径的问题;
- 支持 Windows 桌面端自动更新;

## 如何升级

对于 Cli 版本，请运行 `npm install -g "@bitclub.ai/opendesk-cli@0.3.7"` 即可将当前 opendesk 升级到最新的稳定版本，或者进入 opendesk 之后，输入 `/upgrade` 命令即可。桌面端可直接在 [这里](/download/) 下载。
