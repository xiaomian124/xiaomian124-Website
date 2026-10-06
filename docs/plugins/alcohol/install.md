# Alcohol

- **[简介](./index.md)**
- **安装**
- **[配置](./config)**
- **[命令和权限](./commands)**
- **[常见问题](./faq)**
- **[玩法教程](./play)**

## 安装

### 环境要求

| 项目 | 版本 |
|------|------|
| 服务端 | Paper 26.2 及以上 |
| Java | Java 25 |
| 依赖插件 | [NoteBlockAPI](https://www.spigotmc.org/resources/noteblockapi.19287/) 1.7.0+（用于吧台音乐播放器） |

### 安装步骤

1. **下载依赖**  
   将 `NoteBlockAPI-1.7.0.jar` 放入服务器的 `plugins/` 目录。

2. **下载插件**  
   将 `Alcohol.jar` 放入服务器的 `plugins/` 目录。

3. **启动服务器**  
   首次启动后，插件会在 `plugins/Alcohol/` 下生成数据目录与配置文件。

4. **添加自定义歌曲（可选）**  
   将 `.nbs` 歌曲文件放入 `plugins/Alcohol/songs/`，输入 `/alcohol reload` 即可加载。

5. **验证安装**  
   进入游戏后输入 `/alcohol help`，若能看到帮助列表即表示安装成功。

::: tip 提示
首次启动后，插件会生成 `data.yml`、`effects.yml` 和 `songs/` 目录。
:::