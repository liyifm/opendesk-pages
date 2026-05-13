---
layout: single
title: Opendesk Cli | 快速开始
permalink: /docs/quickstart/cli
sidebar:
  nav: "docs"
toc: true
toc_label: 目录
toc_sticky: true
---

## 1. 在命令行中使用 OpenDesk

OpenDesk同时具备命令行 (Shell Agent) 形态和独立应用形态。对于开发者和很多专业用户而言，命令行是一种更加高效的运行方式。本章节介绍如何在各种平台上快速安装和使用OpenDesk。

### 1.1. 安装NodeJS运行环境 {#nodejs}

#### 在鸿蒙PC上安装NodeJS

鸿蒙PC的应用市场中，有生态开发者提供了NodeJS的运行时安装包。你可以打开应用市场(AppGallery)搜索DevNode-OH安装即可。安装完成后关闭终端应用重新打开，输入`node`进行测试:

```shell
localhost ~ % node -v
v24.13.0
```

![harmonyos devnode](/assets/images/quickstart/hmdevnode.png)

安装完 DevNode 之后，打开终端应用，运行

```
echo 'export PATH=$(npm prefix -g)/bin:$PATH' >> $HOME/.zshrc
```

这一步是为了将 NodeJS 安装的所有命令的路径放到 PATH 中，让后续的 `opendesk` 命令可以正常执行下去。

#### 在其他平台上安装NodeJS

- Windows平台可以通过 [nvm-windows](https://github.com/coreybutler/nvm-windows) 安装
- MacOS/Linux平台可以通过 [nvm](https://github.com/nvm-sh/nvm) 安装

### 1.2. 通过 npm 安装 opendesk-cli {#npm-install}

你可以通过下面的命令安装 OpenDesk 的终端版本 `opendesk-cli`。当前我们有每日构建的nightly版本和稳定版本。通常建议大家安装nightly版本以快速获取更新。

**安装最新的稳定版本**

```shell
$ npm i -g "@bitclub.ai/opendesk-cli"
```

**安装最新的日构建版本**

```shell
$ npm i -g "@bitclub.ai/opendesk-cli@nightly"
```

安装完成之后，在Shell中运行

```
$ opendesk
```

即可打开 OpenDesk。

### 1.3 快速完成初始配置 {#initial-config}

第一次运行 OpenDesk 的时候，或者当用户没有配置任何可用模型的时候，进入 OpenDesk 会弹出下面的提示

![firsttime](/assets/images/quickstart/firsttime.png)

此时你需要在输入框中键入 `/config` 回车，系统会弹出模型配置面板，按照提示依次配置模型服务商（如 OpenAI、硅基流动、智谱等，当前 OpenDesk 支持市面上各种提供 OpenAI 标准模型服务的厂商），模型别名和当前默认模型即可。

### 1.4 与你的朋友分享配置 {#share-config}

OpenDesk 支持一键快速导出口令，通过输入 `/quickpass config base`即可将你当前使用的API地址，API Key和当前配置的模型等一同导出为一个可复制的口令。

![quickpass](/assets/images/quickstart/quickpass.jpg)

> 口令形如 [[Opendesk 基础设置口令 -- eyJkZWZhdWx0X21vZGVsIjoiZ2x.....5XbQw]]，其中的长串字符是对配置的JSON进行base64编码的结果

在你的朋友的 OpenDesk 中，直接在聊天框输入口令回车，即可快速应用该配置。

### 1.5 版本升级 {#upgrade}

进入OpenDesk后输入 `/upgrade` 即可打开升级弹窗，可以选择升级到最新的稳定版或者日构建版。

## 2. 进阶配置

OpenDesk 的理念是希望让所有的配置和交互都以自然语言的形式去体现，而非让使用者操作复杂而繁琐的设置界面。因此这一部分所介绍的所有设置都可以通过对话的方式完成。下面的所有配置方式均不区分命令行还是App，都通过同样的对话式配置即可使用 ;)

### 2.1. 配置消息渠道

> 随时随地，在手机/PC/…… 等各种设备上找到你的 OpenDesk 智能体，AI牛马 7 * 24 小时在线

OpenDesk 当前已经支持的消息渠道如下：

- [飞书一键扫码配置](/channels/feishu)
- [微信一键扫码配置](/channels/weixin)


### 2.2. 配置搜索引擎

OpenDesk系统默认支持以下搜索引擎:

- **免费搜索引擎** (系统安装的时候会默认打开): Bing (中国，全球)，DuckDuckGo, ArXiv
- **付费搜索引擎**: OpenDesk 支持 [Exa Search](https://exa.ai/), [Tavily Search](https://www.tavily.com/), [Brave Search](https://brave.com/search/api/), [博查搜索](https://open.bochaai.com/) 等商业搜索引擎的快速接入，使用者需要自己在平台上注册并获取相应的API；

要管理搜索API，你只需要对 OpenDesk 说出你的要求，例如：

- `看一下我现在有哪些搜索引擎能用?`
- `除了Bing其他的都禁用掉吧`
- `配置一下Exa搜索`
- ...

我们以配置 Exa 搜索为例简单介绍一下大体的配置流程：

![](/assets/images/quickstart/searchconfig.gif)

### 2.3. 安装第三方 MCP Server

你想要的 MCP Server，都可以一句话让 OpenDesk 安装。如果你给了详细的地址，OpenDesk 可以自动过去查看详细配置。如果你只给一个名字，也没关系，OpenDesk 会自动从多个来源搜索。

![](/assets/images/quickstart/mcpinstall.gif)

### 2.4. 安装第三方技能 (Skills)