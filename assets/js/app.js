// ============================================================
// sec-projects v2 — Main App
// Initializes everything: nav, search, sidebar, project grid
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // Inject nav
  const navEl = renderNav();
  document.body.prepend(navEl);

  // Inject footer
  const footerEl = renderFooter();
  document.body.appendChild(footerEl);

  // Initialize theme (already auto-inits from theme.js, but ensure toggle button works)
  initTheme();

  // Build app shell
  const shell = document.getElementById('appShell');
  if (!shell) return;

  // Sidebar
  const sidebar = renderSidebar();
  shell.appendChild(sidebar);

  // Main content
  const main = document.createElement('main');
  main.className = 'main-content';

  main.innerHTML = `
    <div class="content-header">
      <h1 class="content-title">Cybersecurity Projects</h1>
      <p class="content-subtitle">Hands-on projects from beginner to expert — build real tools, learn real skills.</p>
    </div>
    <div class="result-count" id="resultCount"></div>
    <div id="projectGrid"></div>
  `;

  shell.appendChild(main);

  // Progress section (collapsible)
  const progressWrap = document.createElement('div');
  progressWrap.id = 'progressSection';
  progressWrap.style.cssText = 'margin-top: var(--space-10);';
  const stats = getProgressStats();
  if (stats.active > 0) {
    const progressHeader = document.createElement('h2');
    progressHeader.style.cssText = 'border-bottom: 1px solid var(--color-border); padding-bottom: var(--space-2); margin-bottom: var(--space-6);';
    progressHeader.textContent = 'Your Progress';
    progressWrap.appendChild(progressHeader);
    initProgressSection();
  }
  main.appendChild(progressWrap);

  // Initialize search engine
  initSearch();

  // Apply initial filters (from URL or defaults)
  updateResults();
});
