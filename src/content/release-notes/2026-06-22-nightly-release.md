---
title: "ACP Server、节点文件同步与消息回滚"
date: "2026-06-22T09:00:00+08:00"
category: "nightly-release"
---

# 2026.6.22 日构建更新内容

## ✨ 新功能

- (Cli) 支持以 [ACP Server](https://agentclientprotocol.com/get-started/introduction) 模式启动，可以与 VS Code 等支持 ACP 的 IDE 集成，用户可以在熟悉的编辑器中直接与 OpenDesk 协同编辑代码；支持 session 列表管理和模型切换；
- (Cli) 新增调试模式，在配置面板中可开启，提供额外的调试命令和设置项；
- (桌面端) 新增斜杠快速命令机制，在输入窗口中输入 `/` 即可快速触发命令；
- (桌面端) 新增节点文件同步能力 (fileSend / fileFetch)，支持在 node 和 gateway 之间双向传输文件。该功能目前主要用于在 node 上执行 skill 脚本时需要将脚本上传到 node 上，并将执行结果返回到本地;
- (桌面端) 新增节点连接/断开通知，所有已连接节点对 Agent 可见并显式提示默认执行节点；
- (桌面端) 支持消息回滚功能，可以右键点击指定的用户消息，回退到当前位置继续对话；

## 🐞 优化与 Bug 修复

- 优化 editFile/grepFile 等工具的展示效果和代码对齐；
- 增加 filemgr 去重熔断器，避免模型重复生成相似的文件读写工具调用而陷入自激循环，从而降低 Token 消耗；
- 修复模型偶然不输出 toolcall name 导致崩溃的问题；
- (Cli) `opendesk serve` 方式启动时自动禁用 gateway 服务，减少服务模式的资源开销；
- (桌面端) 在浏览器应用进入全屏时，给出更加清晰的退出全屏按钮说明提示；
- (桌面端) 支持 GUI 窗口位置和大小的记忆，再次启动自动恢复窗口位置；
- (桌面端) 优化并行任务执行性能；
- (桌面端) 适配鸿蒙PC的偏好语言自动检测；

## 下载

**Cli**: 在终端中运行 `npm i -g @bitclub.ai/opendesk-cli@0.2.0-nightly-20260622` 安装, 或启动 opendesk 后运行 `/upgrade` 命令选择 Nightly 版本来升级。

**桌面端**:
- [Windows x86 安装包](https://download.bitclub.ai/build/nightly/win/opendesk-win-x86-0.2.0-nightly-20260622.msi)
- [Harmony OS 安装包](https://download.bitclub.ai/build/nightly/ohos/opendesk-ohos-0.2.0-nightly-20260622.hap)
- [MacOS 安装包 (仅支持M系列芯片)](https://download.bitclub.ai/build/nightly/darwin/opendesk-darwin-0.2.0-nightly-20260622.dmg)

注: 鸿蒙安装包需要自己通过 [Deveco Studio](http://developer.huawei.com/consumer/cn/deveco-studio/) 或 [Auto-installer](https://github.com/likuai2010/auto-installer/) 手动签名后安装。
