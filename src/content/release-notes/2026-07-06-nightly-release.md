---
title: "任务开销统计，流式输出优化，编辑器重构"
date: "2026-07-06T09:00:00+08:00"
category: "nightly-release"
version: "0.2.0-nightly-20260706"
downloads:
  cli: "npm i -g @bitclub.ai/opendesk-cli@0.2.0-nightly-20260706"
  windows:
    url: "https://download.bitclub.ai/build/nightly/win/opendesk-win-x86-0.2.0-nightly-20260706.msi"
    label: "Windows x86 安装包"
  harmonyos:
    url: "https://download.bitclub.ai/build/nightly/ohos/opendesk-ohos-0.2.0-nightly-20260706.hap"
    label: "HarmonyOS 安装包"
  darwin:
    url: "https://download.bitclub.ai/build/nightly/darwin/opendesk-darwin-0.2.0-nightly-20260706.dmg"
    label: "MacOS 安装包 (仅支持M系列芯片)"
summary: "编辑器从 Monaco 迁移至 Ace、华为云模型支持、个人中心等多项改进。"
---

# 2026.7.6 日构建更新内容

## ✨ 新功能

- 在模型配置中，新增 Nvidia NIM 和 华为云 MaaS 支持;
- (Cli) 在任务状态栏中显示任务名称, 支持通过 /rename 对任务进行重命名;
- (桌面端) 新增个人中心界面，支持本地遥测信息收集与展示，展示任务和模型的 token 消耗量统计;

## 🐞 优化与 Bug 修复

- 重构模型上下文自动检测, 补全市面上最新模型的上下文长度数据，并为未知模型添加 128K 上下文的兜底策略;
- 修复任务命名时和上下文压缩时由于模型不支持非流式输出导致错误的问题，在流式请求失败时自动回退到流式补全;
- 子任务不再计入用户画像分析和记忆;
- 优化任务自纠错逻辑，在大模型主动提问时，即便当前有未完成的待办事项也允许暂时停止任务;
- 修复 OpenAI 流式协议，支持解析文本/工具调用交错的数据包，修复部分供应商 glm-5.1/5.2 工具调用连续出错的问题;
- 非交互类任务 (定时任务, 通过微信/飞书等消息渠道发起的任务) 不再允许调用 askUser 工具，避免由于交互等待让任务卡住;
- (桌面端) Matrix 技能市场支持区分鸿蒙兼容技能与普通技能;
- (桌面端) 优化桌面端字体，使用鸿蒙黑体作为全平台默认字体;
- (桌面端) 优化 webFetch 工具，在无法获取到页面内容时回退到内置浏览器打开获取 snapshot;
- (桌面端) 任务消息支持延迟加载，提升长任务场景下的界面性能;
- (桌面端) 编辑器从 Monaco 重构为 Ace，修复部分字体渲染和宽度计算问题;

## 下载

**Cli**: 在终端中运行 `npm i -g @bitclub.ai/opendesk-cli@0.2.0-nightly-20260706` 安装, 或启动 opendesk 后运行 `/upgrade` 命令选择 Nightly 版本来升级。

**桌面端**:
- [Windows x86 安装包](https://download.bitclub.ai/build/nightly/win/opendesk-win-x86-0.2.0-nightly-20260706.msi)
- [HarmonyOS 安装包](https://download.bitclub.ai/build/nightly/ohos/opendesk-ohos-0.2.0-nightly-20260706.hap)
- [MacOS 安装包 (仅支持M系列芯片)](https://download.bitclub.ai/build/nightly/darwin/opendesk-darwin-0.2.0-nightly-20260706.dmg)

注: 鸿蒙安装包需要自己通过 [Deveco Studio](http://developer.huawei.com/consumer/cn/deveco-studio/) 或 [Auto-installer](https://github.com/likuai2010/auto-installer/) 手动签名后安装。

![telemetry](/assets/images/profile/telemetry.png)