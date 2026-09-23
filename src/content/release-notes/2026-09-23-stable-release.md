---
title: "OpenDesk 0.3.7：动态沙箱与安全网关，账号插件化与沉浸式桌面"
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
summary: "新增 Windows dynobox 动态沙箱与 HarmonyOS PC 沙箱，集成 AgentGate 安全网关；账号体系重构为插件驱动，MCP 与技能注册表解耦为插件；任务支持任务包导入与批量导出，新增回收站与对话 Mermaid 图表渲染；沉浸式桌面作为实验特性上线，AgentOffice 支持服务化部署与 iframe 内嵌交互；并包含长对话渲染性能优化与多项稳定性修复。"
---

# OpenDesk 0.3.7 正式版本更新内容

## 主要更新

相对于 0.3.6 版本，在 0.3.7 版本中我们完成了以下更新:

## 新功能

- 沙箱体系全面增强：Windows 平台新增 dynobox 动态沙箱，HarmonyOS PC 新增沙箱支持，并提供银河麒麟 (Kirin) Linux 平台的运行与打包脚本;
- 终端支持 shell 列表与沙箱化 shell（当前支持 PowerShell），新增回收站功能，删除的文件可随时恢复（需启用沙箱）;
- 集成 AgentGate 安全网关：拦截记录与拦截消息支持展示触发层信息，设置页新增多 Session 分析开关，支持存储超限提醒与一键清理，恶意技能检测默认关闭、需在设置中显式开启;
- 账号体系重构为插件驱动：新增账号插件 SDK 与运行时基础设施，账号核心切换为插件化后端实现;
- MCP 与技能注册表解耦为独立插件实现，插件系统新增外观 (Appearance) 能力，并新增工具贡献系统提示词机制;
- 任务支持任务包 (Task Bundle) 导入与批量导出;
- 集成内置 WPS 演示 (WPS Slides) 插件，提供七个 WPS 场景工具，支持 CLI、桌面端、serve 与 Bridge 入口;
- 对话支持 Mermaid 图表渲染，支持暗色主题与图表操作提示;
- 对话新增消息快速导航，长对话中可快速跳转定位;
- GUI 输入框新增技能与自动补全预览卡片，悬停或方向键导航时展示完整描述;
- 沉浸式桌面作为实验特性上线，可在设置中开启体验;
- AgentOffice 支持以 HTTP/HTTPS 服务部署员工 (Staff) 并提供管理端点，支持在 iframe 中内嵌交互，界面语言支持自动切换;
- 消息渠道新增会话级"始终允许"权限（仅在当前会话内生效，不跨任务持久化），并完善微信与飞书的权限交互;
- 支持拖拽调整排队消息的顺序;
- Linux 主窗口支持圆角与自绘窗口阴影;
- 日历应用支持英文界面，并支持运行时动态切换语言;
- use-browser 技能新增截图工具，内置浏览器补充常用站点操作提示;
- OpenHarmony 终端优先使用 zsh 交互模式，并自动过滤 shell 集成噪音;

## UI设计与用户体验优化

- 输入框功能栏宽度不足时支持横向滚动访问全部功能，并适配深色主题滚动条样式;
- 代码编辑器背景跟随消息面板主题，文件预览面板统一使用等宽字体;
- 文件 pill 仅对显式的 Markdown 链接渲染，避免误识别;
- 新消息指示器间距对齐优化，会话导航高亮与进度指示动画优化;
- 沉浸式桌面卡片样式与生成边框优化;
- AgentOffice 应用外观优化，与主入口视觉保持一致;
- 任务状态悬浮窗的"需要交互"状态在交互提示处理后正确撤除;
- 实验特性开关相互独立，支持分别控制;
- 新增浏览器、MCP 管理、待办管理与技能管理等模块的多语言支持;

## 性能优化

- 任务视图 (TaskView) 长历史渲染性能优化，长对话滚动更流畅;
- 优化长 Markdown 流式渲染与滚动跟随表现;
- grep 工具改为流式读取，降低大目录扫描时的内存占用;
- 自定义智能体与员工 (Staff) 改为懒加载，提升启动速度;
- 任务包导入采用批量持久化并复用传输快照，提升导入速度;

## 其他问题修复

- 修复切换模型时的焦点冲突，以及任务内切换模型推理力度不生效的问题;
- 模型推理力度改为在回合开始时统一解析，修复多轮迭代中推理力度不一致的问题；DeepSeek-v4.1-flash 不再提供 medium 推理力度;
- 修复 TUI 仪表盘模型信息不刷新的问题;
- 修复权限校验中 POSIX 绝对路径被错误锚定到盘符的问题，shell 命令路径在权限检查前统一规范化;
- 修复 Windows 文件授权按钮短名称显示问题;
- 修复沙箱网络访问与解释器路径访问问题，PowerShell 沙箱内文件重命名与删除失败以及中文编码问题;
- 终端超时不再将权限审批等待时间计入，终端输出增加上限并持久化完整日志，转入后台后日志不再丢失;
- 修复 Mermaid 图表黑块渲染与流式渲染闪屏问题;
- 修复 sqlite-vec 扩展在打包环境 (asar) 内加载失败的问题，加载失败时自动回退 wasm 实现，初始化失败后正确释放资源;
- 修复嵌入模型探测未遵循超时设置的问题，未配置嵌入模型时不再挂载语义搜索工具;
- 记忆回顾任务的读取不再增加记忆热度，新增记忆维护工具 updateMemory，回顾改写记忆时保留热度与身份信息;
- 渠道入站消息会话保持在后台运行，切换任务时不再强制前置窗口;
- 修复设置页与侧边栏切换后文件预览状态丢失的问题;
- 修复侧边栏右键子菜单意外隐藏的问题;
- 文件路径补全始终锚定当前任务工作区;
- 修复浏览器画中画 (PiP) 模式下视口高度异常的问题，无需截图快照时 URL 变更也正常上报;
- 对话中的网页链接不再触发应用外壳导航，修复深色模式下横向滚动条显示异常;
- 修复 CLI 导出任务时的崩溃问题，导出路径支持 `~` 符号;
- CallSkillTool 缺失工具名时进一步提升参数自动纠错能力;
- 目录扫描遵循仓库根目录 .gitignore 规则;
- 任务信息不再写入系统日志，避免敏感信息泄露;
- 对齐 opencode 的 Langfuse 观测数据;
- 修复安全网关恶意技能黑名单弹窗忽略按钮无响应的问题;
- 修复 CLI 输入框中技能补全后误发送消息的问题，支持多行技能输入;
- 模型服务商名称新增唯一性校验，重命名服务商时级联更新关联模型;
- 改进任务包的版本兼容与遗留数据迁移清理;
- macOS 语音辅助组件改用 x86_64 目标构建;
- 精简 Windows 安装包打包脚本，交叉构建 HarmonyOS 时支持通过 OPENDESK_TARGET_PLATFORM 跳过 Windows 沙箱构建;
- 修复鸿蒙 PC 上输出内容过长导致界面卡死（约 8KB 即可复现），以及输出信息占用内存较大导致应用崩溃的问题;
- 修复桌面端旧版本无法直接覆盖安装新版本的问题;
- 修复 Windows 上生成的文件卡片 (pill) 指向不存在路径的问题;
- 修复已有任务正在操作浏览器时，左侧边栏反复收起的问题（外部浏览器同样适用）;
- 修复浏览器打开时切换预览模式会意外展开右侧边栏的问题;
- 修复文件无法在左侧边栏展开时直接预览的问题;
- 修复生成 HTML 卡片时页面全屏占满、直接替换应用界面内容的问题;
- 修复左下角反馈按钮始终显示红点、"反馈"文字无法隐藏的问题;
- 修复绝对路径中包含 `..` 时权限弹窗误报的问题;
- 修复 Windows 权限弹窗中的路径被当作 URL 解析，导致中文被转义为百分号编码的问题;
- 修复 welink 插件导致 OpenDesk 崩溃的问题;

## 如何升级

对于 Cli 版本，请运行 `npm install -g "@bitclub.ai/opendesk-cli@0.3.7"` 即可将当前 opendesk 升级到最新的稳定版本，或者进入 opendesk 之后，输入 `/upgrade` 命令即可。桌面端可直接在 [这里](/download/) 下载。
