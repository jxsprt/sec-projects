// ============================================================
// sec-projects v2 — Search & Filter Engine
// Real-time search + multi-facet filtering + URL state
// ============================================================

// Current filter state
let filterState = {
  search: '',
  categories: [],    // active category filters
  difficulties: [],  // active difficulty filters
  skill: null        // single skill filter (mutually exclusive with others)
};

// ===== Apply all filters =====
function applyFilters() {
  let results = [...PROJECTS];

  // Skill filter (takes priority, clears other filters visually)
  if (filterState.skill) {
    results = results.filter(p => p.skills.includes(filterState.skill));
  } else {
    // Category filter
    if (filterState.categories.length > 0) {
      results = results.filter(p => filterState.categories.includes(p.category));
    }

    // Difficulty filter
    if (filterState.difficulties.length > 0) {
      results = results.filter(p => filterState.difficulties.includes(p.difficulty));
    }
  }

  // Search (full-text across title, summary, skills, category name)
  if (filterState.search.trim()) {
    const query = filterState.search.toLowerCase().trim();
    results = results.filter(p => {
      return p.title.toLowerCase().includes(query) ||
             p.summary.toLowerCase().includes(query) ||
             p.skills.some(s => s.toLowerCase().includes(query)) ||
             CATEGORIES[p.category].name.toLowerCase().includes(query);
    });
  }

  // Sort: beginner first, then by category order
  results.sort((a, b) => {
    const d = DIFFICULTY[a.difficulty].order - DIFFICULTY[b.difficulty].order;
    if (d !== 0) return d;
    return CATEGORIES[a.category].order - CATEGORIES[b.category].order;
  });

  return results;
}

// ===== Update the UI =====
function updateResults() {
  const filtered = applyFilters();
  const grid = document.getElementById('projectGrid');
  const countEl = document.getElementById('resultCount');
  const progressData = getProgressData ? getProgressData() : {};

  if (grid) {
    const newGrid = renderProjectGrid(filtered, progressData);
    grid.replaceWith(newGrid);
  }

  if (countEl) {
    countEl.innerHTML = `<strong>${filtered.length}</strong> of ${PROJECTS.length} projects`;
  }

  // Update filter sidebar active states
  updateFilterUI();

  // Update URL
  updateURL();
}

// ===== Update filter sidebar UI =====
function updateFilterUI() {
  // Category checkboxes
  document.querySelectorAll('.filter-group[data-filter="category"] .filter-option').forEach(el => {
    const cat = el.getAttribute('data-value');
    el.classList.toggle('active', filterState.categories.includes(cat));
    // Update count
    const countSpan = el.querySelector('.filter-count');
    if (countSpan) {
      const count = PROJECTS.filter(p => p.category === cat).length;
      countSpan.textContent = count;
    }
  });

  // Difficulty checkboxes
  document.querySelectorAll('.filter-group[data-filter="difficulty"] .filter-option').forEach(el => {
    const diff = el.getAttribute('data-value');
    el.classList.toggle('active', filterState.difficulties.includes(diff));
    const countSpan = el.querySelector('.filter-count');
    if (countSpan) {
      const count = PROJECTS.filter(p => p.difficulty === diff).length;
      countSpan.textContent = count;
    }
  });

  // Skill tags
  document.querySelectorAll('.active-skill-tag').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-skill') === filterState.skill);
  });
}

// ===== Set a single skill filter =====
function setSkillFilter(skill) {
  if (filterState.skill === skill) {
    filterState.skill = null;  // toggle off
  } else {
    filterState.skill = skill;
    filterState.categories = [];
    filterState.difficulties = [];
  }
  updateResults();
}

// ===== Toggle a category filter =====
function toggleCategory(category) {
  filterState.skill = null;  // clear skill filter
  const idx = filterState.categories.indexOf(category);
  if (idx >= 0) {
    filterState.categories.splice(idx, 1);
  } else {
    filterState.categories.push(category);
  }
  updateResults();
}

// ===== Toggle a difficulty filter =====
function toggleDifficulty(difficulty) {
  filterState.skill = null;
  const idx = filterState.difficulties.indexOf(difficulty);
  if (idx >= 0) {
    filterState.difficulties.splice(idx, 1);
  } else {
    filterState.difficulties.push(difficulty);
  }
  updateResults();
}

// ===== Clear all filters =====
function clearFilters() {
  filterState = { search: '', categories: [], difficulties: [], skill: null };
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  updateResults();
}

// ===== URL state management =====
function updateURL() {
  const params = new URLSearchParams();

  if (filterState.search) params.set('q', filterState.search);
  if (filterState.skill) params.set('skill', filterState.skill);

  filterState.categories.forEach(c => params.append('cat', c));
  filterState.difficulties.forEach(d => params.append('diff', d));

  const qs = params.toString();
  const newURL = qs ? `?${qs}` : window.location.pathname;
  window.history.replaceState(filterState, '', newURL);
}

function loadFromURL() {
  const params = new URLSearchParams(window.location.search);

  filterState.search = params.get('q') || '';
  filterState.skill = params.get('skill') || null;
  filterState.categories = params.getAll('cat');
  filterState.difficulties = params.getAll('diff');

  // Update search input
  const searchInput = document.getElementById('searchInput');
  if (searchInput && filterState.search) {
    searchInput.value = filterState.search;
  }
}

// ===== Build filter sidebar =====
function renderSidebar() {
  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.id = 'filterSidebar';

  // Category filters
  const catGroup = document.createElement('div');
  catGroup.className = 'filter-group';
  catGroup.setAttribute('data-filter', 'category');
  catGroup.innerHTML = `<div class="filter-group-title">Category</div>`;

  Object.entries(CATEGORIES).forEach(([key, cat]) => {
    const count = PROJECTS.filter(p => p.category === key).length;
    const opt = document.createElement('div');
    opt.className = 'filter-option';
    opt.setAttribute('data-value', key);
    opt.onclick = () => toggleCategory(key);
    opt.innerHTML = `
      <span class="filter-checkbox"></span>
      ${cat.icon} ${cat.name}
      <span class="filter-count">${count}</span>
    `;
    catGroup.appendChild(opt);
  });

  // Difficulty filters
  const diffGroup = document.createElement('div');
  diffGroup.className = 'filter-group';
  diffGroup.setAttribute('data-filter', 'difficulty');
  diffGroup.innerHTML = `<div class="filter-group-title">Difficulty</div>`;

  Object.entries(DIFFICULTY).forEach(([key, diff]) => {
    const count = PROJECTS.filter(p => p.difficulty === key).length;
    const opt = document.createElement('div');
    opt.className = 'filter-option';
    opt.setAttribute('data-value', key);
    opt.onclick = () => toggleDifficulty(key);
    opt.innerHTML = `
      <span class="filter-checkbox"></span>
      ${diff.label}
      <span class="filter-count">${count}</span>
    `;
    diffGroup.appendChild(opt);
  });

  // Clear button
  const clearBtn = document.createElement('button');
  clearBtn.className = 'btn btn-secondary btn-sm';
  clearBtn.style.cssText = 'width: 100%; margin-top: var(--space-4);';
  clearBtn.textContent = 'Clear Filters';
  clearBtn.onclick = clearFilters;

  sidebar.appendChild(catGroup);
  sidebar.appendChild(diffGroup);
  sidebar.appendChild(clearBtn);

  return sidebar;
}

// ===== Initialize search =====
function initSearch() {
  // Load state from URL
  loadFromURL();

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterState.search = e.target.value;
      updateResults();
    });
  }

  // Keyboard shortcut: / to focus search
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      if (searchInput) searchInput.focus();
    }
  });
}
