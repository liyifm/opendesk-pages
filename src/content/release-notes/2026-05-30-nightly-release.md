---
title: "节点文件发送、内置技能与浏览器证书"
date: "2026-05-30T09:00:00+08:00"
category: "nightly-release"
---

# 2026.5.30 日构建更新内容

## ✨ 新功能

- 支持在节点 (Node) 连接到 OpenDesk Gateway 时，使用工具发送文件 (之前该功能仅在消息渠道中支持);
- (桌面端) 支持在 OpenDesk 内置浏览器中导入根证书
- (桌面端) 在技能中心中加入内置技能界面，展示所有 OpenDesk 内置技能以及技能携带的工具列表

## 🐞 优化与 Bug 修复

- 优化了 System Prompt 中日期与时间的出现位置，提升 Agent 对于 "最近, 今年" 等时间相关描述的理解能力;
- (桌面端) 优化了浏览器应用和内置浏览器的标签页设计，使其风格更加简洁美观;
- (桌面端) 优化 embedBrowserUse 设计，所有浏览器操作支持操作后立刻进行快照，将原来两步操作合二为一，从而大幅提升浏览器操控速度;
- (桌面端) 修复了输入 "@" 加部分路径时，无法触发自动补全的问题;

## 下载

**Cli**: 在终端中运行 `npm i -g "@bitclub.ai/opendesk-cli@0.2.0-nightly-20260530` 安装, 或启动 opendesk 后运行 `/upgrade` 命令来升级。

**桌面端**:
- [Windows x86 安装包](https://download.bitclub.ai/build/nightly/win/opendesk-win-x86-0.2.0-nightly-20260530.msi)
- [Harmony OS 安装包](https://download.bitclub.ai/build/nightly/ohos/opendesk-ohos-0.2.0-nightly-20260530.hap)

注: 鸿蒙安装包需要自己通过 [Deveco Studio](http://developer.huawei.com/consumer/cn/deveco-studio/) 或 [Auto-installer](https://github.com/likuai2010/auto-installer/) 手动签名后安装。
