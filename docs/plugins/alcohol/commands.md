# Alcohol

- **[简介](./index.md)**
- **[安装](./install)**
- **[配置](./config)**
- **命令和权限**
- **[常见问题](./faq)**
- **[玩法教程](./play)**

## 命令

### 通用指令

| 指令 | 说明 | 权限 |
|------|------|------|
| `/alcohol help` | 显示帮助列表 | 无 |
| `/alcohol recipe` | 打开配方主界面 | `alcohol.recipe` |
| `/alcohol recipe <机器> [craft]` | 查看指定机器的配方 / 合成方式 | `alcohol.recipe` |
| `/alcohol give` | 打开物品获取 GUI | `alcohol.give` |
| `/alcohol give <玩家> <物品> <数量>` | 给予指定玩家物品 | `alcohol.give` |
| `/alcohol reload` | 重新加载插件与歌曲 | `alcohol.reload` |
| `/alcohol kill <CatGirl\|MaoDie>` | 清除残留的猫娘 / 耄耋实体 | `alcohol.kill` |

### 权限节点

| 权限 | 说明 | 默认 |
|------|------|------|
| `alcohol.recipe` | 查看配方 | 所有玩家 |
| `alcohol.give` | 获取 / 给予物品 | OP |
| `alcohol.reload` | 重新加载插件 | OP |
| `alcohol.kill` | 清除残留实体 | OP |

### 支持的机器名称

`/alcohol recipe <机器>` 中可用的机器名：

| 机器名 | 中文 |
|--------|------|
| `CookingPot` | 烹饪锅 |
| `BrewingBox` | 酿造炉 |
| `ApplePress` | 苹果压榨器 |
| `AgingBarrel` | 陈酿桶 |
| `GrapeBasin` | 葡萄藤盆 |
| `MusicPlayer` | 吧台音乐播放器 |