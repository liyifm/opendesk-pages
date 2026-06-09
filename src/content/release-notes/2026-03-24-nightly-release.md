---
title: "2026.3.24 日构建更新"
date: "2026-03-24T09:00:00+08:00"
category: "nightly-release"
---

# 2026.3.24 日构建更新内容

## 新增功能

- 支持输入 `!` 进入内嵌 Shell 模式，在此模式下可以快速执行 Shell 命令而不必经过大模型，同时可以通过 cd 等命令来快速切换工作空间。Shell 模式下支持按 Tab 对路径等进行自动补全;
- 支持与 claude code 类似的 /btw 功能，在不影响当前任务的情况下进行简单的快速问答;

<img src="/assets/images/manual/shell-mode.gif" alt="shell-mode" />

## 优化与 Bug 修复

- 修复 webFetch 工具无法继承当前系统代理服务器的问题;
- 完善 Shim Layer 以兼容 OpenClaw 3.23 发布的新 Plugin SDK;

## 开发者特性

- 支持通过 --dump-logs 来导出系统日志 (让 Agent 更容易观测 OpenDesk 的内部状态，方便开发者使用 Coding Agent 辅助 OpenDesk 的功能开发)
