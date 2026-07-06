---
title: "模型切换命令与浏览器 ARIA 快照"
date: "2026-05-22T09:00:00+08:00"
category: "nightly-release"
---

# 2026.5.22 日构建更新内容

## 新功能

- (Cli) 新增 /model 命令用于模型选择
- (桌面端) 在 BrowserUse 中生成无障碍树时跳过不可见元素
- (桌面端) 支持在浏览器应用中通过调试菜单导出 ARIA 快照

## Bug 修复

- (Cli) 修复当屏幕宽度较窄时可能导致 UI 崩溃的问题
- (桌面端) 修复任务计划，askUser等工具的提示意外出现在其他不相关任务中的问题

## 下载

**Cli**: `npm i -g "@bitclub.ai/opendesk-cli@nightly`

**桌面端**:
- [Windows x86 安装包](https://download.bitclub.ai/build/nightly/win/opendesk-win-x86-0.2.0-nightly-20260522.msi)
- [Harmony OS 安装包](https://download.bitclub.ai/build/nightly/ohos/opendesk-ohos-0.2.0-nightly-20260522.hap)

注: 鸿蒙安装包需要自行通过 [Deveco Studio](http://developer.huawei.com/consumer/cn/deveco-studio/) 或 [Auto-installer](https://github.com/likuai2010/auto-installer/) 签名安装。
