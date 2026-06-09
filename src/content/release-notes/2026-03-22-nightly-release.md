---
title: "2026.3.22 日构建更新"
date: "2026-03-20T13:00:05+08:00"
category: "nightly-release"
---

# 2026.3.22 日构建更新内容

## 新增功能

- 增加 `/undo` 和 `/redo` 命令，支持在对话中直接回退一定数量的消息，也可以恢复已经回退的消息;
- 增加了 grep 和 glob 工具，现在可以对代码仓库进行更复杂的文件检索了;
- 支持在输入框中输入 `@` 后进行文件路径的自动补全;

    <img src="/assets/images/manual/input-file-completion.gif" alt="auto-completion" />

- 子任务管理方面，
    - 支持通过工具向子任务追加消息，方便对复杂的子任务进行复用;
    - 支持通过 `/stop` 直接停止子任务，此时主任务可以继续执行;
- 支持 openclaw 基于 websocket 的 node 协议，支持将 openclaw 的 node 无缝接入 opendesk 生态;

## 优化与 Bug 修复

- 优化 attemptCompletion 工具的提示词，并默认隐藏在模型不主动结束对话时系统给予模型的提示，避免让用户感到迷惑;
- 修复新版本飞书插件无法发送文件的问题，支持用户在使用 opendesk 时升级到最新的飞书插件;
- 对于所有终端工具 (Bash, Zsh, Powershell) 增加默认超时，避免部分异常命令卡住整体任务;
