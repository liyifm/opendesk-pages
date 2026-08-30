---
title: "OpenDesk 0.3.5：内置反馈渠道，插件系统支持子Agent和浏览器Hint注册"
date: "2026-08-30T12:00:00+08:00"
category: "stable-release"
version: "0.3.5"
downloads:
  cli: "npm install -g \"@bitclub.ai/opendesk-cli@0.3.5\""
  windows:
    url: "https://gitcode.com/openharmony-robot/OpenDesk/releases/download/v0.3.5/opendesk-win-x86-0.3.5.exe"
    label: "Windows x86 安装包"
  harmonyos:
    url: "https://appgallery.huawei.com/app/detail?id=com.develop.opensource.ohpcd.opendesk&channelId=SHARE&source=appshare"
    label: "HarmonyOS 安装链接"
  macos:
    url: "https://gitcode.com/openharmony-robot/OpenDesk/releases/download/v0.3.5/opendesk-darwin-arm64-0.3.5.dmg"
    label: "MacOS 安装包 (仅支持M系列芯片)"
summary: "插件系统全面增强：支持插件注册Agent、结构化命令参数、浏览器操作提示与命令结果对话框；新增内置反馈通道与心跳上报；支持为单个模型单独配置推理超时；修复OpenHarmony打包依赖裁剪与多项稳定性问题。"
---

# OpenDesk 0.3.5 正式版本更新内容

## 主要更新

相对于 0.3.4 版本，在 0.3.5 版本中我们完成了以下更新:

## UI设计与用户体验优化

- 任务状态悬浮窗不再展示子任务，仅显示顶层任务，列表更简洁;
- 新增内置用户反馈通道，在左下角点击反馈按钮可以快速提交功能建议或 Bug 反馈，并支持附带系统日志与当前任务文件，在 cli 版本中同样可以通过 /feedback 命令触发此功能;

## 新功能

- 支持在插件中注册自定义 Agent，注册后的 Agent 与内置 Agent 一样可以被对话调度使用，插件开发者可借此扩展 OpenDesk 的智能体能力;
- 插件系统支持注册浏览器操作提示（Browser Hints），插件开发者可以通过该机制为特定页面声明操作提示 (TextHint) 和快捷动作 (ActionHint);
- 插件命令支持结构化参数声明（参数类型、默认值与校验规则），并在 GUI 与 TUI 中提供对应的参数提示与补全;
- 新增内置 hm-compat 插件，为 ohpcd 鸿蒙仓库自动注入所需环境变量;
- 支持为单个模型单独配置推理超时时间，可在设置界面的模型编辑中设置，避免不同模型共用一套超时策略导致上下文较长时产生超时误判;

## 其他问题修复

- 修复 OpenHarmony 打包时运行时依赖被错误裁剪导致功能缺失的问题，新增依赖裁剪与校验脚本;
- 修复内置插件在鸿蒙系统下的加载路径错误的问题;
- 修复Evidence Card启用时导致部分任务精度退化的问题;

## 如何升级

对于 Cli 版本，请运行 `npm install -g "@bitclub.ai/opendesk-cli@0.3.5"` 即可将当前 opendesk 升级到最新的稳定版本，或者进入 opendesk 之后，输入 `/upgrade` 命令即可。桌面端可直接在 [这里](/download/) 下载。
