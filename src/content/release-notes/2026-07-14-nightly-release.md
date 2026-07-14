---
title: "工具调用死循环防护，多种自定义任务设置和显示模式"
date: "2026-07-14T09:00:00+08:00"
category: "nightly-release"
version: "0.2.0-nightly-20260714"
downloads:
  cli: "npm i -g @bitclub.ai/opendesk-cli@0.2.0-nightly-20260714"
  windows:
    url: "https://download.bitclub.ai/build/nightly/win/opendesk-win-x86-0.2.0-nightly-20260714.msi"
    label: "Windows x86 安装包"
  harmonyos:
    url: "https://download.bitclub.ai/build/nightly/ohos/opendesk-ohos-0.2.0-nightly-20260714.hap"
    label: "HarmonyOS 安装包"
  darwin:
    url: "https://download.bitclub.ai/build/nightly/darwin/opendesk-darwin-0.2.0-nightly-20260714.dmg"
    label: "MacOS 安装包 (仅支持M系列芯片)"
summary: "推理内容气泡展示、工具调用死循环防护、CLI 依赖精简、TUI 迁移、多项稳定性修复。"
---

# 2026.7.14 日构建更新内容

## ✨ 新功能

- 在设置界面的 `任务设置` 中支持手动开关自动任务命名和终止性检查，对于使用端侧模型或者边缘算力的使用者而言，手动关闭这两项有利于KV缓存的利用效率，避免缓存失效导致模型响应速度过慢;
- 新增全局网络配置选项，可自由选择继承全局代理/自定义代理，支持全局配置跳过 SSL 证书校验;
- 新增工具调用死循环防护，通过历史去重检查和最大调用次数限制，防止模型陷入重复调用死循环;
- (桌面端) 支持内连/气泡两种推理块展示模式，模型的思考/推理过程以气泡形式展示，支持折叠与展开;

## 🐞 优化与 Bug 修复

- 任务的工作空间与全局的默认工作空间解耦, 支持为每个任务单独切换工作空间而不影响其他任务;
- 修复 SSE 格式 MCP Server 无法正常获取工具列表的问题;
- 修复 webFetch 在访问部分网站时 HTTP 状态码超出合法范围时导致崩溃的问题;
- 修复部分模型 API 在同一个请求中返回多个 Index 相同的工具调用导致误合并的问题;
- (Cli) 修复部分模型输出的 `</think>` 块无法被自动解析为推理块的问题;
- (Cli) pi-tui 依赖从 @mariozechner/pi-tui 迁移至 @earendil-works/pi-tui，优化 tui 性能;
- (Cli) 修复在存在代理环境下，搜索功能可能因为证书校验错误而无法正常联网的问题;
- (Cli) OpenCode 兼容服务适配工具调用的自定义渲染;
- (桌面端) 修复 PowerShell 路径查找问题：当系统中未安装 PowerShell 时不再报错，同时修复路径环境变量缺失;
- (桌面端) 修复 Windows 11 最新版本上磁盘信息获取错误的问题;
- (桌面端) 修复 PowerShell UTF-8 输出解码错误导致的乱码问题;
- (桌面端) 优化 Powershell/Zsh/Bash 工具调用渲染逻辑，避免调用过程中产生前端界面闪烁;
- (桌面端) 移除部分CSS动画，优化性能，降低 CPU 占用率;
- (桌面端) AI文件系统批量删除改为分批执行，优化扫描过程中的响应，提升UI体验;

## 下载

**Cli**: 在终端中运行 `npm i -g @bitclub.ai/opendesk-cli@0.2.0-nightly-20260714` 安装, 或启动 opendesk 后运行 `/upgrade` 命令选择 Nightly 版本来升级。

**桌面端**:
- [Windows x86 安装包](https://download.bitclub.ai/build/nightly/win/opendesk-win-x86-0.2.0-nightly-20260714.msi)
- [HarmonyOS 安装包](https://download.bitclub.ai/build/nightly/ohos/opendesk-ohos-0.2.0-nightly-20260714.hap)
- [MacOS 安装包 (仅支持M系列芯片)](https://download.bitclub.ai/build/nightly/darwin/opendesk-darwin-0.2.0-nightly-20260714.dmg)

注: 鸿蒙安装包需要自己通过 [Deveco Studio](http://developer.huawei.com/consumer/cn/deveco-studio/) 或 [Auto-installer](https://github.com/likuai2010/auto-installer/) 手动签名后安装。