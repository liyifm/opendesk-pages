---
title: "MCP Registry、记忆与智能文件系统"
date: "2026-06-17T09:00:00+08:00"
category: "nightly-release"
---

# 2026.6.17 日构建更新内容

## ✨ 新功能

- 增加模型分类，对于聊天模型和嵌入模型使用不同的校验策略;
- 支持自动重试功能, 在任务进行过程中如果LLM失败会自动重试，支持指数退避策略，在重试过程中用户可以主动切换模型;
- 支持文件读取判重功能，对于已经进入上下文且未发生改变的文件避免反复读取，整体可以减少约 20% Token 用量 (在 terminal-bench 上评测);
- (Cli) 增加 opendesk serve 服务模式，可以通过 http server 形态启动并整合到其他 Agent 应用中，当前支持 OpenCode 服务协议;
- (桌面端) 增加 MCP Registry 的接入，可以直接在桌面端中从 OpenHarmony Matrix 和 ModelScope 安装 MCP 服务;
- (桌面端) 启用记忆功能，支持个人用户画像，工作区记忆和全局事实记忆，可以在左下角记忆面板中进行管理;
- (桌面端) 启用智能文件系统功能，支持在本机任意选择目录纳入智能文件系统管理，可以对文件内容进行向量化和分块索引，在对话涉及本地知识内容的时候自动查找相应文件并基于文件回答问题;
- (桌面端) 增加开发者模式，将Agent生成分内部任务与用户发起的任务区分开来，内部任务仅在开发者模式可以看到;

## 🐞 优化与 Bug 修复

- 修复删除已在对话中使用的模型导致tui/gui崩溃的问题;
- 在鸿蒙平台上禁用NodeJS的JIT以确保不会因为安全策略而导致崩溃;
- (桌面端) 支持工作空间选择界面选择隐藏目录;
- (桌面端) 修复浏览器Tab键焦点切换无效的问题;
- (桌面端) 通过CSS拆分等手段优化图形界面启动速度;
- (桌面端) 修复技能分析面板导入技能失败的问题，并适配更多技能zip文件的格式;
- (桌面端) 修复在用户使用自定义headers的情况下模型可达性验证失败的问题;
- (桌面端) 优化界面在深色模式下的渲染表现;
- (桌面端) 修复鸿蒙PC上状态栏图标出现多个退出按钮的问题;

## 下载

**Cli**: 在终端中运行 `npm i -g @bitclub.ai/opendesk-cli@0.2.0-nightly-20260617` 安装, 或启动 opendesk 后运行 `/upgrade` 命令来升级。

**桌面端**:
- [Windows x86 安装包](https://download.bitclub.ai/build/nightly/win/opendesk-win-x86-0.2.0-nightly-20260617.msi)
- [Harmony OS 安装包](https://download.bitclub.ai/build/nightly/ohos/opendesk-ohos-0.2.0-nightly-20260617.hap)
- [MacOS 安装包 (仅支持M系列芯片)](https://download.bitclub.ai/build/nightly/darwin/opendesk-darwin-0.2.0-nightly-20260617.dmg)

注: 鸿蒙安装包需要自己通过 [Deveco Studio](http://developer.huawei.com/consumer/cn/deveco-studio/) 或 [Auto-installer](https://github.com/likuai2010/auto-installer/) 手动签名后安装。
