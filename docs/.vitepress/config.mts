import { defineConfig } from 'vitepress'

export default defineConfig({
  // ========== 站点基础信息 ==========
  lang: 'zh-CN',
  title: '一只猫的插件文档',
  description: 'Minecraft 插件与模组使用文档',
  head: [
    ['link', { rel: 'icon', href: '/head.jpg' }]
  ],

  // ========== 主题配置 ==========
  themeConfig: {
    // ---------- 顶部导航栏 ----------
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '插件', link: '/plugins/alcohol/' },
      { text: '个人主页', link: 'https://xiaomian124-website.vjhcggifgfu.workers.dev/' },
      { text: 'GitHub', link: 'https://github.com/xiaomian124' }
    ],

    // ---------- 左侧边栏 ----------
    sidebar: {
      // 通用指南
      '/guide/': [
        {
          text: '入门',
          items: [
            { text: '指南', link: '/guide/' },
            { text: '如何安装插件', link: '/guide/getting-started' },
            { text: '如何安装模组', link: '/guide/install-mod' }
          ]
        },
        {
          text: '插件文档',
          collapsed: false,
          items: [
            { text: 'Alcohol', link: '/plugins/alcohol/' },
            { text: 'MoonCake', link: '/plugins/mooncake/' },
            { text: 'NationalDay', link: '/plugins/nationalday/' },
            { text: 'RedPacket2', link: '/plugins/redpacket/' },
            { text: 'XCreeper', link: '/plugins/xcreeper/' },
            { text: 'SafeWorld', link: '/plugins/safeworld/' }
          ]
        },
        {
          text: '模组文档',
          collapsed: false,
          items: [
            { text: 'A Better Foods', link: '/plugins/betterfoods/' }
          ]
        }
      ],

      // 插件文档
      '/plugins/': [
        {
          text: '入门',
          items: [
            { text: '指南首页', link: '/guide/' },
            { text: '如何安装插件', link: '/guide/getting-started' },
            { text: '如何安装模组', link: '/guide/install-mod' }
          ]
        },
        {
          text: '服务端插件',
          collapsed: false,
          items: [
            { text: 'Alcohol', link: '/plugins/alcohol/' },
            { text: 'MoonCake', link: '/plugins/mooncake/' },
            { text: 'NationalDay', link: '/plugins/nationalday/' },
            { text: 'RedPacket2', link: '/plugins/redpacket/' },
            { text: 'XCreeper', link: '/plugins/xcreeper/' },
            { text: 'SafeWorld', link: '/plugins/safeworld/' }
          ]
        },
        {
          text: '模组',
          collapsed: false,
          items: [
            { text: 'A Better Foods', link: '/plugins/betterfoods/' }
          ]
        }
      ]
    },

    // ---------- 本地搜索 ----------
    search: {
      provider: 'local'
    },

    // ---------- 社交链接 ----------
    socialLinks: [
      { icon: 'github', link: 'https://github.com/xiaomian124' }
    ],

    // ---------- 页脚 ----------
    footer: {
    message: 'Made by xiaomian124',
    copyright: 'Copyright © 2026 xiaomian124-Website'
    },

    // ---------- 编辑链接 ----------
    editLink: {
      pattern: 'https://github.com/xiaomian124/xiaomian124-Website/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    // ---------- 上一篇/下一篇 ----------
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    // ---------- 右侧大纲 ----------
    outline: {
      level: [2, 3],
      label: '本页目录'
    },

    // ---------- 返回顶部 ----------
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  },

  // ========== Markdown 配置 ==========
  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },

  // ========== 最后更新时间 ==========
  lastUpdated: true,

  // ========== 忽略死链 ==========
  ignoreDeadLinks: true
})