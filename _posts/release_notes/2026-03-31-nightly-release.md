---
layout: single
toc: true
title:  2026.3.31 日构建更新
date:   2026-03-31 09:00:00 +0800
classes: no-sidebar
categories: nightly-release
---

# 2026.3.31 日构建更新内容

## 新增功能

- 支持 bash, zsh, powershell 等所有内置终端的异步执行，在设定的超时结束后自动切换到后台，由 Agent 来根据终端的状态判断应该继续执行还是强制关闭;
- 支持 Skill 环境变量及上下文隔离，可以从 .env 中载入 Per-Skill 的环境变量信息，同时支持在不同任务之间的环境变量进行隔离，降低信息泄露风险;

## 优化与 Bug 修复

- 修复 -v/--version 时没有正确输出版本的问题;