/* =========================================================
   main.js —— 全站共用逻辑
   包含：页脚年份、主题切换、导航滚动状态、滚动揭示
   ========================================================= */

/* ---------- 1. 页脚年份 ---------- */
(function () {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ---------- 2. 主题切换 ---------- */
(function () {
  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';

    // 切换瞬间开启全局过渡，结束后移除，避免平时影响性能
    document.body.classList.add('theme-transition');

    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}

    setTimeout(() => document.body.classList.remove('theme-transition'), 420);
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