---
title: "2026.7.3 日构建更新"
date: "2026-07-03T09:00:00+08:00"
category: "nightly-release"
---

# 2026.7.3 日构建更新内容

## ✨ 新功能

- 在无头模式下支持使用 `--task-name` 指定任务的名称，跳过自动命名;
- 支持为每个自动化任务配置独立的工作空间;
- (Cli) 支持继承用户的 venv 和 conda 环境配置;
- (Cli) 支持 `opendesk skill test` 技能分析与测试工具;
- (桌面端) 在实验性特性中支持端侧安全网关功能，在设置界面中启用试验性特性后开启，可以对 OpenDesk 的行为进行安全审计和用户提醒;

## 🐞 优化与 Bug 修复

- 修复连接模型 API 时未正确识别代理的问题；
- 修复对部分模型服务无法识别 reasoning block 的问题;
- 修复 OpenCode 兼容服务中上下文压缩和任务重命名失败的问题;
- (桌面端) 优化 HNSW 索引和 AI 文件系统的稳定性;
- (桌面端) 在浏览器控制时，下载内容会自动进入工作空间的 Download 目录，不再弹窗提示用户打断自动任务执行;
- (桌面端) 修复首次启动应用窗口尺寸异常的问题;
- (桌面端) 修复在非交互任务（如定时任务，通过微信/飞书发起的任务）中调用 askUser 类交互工具导致任务流程卡住的问题;

## 下载

**Cli**: 在终端中运行 `npm i -g @bitclub.ai/opendesk-cli@0.2.0-nightly-20260703` 安装, 或启动 opendesk 后运行 `/upgrade` 命令选择 Nightly 版本来升级。

**桌面端**:
- [Windows x86 安装包](https://download.bitclub.ai/build/nightly/win/opendesk-win-x86-0.2.0-nightly-20260703.msi)
- [Harmony OS 安装包](https://download.bitclub.ai/build/nightly/ohos/opendesk-ohos-0.2.0-nightly-20260703.hap)
- [MacOS 安装包 (仅支持M系列芯片)](https://download.bitclub.ai/build/nightly/darwin/opendesk-darwin-0.2.0-nightly-20260703.dmg)

注: 鸿蒙安装包需要自己通过 [Deveco Studio](http://developer.huawei.com/consumer/cn/deveco-studio/) 或 [Auto-installer](https://github.com/likuai2010/auto-installer/) 手动签名后安装。
