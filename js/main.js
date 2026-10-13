/* =========================================================
   main.js —— 全站共用逻辑
   包含：页脚年份、主题切换、导航滚动状态、滚动揭示
   ========================================================= */

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

  // 监听系统主题变化
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