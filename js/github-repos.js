/* =========================================================
   github-repos.js —— 从 GitHub API 获取真实仓库数据并渲染
   用法：
     GitHubRepos.mount('#selector');          // 全部（最多 12 个）
     GitHubRepos.mount('#selector', 3);       // 只要前 3 个
   ========================================================= */
(function () {
  /* ---------- 配置 ---------- */
  const USERNAME = 'xiaomian124';
  const CACHE_KEY = 'gh_repos_' + USERNAME;
  const CACHE_TTL = 30 * 60 * 1000;   // 30 分钟缓存，避免触发速率限制
  const MAX_REPOS = 12;               // 最多显示多少个仓库

  /* ---------- 工具：HTML 转义，防止 XSS ---------- */
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ---------- 工具：相对时间 ---------- */
  function timeAgo(iso) {
    const diff = Date.now() - new Date(iso).getTime();
    const day = Math.floor(diff / 86400000);
    if (day < 1) return '今天';
    if (day < 30) return day + ' 天前';
    if (day < 365) return Math.floor(day / 30) + ' 个月前';
    return Math.floor(day / 365) + ' 年前';
  }

  /* ---------- 工具：语言颜色（GitHub 官方配色） ---------- */
  const LANG_COLORS = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    'C#': '#178600',
    Go: '#00ADD8',
    Rust: '#dea584',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Shell: '#89e051',
    Vue: '#41b883',
    Kotlin: '#A97BFF',
    Swift: '#F05138',
    Lua: '#000080',
    Dockerfile: '#384d54',
    Batchfile: '#C1F12E'
  };

  /* ---------- 获取仓库列表 ---------- */
  async function fetchRepos() {
    // 1. 先看缓存
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw);
        if (cached && Date.now() - cached.time < CACHE_TTL) {
          return cached.data;
        }
      }
    } catch (e) { /* 缓存损坏，忽略 */ }

    // 2. 请求 GitHub API
    const url = 'https://api.github.com/users/' + USERNAME + '/repos'
              + '?sort=updated&per_page=100&type=owner';

    const res = await fetch(url, {
      headers: { 'Accept': 'application/vnd.github+json' }
    });

    if (!res.ok) {
      if (res.status === 403) throw new Error('请求太频繁，请稍后再试');
      if (res.status === 404) throw new Error('找不到这个 GitHub 用户');
      throw new Error('获取失败（HTTP ' + res.status + '）');
    }

    const data = await res.json();

    // 3. 过滤 fork / 归档，按 star 排序，取前 N 个
    const repos = data
      .filter(r => !r.fork && !r.archived)
      .sort((a, b) => {
        // 先按 star 数降序，相同则按最近更新降序
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.updated_at) - new Date(a.updated_at);
      })
      .slice(0, MAX_REPOS);

    // 4. 写缓存
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        time: Date.now(),
        data: repos
      }));
    } catch (e) { /* 存储满或被禁用，忽略 */ }

    return repos;
  }

  /* ---------- 渲染单张卡片 ---------- */
  function repoCard(repo) {
    const color = LANG_COLORS[repo.language] || '#8b949e';
    const safeUrl = escapeHtml(repo.html_url);
    const safeName = escapeHtml(repo.name);
    const safeDesc = escapeHtml(repo.description || '暂无描述');

    const lang = repo.language
      ? '<span class="lang"><i style="background:' + color + '"></i>'
        + escapeHtml(repo.language) + '</span>'
      : '';

    const stars = repo.stargazers_count > 0
      ? '<span class="repo-stat">'
        + '<svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true">'
        + '<path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>'
        + '</svg>'
        + repo.stargazers_count
        + '</span>'
      : '';

    const forks = repo.forks_count > 0
      ? '<span class="repo-stat">'
        + '<svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true">'
        + '<path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/>'
        + '</svg>'
        + repo.forks_count
        + '</span>'
      : '';

    return ''
      + '<a class="repo-card" href="' + safeUrl + '" target="_blank" rel="noopener">'
      +   '<div class="repo-head">'
      +     '<svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" aria-hidden="true">'
      +       '<path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.48 2.48 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"/>'
      +     '</svg>'
      +     '<span class="repo-name">' + safeName + '</span>'
      +   '</div>'
      +   '<p class="repo-desc">' + safeDesc + '</p>'
      +   '<div class="repo-meta">'
      +     lang + stars + forks
      +     '<span class="repo-updated">更新于 ' + timeAgo(repo.updated_at) + '</span>'
      +   '</div>'
      + '</a>';
  }

  /* ---------- 挂载到页面 ---------- */
  async function mount(selector, limit) {
    const box = document.querySelector(selector);
    if (!box) return;

    box.innerHTML = '<p class="repo-loading">正在加载项目…</p>';

    try {
      let repos = await fetchRepos();
      if (limit) repos = repos.slice(0, limit);

      if (!repos.length) {
        box.innerHTML = '<p class="repo-empty">暂时没有公开项目。</p>';
        return;
      }

      box.innerHTML = repos.map(repoCard).join('');
    } catch (err) {
      box.innerHTML = ''
        + '<p class="repo-error">'
        +   '加载失败：' + escapeHtml(err.message) + '<br>'
        +   '<a href="https://github.com/' + USERNAME + '" target="_blank" rel="noopener">'
        +     '直接去 GitHub 看看 →'
        +   '</a>'
        + '</p>';
    }
  }

  /* ---------- 暴露给页面 ---------- */
  window.GitHubRepos = { mount };
})();