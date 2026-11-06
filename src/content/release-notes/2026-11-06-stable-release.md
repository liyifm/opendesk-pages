---
title: "OpenDesk 0.3.10：快速截屏，自定义插件市场和全球化的定时任务优化"
date: "2026-11-06T12:00:00+08:00"
category: "stable-release"
version: "0.3.10"
downloads:
  cli: "npm install -g \"@bitclub.ai/opendesk-cli@0.3.10\""
  windows:
    x86:
      url: "https://gitcode.com/openharmony-robot/OpenDesk/releases/download/v0.3.10/opendesk-win-x86-0.3.10.exe"
      label: "Windows x86 安装包"
    arm64:
      url: "https://gitcode.com/openharmony-robot/OpenDesk/releases/download/v0.3.10/opendesk-win-arm64-0.3.10.exe"
      label: "Windows ARM64 安装包"
  harmonyos:
    url: "https://appgallery.huawei.com/app/detail?id=com.develop.opensource.ohpcd.opendesk&channelId=SHARE&source=appshare"
    label: "HarmonyOS 安装链接"
  macos:
    arm64:
      url: "https://gitcode.com/openharmony-robot/OpenDesk/releases/download/v0.3.10/opendesk-darwin-arm64-0.3.10.dmg"
      label: "macOS 安装包 (Apple 芯片)"
    x86:
      url: "https://gitcode.com/openharmony-robot/OpenDesk/releases/download/v0.3.10/opendesk-darwin-x86-0.3.10.dmg"
      label: "macOS 安装包 (Intel 芯片)"
summary: "新增测评应用，可下载测评集在 OpenDesk 中运行，评估当前设备平台和模型的任务解决能力; 定时任务支持时区、模型与推理强度配置及日历、间隔调度；新增 快速截屏快捷键、开机自启和插件市场机制；PPT 生成重构为原生演示程序执行；同时包含上下文压缩稳定性、沙箱与安装包等大量修复"
---

# OpenDesk 0.3.10 正式版本更新内容

## 主要更新

相对于 0.3.9 版本，在 0.3.10 版本中我们完成了以下更新:

## UI设计与用户体验优化

- 侧边栏任务列表支持多选，鼠标拖动框选与批量删除，也可按分组一键清理，收藏的任务不会被删除;
- 着重优化了触摸屏的使用体验，支持触屏拖动调整面板分隔位置，左滑删除任务等动作;
- 新增快速截屏能力，在鸿蒙和 Windows 平台下，按下 Alt+Space 即可框选屏幕区域，截图直接发送给当前任务;
- 优化对话界面消息复制, 重新发送等按钮的交互动效，避免产生误点击操作;

## 新功能

- 新增"测评"应用并构建了官方测评集市场，可以在任意模型和设备上快速运行流行的 Benchmark 并评估其任务完成能力，支持并发数配置和实时进度查看;
- 内置官方插件市场，未来与社区伙伴的合作和部分官方功能都将在插件市场中上线，实现更快的迭代;
- 在设置界面中新增渠道设置一栏，支持配置自定义的插件市场渠道和测评集下载渠道，并在文档中提供了构建自定义渠道的参考方法;
- 定时任务调度增强，单个任务可指定时区、模型与推理强度；新增指定日期，按间隔重复和 crontab 解析等三种触发方式，让专业用户和小白用户都更容易使用;
- 优化渠道消息的入站策略，支持固定会话，按时间创建新对话和智能分发三种模式;
- 支持开机自动启动 OpenDesk，该功能默认关闭，用户可在通用设置中按提示开启（OpenHarmony 平台需手动配置）;

## 其他问题修复

- 优化技能中心页面, Cli 技能中心新增内置技能视图，可用空格键快速启停; 桌面端技能管理支持批量启用/禁用;
- 优化邮箱的网络代理配置，现在邮箱的 SMTP / IMAP / POP3 连接均支持通过已配置的代理收发;
- 开启模型原始响应日志前需要确认隐私风险，应用重启后自动关闭，且不再记录 embedding 请求以避免过长的日志致使系统崩溃;
- 修复 Windows 动态沙箱损坏符号链接目标文件内容的问题;
- 优化浏览器控制，use-browser 技能新增 download 工具，用于下载网页文件;
- 修复 Linux 沙箱内运行 Electron 程序死锁、目录创建失败的问题;
- 优化安装包平台判断，不再允许 Windows 平台安装 Arm64 格式的安装包;
- OpenHarmony 平台改用 no-sandbox 模式运行 Electron;
- 修复 grep 扫描大目录导致的内存溢出; 修复日志流内存溢出;
- 优化 shell 类工具的输出编码，改为增量编码传输，长时间输出不再阻塞界面; 修复部分环境下输出解码偶发超时的问题;
- 超长 Markdown 文档改用更安全的分片解析策略，避免有问题的 Markdown 序列直接将界面卡死;
- 优化上下文压缩算法，对未知上下文窗口的模型自动学习安全预算，瞬时模型错误不再导致压缩中断;
- 优化 readFile 返回格式; 
- 修复 glob 工具文件名模式匹配错误;
- 修复目标模式下无法重发消息的问题;
- 修复带引号路径的任务导入失败; 任务导入遇到索引冲突时自动重试;
- pi-tui 改为独立的外部依赖，以避免在 Windows 下由于缺少 Native 库导致终端界面跳变的问题;
- 修复 opencode 客户端中会话标题不更新的问题;
- 修复 Windows 盘符根路径识别、扫描错误相互影响、多选与右键菜单状态异常等问题; 文件名搜索改为按文件名拆分匹配，结果更准确;
- 修复笔记应用中代码块输入、渲染与粘贴无法自动识别的问题，现在粘贴或输入 Markdown 代码块格式将自动转换;
- 旧版按 UTC 创建的定时任务改为按系统时区显示，并修复周期调度与时区锚点的问题;
- 统一各类 HTML 转义处理，修复特殊字符显示错误;
- 修复 Cli 打开文件时的潜在路径注入风险;
- Office 文档解析异常不再导致界面崩溃;
- 修复模型视觉能力图标切换显示错误; 修复 Markdown 代码块渲染出现空白区域的问题;
- 修复浏览器控制器与 CDP 会话在任务结束时未正确释放导致潜在资源泄漏的问题;
- 修复首页点击打开任务失败及任务列表高亮不同步的问题;
- 优化主界面启动速度，无需再等待全部应用初始化，即可相应用户的请求;

## 如何升级

对于 Cli 版本，请运行 `npm install -g "@bitclub.ai/opendesk-cli@0.3.10"` 即可将当前 opendesk 升级到最新的稳定版本，或者进入 opendesk 之后，输入 `/upgrade` 命令即可。桌面端可直接在 [这里](/download/) 下载。
