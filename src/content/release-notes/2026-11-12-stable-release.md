---
title: "OpenDesk 0.4.1：支持鸿蒙PC应用本地开发、优化消息渠道交互归属和沙箱稳定性修复"
date: "2026-11-12T12:00:00+08:00"
category: "stable-release"
version: "0.4.1"
downloads:
  cli: "npm install -g \"@bitclub.ai/opendesk-cli@0.4.1\""
  windows:
    x86:
      url: "https://gitcode.com/openharmony-robot/OpenDesk/releases/download/v0.4.1/opendesk-win-x86-0.4.1.exe"
      label: "Windows x86 安装包"
    arm64:
      url: "https://gitcode.com/openharmony-robot/OpenDesk/releases/download/v0.4.1/opendesk-win-arm64-0.4.1.exe"
      label: "Windows ARM64 安装包"
  harmonyos:
    url: "https://appgallery.huawei.com/app/detail?id=com.develop.opensource.ohpcd.opendesk&channelId=SHARE&source=appshare"
    label: "HarmonyOS 安装链接"
  macos:
    arm64:
      url: "https://gitcode.com/openharmony-robot/OpenDesk/releases/download/v0.4.1/opendesk-darwin-arm64-0.4.1.dmg"
      label: "macOS 安装包 (Apple 芯片)"
    x86:
      url: "https://gitcode.com/openharmony-robot/OpenDesk/releases/download/v0.4.1/opendesk-darwin-x86-0.4.1.dmg"
      label: "macOS 安装包 (Intel 芯片)"
summary: "任务的权限审批与 askUser 交互改为按发起轮次归属入口；技能加载后自动放行读取自身目录，外置技能目录按技能精确授权；插件安装期即校验宿主版本范围；测评渠道卡片支持直接更新与运行；并修复沙箱误杀进程树、命令启动卡死等多项稳定性问题"
---

# OpenDesk 0.4.1 正式版本更新内容

## 主要更新

相对于 0.3.10 版本，在 0.4.1 版本中我们完成了以下更新:

## 新功能

- 内置支持本机无线调试功能的命令 `hdcthis`, 从而支持在鸿蒙PC上开发本机应用, 在内置插件市场中上线了 *DevEco 鸿蒙开发* 插件，安装即可使用 `/harmonyos-dev` 技能快速开始开发;
- 技能目录与入口文件支持符号链接，通过链接共享的技能库可以正常安装与加载;
- 插件安装期支持校验宿主版本范围，插件通过声明 minOpenDeskVersion / maxOpenDeskVersion 来定义对于 OpenDesk 应用版本的要求，版本不满足时不允许用户安装插件;

## 其他问题修复

- 优化沙箱小文件读写性能，避免大型压缩包解压缓慢的问题并优化沙箱的用户提示;
- 优化消息渠道中多轮消息的交互去向，最近一次消息用户在哪里发起，交互提示就会推送到哪里;
- 修复任务变更面板行号显示错误的问题;
- 修复任务信息弹窗复制按钮的还原定时器泄漏问题;

## 如何升级

对于 Cli 版本，请运行 `npm install -g "@bitclub.ai/opendesk-cli@0.4.1"` 即可将当前 opendesk 升级到最新的稳定版本，或者进入 opendesk 之后，输入 `/upgrade` 命令即可。桌面端可直接在 [这里](/download/) 下载。
