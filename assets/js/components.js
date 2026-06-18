// ============================================================
// sec-projects v2 — Shared Components
// Dynamic rendering: nav, cards, footer, breadcrumbs, etc.
// ============================================================

// ===== Navigation =====
function renderNav() {
  const nav = document.createElement('nav');
  nav.className = 'nav';
  nav.innerHTML = `
    <div class="nav-inner">
      <a href="/" class="nav-logo">
        <span class="nav-logo-icon">&#x25C9;</span>
        sec-projects
      </a>
      <div class="search-wrapper">
        <span class="search-icon">&#x1F50D;</span>
        <input type="text" class="search-input" id="searchInput"
               placeholder="Search projects..." aria-label="Search projects">
        <span class="search-shortcut">/</span>
      </div>
      <div class="nav-links">
        <a href="/" class="nav-link active" data-nav="home">Projects</a>
        <a href="/resources/learning-paths.html" class="nav-link" data-nav="paths">Paths</a>
        <a href="/resources/tools.html" class="nav-link" data-nav="tools">Tools</a>
        <a href="/resources/links.html" class="nav-link" data-nav="links">Resources</a>
      </div>
      <div class="nav-actions">
        <button class="btn-icon" id="themeToggle" aria-label="Toggle theme" title="Toggle theme">
          &#x1F319;
        </button>
        <a href="https://github.com/0xjaspreet/sec-projects" class="btn-icon" target="_blank" aria-label="GitHub" title="View on GitHub">
          &#x2197;
        </a>
      </div>
    </div>
  `;
  return nav;
}

// ===== Footer =====
function renderFooter() {
  const footer = document.createElement('footer');
  footer.style.cssText = `
    text-align: center; padding: var(--space-10) var(--space-6);
    border-top: 1px solid var(--color-border); margin-top: var(--space-16);
    color: var(--color-text-muted); font-size: var(--font-size-sm);
  `;
  footer.innerHTML = `
    <p style="margin-bottom: var(--space-2);">
      <strong>sec-projects</strong> — Hands-on cybersecurity projects for learners at every level.
    </p>
    <p style="margin-bottom: 0;">
      Built by <a href="https://jaspreetsec.com">Jaspreet Singh</a> &middot;
      <a href="https://github.com/0xjaspreet/sec-projects">GitHub</a> &middot;
      Licensed under MIT
    </p>
  `;
  return footer;
}

// ===== Project Card =====
function renderProjectCard(project, progressStatus) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.setAttribute('data-project-id', project.id);
  card.onclick = () => { window.location.href = project.page; };

  const cat = CATEGORIES[project.category];
  const diff = DIFFICULTY[project.difficulty];

  // Progress indicator
  let progressHTML = '';
  if (progressStatus && progressStatus !== 'none') {
    progressHTML = `<div class="card-progress" data-status="${progressStatus}"></div>`;
  }

  card.innerHTML = `
    ${progressHTML}
    <div class="card-header">
      <span class="badge ${diff.class}">${diff.label}</span>
      <span class="card-meta-item" style="font-size:var(--font-size-xs);color:var(--color-text-muted);">
        ${cat.icon} ${cat.name}
      </span>
    </div>
    <h3 class="card-title">${project.title}</h3>
    <p class="card-description">${project.summary}</p>
    <div class="card-tags">
      ${project.skills.map(s => `<span class="tag" onclick="event.stopPropagation(); filterBySkill('${s}')">${s}</span>`).join('')}
    </div>
    <div class="card-footer">
      <span class="card-meta-item">
        &#x23F1; ${project.time}
      </span>
      <span style="font-size:var(--font-size-xs);color:var(--color-accent);">
        View Project &#x2192;
      </span>
    </div>
  `;
  return card;
}

// ===== Project Grid =====
function renderProjectGrid(projects, progressData = {}) {
  const grid = document.createElement('div');
  grid.className = 'project-grid';
  grid.id = 'projectGrid';

  if (projects.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">&#x1F50D;</div>
        <h3 class="empty-state-title">No projects match</h3>
        <p class="empty-state-desc">Try adjusting your filters or search terms.</p>
      </div>
    `;
    return grid;
  }

  projects.forEach(p => {
    grid.appendChild(renderProjectCard(p, progressData[p.id]));
  });

  return grid;
}

// ===== Breadcrumbs =====
function renderBreadcrumbs(items) {
  const bc = document.createElement('div');
  bc.className = 'breadcrumbs';
  bc.innerHTML = items.map((item, i) => {
    const sep = i < items.length - 1 ? '<span class="breadcrumb-sep">/</span>' : '';
    if (item.url) {
      return `<a href="${item.url}">${item.label}</a>${sep}`;
    }
    return `<span>${item.label}</span>${sep}`;
  }).join('');
  return bc;
}

// ===== Resource Links List =====
function renderResourceLinks(resources) {
  const div = document.createElement('div');
  div.style.display = 'flex';
  div.style.flexDirection = 'column';
  div.style.gap = 'var(--space-2)';

  resources.forEach(r => {
    const link = document.createElement('a');
    link.className = 'resource-link';
    link.href = r.url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.innerHTML = `<span class="resource-link-icon">&#x1F517;</span> ${r.name}`;
    div.appendChild(link);
  });

  return div;
}

// ===== Skill Tag (clickable filter) =====
function renderSkillTag(skill, isActive = false) {
  const tag = document.createElement('span');
  tag.className = `tag${isActive ? ' active' : ''}`;
  tag.textContent = skill;
  tag.onclick = (e) => {
    e.stopPropagation();
    filterBySkill(skill);
  };
  return tag;
}

// ===== Difficulty Badge =====
function renderDifficultyBadge(difficulty) {
  const span = document.createElement('span');
  span.className = `badge ${DIFFICULTY[difficulty].class}`;
  span.textContent = DIFFICULTY[difficulty].label;
  return span;
}

// ===== Toast Notification =====
function showToast(message, duration = 2500) {
  // Remove existing toasts
  document.querySelectorAll('.toast').forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ===== Copy to Clipboard =====
function initCopyButtons() {
  document.querySelectorAll('pre').forEach(block => {
    if (block.querySelector('.copy-btn')) return;

    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.onclick = async () => {
      const code = block.querySelector('code')?.textContent || block.textContent;
      try {
        await navigator.clipboard.writeText(code);
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      } catch {
        btn.textContent = 'Failed';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      }
    };
    block.style.position = 'relative';
    block.appendChild(btn);
  });
}

// ===== Inject shared assets into project pages =====
function loadSharedAssets(options = {}) {
  const { includeLayout = true, includeComponents = true } = options;

  const head = document.head;

  // Fonts
  if (!document.querySelector('link[href*="Inter"]')) {
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap';
    head.appendChild(fontLink);
  }

  // Theme CSS
  const themeCSS = document.createElement('link');
  themeCSS.rel = 'stylesheet';
  themeCSS.href = '/assets/css/theme.css';
  head.appendChild(themeCSS);

  if (includeLayout) {
    const layoutCSS = document.createElement('link');
    layoutCSS.rel = 'stylesheet';
    layoutCSS.href = '/assets/css/layout.css';
    head.appendChild(layoutCSS);
  }

  if (includeComponents) {
    const compCSS = document.createElement('link');
    compCSS.rel = 'stylesheet';
    compCSS.href = '/assets/css/components.css';
    head.appendChild(compCSS);
  }

  // JS modules
  const scripts = ['/assets/js/theme.js'];
  scripts.forEach(src => {
    if (!document.querySelector(`script[src="${src}"]`)) {
      const s = document.createElement('script');
      s.src = src;
      s.defer = true;
      head.appendChild(s);
    }
  });
}

// ===== Initialize page (call at DOMContentLoaded) =====
function initPage({ nav = true, footer = true, copyButtons = true } = {}) {
  if (nav) {
    const navEl = renderNav();
    document.body.prepend(navEl);
  }
  if (footer) {
    document.body.appendChild(renderFooter());
  }
  if (copyButtons) {
    document.addEventListener('DOMContentLoaded', initCopyButtons);
  }
}

// Make available globally for onclick handlers in HTML
window.filterBySkill = function(skill) {
  // If on main page, use search engine's filter
  if (typeof setSkillFilter === 'function') {
    setSkillFilter(skill);
  } else {
    window.location.href = `/?skill=${encodeURIComponent(skill)}`;
  }
};
