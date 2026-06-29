---
title: "2026.6.29 日构建更新"
date: "2026-06-29T09:00:00+08:00"
category: "nightly-release"
---

# 2026.6.29 日构建更新内容

## ✨ 新功能

- 通过 stdio 运行的本地 MCP Server 支持每个 Server 独立的环境变量管理;
- (桌面端) 在将文件拖入对话框时，支持更多文件格式并在无法直接解析时将文件的完整路径粘贴到输入框中，本次修改新增对于 (.xls, .doc, .csv, .ofd, .rtf) 等格式的支持;

## 🐞 优化与 Bug 修复

- 修复 editFile 替换不存在的字符串时，给 Agent 返回错误不明显导致 Agent 误判的问题；
- 优化 grepFile 和 globFile 的匹配逻辑，更加贴近 ripgrep 的行为模式;
- (Cli) 增加显示设置板块，支持在设置界面中修改思考块的显示策略，并将默认显示策略修改为仅显示思考块的最新生成内容，以缓解思考内容过长时带来的闪屏问题;
- (Cli) 重构弹窗 Overlay 的外观，改为紧贴输入框的全宽度窗口，避免由于部分中文字体宽度设置问题导致弹窗形状不稳定的问题;
- (Cli) OpenCode 兼容服务支持透传 headers 来进行身份认证;
- (桌面端) 更新 OpenDesk 桌面端应用图标;
- (桌面端) 优化技能中心中，批量技能分析与自动化测试时的性能，减少内存占用;
- (桌面端) 恢复 json 格式配置导入导出功能，合并到设置界面的通用设置板块中;
- (桌面端) 提供常驻的"仅保存"界面，用户总是可以直接选择保存模型跳过验证环节;
- (桌面端) 优化任务界面中 Markdown 格式的渲染效果，和设置界面的配色风格;
- (桌面端) 修复AI文件系统偶然性启动失败的问题，强化在使用 ArkData 数据库时的容错能力;
- (桌面端) 在发送消息且模型尚未回复的情况下增加动画提示，让用户感知模型的状态;
- (桌面端) 为所有工具提供了统一的错误信息展示机制，点击失败的工具即可在下方展开详细错误原因;
- (桌面端) 修复定时任务触发后，该任务的卡片在自动化任务界面中显示异常的问题;

## 下载

**Cli**: 在终端中运行 `npm i -g @bitclub.ai/opendesk-cli@0.2.0-nightly-20260629` 安装, 或启动 opendesk 后运行 `/upgrade` 命令选择 Nightly 版本来升级。

**桌面端**:
- [Windows x86 安装包](https://download.bitclub.ai/build/nightly/win/opendesk-win-x86-0.2.0-nightly-20260629.msi)
- [Harmony OS 安装包](https://download.bitclub.ai/build/nightly/ohos/opendesk-ohos-0.2.0-nightly-20260629.hap)

注: 鸿蒙安装包需要自己通过 [Deveco Studio](http://developer.huawei.com/consumer/cn/deveco-studio/) 或 [Auto-installer](https://github.com/likuai2010/auto-installer/) 手动签名后安装。
