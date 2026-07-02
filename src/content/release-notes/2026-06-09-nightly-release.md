---
title: "节点执行、独立窗口与深色模式"
date: "2026-06-09T09:00:00+08:00"
category: "nightly-release"
---

# 2026.6.9 日构建更新内容

## ✨ 新功能

- 支持将文件读写和shell命令在节点执行，在[这里](https://gitcode.com/openharmony-robot/OpenDesk/blob/main/docs/examples/node/node_headless.py)提供了无头节点的源码(例如，鸿蒙PC用户可以在融合开发引擎中运行无头节点接入OpenDesk，从而将鸿蒙原生侧当前无法使用的命令/三方库等调度到融合开发引擎中执行);
- 支持在设置界面中配置节点网关的监听端口和IP地址;
- (桌面端) 支持将应用以独立窗口的形式打开（右键点击应用图标即可）;
- (桌面端) 支持感知系统的颜色主题，自适应调整深色模式;

## 🐞 优化与 Bug 修复

- 优化工具调用的容错机制，面向 Deepseek-v4 和 Qwen 3.5/3.6 系列常见的工具拼写错误进行了自动修复，提升工具调用的成功率;
- 修复工具调用参数为空可能导致400错误的问题;
- 修复 Skill 无法用自然语言安装的问题，支持直接在对话过程中让 agent 查询主流 skill 市场并安装所需要的 skill;
- 修复删除 Skill 时小概率出现的由于路径命名冲突而无法删除的问题;

## 下载

**Cli**: 在终端中运行 `npm i -g @bitclub.ai/opendesk-cli@0.2.0-nightly-20260609` 安装, 或启动 opendesk 后运行 `/upgrade` 命令来升级。

**桌面端**:
- [Windows x86 安装包](https://download.bitclub.ai/build/nightly/win/opendesk-win-x86-0.2.0-nightly-20260609.msi)
- [Harmony OS 安装包](https://download.bitclub.ai/build/nightly/ohos/opendesk-ohos-0.2.0-nightly-20260609.hap)
- [MacOS 安装包 (仅支持M系列芯片)](https://download.bitclub.ai/build/nightly/darwin/opendesk-darwin-0.2.0-nightly-20260609.dmg)

注: 鸿蒙安装包需要自己通过 [Deveco Studio](http://developer.huawei.com/consumer/cn/deveco-studio/) 或 [Auto-installer](https://github.com/likuai2010/auto-installer/) 手动签名后安装。
