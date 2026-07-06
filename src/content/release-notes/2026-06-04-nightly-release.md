---
title: "环境变量、搜索引擎配置与技能测试"
date: "2026-06-04T09:00:00+08:00"
category: "nightly-release"
---

# 2026.6.4 日构建更新内容

## ✨ 新功能

- 支持在设置界面中配置环境变量，这些环境变量将在所有 Shell 工具调用中自动生效;
- 重构搜索引擎系统，在设直界面中支持图形化配置搜索引擎，增加了免费的百度搜索和 DBLP 论文搜索能力;
- (Cli) 在 `/switch` 任务切换界面中支持关键字搜索;
- (桌面端) 支持技能中心中设置技能的启用/禁用情况;
- (桌面端) 技能中心支持技能批量导入, 内置技能分析与测试界面，可以在当前平台上对已安装的技能进行批量自动化测试;
- (桌面端) 支持浏览器配置自定义 User-Agent;
- (桌面端) 在鸿蒙PC上支持语音输入，使用鸿蒙端侧ASR能力;

## 🐞 优化与 Bug 修复

- 增加了中止性判断的“快速路径”，当模型输出的最后一句话能够匹配常见异常终止模式 (如以`让我`开头, 或以`,`, `、`等非中止标点结尾的情况) 不再用大模型进行终止性检测，而是直接要求Agent继续执行，提升任务执行的连续性;
- (Cli) 提升了配置文件容错，当用户删除了当前配置的模型或供应商时不再直接报错退出，而是清空当前模型并要求用户到设置界面中重新配置;
- (桌面端) 优化了在鸿蒙PC上的默认字体设置，总是使用鸿蒙黑体取代微软雅黑;

## 下载

**Cli**: 在终端中运行 `npm i -g "@bitclub.ai/opendesk-cli@0.2.0-nightly-20260604` 安装, 或启动 opendesk 后运行 `/upgrade` 命令来升级。

**桌面端**:
- [Windows x86 安装包](https://download.bitclub.ai/build/nightly/win/opendesk-win-x86-0.2.0-nightly-20260604.msi)
- [Harmony OS 安装包](https://download.bitclub.ai/build/nightly/ohos/opendesk-ohos-0.2.0-nightly-20260604.hap)
- [MacOS 安装包 (仅支持M系列芯片)](https://download.bitclub.ai/build/nightly/darwin/opendesk-darwin-0.2.0-nightly-20260604.dmg)

注: 鸿蒙安装包需要自己通过 [Deveco Studio](http://developer.huawei.com/consumer/cn/deveco-studio/) 或 [Auto-installer](https://github.com/likuai2010/auto-installer/) 手动签名后安装。
