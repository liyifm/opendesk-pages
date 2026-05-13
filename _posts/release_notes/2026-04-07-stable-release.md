---
layout: single
toc: true
title:  正式版本更新 0.2.0
date:   2026-04-07 09:00:00 +0800
classes: no-sidebar
categories: stable-release
---

# OpenDesk 0.2.0 正式版本更新内容

## 主要新增功能

相对于 0.1.x 版本，在 0.2.0 版本中我们正式支持了以下主要功能:

- 更全面的本地文件检索和编辑能力：支持通过 glob, grep 等工具进行文件路径和模式的搜索，同时模型可以使用多种格式的 patch 工具对文件进行局部修改;
- 以同步/异步方式使用 zsh/bash/powershell 等不同平台下的主流终端工具;
- 通过 `!` 进入内嵌 Shell 模式，在不离开 OpenDesk 的同时快速执行终端命令;
- 支持复杂任务的自主规划和子任务拆分，尽可能缩减上下文窗口使用的前提下提升任务完成能力;
- 通过 `skill` 子命令，自然语言提示等多种方式安装，修改和删除 Skills;
- 支持 [微信](/channels/weixin)和[飞书](/channels/weixin) 扫码一键接入;

为了评估 OpenDesk 相对于业界智能体的能力，我们在 0.2.0 版本完成了对 [TerminalBench 2.0](https://www.tbench.ai/) 的适配，在使用 glm-5 量化版本的情况下，得分在 *50(±2)* 左右，处于业界 top 水准。后续我们会适配 [SWE Bench](https://www.swebench.com/), 进一步评估 OpenDesk 在复杂项目开发场景下的能力。

## 如何升级

运行 `npm install -g "@bitclub.ai/opendesk-cli"` 即可将当前 opendesk 升级到最新的稳定版本，或者进入 opendesk 之后，输入 `/upgrade` 命令并选择升级到 Stable(稳定版本) 确认即可。

## 后续开发计划

当前团队正在开发中，计划将在下一个稳定版本上线的功能包括：

- 支持 `/plan` 在内的多种模式;
- 通过用户无需感知的自动上下文多级压缩，实现单个任务的无限上下文;
- 细粒度可配置的安全上下文，支持静态和动态的的权限声明;
- 与 cli 同步发布的 Windows 桌面版 OpenDesk 客户端;