---
title: "任务消息队列、变更面板与浏览器调试"
date: "2026-05-27T09:00:00+08:00"
category: "nightly-release"
---

# 2026.5.27 日构建更新内容

## ✨ 新功能

- 在模型配置中支持自定义 http 请求头 (headers)
- (Cli) 支持通过启动参数配置tui渲染节流的最小渲染间隔 `--render-interval` (间隔越大，则流式输出越"顿挫", 输出频率降低但单次输出的累计内容增加，同时在超大任务中可以获得更大的输入响应窗口)
- (桌面端) 支持在任务的“变更”面板中，显示本次任务的所有本地文件修改
- (桌面端) 支持任务消息队列，在任务进行中也可以发送新消息，新消息将进入任务消息队列待命，用户可以随时插队发送新消息打断当前任务或等待当前智能体回复结束后自动追加消息
- (桌面端) 即使模型在当前网络环境下无法验证可用性，也允许用户保存模型配置
- (桌面端) 在浏览器应用和任务级浏览器Tab中支持调试菜单，允许为每个浏览器Tab打开独立的开发人员工具或保存 BrowserUse 生成的网页快照

## 🐞 优化与 Bug 修复

- 修复对 glm-5.1 和 deepseek-v4 系列模型的上下文窗口大小自动判断
- 修复在 opendesk 运行中，设备休眠时概率触发的 epipe failure 问题，增加自动恢复逻辑
- (桌面端) 修复 MagicPointer 无法在应用 (日历，笔记) 中通过 Alt 键触发的问题
- (桌面端) 优化 BrowserUse 库处理 select 控件的逻辑，对于带 value 和不带 value 的 option 元素可以统一处理
- (桌面端) 优化 BrowserUse 对 iframe 的处理，支持跨域 iframe 的 snapshot, click 等操作
- (桌面端) 修复内置浏览器组件无法正确处理 `window.open` 弹窗的问题

## 下载

**Cli**: 在终端中运行 `npm i -g "@bitclub.ai/opendesk-cli@0.2.0-nightly-20260527` 安装, 或启动 opendesk 后运行 `/upgrade` 命令来升级。

**桌面端**:
- [Windows x86 安装包](https://download.bitclub.ai/build/nightly/win/opendesk-win-x86-0.2.0-nightly-20260527.msi)
- [Harmony OS 安装包](https://download.bitclub.ai/build/nightly/ohos/opendesk-ohos-0.2.0-nightly-20260527.hap)

注: 鸿蒙安装包需要自己通过 [Deveco Studio](http://developer.huawei.com/consumer/cn/deveco-studio/) 或 [Auto-installer](https://github.com/likuai2010/auto-installer/) 手动签名后安装。
