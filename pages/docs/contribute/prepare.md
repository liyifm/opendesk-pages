---
layout: single
title: 准备开发环境
permalink: /docs/contribute/prepare
sidebar:
  nav: "docs"
toc: true
toc_label: 目录
toc_sticky: true
---

本文档介绍开发 Opendesk 所需要安装的依赖项。

## 1. NVM (Node Version Manager)

我们建议使用 NVM 来安装和管理不同平台上的 NodeJS 和 NPM。

{% include platform-tabs.html
  windows="
[nvm-windows](https://github.com/coreybutler/nvm-windows/) 下载最新的Release版本的安装包安装即可。
  "
  macos="
macOS 环境推荐使用 [nvm](https://github.com/nvm-sh/nvm), 按照官网指引或直接执行以下命令安装：

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

或者使用 Homebrew：
```
brew install nvm
```
"

  linux="
Linux 环境推荐使用 [nvm](https://github.com/nvm-sh/nvm), 按照官网指引或直接执行以下命令安装：

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash`
```
"
%}

安装完成后，首先重启终端，然后在终端中 (Powershell, Bash, 命令提示符, ...) 中运行如下指令，正常输出就说明已经正确安装。


```shell
$ nvm version
1.2.2
```

## 2. 安装 NodeJS 和 NPM

使用 NVM 安装最新版本的 NodeJS（这里以v25.2.1为例，你可以使用最新版本或任何你习惯的18以上的版本）：

```shell
$ nvm install v25.2.1
$ nvm use v25.2.1
$ node -v
v25.2.1
```

### Windows Arm64 特别说明

> ⚠️ **Windows Arm64 用户注意**：nvm-windows 默认安装的 NodeJS 是 x86 架构，虽然可以通过转译层运行，但性能较差。请务必按以下步骤安装 Arm64 原生版本。

安装 NodeJS 时必须指定 `arm64` 架构：

```shell
$ nvm install v25.2.1 arm64
$ nvm use v25.2.1 arm64
$ nvm list
# 应当看到
#   * 25.2.1 (Currently using arm64-bit executable)
#              ~~~~~~~~~~~ 注意这里必须是 arm64
```

如果 `nvm list` 显示的是 `64-bit` 或 `32-bit` 而非 `arm64-bit`，说明安装错误。

## 3. 配置国内镜像源

国内用户建议配置镜像源以加速下载。

### 3.1 配置 NPM 镜像

```shell
$ npm config set registry https://registry.npmmirror.com
$ npm config get registry
https://registry.npmmirror.com
```

### 3.2 配置 Electron 镜像

Electron 安装过程中会单独下载二进制文件，需要额外配置镜像。

{% include platform-tabs.html
  windows="
在 Windows 环境变量中添加：

| 变量名 | 值 |
|--------|-----|
| `ELECTRON_MIRROR` | `https://npmmirror.com/mirrors/electron/` |

**PowerShell 设置方式：**

`[Environment]::SetEnvironmentVariable(\"ELECTRON_MIRROR\", \"https://npmmirror.com/mirrors/electron/\", \"User\")`

**CMD 设置方式：**

`setx ELECTRON_MIRROR \"https://npmmirror.com/mirrors/electron/\"`

设置后需重新打开命令行窗口生效。
"

  macos="
在 `~/.zshrc` 中添加：

`echo 'export ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/' >> ~/.zshrc`

`source ~/.zshrc`
"

  linux="
在 `~/.bashrc` 中添加：

`echo 'export ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/' >> ~/.bashrc`

`source ~/.bashrc`
"
%}

## 4. 安装项目的NPM依赖三方库

进入 OpenDesk 代码仓库目录，执行：

```shell
$ npm install --verbose
```

该命令会自动安装所有依赖（包括 Electron）。

## 5. 验证项目安装

安装完成后，可以尝试运行 Opendesk Cli 来检查是否安装正常：

```shell
$ npm run cli
```

如果一切正常，你应当可以看到下面的界面。

![firsttime](/assets/images/quickstart/firsttime.png)

然后再验证下桌面端是否可以正常运行:

```shell
$ npm run start
```

如果一切正常，你应当可以看到我们的桌面端图形界面。

![firsttime](/assets/images/quickstart/firsttime_gui.png)

**接下来就可以开始 Opendesk 的开发了!**

正常情况下，Opendesk的开发者团队会定期构建和推动安装包到:

- [opendesk-cli](https://www.npmjs.com/package/@bitclub.ai/opendesk-cli) cli版本会推送到npmjs，方便通过npm一键安装;
- [opendesk-desktop](https://opendesk.bitclub.ai/) 这里将持续发布桌面端的新版本;

但如果你需要本地构建可以安装到不同设备上的桌面端安装包，你仍然需要继续安装下面的依赖。

## 6. 打包依赖安装

### 构建 Windows 安装包所需的依赖

### 构建 MacOS 安装包所需的依赖

### 构建 HarmonyOS 安装包所需的依赖

#### 安装 DevEco Studio

首先你需要在 [鸿蒙开发者网站](https://developer.huawei.com/consumer/cn/) 注册开发者账号，并下载 [DevEco Studio](https://developer.huawei.com/consumer/cn/download/) 本地安装好。建议选择较新的 Release 版本安装（建议高于 DevEco Studio 6.1.0 Beta2 版本）。

安装过程中你需要记得 DevEco Studio 的安装位置，接下来我们要修改 DevEco Studio 随附的 OpenHarmony SDK，从而让我们可以在开发过程中使用鸿蒙的受限权限。

#### 在SDK中开放部分受限权限

OpenDesk 桌面版的执行需要额外申请下面的[受限权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/restricted-permissions):

- `ohos.permission.READ_WRITE_USER_FILE` — bash、nodejs 等工具的执行需要依赖家目录下的各种配置文件，需要提前申请家目录权限
- `ohos.permission.CUSTOM_SANDBOX` — nodejs 执行过程中需要使用系统提供的 io_uring 等高性能接口，在鸿蒙的权限模型下需要启用自定义沙箱以放通这些系统调用

为了让这些权限申请能够正常使用，你需要手动修改 SDK 下的授权模板文件。该文件位于：

```
sdk/default/openharmony/toolchains/lib/UnsgnedReleasedProfileTemplate.json
```

打开该文件后，修改以下几个字段：

```json
{
    ...,
    "bundle-info": {
        ...,
        "apl": "system_basic",
        ...
    },
    "acls": {
        "allowed-acls": [
            "ohos.permission.READ_WRITE_USER_FILE",
            "ohos.permission.CUSTOM_SANDBOX"
        ]
    },
    ...
}
```

从 DevEco Studio 6.1.0 Beta2 版本开始，自动签名支持配置的 ACL 权限包含了受限开放权限 `ohos.permission.CUSTOM_SANDBOX`，因此建议本地环境高于该版本，避免繁琐的手动签名步骤。

修改完成后，重新生成签名即可继续进行构建。
