# 如何安装模组

以 Forge / Fabric 客户端为例，介绍安装模组的基本流程。

## 环境准备

在安装模组之前，需要先装好模组加载器。

| 加载器 | 适用场景 | 前置 | 下载地址 |
|---|---|---|---|
| **Forge** | 老牌加载器，模组数量最多 | 无 | [files.minecraftforge.net](https://files.minecraftforge.net/) |
| **Fabric** | 轻量，更新快 | [Fabric API](https://modrinth.com/mod/fabric-api) | [fabricmc.net](https://fabricmc.net/) |
| **NeoForge** | Forge 的分支，新模组项目推荐 | 无 | [neoforged.net](https://neoforged.net/) |

::: tip 提示
部分启动器提供加载器下载，如 [PCL](https://afdian.com/p/0164034c016c11ebafcb52540025c377) 、[HMCL](https://hmcl.huangyuhui.net/) 等
:::

## 安装步骤

### 1. 安装模组加载器

如果你的启动器提供加载器下载，则可忽略这一步骤，否则：
1. 下载对应 Minecraft 版本的加载器安装程序
2. 双击运行，选择 **Install client**
3. 启动官方启动器，在版本列表里会多出一个带加载器名字的版本

### 2. 下载模组

从资源网站对应模组的发布页面下载最新的 `.jar` 文件。

| 插件 | 要求 | 版本 | 前置 | 下载 |
|---|---|---|---|---|
| A Better Foods | NeoForge / Forge / Fabric | 26.1.2, 1.12.2, 1.20.1 | 无 | [Modrinth](https://modrinth.com/mod/a-better-foods) |


### 3. 找到 mods 文件夹

启动一次游戏后，在 `.minecraft` 目录下会自动生成 `mods` 文件夹。

- **Windows**：`%appdata%\.minecraft\mods`
- **macOS**：`~/Library/Application Support/minecraft/mods`

### 4. 放入模组文件

把下载好的 `.jar` 模组文件复制到 `mods` 文件夹。

::: tip 提示
模组的 Minecraft 版本、加载器类型等都必须兼容你的游戏版本，否则会启动或加载失败。
:::

### 5. 启动游戏

用模组加载器的版本启动游戏，进入主菜单后能看到 **Mods** 或 **模组** 按钮，说明加载成功。

::: tip 提示
如果没看到 Mods 或 模组 按钮，则有可能是加载器未能加载成功或者是你的加载器不提供**模组列表**功能。   
Fabric 加载器默认不提供**模组列表**功能，但你可以通过 [Mod Menu](https://modrinth.com/mod/modmenu) 模组来实现。
:::

## 常见问题

### 游戏启动崩溃？

最常见的原因是**版本不匹配**。检查：

- 模组的 Minecraft 版本是否和游戏一致（比如 1.20.1 的模组不能装在 1.20.4 上运行）
- 模组的加载器是否和游戏一致（Forge 模组不能装在 Fabric 上）
- 是否缺少前置模组（有些模组需要依赖其他模组）

### 模组装了但游戏里看不到？

打开 `Mods` 菜单，看列表里有没有。如果没有，说明模组没被加载，检查文件是不是放在了正确的 `mods` 文件夹。

::: warning 注意
部分模组同时需要装在**客户端和服务端**，联机时才能正常工作。具体看模组作者说明。
:::

### 模组报错或游戏崩溃？

查看启动器输出的日志或者查看 `logs` `crash-reports` 文件夹的最新文件，通常会含有错误原因，可发给对这方面了解的好友或者复制给 AI 检查问题，如果是模组本身问题，请在模组的 Issue 提供错误信息或复现问题。

::: warning 注意
在请好友解决此类问题时**不要**将启动器的崩溃报告截图发给好友，**要**将日志文件发过去！  
**不然只能帮你算一卦**
:::