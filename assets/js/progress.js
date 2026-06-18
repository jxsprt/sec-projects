// ============================================================
// sec-projects v2 — Progress Tracking
// localStorage-based project progress: none → todo → in-progress → done
// ============================================================

const PROGRESS_KEY = 'sec-projects-progress';
const PROGRESS_STATES = ['none', 'todo', 'in-progress', 'done'];

// ===== Get all progress data =====
function getProgressData() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// ===== Get progress for a specific project =====
function getProgress(projectId) {
  const data = getProgressData();
  return data[projectId] || 'none';
}

// ===== Set progress for a project =====
function setProgress(projectId, status) {
  if (!PROGRESS_STATES.includes(status)) return;

  const data = getProgressData();

  if (status === 'none') {
    delete data[projectId];
  } else {
    data[projectId] = status;
  }

  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
  } catch (e) {
    showToast('Storage full — unable to save progress');
    return;
  }
}

// ===== Cycle to next progress state =====
function cycleProgress(projectId) {
  const current = getProgress(projectId);
  const idx = PROGRESS_STATES.indexOf(current);
  const next = PROGRESS_STATES[(idx + 1) % PROGRESS_STATES.length];
  setProgress(projectId, next);
  return next;
}

// ===== Progress statistics =====
function getProgressStats() {
  const data = getProgressData();
  const total = PROJECTS.length;

  let todo = 0, inProgress = 0, done = 0;

  PROJECTS.forEach(p => {
    const status = data[p.id] || 'none';
    if (status === 'todo') todo++;
    else if (status === 'in-progress') inProgress++;
    else if (status === 'done') done++;
  });

  const active = todo + inProgress + done;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  return { total, todo, inProgress, done, active, percent };
}

// ===== Render progress dashboard =====
function renderProgressDashboard() {
  const stats = getProgressStats();
  const dashboard = document.createElement('div');
  dashboard.className = 'progress-dashboard';

  const cards = [
    { value: stats.done, label: 'Completed', color: 'var(--color-green)' },
    { value: stats.inProgress, label: 'In Progress', color: 'var(--color-yellow)' },
    { value: stats.todo, label: 'To Do', color: 'var(--color-text-muted)' },
    { value: `${stats.percent}%`, label: 'Total Progress', color: 'var(--color-accent)' }
  ];

  cards.forEach(c => {
    const card = document.createElement('div');
    card.className = 'progress-card';
    card.innerHTML = `
      <div class="progress-card-value" style="color:${c.color}">${c.value}</div>
      <div class="progress-card-label">${c.label}</div>
    `;
    dashboard.appendChild(card);
  });

  return dashboard;
}

// ===== Render progress button for project pages =====
function renderProgressButton(projectId) {
  const status = getProgress(projectId);
  const btn = document.createElement('button');
  btn.className = 'btn';

  const labels = {
    none: 'Mark as To Do',
    todo: 'Start Working',
    'in-progress': 'Mark as Done',
    done: 'Reset Progress'
  };

  const styles = {
    none: 'btn-primary',
    todo: 'btn-secondary',
    'in-progress': 'btn-secondary',
    done: 'btn-ghost'
  };

  btn.className = `btn ${styles[status]}`;
  btn.textContent = labels[status];
  btn.onclick = () => {
    const next = cycleProgress(projectId);
    const newLabels = {
      none: 'Mark as To Do', todo: 'Start Working',
      'in-progress': 'Mark as Done', done: 'Reset Progress'
    };
    btn.className = `btn ${styles[next]}`;
    btn.textContent = newLabels[next];

    const statusLabels = {
      none: '', todo: 'To Do',
      'in-progress': 'In Progress', done: 'Done'
    };
    showToast(statusLabels[next] ? `Status: ${statusLabels[next]}` : 'Progress reset');
  };

  return btn;
}

// ===== Export progress =====
function exportProgress() {
  const data = getProgressData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sec-projects-progress.json';
  a.click();
  URL.revokeObjectURL(url);
  showToast('Progress exported');
}

// ===== Import progress =====
function importProgress(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
      showToast('Progress imported');
      window.location.reload();
    } catch {
      showToast('Invalid progress file');
    }
  };
  reader.readAsText(file);
}

// ===== Reset all progress =====
function resetProgress() {
  if (confirm('Reset ALL progress? This cannot be undone.')) {
    localStorage.removeItem(PROGRESS_KEY);
    showToast('Progress reset');
    window.location.reload();
  }
}

// ===== Init progress on main page =====
function initProgressSection() {
  const section = document.getElementById('progressSection');
  if (!section) return;

  const stats = getProgressStats();
  if (stats.active === 0) {
    section.innerHTML = `
      <div style="text-align:center;padding:var(--space-8);color:var(--color-text-muted);">
        <p>No projects tracked yet. Click a project to get started.</p>
      </div>
    `;
    return;
  }

  section.appendChild(renderProgressDashboard());

  const actions = document.createElement('div');
  actions.style.cssText = 'display:flex;gap:var(--space-3);justify-content:center;margin-top:var(--space-4);';
  actions.innerHTML = `
    <button class="btn btn-secondary btn-sm" onclick="exportProgress()">Export</button>
    <button class="btn btn-secondary btn-sm" onclick="document.getElementById('importFile').click()">Import</button>
    <button class="btn btn-ghost btn-sm" onclick="resetProgress()">Reset</button>
    <input type="file" id="importFile" accept=".json" style="display:none" onchange="importProgress(this.files[0])">
  `;
  section.appendChild(actions);
}

// Make functions globally available
window.getProgressData = getProgressData;
window.getProgress = getProgress;
window.setProgress = setProgress;
window.cycleProgress = cycleProgress;
window.exportProgress = exportProgress;
window.importProgress = importProgress;
window.resetProgress = resetProgress;
