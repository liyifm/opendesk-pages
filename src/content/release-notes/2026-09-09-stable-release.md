---
title: "OpenDesk 0.3.6：外部智能体接入，浏览器焦点修复与消息插件支持"
date: "2026-09-09T12:00:00+08:00"
category: "stable-release"
version: "0.3.6"
downloads:
  cli: "npm install -g \"@bitclub.ai/opendesk-cli@0.3.6\""
  windows:
    url: "https://gitcode.com/openharmony-robot/OpenDesk/releases/download/v0.3.6/opendesk-win-x86-0.3.6.exe"
    label: "Windows x86 安装包"
  harmonyos:
    url: "https://appgallery.huawei.com/app/detail?id=com.develop.opensource.ohpcd.opendesk&channelId=SHARE&source=appshare"
    label: "HarmonyOS 安装链接"
  macos:
    url: "https://gitcode.com/openharmony-robot/OpenDesk/releases/download/v0.3.6/opendesk-darwin-arm64-0.3.6.dmg"
    label: "MacOS 安装包 (仅支持M系列芯片)"
summary: "新增 ACP 客户端能力，可接入并调度外部智能体；消息频道系统重构为原生插件实现，支持热更新、可视化设置与独立工作空间权限；插件新增任务评审等 Hook，浏览器扩展点 URL 匹配支持正则与通配符，内置浏览器隔离后台自动化与用户会话；任务支持导出为 HTML/JSON，并修复多项稳定性问题。"
---

# OpenDesk 0.3.6 正式版本更新内容

## 主要更新

相对于 0.3.5 版本，在 0.3.6 版本中我们完成了以下更新:

## UI设计与用户体验优化

- 对话输入框支持根据内容自适应高度，最大高度随对话框高度动态调整;
- 对话中的网页链接支持通过右键菜单快捷操作;
- 任务状态悬浮窗跟随字体预设显示;
- 内置浏览器支持可视化显示当前页面支持的浏览器动作提示;

## 新功能

- 新增 [ACP (Agent Client Protocol)](https://agentclientprotocol.com/get-started/introduction) 客户端能力，OpenDesk 可以作为宿主接入外部并调度智能体;
- ACP 服务模式支持 `--model` 参数，可锁定所有 ACP 会话使用的模型;
- 插件系统中，所有浏览器 (browser) 扩展点的 URL 匹配规则支持正则表达式与通配符;
- 插件系统新增任务评审（Task Review）Hook 与本地技能列表（Skill List）Hook;
- 消息频道（Channel）系统重构为原生插件实现，并支持频道插件热更新, 相比于原始实现，新版消息频道支持在设置界面进行可视化设置，并支持为不同消息来源和账户配置独立的工作空间和访问权限，安全性得到进一步的保障;

## 其他问题修复

- 插件支持声明独立工具集与本地工具名，避免与其它插件产生工具名冲突;
- 任务支持导出为 HTML 或 JSON 文件，方便分享与归档;
- 对话附件支持自动识别 txt 格式文件;
- 浏览器隔离后台自动化与用户浏览会话，后台任务不再抢占窗口焦点并支持页内聚焦;
- 修复从主页跳转后页面导航失败的问题;
- 插件：修复插件安装时的网络代理与 npm SSL 证书处理;
- 恢复鸿蒙 PC 上 OpenDesk Cli 运行时丢失 Shell 工具的问题;
- 支持工具名出现单字符偏差时自动纠错;
- skillCallTool 缺失工具名时, 可以根据模型已经填充的参数名称进行自动纠错;
- 修复由于三方库 jsonRepair 中的 bug 导致解析合法 JSON 对象失败的问题;
- 修复任务工作区异步加载后右侧边栏文件目录不同步的问题;
- 修复启动时任务与主窗口显示不同步的问题, 提升任务列表刷新与任务命名的稳定性;
- 修复 AMD 显卡的 Windows 设备上悬浮窗背景透明度不稳定的问题;

## 如何升级

对于 Cli 版本，请运行 `npm install -g "@bitclub.ai/opendesk-cli@0.3.6"` 即可将当前 opendesk 升级到最新的稳定版本，或者进入 opendesk 之后，输入 `/upgrade` 命令即可。桌面端可直接在 [这里](/download/) 下载。
