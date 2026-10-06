# 如何安装模组

以 Forge / Fabric 客户端为例，介绍安装模组的基本流程。

## 插件和模组的区别

在开始之前，先搞清楚一件事：

| 类型 | 运行位置 | 玩家需要装吗 | 常见加载器 |
|---|---|---|---|
| **插件** | 服务端 | 不需要 | Paper / Spigot / Leaves |
| **模组** | 客户端 + 服务端 | 需要 | Forge / Fabric / NeoForge |

简单说：**插件装在服务器上，模组装在玩家自己电脑上。**

## 环境准备

安装模组之前，需要先装好模组加载器。

| 加载器 | 适用场景 | 下载地址 |
|---|---|---|
| **Forge** | 老牌加载器，模组数量最多 | [files.minecraftforge.net](https://files.minecraftforge.net/) |
| **Fabric** | 轻量，更新快 | [fabricmc.net](https://fabricmc.net/) |
| **NeoForge** | Forge 的分支，新项目推荐 | [neoforged.net](https://neoforged.net/) |

## 安装步骤

### 1. 安装模组加载器

1. 下载对应 Minecraft 版本的加载器安装程序
2. 双击运行，选择 **Install client**
3. 启动官方启动器，在版本列表里会多出一个带加载器名字的版本

### 2. 找到 mods 文件夹

启动一次游戏后，在 `.minecraft` 目录下会自动生成 `mods` 文件夹。

- **Windows**：`%appdata%\.minecraft\mods`
- **macOS**：`~/Library/Application Support/minecraft/mods`

### 3. 放入模组文件

把下载好的 `.jar` 模组文件复制到 `mods` 文件夹。

::: tip 提示
模组的 Minecraft 版本、加载器类型必须和你的游戏完全一致，否则会启动失败。
:::

### 4. 启动游戏

用模组加载器的版本启动游戏，进入主菜单后能看到 **Mods** 按钮，说明加载成功。

## 常见问题

### 游戏启动崩溃？

最常见的原因是**版本不匹配**。检查：

- 模组的 Minecraft 版本是否和游戏一致（比如 1.20.1 的模组不能装在 1.20.4 上）
- 模组的加载器是否和游戏一致（Forge 模组不能装在 Fabric 上）
- 是否缺少前置模组（有些模组依赖其他模组）

### 模组装了但游戏里看不到？

打开 `Mods` 菜单，看列表里有没有。如果没有，说明模组没被加载，检查文件是不是放在了正确的 `mods` 文件夹。

::: warning 注意
部分模组同时需要装在**客户端和服务端**，联机时才能正常工作。具体看模组作者说明。
:::