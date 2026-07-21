---
title: "Evidence Card 省 Token, 可观测性集成，Goal 复杂任务目标追踪"
date: "2026-07-21T09:00:00+08:00"
category: "nightly-release"
version: "0.2.0-nightly-20260721"
downloads:
  cli: "npm i -g @bitclub.ai/opendesk-cli@0.2.0-nightly-20260721"
  windows:
    url: "https://download.bitclub.ai/build/nightly/win/opendesk-win-x86-0.2.0-nightly-20260721.msi"
    label: "Windows x86 安装包"
  harmonyos:
    url: "https://download.bitclub.ai/build/nightly/ohos/opendesk-ohos-0.2.0-nightly-20260721.hap"
    label: "HarmonyOS 安装包"
  darwin:
    url: "https://download.bitclub.ai/build/nightly/darwin/opendesk-darwin-0.2.0-nightly-20260721.dmg"
    label: "MacOS 安装包 (仅支持M系列芯片)"
---

# 2026.7.21 日构建更新内容

## ✨ 新功能

- 新增 Evidence Card 功能，可通过在模型请求结尾增加证据信息来大幅度降低 token 的使用 (当前在 SWE / TerminalBench 预期节省 80% 以上输入 tokens 和 40% 工具调用)。当前默认关闭，可在 Cli 和桌面版 的设置界面的 **任务设置** 中独立开启;
- 集成 OpenTelemetry 可观测性框架，支持在设置面板中配置 OpenTelemetry 相关参数，方便对 OpenDesk 运行行为进行追踪和分析;
- 引入任务目标跟踪功能，支持在 Cli 中通过 `/goal` 命令，或者在桌面版中直接点击 *创建目标* 来使用。该功能支持在任务执行过程中持续审计目标完成情况，并在未完成强制要求智能体继续执行任务;
- 支持任务列表的懒加载，减少内存占用;
- 新增 Ark Agent Plan 到 providers 列表;
- (Cli) 支持通过 `--resume` 选项从已有任务恢复执行，无需重新创建任务即可继续中断的工作;

## 🐞 优化与 Bug 修复

- 修复升级命令不稳定的问题，修复 shellExec 中 tty 交互问题;
- 修复 worker fetch 长连接导致 MCP Server 连接异常的问题;
- MCP 列表更新时保持滚动位置不变，避免列表刷新后跳转到顶部;
- 修复 Windows 下内联 `@` 文件搜索显示异常的问题;
- 在鸿蒙PC上，过滤 shell 命令执行中产生的 shell-init getcwd 警告;
- Skill 测试功能中新增可配置测试用例**超时时间**，默认为无限等待；CLI 中支持过滤和列出已挂载技能；
- Skill 安装时防止从 Registry 重复安装已存在的技能;
- (Cli) 修复 `/context` 命令导致的焦点捕获问题，创建任务视图增量渲染框提升渲染性能;
- (Cli) 修复鸿蒙 PC 上 PDF 解析失败的问题;
- (Cli) 修复 editFile 接受空 oldString 导致文件编辑异常的问题;
- (桌面端) 修复浏览器快照中缺失零字符（`\0`）导致内容截断的问题;
- (桌面端) 修复在任务级浏览器初始化的时间窗内，由于浏览器视图没有提及导致部分网站渲染错误的问题;
- (桌面端) 对所有 http 请求的 headers 进行统一编码过滤，避免由于 http 请求异常导致桌面端 crash;
- (桌面端) 支持**可切换的左侧侧边栏**，折叠时保留窄边栏区域作为快速入口，侧边栏宽度持久化保存;

## 下载

**Cli**: 在终端中运行 `npm i -g @bitclub.ai/opendesk-cli@0.2.0-nightly-20260721` 安装, 或启动 opendesk 后运行 `/upgrade` 命令选择 Nightly 版本来升级。

**桌面端**:
- [Windows x86 安装包](https://download.bitclub.ai/build/nightly/win/opendesk-win-x86-0.2.0-nightly-20260721.msi)
- [HarmonyOS 安装包](https://download.bitclub.ai/build/nightly/ohos/opendesk-ohos-0.2.0-nightly-20260721.hap)
- [MacOS 安装包 (仅支持M系列芯片)](https://download.bitclub.ai/build/nightly/darwin/opendesk-darwin-0.2.0-nightly-20260721.dmg)

注: 鸿蒙安装包需要自己通过 [Deveco Studio](http://developer.huawei.com/consumer/cn/deveco-studio/) 或 [Auto-installer](https://github.com/likuai2010/auto-installer/) 手动签名后安装。
