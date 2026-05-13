---
layout: single
toc: true
title:  2026.3.23 日构建更新
date:   2026-03-23 09:00:00 +0800
classes: no-sidebar
categories: nightly-release
---

# 2026.3.23 日构建更新内容

## 新增功能

- 🌟支持一键扫码连接微信! 在[这里](https://opendesk.bitclub.ai/channels/weixin) 查看如何使用;
- 所有终端工具 (bash, zsh, powershell) 支持工具卡片内的流式输出，让复杂命令的执行过程对用户始终可见;
- 插件系统支持热更新，安装和配置飞书，微信等渠道插件不需要重新启动 OpenDesk 就可以生效了;
- 将智谱Coding Plan加入到默认模型提供商列表;

## 优化与 Bug 修复

- 修复插件兼容层 (Shim Layer) 中的一些稳定性问题;
- 修复 /fork 触发的由于 Toolcall 字段错误导致的崩溃问题;