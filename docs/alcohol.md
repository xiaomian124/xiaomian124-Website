---
title: Alcohol
---

## 简介

Alcohol 为服务器添加了完整的自定义物品系统。你可以用它定义新的饮品、食物、装备，给它们加上特殊效果，甚至搭一整套 RPG 装备体系。

### 主要功能

- 自定义物品名称、材质、描述和附魔
- 支持工作台、熔炉、酿造台等多种合成方式
- 穿戴时触发药水效果或属性加成
- 配置文件热重载，无需重启服务端

## 安装

### 环境要求

- Paper 或 Spigot 1.20.4+
- Java 17 或更高版本

### 安装步骤

1. 从 [MineBBS](https://www.minebbs.com/resources/alcohol.18453/) 下载最新的 `.jar` 文件
2. 把 jar 文件复制到服务器的 `plugins/` 文件夹
3. 重启服务端，插件会自动生成默认配置文件
4. 编辑 `plugins/Alcohol/config.yml`，按需调整
5. 执行 `/alcohol reload` 让配置立即生效

> 💡 **提示**：首次启动后，插件会生成 `config.yml`、`messages.yml` 和 `items/` 目录。

## 配置

配置文件位于 `plugins/Alcohol/config.yml`。

```yaml
# 自定义物品
items:
  enabled: true
  directory: items/

# 自定义配方
recipes:
  enabled: true
  directory: recipes/

# 装备效果
equipment:
  particles: true
  effect-delay: 20

debug: false
```

### 配置项说明

| 字段 | 默认值 | 说明 |
|---|---|---|
| `items.enabled` | `true` | 是否启用自定义物品系统 |
| `items.directory` | `items/` | 物品定义文件存放目录 |
| `recipes.enabled` | `true` | 是否启用自定义配方系统 |
| `equipment.particles` | `true` | 穿戴装备时是否播放粒子效果 |
| `debug` | `false` | 调试模式，开启后输出更详细日志 |

## 命令

主命令为 `/alcohol`，别名 `/alc`。

| 命令 | 说明 | 权限 |
|---|---|---|
| `/alcohol help` | 查看插件帮助 | - |
| `/alcohol reload` | 重载配置文件 | `alcohol.admin` |
| `/alcohol give <物品>` | 给自己一个自定义物品 | `alcohol.give` |
| `/alcohol list` | 列出所有自定义物品 | - |
| `/alcohol info <物品>` | 查看某个物品的详细信息 | - |

### 使用示例

```
/alcohol list                 # 查看所有物品
/alcohol info magic_sword     # 查看魔法剑信息
/alcohol give magic_sword     # 给自己一把魔法剑
/alcohol reload               # 重载配置
```

## 常见问题

### 插件加载失败怎么办？

先检查 Java 版本是否 ≥ 17，服务端是否为 Paper 或 Spigot 1.20.4+。然后查看控制台完整报错日志。

> ⚠️ **版本不匹配**：如果你的服务端是 1.19 或更低版本，插件可能无法正常工作。

### 自定义物品不生效？

确认物品定义文件放在正确的目录下，YAML 格式没有缩进错误。修改后执行 `/alcohol reload`，如果仍然无效，重启服务端试试。

### 如何获取更多物品定义示例？

插件压缩包里通常会附带 `examples/` 文件夹，里面有一些现成的配置样例，可以直接复制到你的配置目录中使用。