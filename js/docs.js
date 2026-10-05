/* =========================================================
   docs.css —— 文档页专属样式
   依赖 style.css 中的 CSS 变量
   ========================================================= */

/* =========================================================
   1. 三栏布局
   ========================================================= */
.docs-layout {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr) 200px;
  gap: 0;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* =========================================================
   2. 左侧边栏
   ========================================================= */
.docs-sidebar {
  position: sticky;
  top: 60px;
  height: calc(100vh - 60px);
  overflow-y: auto;
  padding: 28px 20px 40px 24px;
  border-right: 1px solid var(--line);
  scrollbar-width: thin;
}

.sidebar-toggle {
  display: none;
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  font-size: 14px;
  font-family: inherit;
  color: var(--text-soft);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 10px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: color .2s ease, border-color .2s ease;
}
.sidebar-toggle:hover {
  color: var(--accent);
  border-color: var(--accent);
}

.sidebar-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  margin-bottom: 20px;
  font-size: 13px;
  color: var(--text-soft);
  text-decoration: none;
  border-radius: 8px;
  transition: color .2s ease, background .2s ease;
}
.sidebar-back:hover {
  color: var(--accent);
  background: var(--accent-soft);
}

.sidebar-group { margin-bottom: 24px; }

.sidebar-group-title {
  display: block;
  margin-bottom: 8px;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--text-dim);
}

.sidebar-link {
  display: block;
  padding: 6px 10px;
  margin-bottom: 2px;
  font-size: 14px;
  color: var(--text-soft);
  text-decoration: none;
  border-radius: 8px;
  transition: background .2s ease, color .2s ease;
}
.sidebar-link:hover {
  color: var(--text);
  background: var(--accent-soft);
}
.sidebar-link.is-active {
  color: var(--accent);
  background: var(--accent-soft);
  font-weight: 600;
}

.sidebar-overlay {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 40;
  background: rgba(0, 0, 0, .4);
  backdrop-filter: blur(2px);
}

/* =========================================================
   3. 主内容区
   ========================================================= */
.docs-content {
  padding: 40px 48px 80px;
  min-width: 0;
}

.docs-inner {
  max-width: 760px;
  margin: 0 auto;
}

.doc-section { margin-bottom: 64px; }

.doc-section h1 {
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -.03em;
  line-height: 1.25;
  margin-bottom: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--line);
}

.doc-section h2 {
  font-size: 21px;
  font-weight: 700;
  letter-spacing: -.01em;
  margin: 36px 0 14px;
}

.doc-section h3 {
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -.01em;
  margin: 28px 0 12px;
}

.doc-lead {
  font-size: 16.5px;
  color: var(--text-soft);
  line-height: 1.75;
  margin-bottom: 24px;
}

.doc-section p {
  font-size: 15.5px;
  line-height: 1.8;
  color: #3f4551;
  margin-bottom: 16px;
}
[data-theme="dark"] .doc-section p { color: #c4cad4; }

.doc-section ul {
  margin: 0 0 20px 22px;
}
.doc-section ul li {
  font-size: 15.5px;
  line-height: 1.8;
  color: #3f4551;
  margin-bottom: 6px;
}
[data-theme="dark"] .doc-section ul li { color: #c4cad4; }

.doc-section code {
  padding: 2px 6px;
  font-family: "SF Mono", "Fira Code", Consolas, monospace;
  font-size: .88em;
  color: var(--accent);
  background: var(--accent-soft);
  border-radius: 5px;
}

/* =========================================================
   4. 插件头部（文档页顶部）
   ========================================================= */
.plugin-header {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding-bottom: 28px;
  margin-bottom: 32px;
  border-bottom: 1px solid var(--line);
}

.plugin-header-icon {
  font-size: 44px;
  line-height: 1;
  flex-shrink: 0;
}

.plugin-header-info { min-width: 0; }

.plugin-header-title {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -.03em;
  line-height: 1.2;
  margin-bottom: 6px;
}

.plugin-header-desc {
  font-size: 15.5px;
  color: var(--text-soft);
  line-height: 1.7;
  margin-bottom: 12px;
}

.plugin-header-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: var(--text-dim);
}
.plugin-header-meta a {
  color: var(--accent);
  text-decoration: none;
}
.plugin-header-meta a:hover { text-decoration: underline; }

.plugin-badge {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 2px 10px;
  border-radius: 999px;
}

/* =========================================================
   5. 代码块
   ========================================================= */
.code-block {
  margin: 20px 0;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--line);
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  background: #1a1d26;
  border-bottom: 1px solid rgba(255, 255, 255, .06);
}

.code-lang {
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: #7c8598;
}

.code-copy {
  font-size: 12px;
  font-family: inherit;
  color: #7c8598;
  background: none;
  border: none;
  cursor: pointer;
  padding: 3px 8px;
  border-radius: 5px;
  transition: color .2s ease, background .2s ease;
}
.code-copy:hover {
  color: #fff;
  background: rgba(255, 255, 255, .08);
}
.code-copy.is-copied { color: #4ade80; }

.code-block pre {
  margin: 0;
  padding: 18px 20px;
  background: #14171f;
  overflow-x: auto;
  font-size: 13.5px;
  line-height: 1.7;
}

.code-block pre code {
  padding: 0;
  font-family: "SF Mono", "Fira Code", Consolas, monospace;
  color: #d4d9e3;
  background: none;
  border-radius: 0;
}

/* 简易语法高亮 token */
.code-block .token-keyword { color: #c084fc; }
.code-block .token-string  { color: #86efac; }
.code-block .token-comment { color: #6b7280; font-style: italic; }
.code-block .token-number  { color: #fbbf24; }
.code-block .token-function { color: #60a5fa; }

/* =========================================================
   6. 提示框
   ========================================================= */
.callout {
  margin: 20px 0;
  padding: 16px 20px;
  border-radius: 10px;
  border-left: 4px solid;
  font-size: 14.5px;
  line-height: 1.7;
}
.callout strong {
  display: block;
  margin-bottom: 4px;
  font-size: 13px;
  letter-spacing: .02em;
}
.callout p { margin: 0; font-size: 14.5px; }

.callout-tip {
  background: rgba(99, 102, 241, .07);
  border-color: var(--accent);
  color: var(--text-soft);
}
.callout-tip strong { color: var(--accent); }

.callout-warning {
  background: rgba(251, 191, 36, .08);
  border-color: #f59e0b;
  color: var(--text-soft);
}
.callout-warning strong { color: #d97706; }
[data-theme="dark"] .callout-warning strong { color: #fbbf24; }

.callout-danger {
  background: rgba(239, 68, 68, .08);
  border-color: #ef4444;
  color: var(--text-soft);
}
.callout-danger strong { color: #dc2626; }
[data-theme="dark"] .callout-danger strong { color: #f87171; }

/* =========================================================
   7. 表格
   ========================================================= */
.doc-table {
  width: 100%;
  margin: 20px 0;
  border-collapse: collapse;
  font-size: 14.5px;
  border: 1px solid var(--line);
  border-radius: 10px;
  overflow: hidden;
}

.doc-table th {
  padding: 10px 16px;
  text-align: left;
  font-weight: 700;
  font-size: 13px;
  color: var(--text);
  background: var(--surface-2);
  border-bottom: 1px solid var(--line);
}

.doc-table td {
  padding: 10px 16px;
  color: var(--text-soft);
  border-bottom: 1px solid var(--line);
}
.doc-table tr:last-child td { border-bottom: none; }

.doc-table code {
  font-size: .86em;
}

/* =========================================================
   8. 步骤列表
   ========================================================= */
.doc-steps {
  list-style: none;
  margin: 0 0 20px;
  padding: 0;
  counter-reset: step;
}

.doc-steps li {
  position: relative;
  padding-left: 44px;
  margin-bottom: 14px;
  font-size: 15.5px;
  line-height: 1.75;
  color: #3f4551;
  counter-increment: step;
}
[data-theme="dark"] .doc-steps li { color: #c4cad4; }

.doc-steps li::before {
  content: counter(step);
  position: absolute;
  left: 0;
  top: 2px;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  border-radius: 50%;
}

/* =========================================================
   9. 右侧目录（TOC）
   ========================================================= */
.docs-toc {
  position: sticky;
  top: 60px;
  height: calc(100vh - 60px);
  overflow-y: auto;
  padding: 28px 24px 40px 16px;
  scrollbar-width: thin;
}

.toc-title {
  display: block;
  margin-bottom: 12px;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--text-dim);
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border-left: 1px solid var(--line);
}

.toc-list li { margin: 0; }

.toc-list a {
  display: block;
  padding: 5px 0 5px 14px;
  margin-left: -1px;
  font-size: 13px;
  color: var(--text-dim);
  text-decoration: none;
  border-left: 2px solid transparent;
  transition: color .2s ease, border-color .2s ease;
}
.toc-list a:hover { color: var(--text); }
.toc-list a.is-active {
  color: var(--accent);
  border-left-color: var(--accent);
  font-weight: 600;
}

.toc-list a.toc-h3 {
  padding-left: 26px;
  font-size: 12.5px;
}

/* =========================================================
   10. 上一篇 / 下一篇
   ========================================================= */
.doc-pager {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 60px;
  padding-top: 32px;
  border-top: 1px solid var(--line);
}

.doc-pager a {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 20px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  text-decoration: none;
  transition:
    border-color .3s ease,
    box-shadow .3s ease,
    transform .4s var(--ease);
}
.doc-pager a:hover {
  border-color: var(--accent);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.doc-pager-next { text-align: right; }

.pager-label {
  font-size: 12px;
  color: var(--text-dim);
}
.pager-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--accent);
}

/* =========================================================
   11. 索引页：插件卡片
   ========================================================= */
.plugin-count {
  font-size: 13px;
  color: var(--text-dim);
}

.plugin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.plugin-card {
  display: flex;
  flex-direction: column;
  padding: 22px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 14px;
  text-decoration: none;
  transition:
    transform .5s var(--ease),
    box-shadow .5s var(--ease),
    border-color .35s ease;
}
.plugin-card:hover {
  transform: translateY(-5px);
  border-color: color-mix(in srgb, var(--accent) 38%, var(--line));
  box-shadow: var(--shadow-md);
}

.plugin-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.plugin-icon {
  font-size: 28px;
  line-height: 1;
}

.plugin-version {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--text-dim);
  background: var(--surface-2);
  border: 1px solid var(--line);
  padding: 2px 8px;
  border-radius: 6px;
}

.plugin-title {
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -.01em;
  color: var(--text);
  margin-bottom: 8px;
  transition: color .3s ease;
}
.plugin-card:hover .plugin-title { color: var(--accent); }

.plugin-desc {
  font-size: 14px;
  line-height: 1.65;
  color: var(--text-soft);
  flex: 1;
  margin-bottom: 16px;
}

.plugin-card-foot {
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid var(--line);
  font-size: 12px;
  color: var(--text-dim);
}

/* =========================================================
   12. 响应式
   ========================================================= */
@media (max-width: 1100px) {
  .docs-layout {
    grid-template-columns: 220px minmax(0, 1fr);
  }
  .docs-toc { display: none; }
}

@media (max-width: 820px) {
  .docs-layout { grid-template-columns: 1fr; }

  .docs-sidebar {
    position: fixed;
    top: 60px;
    left: 0;
    z-index: 50;
    width: 260px;
    height: calc(100vh - 60px);
    background: var(--surface);
    border-right: 1px solid var(--line);
    transform: translateX(-100%);
    transition: transform .35s var(--ease);
    padding: 20px 16px 40px;
  }
  .docs-sidebar.is-open { transform: translateX(0); }

  .sidebar-toggle { display: flex; }

  .sidebar-overlay.is-open { display: block; }

  .docs-content { padding: 28px 20px 60px; }

  .doc-section h1 { font-size: 25px; }
  .doc-section h2 { font-size: 19px; }
  .doc-section h3 { font-size: 16px; }

  .doc-pager { grid-template-columns: 1fr; }
  .doc-pager-next { text-align: left; }

  .plugin-header {
    flex-direction: column;
    gap: 12px;
  }
  .plugin-header-icon { font-size: 36px; }
  .plugin-header-title { font-size: 26px; }

  .plugin-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .doc-table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
}

/* =========================================================
   13. 尊重「减少动画」偏好
   ========================================================= */
@media (prefers-reduced-motion: reduce) {
  .docs-sidebar,
  .plugin-card,
  .doc-pager a {
    transition-duration: .01ms !important;
  }
  .plugin-card:hover,
  .doc-pager a:hover {
    transform: none !important;
  }
}