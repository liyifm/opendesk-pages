---
title: "Magic Pointer、内置笔记与浏览器应用"
date: "2026-05-19T09:00:00+08:00"
category: "nightly-release"
---

# 2026.5.19 日构建更新内容

## 新增功能

- 支持解析工作空间中的 agent.md 文件；
- (桌面端) 支持 Magic Pointer，按下 Alt 可以用鼠标或触屏在屏幕上勾选内容，并基于选择的内容与 Agent 进行后续对话；
- (桌面端) 增加了内置的笔记应用，可以通过富文本编辑器添加html格式的笔记，并支持由Agent自动添加，删除，编辑笔记等操作；
- (桌面端) 增加了内置的浏览器应用，支持本地收藏夹管理，历史记录管理等常用浏览器的基本功能;

## 优化与 Bug 修复

- 对于流式工具调用的错误处理进行了优化，并增加全局错误处理函数，避免直接产生core dump类错误；
- 将网关服务升级到与 5.12 版本的 openclaw 兼容；
- 通过输入 @ 触发的文件路径补全新增了关键字搜索功能，无需完整的路径前缀也可以快速查找文件；
- 将飞书和微信插件更新到与 openclaw 5.12 兼容的版本；
- (Cli) 优化调用 MCP 工具时的渲染卡片；
- (桌面端) 修复窗口较窄时，任务右侧边栏部分tab无法点击到的问题；
- (桌面端) 优化浏览器操控的并发处理，通过队列锁依次执行 agent 生成的连续浏览器操控动作；
- (桌面端) 修复了全局字体设置无法影响应用内部字体的问题；
- (桌面端) 在 Agent 完成这一轮对话的时候自动将光标聚焦到输入控件；
- (桌面端) 修复多处在正在输入状态下回车时，错误地触发消息提交的问题；

## 下载

**Cli**: `npm i -g "@bitclub.ai/opendesk-cli@nightly`
**桌面端**:

- [Windows x86 安装包](https://download.bitclub.ai/build/nightly/win/opendesk-win-x86-0.2.0-nightly-20260519.msi)
- [Harmony OS 安装包](https://download.bitclub.ai/build/nightly/ohos/opendesk-ohos-0.2.0-nightly-20260519.hap)

注: 鸿蒙安装包需要自行通过 [Deveco Studio](http://developer.huawei.com/consumer/cn/deveco-studio/) 或 [Auto-installer](https://github.com/likuai2010/auto-installer/) 签名安装。
