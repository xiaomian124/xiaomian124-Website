/* =========================================================
   main.js —— 全站共用逻辑
   包含：页脚年份、主题切换、导航滚动状态、滚动揭示等
   ========================================================= */

/* ---------- 禁止恢复滚动位置 ---------- */
(function () {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.addEventListener('load', () => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  });
})();

/* ---------- 1. 页脚年份 ---------- */
(function () {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ---------- 2. 主题设置菜单 ---------- */
(function () {
  const html = document.documentElement;
  const wrap = document.querySelector('.theme-menu-wrap');
  const toggle = document.querySelector('.theme-toggle');
  const menu = document.querySelector('.theme-menu');
  if (!wrap || !toggle || !menu) return;

  const themeItems = menu.querySelectorAll('[data-theme-option]');
  const bgItems = menu.querySelectorAll('[data-bg-option]');

  function updateMenuState() {
    const pref = html.getAttribute('data-theme-pref') || 'auto';
    const bg = localStorage.getItem('bg') === 'off' ? 'off' : 'on';
    themeItems.forEach(item => {
      item.classList.toggle('is-selected', item.dataset.themeOption === pref);
    });
    bgItems.forEach(item => {
      item.classList.toggle('is-selected', item.dataset.bgOption === bg);
    });
  }

  function applyTheme(pref) {
    html.setAttribute('data-theme-pref', pref);
    try { localStorage.setItem('theme', pref); } catch (e) {}

    document.body.classList.add('theme-transition');

    const isDark = pref === 'dark'
      || (pref === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
    html.setAttribute('data-theme', isDark ? 'dark' : 'light');

    setTimeout(() => document.body.classList.remove('theme-transition'), 420);
    updateMenuState();
  }

  function applyBg(opt) {
    if (opt === 'off') {
      try { localStorage.setItem('bg', 'off'); } catch (e) {}
      html.setAttribute('data-bg', 'off');
      html.style.removeProperty('--bing-bg');
    } else {
      try { localStorage.setItem('bg', 'on'); } catch (e) {}
      html.setAttribute('data-bg', 'on');
      html.style.setProperty(
        '--bing-bg',
        'url("https://guestbook.xiaomian124.top/api/bing")'
      );
    }
    updateMenuState();
  }

  function openMenu() {
    menu.removeAttribute('hidden');
    wrap.classList.add('is-open');
    updateMenuState();
  }
  function closeMenu() {
    menu.setAttribute('hidden', '');
    wrap.classList.remove('is-open');
  }

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();

    const calPanel = document.querySelector('.calendar-panel');
    const calWrap = document.querySelector('.calendar-wrap');
    if (calPanel && !calPanel.hidden) {
      calPanel.hidden = true;
      if (calWrap) calWrap.classList.remove('is-open');
    }
    const calTip = document.querySelector('.cal-float-tip');
    if (calTip && !calTip.hidden) {
      calTip.classList.remove('is-show');
      calTip.hidden = true;
    }

    const navDrop = document.querySelector('.nav-search-dropdown');
    if (navDrop && !navDrop.hidden) navDrop.hidden = true;

    menu.hasAttribute('hidden') ? openMenu() : closeMenu();
  });

  themeItems.forEach(item => {
    item.addEventListener('click', () => {
      applyTheme(item.dataset.themeOption);
      closeMenu();
    });
  });

  bgItems.forEach(item => {
    item.addEventListener('click', () => {
      applyBg(item.dataset.bgOption);
      closeMenu();
    });
  });

  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target)) closeMenu();
  });

  const media = matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change', () => {
    if (html.getAttribute('data-theme-pref') === 'auto') {
      html.setAttribute('data-theme', media.matches ? 'dark' : 'light');
    }
  });
})();

/* ---------- 3. 导航栏滚动状态 ---------- */
(function () {
  const nav = document.getElementById('siteNav');
  if (!nav) return;

  const update = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
  update();
  window.addEventListener('scroll', update, { passive: true });
})();

/* ---------- 4. 滚动揭示 ---------- */
(function () {
  // 给页面上的主要板块自动加 reveal 类
  const items = document.querySelectorAll('.panel, .profile-card, .page-head');
  if (!items.length) return;

  items.forEach((el, i) => {
    el.classList.add('reveal');
    // 依次错开延迟，最多 240ms，避免后面的元素等太久
    el.style.setProperty('--d', Math.min(i, 3) * 80 + 'ms');
  });

  // 不支持 IntersectionObserver 时直接全部显示
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -6% 0px'
  });

  items.forEach(el => io.observe(el));
})();

/* ---------- 隐私政策更新提示 ---------- */
(function () {
  const PRIVACY_VERSION = '2026-10-14';
  const STORAGE_KEY = 'privacy_seen_version';

  let seen = null;
  try { seen = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  if (seen === PRIVACY_VERSION) return;

  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  const bar = document.createElement('div');
  bar.className = 'privacy-banner';
  bar.innerHTML = `
    <div class="privacy-banner-inner">
      <span class="privacy-banner-icon">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </span>
      <span class="privacy-banner-text">
        我们在 <strong>${PRIVACY_VERSION}</strong> 更新了隐私政策
      </span>
      <a class="privacy-banner-btn privacy-banner-view" href="/about.html#privacy">查看</a>
      <button class="privacy-banner-btn privacy-banner-dismiss" type="button">了解</button>
    </div>
  `;

  nav.parentNode.insertBefore(bar, nav.nextSibling);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => bar.classList.add('is-visible'));
  });

  bar.querySelector('.privacy-banner-dismiss').addEventListener('click', () => {
    try { localStorage.setItem(STORAGE_KEY, PRIVACY_VERSION); } catch (e) {}
    bar.classList.remove('is-visible');
    setTimeout(() => bar.remove(), 500);
  });

  bar.querySelector('.privacy-banner-view').addEventListener('click', () => {
    try { localStorage.setItem(STORAGE_KEY, PRIVACY_VERSION); } catch (e) {}
  });
})();

/* =========================================================
   全站导航抽屉
   ========================================================= */
(function () {
  const navInner = document.querySelector('.nav-inner');
  if (!navInner) return;
  const brand = navInner.querySelector('.brand');

  /* 菜单按钮 */
  const menuBtn = document.createElement('button');
  menuBtn.className = 'nav-menu-btn';
  menuBtn.type = 'button';
  menuBtn.setAttribute('aria-label', '打开导航菜单');
  menuBtn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
  if (brand) brand.parentNode.insertBefore(menuBtn, brand);
  else navInner.insertBefore(menuBtn, navInner.firstChild);

  /* 抽屉 + 遮罩 */
  const overlay = document.createElement('div');
  overlay.className = 'nav-drawer-overlay';

  const drawer = document.createElement('aside');
  drawer.className = 'nav-drawer';
  drawer.innerHTML = `
    <div class="nav-drawer-head">
      <span class="nav-drawer-title">导航</span>
      <button class="nav-drawer-close" type="button" aria-label="关闭">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
    </div>

    <div class="nav-drawer-group">
      <span class="nav-drawer-label">页面</span>
      <a class="nav-drawer-link" href="/">首页</a>
      <a class="nav-drawer-link" href="/projects.html">项目</a>
      <a class="nav-drawer-link" href="https://docs.xiaomian124.top/">文档</a>
      <a class="nav-drawer-link" href="/share.html">分享</a>
      <a class="nav-drawer-link" href="/guestbook.html">留言</a>
      <a class="nav-drawer-link" href="/friends.html">好友</a>
      <a class="nav-drawer-link" href="/about.html">关于</a>
    </div>

    <div class="nav-drawer-group">
      <span class="nav-drawer-label">插件文档</span>
      <a class="nav-drawer-link" href="https://docs.xiaomian124.top/plugins/alcohol/">Alcohol</a>
      <a class="nav-drawer-link" href="https://docs.xiaomian124.top/plugins/mooncake/">MoonCake</a>
      <a class="nav-drawer-link" href="https://docs.xiaomian124.top/plugins/nationalday/">NationalDay</a>
      <a class="nav-drawer-link" href="https://docs.xiaomian124.top/plugins/redpacket/">RedPacket2</a>
      <a class="nav-drawer-link" href="https://docs.xiaomian124.top/plugins/xcreeper/">XCreeper</a>
      <a class="nav-drawer-link" href="https://docs.xiaomian124.top/plugins/safeworld/">SafeWorld</a>
      <a class="nav-drawer-link" href="https://docs.xiaomian124.top/plugins/betterfoods/">A Better Foods</a>
    </div>

    <div class="nav-drawer-group">
      <span class="nav-drawer-label">其他</span>
      <a class="nav-drawer-link" href="/rss.xml" target="_blank" rel="noopener">RSS 订阅</a>
      <a class="nav-drawer-link" href="https://github.com/xiaomian124" target="_blank" rel="noopener">GitHub</a>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(drawer);

  function open() {
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', open);
  overlay.addEventListener('click', close);
  drawer.querySelector('.nav-drawer-close').addEventListener('click', close);
  drawer.querySelectorAll('.nav-drawer-link').forEach(a => {
    a.addEventListener('click', close);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) close();
  });
})();

/* =========================================================
   导航栏搜索
   ========================================================= */
(function () {
  const navInner = document.querySelector('.nav-inner');
  if (!navInner) return;
  const themeWrap = navInner.querySelector('.theme-menu-wrap');
  if (!themeWrap) return;

  const INDEX = [
    { title: '首页',       url: '/',                    desc: '个人主页', keywords: 'home 主页 index 一只猫 Acat xiaomian124 mian 网站' },
    { title: '项目',       url: '/projects.html',       desc: 'GitHub 项目列表', keywords: 'projects github repo 仓库 项目 开发 开源' },
    { title: '文档',       url: 'https://docs.xiaomian124.top/', desc: '插件与模组使用文档', keywords: 'docs wiki 文档 教程 步骤' },
    { title: '分享',       url: '/share.html',          desc: '工具和参考资料', keywords: 'share 分享 资源 工具' },
    { title: '留言板',     url: '/guestbook.html',      desc: '留言与讨论', keywords: 'guestbook 留言 评论 留言板 讨论 探讨 帖子 贴' },
    { title: '好友',       url: '/friends.html',        desc: '开发者好友', keywords: 'friends 好友 友链 开发者' },
    { title: '关于',       url: '/about.html',          desc: '联系方式与隐私政策', keywords: 'about 关于 联系 隐私 保护 政策 贡献 奉献 赞助 赞赏 链接 网站 信息 rss RSS 联系 联络 支持 开源 资源' },

    { title: 'Alcohol',     url: 'https://docs.xiaomian124.top/plugins/alcohol/',     desc: '服务器酿酒插件', keywords: 'alcohol 酿酒 物品 配方 服务器' },
    { title: 'MoonCake',    url: 'https://docs.xiaomian124.top/plugins/mooncake/',    desc: '中秋节主题插件', keywords: 'mooncake 中秋 物品 月饼 服务器' },
    { title: 'NationalDay', url: 'https://docs.xiaomian124.top/plugins/nationalday/', desc: '国庆节主题插件', keywords: 'nationalday 国庆 物品 礼包 服务器' },
    { title: 'RedPacket2',  url: 'https://docs.xiaomian124.top/plugins/redpacket/',   desc: '支持数据库的红包插件', keywords: 'redpacket 红包 经济 服务器 金币' },
    { title: 'XCreeper',    url: 'https://docs.xiaomian124.top/plugins/xcreeper/',    desc: '苦力怕征求同意再爆炸', keywords: 'xcreeper 苦力怕 爬行者 creeper 服务器' },
    { title: 'SafeWorld',   url: 'https://docs.xiaomian124.top/plugins/safeworld/',   desc: '创造服综合安全防护插件', keywords: 'safeworld safe 创造 服务器 安全 防护 保护' },
    { title: 'A Better Foods',   url: 'https://docs.xiaomian124.top/plugins/betterfoods/', desc: '食物拓展模组', keywords: 'foods 食物 物品 休闲 模组 烹饪 mod mods' },
  ];

  const wrap = document.createElement('div');
  wrap.className = 'nav-search-wrap';
  wrap.innerHTML = `
    <div class="nav-search-input-wrap">
      <svg class="nav-search-icon" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <input type="text" class="nav-search-input" placeholder="搜索…" autocomplete="off">
    </div>
    <div class="nav-search-dropdown" hidden></div>
  `;
  themeWrap.parentNode.insertBefore(wrap, themeWrap);

  const input = wrap.querySelector('.nav-search-input');
  const dropdown = wrap.querySelector('.nav-search-dropdown');

  function esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function render(q) {
    if (!q) { dropdown.hidden = true; return; }
    const lower = q.toLowerCase();
    const matched = INDEX.filter(item => {
      const hay = (item.title + ' ' + item.desc + ' ' + item.keywords).toLowerCase();
      return hay.includes(lower);
    }).slice(0, 6);

    if (!matched.length) {
      dropdown.innerHTML = '<p class="nav-search-empty">没有找到匹配项</p>';
      dropdown.hidden = false;
      return;
    }

    dropdown.innerHTML = matched.map(item => `
      <a class="nav-search-item" href="${item.url}">
        <span class="nav-search-item-title">${esc(item.title)}</span>
        <span class="nav-search-item-desc">${esc(item.desc)}</span>
      </a>
    `).join('');
    dropdown.hidden = false;
  }

  input.addEventListener('input', () => render(input.value.trim()));
  input.addEventListener('focus', () => {
    const themeMenu = document.querySelector('.theme-menu');
    const themeWrap = document.querySelector('.theme-menu-wrap');
    if (themeMenu && !themeMenu.hasAttribute('hidden')) {
      themeMenu.setAttribute('hidden', '');
      if (themeWrap) themeWrap.classList.remove('is-open');
    }

    const calPanel = document.querySelector('.calendar-panel');
    const calWrap = document.querySelector('.calendar-wrap');
    if (calPanel && !calPanel.hidden) {
      calPanel.hidden = true;
      if (calWrap) calWrap.classList.remove('is-open');
    }
    const calTip = document.querySelector('.cal-float-tip');
    if (calTip && !calTip.hidden) {
      calTip.classList.remove('is-show');
      calTip.hidden = true;
    }

    if (input.value.trim()) render(input.value.trim());
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      input.value = ''; dropdown.hidden = true; input.blur();
    } else if (e.key === 'Enter') {
      const first = dropdown.querySelector('.nav-search-item');
      if (first) window.location.href = first.href;
    }
  });

  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target)) dropdown.hidden = true;
  });
})();

/* =========================================================
   日历
   ========================================================= */
(function () {
  const navInner = document.querySelector('.nav-inner');
  if (!navInner) return;
  const themeWrap = navInner.querySelector('.theme-menu-wrap');
  if (!themeWrap) return;

  const wrap = document.createElement('div');
  wrap.className = 'calendar-wrap';
  wrap.innerHTML = `
    <button class="calendar-btn" type="button" aria-label="打开日历">
      <span class="calendar-icon" style="--icon: url('/assets/icons/calendar.svg')"></span>
    </button>
    <div class="calendar-panel" hidden>
      <div class="cal-viewport">
        <div class="cal-body"></div>
      </div>
    </div>
  `;
  themeWrap.parentNode.insertBefore(wrap, themeWrap.nextSibling);

  const btn = wrap.querySelector('.calendar-btn');
  const panel = wrap.querySelector('.calendar-panel');
  const viewport = wrap.querySelector('.cal-viewport');
  const body = wrap.querySelector('.cal-body');

  const tipEl = document.createElement('div');
  tipEl.className = 'cal-float-tip';
  tipEl.hidden = true;
  document.body.appendChild(tipEl);

  const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];
  const MONTHS = ['1 月','2 月','3 月','4 月','5 月','6 月','7 月','8 月','9 月','10 月','11 月','12 月'];

  let lunarReady = false;
  const lunarPromise = new Promise(resolve => {
    if (window.Lunar) { lunarReady = true; return resolve(); }
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/lunar-javascript@1.6.13/lunar.js';
    s.onload = () => { lunarReady = true; resolve(); };
    s.onerror = () => resolve();
    document.head.appendChild(s);
  });

  const FESTIVAL_COLORS = {
    '元旦': '#e63c30', '春节': '#c42a2a', '除夕': '#bd2121',
    '元宵': '#f59e0b', '元宵节': '#f59e0b',
    '情人节': '#ec4899', '妇女节': '#d946ef', '植树节': '#22c55e',
    '愚人节': '#a855f7', '清明': '#22c55e', '清明节': '#22c55e',
    '劳动节': '#dc2626', '青年节': '#3b82f6',
    '母亲节': '#ec4899', '父亲节': '#3b82f6',
    '儿童节': '#f59e0b', '端午': '#22c55e', '端午节': '#22c55e',
    '建党节': '#dc2626', '建军节': '#dc2626',
    '七夕': '#ec4899', '七夕节': '#ec4899',
    '中元节': '#a855f7', '教师节': '#06b6d4',
    '中秋节': '#f59e0b', '国庆节': '#dc2626',
    '重阳节': '#f97316', '万圣夜': '#f97316', '万圣节': '#f97316',
    '感恩节': '#f59e0b', '平安夜': '#22c55e', '圣诞节': '#17a117',
    '腊八节': '#a855f7', '小年': '#ef4444',
  };

  function getFestivalColor(name) {
    if (FESTIVAL_COLORS[name]) return FESTIVAL_COLORS[name];
    for (const [key, color] of Object.entries(FESTIVAL_COLORS)) {
      if (name.includes(key) || key.includes(name)) return color;
    }
    return '#6366f1';
  }

  const SOLAR_FESTIVALS = {
    '01-01': ['元旦'],
    '02-14': ['情人节'],
    '03-08': ['妇女节'],
    '03-12': ['植树节'],
    '04-01': ['愚人节'],
    '05-01': ['劳动节'],
    '05-04': ['青年节'],
    '06-01': ['儿童节'],
    '07-01': ['建党节'],
    '08-01': ['建军节'],
    '09-10': ['教师节'],
    '10-01': ['国庆节'],
    '10-31': ['万圣夜'],
    '11-11': ['光棍节'],
    '12-24': ['平安夜'],
    '12-25': ['圣诞节'],
  };

  function getFestivals(y, m, d) {
    const list = [];

    const key = String(m + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
    if (SOLAR_FESTIVALS[key]) {
      for (const n of SOLAR_FESTIVALS[key]) {
        if (!list.includes(n)) list.push(n);
      }
    }

    if (window.Lunar) {
      try {
        const lunar = window.Lunar.fromDate(new Date(y, m, d));
        const raw = []
          .concat(lunar.getFestivals ? lunar.getFestivals() : [])
          .concat(lunar.getSolarFestivals ? lunar.getSolarFestivals() : [])
          .concat(lunar.getOtherFestivals ? lunar.getOtherFestivals() : []);
        for (const n of raw) if (n && !list.includes(n)) list.push(n);
      } catch (e) {}
    }

    return list;
  }

  function getLunarText(y, m, d) {
    if (!window.Lunar) return '';
    try {
      const lunar = window.Lunar.fromDate(new Date(y, m, d));
      const day = lunar.getDayInChinese();
      const month = lunar.getMonthInChinese();
      return day === '初一' ? month + '月' : day;
    } catch (e) {
      return '';
    }
  }

  let viewYear, viewMonth;
  let pulseToday = false;
  let selectedDate = null;

  function today() {
    const d = new Date();
    return { y: d.getFullYear(), m: d.getMonth(), d: d.getDate() };
  }

  function render(y, m) {
    const t = today();
    const first = new Date(y, m, 1);
    const startDay = first.getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const daysInPrev = new Date(y, m, 0).getDate();

    let cells = '';

    for (let i = startDay - 1; i >= 0; i--) {
      cells += `<span class="cal-cell cal-other">${daysInPrev - i}</span>`;
    }

    const currentYear = new Date().getFullYear();

    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = (y === t.y && m === t.m && d === t.d);
      const festivals = getFestivals(y, m, d);
      const hasFestival = festivals.length > 0;
      const color = hasFestival ? getFestivalColor(festivals[0]) : '';
      const lunarText = getLunarText(y, m, d);
      const subText = hasFestival ? festivals[0] : lunarText;

      // 站主生日：9 月 17 日
      const isBirthday = (y === currentYear && m === 8 && d === 17);

      const dateKey2 = `${y}-${m}-${d}`;
      const isSelected = (dateKey2 === selectedDate);

      let cls = 'cal-cell';
      if (isToday) cls += ' is-today';
      if (isSelected) cls += ' is-selected';
      if (hasFestival) cls += ' has-festival';
      if (isBirthday) cls += ' is-birthday';
      if (isToday && pulseToday) cls += ' pulse';

      let attrs = '';
      if (hasFestival) {
        attrs += ` style="--festival-color: ${color}"`;
        attrs += ` data-festivals="${festivals.join('|')}"`;
      }
      if (isBirthday) {
        attrs += ` data-festivals="站主生日"`;
        if (!hasFestival) attrs += ` style="--festival-color: #ec4899"`;
      }
      if (lunarText) attrs += ` data-lunar="${lunarText}"`;
      attrs += ` data-date="${dateKey2}"`;

      const numHtml = isBirthday
        ? `<span class="cal-birthday-icon" style="--icon: url('/assets/icons/cake.svg')"></span>`
        : `<span class="cal-num">${d}</span>`;

      const subHtml = isBirthday
        ? `<span class="cal-sub cal-sub-birthday">生日</span>`
        : (subText ? `<span class="cal-sub">${subText}</span>` : '');

      cells += `<span class="${cls}"${attrs}>
        ${numHtml}
        ${subHtml}
      </span>`;
    }

    const total = startDay + daysInMonth;
    const rest = (7 - (total % 7)) % 7;
    for (let d = 1; d <= rest; d++) {
      cells += `<span class="cal-cell cal-other">${d}</span>`;
    }

    body.innerHTML = `
      <div class="cal-head">
        <button class="cal-nav" type="button" data-dir="-1">‹</button>
        <span class="cal-title">${y} 年 ${MONTHS[m]}</span>
        <button class="cal-nav" type="button" data-dir="1">›</button>
      </div>
      <div class="cal-week">
        ${WEEKDAYS.map(w => `<span>${w}</span>`).join('')}
      </div>
      <div class="cal-grid">${cells}</div>
      <div class="cal-foot">
        <button class="cal-today-btn" type="button">回到今天</button>
      </div>
    `;

    body.querySelectorAll('.cal-nav').forEach(b => {
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        const dirNum = Number(b.dataset.dir);
        let nm = m + dirNum;
        let ny = y;
        if (nm < 0) { nm = 11; ny--; }
        if (nm > 11) { nm = 0; ny++; }
        viewYear = ny; viewMonth = nm;
        pulseToday = false;
        switchTo(ny, nm, dirNum === 1 ? 'next' : 'prev');
      });
    });

    body.querySelector('.cal-today-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      const t2 = today();
      if (viewYear === t2.y && viewMonth === t2.m) {
        const el = body.querySelector('.cal-cell.is-today');
        if (el) {
          el.classList.remove('pulse');
          void el.offsetWidth;
          el.classList.add('pulse');
        }
        return;
      }
      const nowIdx = viewYear * 12 + viewMonth;
      const targetIdx = t2.y * 12 + t2.m;
      const dir = targetIdx > nowIdx ? 'next' : 'prev';
      viewYear = t2.y;
      viewMonth = t2.m;
      pulseToday = true;
      switchTo(t2.y, t2.m, dir);
    });

    if (!body._tipBound) {
      body._tipBound = true;

      body.addEventListener('mouseover', (e) => {
        const cell = e.target.closest('.cal-cell');
        const inGrid = e.target.closest('.cal-grid');

        if (!cell) {
          if (inGrid) return;

          if (body._currentCell) {
            body._currentCell = null;
            hideTip(false);
          }
          return;
        }

        if (cell === body._currentCell) return;
        body._currentCell = cell;

        if (cell.classList.contains('cal-other')) {
          hideTip(true);
          return;
        }
        showTip(cell, e);
      });

      body.addEventListener('mousemove', (e) => {
        if (body._currentCell && !body._currentCell.classList.contains('cal-other')) {
          moveTip(e);
        }
      });

      body.addEventListener('click', (e) => {
        const cell = e.target.closest('.cal-cell');
        if (!cell) return;
        e.stopPropagation();
        if (cell.classList.contains('cal-other')) return;

        const dateKey = cell.dataset.date;
        if (dateKey) {
          selectedDate = (selectedDate === dateKey) ? null : dateKey;
          body.querySelectorAll('.cal-cell.is-selected').forEach(c => {
            c.classList.remove('is-selected');
          });
          if (selectedDate) cell.classList.add('is-selected');
        }

        body._currentCell = cell;
        showTip(cell, e);
      });

      panel.addEventListener('mouseleave', () => {
        body._currentCell = null;
        hideTip(false);
      });
    }
  }

  let tipTimer = null;

  function showTip(cell, e) {
    const festivals = (cell.dataset.festivals || '').split('|').filter(Boolean);
    const lunarText = cell.dataset.lunar || '';
    if (!festivals.length && !lunarText) {
      hideTip(true);
      return;
    }

    let html = '';
    if (festivals.length) {
      const color = cell.style.getPropertyValue('--festival-color') || 'var(--accent)';
      html += `<div class="cal-tip-festival" style="color:${color}">${festivals.join(' · ')}</div>`;
    }
    if (lunarText) {
      html += `<div class="cal-tip-lunar">农历 ${lunarText}</div>`;
    }

    tipEl.innerHTML = html;
    tipEl.hidden = false;
    tipEl.classList.remove('is-show');
    void tipEl.offsetWidth;
    tipEl.classList.add('is-show');
    moveTip(e);
  }

  function moveTip(e) {
    if (tipEl.hidden) return;
    const rect = tipEl.getBoundingClientRect();
    let x = e.clientX + 14;
    let y = e.clientY + 14;
    if (x + rect.width > window.innerWidth - 8) x = e.clientX - rect.width - 14;
    if (y + rect.height > window.innerHeight - 8) y = e.clientY - rect.height - 14;
    tipEl.style.left = x + 'px';
    tipEl.style.top = y + 'px';
  }

  function hideTip(immediate) {
    clearTimeout(tipTimer);
    tipEl.classList.remove('is-show');
    const delay = immediate ? 0 : 150;
    tipTimer = setTimeout(() => { tipEl.hidden = true; }, delay);
  }

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  async function switchTo(y, m, dir) {
    const fromH = viewport.offsetHeight;
    viewport.style.height = fromH + 'px';

    body.classList.add(dir === 'next' ? 'slide-out-next' : 'slide-out-prev');
    await sleep(220);

    body.style.transition = 'none';
    body.classList.remove('slide-out-next', 'slide-out-prev');
    render(y, m);
    body.classList.add(dir === 'next' ? 'slide-in-from-right' : 'slide-in-from-left');
    void body.offsetHeight;

    const toH = body.offsetHeight;
    viewport.style.height = toH + 'px';

    body.style.transition = '';
    body.classList.remove('slide-in-from-right', 'slide-in-from-left');

    await sleep(280);

    viewport.style.height = '';
  }

  async function openPanel() {
    if (!lunarReady) {
      await Promise.race([
        lunarPromise,
        new Promise(r => setTimeout(r, 1200))
      ]);
    }
    const t = today();
    viewYear = t.y;
    viewMonth = t.m;
    pulseToday = false;
    render(viewYear, viewMonth);
    panel.hidden = false;
    wrap.classList.add('is-open');
  }

  function closePanel() {
    panel.hidden = true;
    wrap.classList.remove('is-open');
    hideTip(true);
    selectedDate = null;
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();

    const themeMenu = document.querySelector('.theme-menu');
    const themeWrap = document.querySelector('.theme-menu-wrap');
    if (themeMenu && !themeMenu.hasAttribute('hidden')) {
      themeMenu.setAttribute('hidden', '');
      if (themeWrap) themeWrap.classList.remove('is-open');
    }

    const navDrop = document.querySelector('.nav-search-dropdown');
    if (navDrop && !navDrop.hidden) navDrop.hidden = true;

    panel.hidden ? openPanel() : closePanel();
  });

  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target)) closePanel();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) closePanel();
  });
})();

/* =========================================================
   站主生日
   ========================================================= */
(function () {
  const now = new Date();
  const year = now.getFullYear();

  // 9 月 17 日触发
  if (now.getMonth() !== 8 || now.getDate() !== 17) return;

  const STORAGE_KEY = 'birthday_seen_' + year;
  try {
    if (localStorage.getItem(STORAGE_KEY) === 'yes') return;
  } catch (e) {}

  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  const bar = document.createElement('div');
  bar.className = 'birthday-banner';
  bar.innerHTML = `
    <div class="birthday-banner-inner">
      <span class="birthday-banner-icon" style="--icon: url('/assets/icons/cake.svg')"></span>
      <span class="birthday-banner-text">
        今天是 <strong>${year}-9-17</strong> ，也是站主的生日！
      </span>
      <button class="birthday-btn birthday-btn-dismiss" type="button">了解</button>
      <button class="birthday-btn birthday-btn-happy" type="button">生日快乐</button>
    </div>
  `;
  const privacyBar = nav.parentNode.querySelector('.privacy-banner');
  if (privacyBar) {
    privacyBar.parentNode.insertBefore(bar, privacyBar);
  } else {
    nav.parentNode.insertBefore(bar, nav.nextSibling);
  }

  setTimeout(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => bar.classList.add('is-visible'));
    });
  }, 3000);

  function dismiss() {
    try { localStorage.setItem(STORAGE_KEY, 'yes'); } catch (e) {}
    bar.classList.remove('is-visible');
    setTimeout(() => bar.remove(), 500);
  }

  bar.querySelector('.birthday-btn-dismiss').addEventListener('click', dismiss);

  bar.querySelector('.birthday-btn-happy').addEventListener('click', () => {
    dismiss();
    startCakeRain();
  });

  function startCakeRain() {
    const EMOJIS = ['🎂', '🍰', '🧁', '🎉', '🎈', '🎁'];
    const startTime = Date.now();
    const DURATION = 8000;

    const timer = setInterval(() => {
      if (Date.now() - startTime > DURATION) {
        clearInterval(timer);
        return;
      }
      spawnOne();
      if (Math.random() < 0.35) spawnOne();
    }, 120);

    function spawnOne() {
      const span = document.createElement('span');
      span.className = 'cake-rain-emoji';
      span.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      span.style.left = Math.random() * 100 + 'vw';
      span.style.fontSize = (18 + Math.random() * 20) + 'px';
      span.style.animationDuration = (2.6 + Math.random() * 2.2) + 's';
      span.style.animationDelay = '0s';
      document.body.appendChild(span);
      span.addEventListener('animationend', () => span.remove());
    }
  }
})();

/* =========================================================
   按钮悬浮提示
   ========================================================= */
(function () {
  const navInner = document.querySelector('.nav-inner');
  if (!navInner) return;

  const tip = document.createElement('div');
  tip.className = 'nav-tooltip';
  tip.hidden = true;
  document.body.appendChild(tip);

  let showTimer = null;
  let currentTarget = null;

  function showTip(target, text) {
    currentTarget = target;
    tip.textContent = text;
    tip.hidden = false;
    tip.classList.remove('is-show');
    void tip.offsetWidth;
    tip.classList.add('is-show');
    positionTip(target);
  }

  function positionTip(target) {
    const rect = target.getBoundingClientRect();
    const tipRect = tip.getBoundingClientRect();
    const x = rect.left + rect.width / 2 - tipRect.width / 2;
    const y = rect.bottom + 8;
    const finalX = Math.max(8, Math.min(x, window.innerWidth - tipRect.width - 8));
    tip.style.left = finalX + 'px';
    tip.style.top = y + 'px';
  }

  function hideTip() {
    clearTimeout(showTimer);
    currentTarget = null;
    tip.classList.remove('is-show');
    setTimeout(() => {
      if (!tip.classList.contains('is-show')) tip.hidden = true;
    }, 150);
  }

  function bind(btn, getText, isMenuOpen) {
    if (!btn) return;

    btn.addEventListener('mouseenter', () => {
      if (isMenuOpen()) return;
      clearTimeout(showTimer);
      const text = typeof getText === 'function' ? getText() : getText;
      showTimer = setTimeout(() => showTip(btn, text), 300);
    });

    btn.addEventListener('mouseleave', hideTip);

    btn.addEventListener('click', hideTip);
  }

  const themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    bind(
      themeBtn,
      () => {
        const pref = document.documentElement.getAttribute('data-theme-pref') || 'auto';
        const names = { light: '亮色', dark: '暗色', auto: '跟随系统' };
        return '主题 · ' + (names[pref] || '自动');
      },
      () => {
        const menu = document.querySelector('.theme-menu');
        return menu && !menu.hasAttribute('hidden');
      }
    );
  }

  const calBtn = document.querySelector('.calendar-btn');
  if (calBtn) {
    bind(
      calBtn,
      () => {
        const d = new Date();
        const w = ['日', '一', '二', '三', '四', '五', '六'][d.getDay()];
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} 周${w}`;
      },
      () => {
        const panel = document.querySelector('.calendar-panel');
        return panel && !panel.hidden;
      }
    );
  }

  const navSearch = document.querySelector('.nav-search-input');
  if (navSearch) {
    bind(
      navSearch,
      '站内搜索',
      () => {
        const d = document.querySelector('.nav-search-dropdown');
        return d && !d.hidden;
      }
    );
  }

  document.addEventListener('click', () => {
    if (!tip.hidden) hideTip();
  });

  window.addEventListener('scroll', () => {
    if (!tip.hidden) hideTip();
  }, { passive: true });
})();