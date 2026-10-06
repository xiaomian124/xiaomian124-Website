# 如何安装插件

以 Paper 服务端为例，介绍安装插件的基本流程。

## 环境准备

在安装插件之前，确认你的服务器满足以下条件：

| 项目 | 要求 |
|---|---|
| 服务端 | Paper / Leaves / Spigot |
| Java | 17 或更高版本 |
| 内存 | 2GB 或以上 |

## 安装步骤

### 1. 下载插件

从资源网站对应插件的发布页面下载最新的 `.jar` 文件。

| 插件 | 要求 | 版本 | 前置 | 下载 |
|---|---|---|---|---|
| Alcohol | Paper / Leaves | 26.2 | [NoteBlockAPI](https://www.spigotmc.org/resources/noteblockapi.19287/) | [Minebbs](https://www.minebbs.com/resources/alcohol.18453/) |
| MoonCake | Paper / Leaves | 26.2 | 无 | [Minebbs](https://www.minebbs.com/resources/mooncake.18279/) |
| NationalDay | Paper / Leaves | 26.2 | 无 | [Minebbs](https://www.minebbs.com/resources/nationalday.18451/) |
| RedPacket2 | Paper / Leaves / Spigot | 1.21-26.2 | 无 | [Modrinth](https://modrinth.com/plugin/redpacket2) |
| XCreeper | Paper / Leaves | 1.21.11 | 无 | [Modrinth](https://modrinth.com/plugin/xcreeper) |
| SafeWorld | Paper / Leaves | 1.21.11 | 无 | [Modrinth](https://modrinth.com/plugin/safeworld) |

::: tip 提示
部分插件在前后的几个小版本里应该也能运行。
:::

### 2. 放入插件目录

把下载好的 `.jar` 文件复制到服务器的 `plugins/` 文件夹里。  

### 3. 重启服务端

重启服务器，插件会自动加载并生成配置文件。

::: tip 提示
部分插件不会生成配置文件。
:::

### 4. 修改配置（可选）

在 `plugins/插件名/` 目录下找到 `config.yml`，按需修改。

::: tip 提示
部分插件修改配置后，执行 `/插件名 reload` 即可重载，无需重启服务器。
:::

### 5. 检查是否加载成功

在服务器控制台输入 `plugins`，列表中能看到加进去的插件，说明加载成功。

## 常见问题

### 插件显示红色，加载失败？

说明缺少前置插件或版本不匹配。查看控制台完整报错日志，通常会指出具体原因，并复制给 AI 检查问题，如果是插件本身问题，请在插件的 Issue 提供错误信息或复现问题。

### 重启后配置被重置？

检查配置文件是否有语法错误（比如 YAML 缩进不对）。语法错误会导致插件使用默认配置。

::: warning 注意
修改 YAML 时请用空格缩进，不要用 Tab 键。
:::