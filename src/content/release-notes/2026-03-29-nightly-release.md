---
title: "无头模式与 Skill 导出"
date: "2026-03-29T09:00:00+08:00"
category: "nightly-release"
---

# 2026.3.29 日构建更新内容

## 新增功能

- 支持无头模式运行，通过 `--headless` 选项触发，如 `opendesk -c "do something" --headless`
    - 无头模式下不会流式渲染复杂的 tui，仅仅将基础的工具调用步骤和结果打印到 stdout
    - 通过无头模式, 可以让 opendesk 能够更容易与其他工具和脚本进行整合, 而无需处理大量 tui 的控制字符串;
- 支持通过 /skillName 手动引用技能，并且支持在 skill frontmatter 中声明 disable-model-invocation 和 user-invocable 字段;
- 支持通过 /export skill skillName 来导出 skill 的 zip 压缩包;

## 优化与 Bug 修复

- 修复流式输出时小概率出现尾段无法被渲染的问题;
