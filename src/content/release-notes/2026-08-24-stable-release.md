---
title: "OpenDesk 0.3.4：可扩展插件系统与后台任务悬浮窗"
date: "2026-08-24T12:00:00+08:00"
category: "stable-release"
version: "0.3.4"
downloads:
  cli: "npm install -g \"@bitclub.ai/opendesk-cli@0.3.4\""
  windows:
    url: "https://gitcode.com/openharmony-robot/OpenDesk/releases/download/v0.3.4/opendesk-win-x86-0.3.4.exe"
    label: "Windows x86 安装包"
  harmonyos:
    url: "https://appgallery.huawei.com/app/detail?id=com.develop.opensource.ohpcd.opendesk&channelId=SHARE&source=appshare"
    label: "HarmonyOS 安装链接"
  macos:
    url: "https://gitcode.com/openharmony-robot/OpenDesk/releases/download/v0.3.4/opendesk-darwin-arm64-0.3.4.dmg"
    label: "MacOS 安装包 (仅支持M系列芯片)"
summary: "发布全新OpenDesk插件系统与应用SDK；支持在后台以悬浮窗形式展示当前正在执行中的任务; 内嵌Office套件扩展至Word与Excel并接入任务视图AI编辑；支持为模型设置自定义推理配额；安全网关侧边栏集成与策略规则统一管理。"
---

# OpenDesk 0.3.4 正式版本更新内容

## 主要更新

相对于 0.3.3 版本，在 0.3.4 版本中我们完成了以下更新:

## UI设计与用户体验优化

- 在侧边栏收起时新增任务图标，可以快速打开任务菜单切换任务而不需要重新展开侧边栏;
- 在OpenDesk窗口进入后台的时候自动显示小窗预览当前任务的执行进度和开销，当前需要主动在设置界面中开启;
- 将应用菜单调整为简洁列表风格并重新设计任务图标，默认位置可在设置界面修改;

## 新功能

- 引入插件系统和相关插件开发的Skill，开发者可以在OpenDesk中对话为自己开发插件;
- 实现对话中通用的Tailcard机制，允许在LLM对话过程中注入尾部提示词来提升指令遵从能力;
- 支持在对话界面中自动识别常用文件类型，自动打开右侧预览界面;
- 在右侧预览界面中支持预览与编辑 Word, Excel文档和代码文件，支持代码高亮和折叠等基础功能;
- Use-harmony技能支持同时对多台鸿蒙设备进行自动化控制;
- 支持Cli版本通过环境变量配置模型;

## 其他问题修复

- 修复鸿蒙端系统环境代理识别能力，并自动将系统代理注入到所有shell命令执行;
- 修复模态弹窗状态下错误提醒被浮层遮挡用户不可见的问题;
- 优化推理块的渲染性能;
- 修复部分组件显示尚未适配深色模式的问题;
- 当用户在模态弹窗之外点击鼠标时，带有输入表单的模态弹窗不再自动关闭，减少用户误触；
- 修复使用glm-5.3时由于模型不支持关闭推理导致部分任务出现错误的问题;

## 如何升级

对于 Cli 版本，请运行 `npm install -g "@bitclub.ai/opendesk-cli@0.3.4"` 即可将当前 opendesk 升级到最新的稳定版本，或者进入 opendesk 之后，输入 `/upgrade` 命令即可。桌面端可直接在 [这里](/download/) 下载。
