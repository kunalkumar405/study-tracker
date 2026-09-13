/**
 * ====================================================================
 * CLASS 12 BOARD EXAM COMMAND CENTER
 * Complete Client-Side Application Logic (Vanilla JS)
 * ====================================================================
 */

// ====================================================================
// 1. OFFICIAL SYLLABUS DATA (EXACTLY 37 CHAPTERS)
// ====================================================================
const INITIAL_CHAPTERS_DATA = [
  // --- PHYSICS (14 Chapters) ---
  { id: 'phy-1', subject: 'physics', num: 1, name: 'Electric Charges and Fields' },
  { id: 'phy-2', subject: 'physics', num: 2, name: 'Electrostatic Potential and Capacitance' },
  { id: 'phy-3', subject: 'physics', num: 3, name: 'Current Electricity' },
  { id: 'phy-4', subject: 'physics', num: 4, name: 'Moving Charges and Magnetism' },
  { id: 'phy-5', subject: 'physics', num: 5, name: 'Magnetism and Matter' },
  { id: 'phy-6', subject: 'physics', num: 6, name: 'Electromagnetic Induction' },
  { id: 'phy-7', subject: 'physics', num: 7, name: 'Alternating Current' },
  { id: 'phy-8', subject: 'physics', num: 8, name: 'Electromagnetic Waves' },
  { id: 'phy-9', subject: 'physics', num: 9, name: 'Ray Optics and Optical Instruments' },
  { id: 'phy-10', subject: 'physics', num: 10, name: 'Wave Optics' },
  { id: 'phy-11', subject: 'physics', num: 11, name: 'Dual Nature of Radiation and Matter' },
  { id: 'phy-12', subject: 'physics', num: 12, name: 'Atoms' },
  { id: 'phy-13', subject: 'physics', num: 13, name: 'Nuclei' },
  { id: 'phy-14', subject: 'physics', num: 14, name: 'Semiconductor Electronics' },

  // --- CHEMISTRY (10 Chapters) ---
  { id: 'chem-1', subject: 'chemistry', num: 1, name: 'Solutions' },
  { id: 'chem-2', subject: 'chemistry', num: 2, name: 'Electrochemistry' },
  { id: 'chem-3', subject: 'chemistry', num: 3, name: 'Chemical Kinetics' },
  { id: 'chem-4', subject: 'chemistry', num: 4, name: 'd -and f -Block Elements' },
  { id: 'chem-5', subject: 'chemistry', num: 5, name: 'Coordination Compounds' },
  { id: 'chem-6', subject: 'chemistry', num: 6, name: 'Haloalkanes and Haloarenes' },
  { id: 'chem-7', subject: 'chemistry', num: 7, name: 'Alcohols, Phenols and Ethers' },
  { id: 'chem-8', subject: 'chemistry', num: 8, name: 'Aldehydes, Ketones and Carboxylic Acids' },
  { id: 'chem-9', subject: 'chemistry', num: 9, name: 'Amines' },
  { id: 'chem-10', subject: 'chemistry', num: 10, name: 'Biomolecules' },

  // --- BIOLOGY (13 Chapters) ---
  { id: 'bio-1', subject: 'biology', num: 1, name: 'Sexual Reproduction in Flowering Plants' },
  { id: 'bio-2', subject: 'biology', num: 2, name: 'Human Reproduction' },
  { id: 'bio-3', subject: 'biology', num: 3, name: 'Reproductive Health' },
  { id: 'bio-4', subject: 'biology', num: 4, name: 'Principles of Inheritance and Variation' },
  { id: 'bio-5', subject: 'biology', num: 5, name: 'Molecular Basis of Inheritance' },
  { id: 'bio-6', subject: 'biology', num: 6, name: 'Evolution' },
  { id: 'bio-7', subject: 'biology', num: 7, name: 'Human Health and Disease' },
  { id: 'bio-8', subject: 'biology', num: 8, name: 'Microbes in Human Welfare' },
  { id: 'bio-9', subject: 'biology', num: 9, name: 'Biotechnology: Principles and Processes' },
  { id: 'bio-10', subject: 'biology', num: 10, name: 'Biotechnology and its Applications' },
  { id: 'bio-11', subject: 'biology', num: 11, name: 'Organisms and Populations' },
  { id: 'bio-12', subject: 'biology', num: 12, name: 'Ecosystem' },
  { id: 'bio-13', subject: 'biology', num: 13, name: 'Biodiversity and Conservation' }
];

// Initial Achievements Definitions (10 Achievements)
const ACHIEVEMENTS_DEF = [
  { id: 'first_chapter', icon: '🏅', name: 'First Chapter', desc: 'Completed your first syllabus chapter' },
  { id: 'streak_3', icon: '🔥', name: '3-Day Streak', desc: 'Maintained active study for 3 consecutive days' },
  { id: 'streak_7', icon: '🔥', name: '7-Day Streak', desc: 'Maintained active study for 7 consecutive days' },
  { id: 'chapters_10', icon: '📚', name: '10 Chapters', desc: 'Completed 10 board syllabus chapters' },
  { id: 'syllabus_50', icon: '🎯', name: '50% Syllabus', desc: 'Crossed the halfway mark (19 chapters)' },
  { id: 'syllabus_100', icon: '🚀', name: '100% Syllabus', desc: 'Mastered all 37 chapters of Class 12' },
  { id: 'focus_10h', icon: '⏱️', name: '10 Hours Focused', desc: 'Logged 10 total hours in deep focus sessions' },
  { id: 'focus_50h', icon: '⏱️', name: '50 Hours Focused', desc: 'Logged 50 total hours in deep focus sessions' },
  { id: 'focus_100h', icon: '👑', name: '100 Hours Focused', desc: 'Mastery: 100 hours of distraction-free study' },
  { id: 'pyqs_100', icon: '📝', name: '100 PYQs Solved', desc: 'Solved 100+ Previous Year Questions' }
];

// ====================================================================
// 2. APPLICATION STATE & STORAGE
// ====================================================================
const STORAGE_KEY = 'CLASS12_COMMAND_CENTER_V1';
const TIMER_STORAGE_KEY = 'CLASS12_ACTIVE_TIMER';

// Primary Application State
let appState = {
  version: 1,
  chapters: {},
  tasks: [],
  focusSessions: [],
  settings: {
    dailyTarget: 4,
    theme: 'light'
  },
  streak: {
    current: 0,
    best: 0,
    lastActiveDate: null,
    activeDates: []
  },
  activities: [],
  achievements: {}
};

/**
 * Generate default chapter object
 */
function createDefaultChapter(meta) {
  return {
    id: meta.id,
    subject: meta.subject,
    num: meta.num,
    name: meta.name,
    status: 'Not Started', // 'Not Started' | 'Learning' | 'Completed' | 'Revised' | 'PYQ Done' | 'Mastered'
    completed: false,
    revisions: {
      r1: false,
      r2: false,
      r3: false,
      dueDate: ''
    },
    pyqs: {
      done: 0,
      total: 20
    },
    notes: '',
    completedDate: null
  };
}

/**
 * Load application state from localStorage
 */
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        appState = Object.assign({}, appState, parsed);
      }
    }
  } catch (err) {
    console.error('Failed to load localStorage data:', err);
  }

  // Ensure all 37 chapters exist in state
  INITIAL_CHAPTERS_DATA.forEach(meta => {
    if (!appState.chapters[meta.id]) {
      appState.chapters[meta.id] = createDefaultChapter(meta);
    } else {
      // Ensure missing keys inside chapter are filled
      appState.chapters[meta.id].name = meta.name;
      appState.chapters[meta.id].subject = meta.subject;
      appState.chapters[meta.id].num = meta.num;
      if (!appState.chapters[meta.id].revisions) {
        appState.chapters[meta.id].revisions = { r1: false, r2: false, r3: false, dueDate: '' };
      }
      if (!appState.chapters[meta.id].pyqs) {
        appState.chapters[meta.id].pyqs = { done: 0, total: 20 };
      }
    }
  });

  // Ensure achievements map has all definitions
  ACHIEVEMENTS_DEF.forEach(ach => {
    if (!appState.achievements[ach.id]) {
      appState.achievements[ach.id] = {
        unlocked: false,
        unlockedAt: null
      };
    }
  });

  // Apply Theme
  applyTheme(appState.settings.theme || 'light');
}

/**
 * Save application state to localStorage
 */
function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (err) {
    console.error('Failed to save state to localStorage:', err);
    showToast('⚠️ Storage error: could not save data locally.');
  }
}

/**
 * Get current date string in YYYY-MM-DD
 */
function getTodayString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Record meaningful activity and update streak
 */
function recordMeaningfulActivity(description, icon = '⚡') {
  const today = getTodayString();
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Add to activity feed (keep latest 80 items)
  appState.activities.unshift({
    id: 'act-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    description,
    icon,
    date: today,
    time: timeStr,
    timestamp: Date.now()
  });

  if (appState.activities.length > 80) {
    appState.activities = appState.activities.slice(0, 80);
  }

  // Update Streak
  updateStreak(today);

  // Check Achievements
  checkAchievements();

  // Save and render
  saveState();
  renderDashboard();
  renderAnalytics();
}

/**
 * Update daily streak
 */
function updateStreak(todayDateStr) {
  if (!appState.streak) {
    appState.streak = { current: 0, best: 0, lastActiveDate: null, activeDates: [] };
  }

  const streak = appState.streak;
  if (!streak.activeDates) streak.activeDates = [];

  if (!streak.activeDates.includes(todayDateStr)) {
    streak.activeDates.push(todayDateStr);
  }

  if (streak.lastActiveDate === todayDateStr) {
    // Already active today
    return;
  }

  if (!streak.lastActiveDate) {
    streak.current = 1;
    streak.best = Math.max(streak.best || 0, 1);
    streak.lastActiveDate = todayDateStr;
    return;
  }

  // Calculate day difference between lastActiveDate and today
  const lastDate = new Date(streak.lastActiveDate + 'T00:00:00');
  const todayDate = new Date(todayDateStr + 'T00:00:00');
  const diffDays = Math.round((todayDate - lastDate) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    // Consecutive day!
    streak.current = (streak.current || 0) + 1;
  } else if (diffDays > 1) {
    // Streak broken, start anew
    streak.current = 1;
  }

  streak.best = Math.max(streak.best || 0, streak.current);
  streak.lastActiveDate = todayDateStr;
}

/**
 * Check and unlock achievements
 */
function checkAchievements() {
  const chaptersList = Object.values(appState.chapters);
  const completedCount = chaptersList.filter(c => c.completed).length;
  const currentStreak = (appState.streak && appState.streak.current) || 0;
  const bestStreak = (appState.streak && appState.streak.best) || 0;
  const effectiveStreak = Math.max(currentStreak, bestStreak);

  const totalFocusSeconds = appState.focusSessions.reduce((acc, s) => acc + (s.durationSeconds || 0), 0);
  const totalFocusHours = totalFocusSeconds / 3600;

  const totalPyqsSolved = chaptersList.reduce((acc, c) => acc + (c.pyqs ? c.pyqs.done : 0), 0);

  const unlockMap = {
    first_chapter: completedCount >= 1,
    streak_3: effectiveStreak >= 3,
    streak_7: effectiveStreak >= 7,
    chapters_10: completedCount >= 10,
    syllabus_50: completedCount >= 19,
    syllabus_100: completedCount >= 37,
    focus_10h: totalFocusHours >= 10,
    focus_50h: totalFocusHours >= 50,
    focus_100h: totalFocusHours >= 100,
    pyqs_100: totalPyqsSolved >= 100
  };

  ACHIEVEMENTS_DEF.forEach(def => {
    if (unlockMap[def.id] && !appState.achievements[def.id].unlocked) {
      appState.achievements[def.id].unlocked = true;
      appState.achievements[def.id].unlockedAt = new Date().toLocaleDateString();
      showToast(`🏆 Achievement Unlocked: ${def.name}!`);
    }
  });
}

// ====================================================================
// 3. EXAM COUNTDOWN (TARGET: FEB 1, 2027 00:00:00 LOCAL TIME)
// ====================================================================
// STRICT: Month index 1 is February in JavaScript (0 = Jan, 1 = Feb)
const TARGET_EXAM_DATE = new Date(2027, 1, 1, 0, 0, 0, 0);

function initExamCountdown() {
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-minutes');
  const secsEl = document.getElementById('cd-seconds');
  const bannerEl = document.getElementById('exam-day-banner');
  const gridEl = document.getElementById('countdown-grid');

  function updateCountdown() {
    const now = new Date();
    const diff = TARGET_EXAM_DATE.getTime() - now.getTime();

    if (diff <= 0) {
      // Exam day has arrived or passed
      if (bannerEl) bannerEl.classList.remove('hidden');
      if (gridEl) gridEl.classList.add('hidden');
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minsEl) minsEl.textContent = '00';
      if (secsEl) secsEl.textContent = '00';
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (daysEl) daysEl.textContent = String(days);
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ====================================================================
// 4. NAVIGATION & VIEWS
// ====================================================================
function switchView(viewName) {
  // Update view panels
  const panels = document.querySelectorAll('.view-panel');
  panels.forEach(p => {
    p.classList.remove('active');
  });

  const targetPanel = document.getElementById(`view-${viewName}`);
  if (targetPanel) {
    targetPanel.classList.add('active');
  }

  // Update desktop tabs
  const deskTabs = document.querySelectorAll('.nav-tab');
  deskTabs.forEach(tab => {
    if (tab.dataset.view === viewName) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // Update mobile buttons
  const mobBtns = document.querySelectorAll('.mobile-nav-btn');
  mobBtns.forEach(btn => {
    if (btn.dataset.view === viewName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Scroll to top of content
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Re-render view specific items if needed
  if (viewName === 'syllabus') {
    renderSyllabus();
  } else if (viewName === 'revision') {
    renderRevision();
  } else if (viewName === 'pyqs') {
    renderPyqs();
  } else if (viewName === 'analytics') {
    renderAnalytics();
  } else if (viewName === 'dashboard') {
    renderDashboard();
  }
}

function initNavigation() {
  // Desktop navigation links
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const view = tab.dataset.view;
      if (view) switchView(view);
    });
  });

  // Mobile navigation links
  document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      if (view) switchView(view);
    });
  });

  // Brand click -> dashboard
  const brandBadge = document.getElementById('brand-badge');
  if (brandBadge) {
    brandBadge.addEventListener('click', () => switchView('dashboard'));
    brandBadge.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') switchView('dashboard');
    });
  }

  // Quick Action Buttons on Dashboard
  document.getElementById('qa-add-task')?.addEventListener('click', () => openTaskModal());
  document.getElementById('qa-focus')?.addEventListener('click', () => openFocusSetupModal());
  document.getElementById('qa-revision')?.addEventListener('click', () => switchView('revision'));
  document.getElementById('qa-pyqs')?.addEventListener('click', () => switchView('pyqs'));
  document.getElementById('qa-analytics')?.addEventListener('click', () => switchView('analytics'));

  // Top bar focus button
  document.getElementById('top-btn-focus')?.addEventListener('click', () => openFocusSetupModal());

  // Link to syllabus from subject overview
  document.getElementById('link-view-all-syllabus')?.addEventListener('click', () => switchView('syllabus'));

  // Clicking subject cards on dashboard navigates to syllabus filtered by subject
  document.getElementById('card-subject-physics')?.addEventListener('click', () => {
    switchView('syllabus');
    filterSyllabusSubject('physics');
  });
  document.getElementById('card-subject-chemistry')?.addEventListener('click', () => {
    switchView('syllabus');
    filterSyllabusSubject('chemistry');
  });
  document.getElementById('card-subject-biology')?.addEventListener('click', () => {
    switchView('syllabus');
    filterSyllabusSubject('biology');
  });
}

// ====================================================================
// 5. DASHBOARD CALCULATIONS & RENDERING
// ====================================================================
function renderDashboard() {
  const chapters = Object.values(appState.chapters);
  const total = chapters.length || 37;
  const completed = chapters.filter(c => c.completed).length;
  const remaining = total - completed;
  const percent = Math.round((completed / total) * 100);

  // Overall Syllabus Progress in Hero
  const heroPercentEl = document.getElementById('hero-progress-percent');
  const heroFractionEl = document.getElementById('hero-progress-fraction');
  const heroFillEl = document.getElementById('hero-progress-fill');
  const heroCompletedEl = document.getElementById('hero-stat-completed');
  const heroRemainingEl = document.getElementById('hero-stat-remaining');

  if (heroPercentEl) heroPercentEl.textContent = `${percent}%`;
  if (heroFractionEl) heroFractionEl.textContent = `${completed} / ${total} Chapters`;
  if (heroFillEl) heroFillEl.style.width = `${percent}%`;
  if (heroCompletedEl) heroCompletedEl.textContent = String(completed);
  if (heroRemainingEl) heroRemainingEl.textContent = String(remaining);

  // Subjects Progress
  renderSubjectCard('physics', 14);
  renderSubjectCard('chemistry', 10);
  renderSubjectCard('biology', 13);

  // Subject Attention
  renderSubjectAttention();

  // Streak Card
  renderStreakCard();

  // Today's Mission & Daily Target
  renderTasks();
  renderDailyTarget();
}

/**
 * Render individual subject progress card
 */
function renderSubjectCard(subjectKey, totalChapters) {
  const list = Object.values(appState.chapters).filter(c => c.subject === subjectKey);
  const doneCount = list.filter(c => c.completed).length;
  const total = list.length || totalChapters;
  const pct = Math.round((doneCount / total) * 100);

  const countEl = document.getElementById(`sub-count-${subjectKey}`);
  const pctEl = document.getElementById(`sub-percent-${subjectKey}`);
  const fillEl = document.getElementById(`sub-fill-${subjectKey}`);
  const labelEl = document.getElementById(`sub-label-${subjectKey}`);

  if (countEl) countEl.textContent = `${doneCount} / ${total}`;
  if (pctEl) pctEl.textContent = `${pct}%`;
  if (fillEl) fillEl.style.width = `${pct}%`;

  if (labelEl) {
    if (pct === 100) labelEl.textContent = 'Mastered';
    else if (pct >= 60) labelEl.textContent = 'On Track';
    else if (pct > 0) labelEl.textContent = 'In Progress';
    else labelEl.textContent = 'Not Started';
  }
}

/**
 * Render subject needing attention
 */
function renderSubjectAttention() {
  const subjects = ['physics', 'chemistry', 'biology'];
  const data = subjects.map(sub => {
    const list = Object.values(appState.chapters).filter(c => c.subject === sub);
    const done = list.filter(c => c.completed).length;
    const total = list.length || (sub === 'physics' ? 14 : sub === 'chemistry' ? 10 : 13);
    const pct = Math.round((done / total) * 100);
    return { subject: sub, done, total, pct };
  });

  // Sort ascending by completion percentage
  data.sort((a, b) => a.pct - b.pct);
  const attentionSub = data[0];

  const nameMap = {
    physics: '⚡ Physics',
    chemistry: '🧪 Chemistry',
    biology: '🧬 Biology'
  };

  const nameEl = document.getElementById('attention-subject-name');
  const descEl = document.getElementById('attention-subject-desc');
  const btnEl = document.getElementById('btn-focus-attention-sub');

  if (nameEl) nameEl.textContent = `${nameMap[attentionSub.subject]}`;
  if (descEl) {
    descEl.textContent = `Currently at ${attentionSub.pct}% completion (${attentionSub.done}/${attentionSub.total} chapters). Dedicate focus today.`;
  }
  if (btnEl) {
    btnEl.onclick = () => {
      openFocusSetupModal(attentionSub.subject);
    };
  }
}

/**
 * Render Streak Card
 */
function renderStreakCard() {
  const current = (appState.streak && appState.streak.current) || 0;
  const best = (appState.streak && appState.streak.best) || 0;

  const titleEl = document.getElementById('streak-count-title');
  const curEl = document.getElementById('streak-current-days');
  const bestEl = document.getElementById('streak-best-days');

  if (titleEl) titleEl.textContent = `${current} DAY STREAK`;
  if (curEl) curEl.textContent = `${current} ${current === 1 ? 'Day' : 'Days'}`;
  if (bestEl) bestEl.textContent = `${best} ${best === 1 ? 'Day' : 'Days'}`;
}

// ====================================================================
// 6. TODAY'S MISSION (TASKS) & DAILY TARGET
// ====================================================================
function renderTasks() {
  const container = document.getElementById('task-list-container');
  const progressBadge = document.getElementById('mission-progress-badge');
  const progressFill = document.getElementById('mission-progress-fill');

  if (!container) return;

  const tasks = appState.tasks || [];
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  if (progressBadge) progressBadge.textContent = `${completed} / ${total} Completed (${pct}%)`;
  if (progressFill) progressFill.style.width = `${pct}%`;

  if (total === 0) {
    container.innerHTML = `
      <div class="task-empty-state">
        <p>No study tasks scheduled for today.</p>
        <button class="btn btn-secondary btn-sm mt-2" onclick="openTaskModal()">+ Add Your First Task</button>
      </div>
    `;
    return;
  }

  container.innerHTML = tasks.map(task => {
    const subClass = `tag-${task.subject || 'general'}`;
    const subLabel = task.subject === 'physics' ? '⚡ Physics' :
                     task.subject === 'chemistry' ? '🧪 Chemistry' :
                     task.subject === 'biology' ? '🧬 Biology' : '📚 General';

    return `
      <div class="task-card ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
        <div class="task-left">
          <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskCompletion('${task.id}')" title="Toggle completion">
          <div class="task-content">
            <span class="task-title" title="${escapeHtml(task.title)}">${escapeHtml(task.title)}</span>
            <div class="task-meta-row">
              <span class="sub-tag ${subClass}">${subLabel}</span>
              <span class="priority-tag priority-${task.priority || 'MED'}">${task.priority || 'MED'}</span>
              <span class="text-xs text-muted">⏱️ ${task.duration || 60}m</span>
            </div>
          </div>
        </div>
        <div class="task-actions">
          <button class="task-btn-icon" onclick="editTask('${task.id}')" title="Edit Task">✏️</button>
          <button class="task-btn-icon btn-delete" onclick="deleteTask('${task.id}')" title="Delete Task">🗑️</button>
        </div>
      </div>
    `;
  }).join('');
}

function toggleTaskCompletion(taskId) {
  const task = appState.tasks.find(t => t.id === taskId);
  if (!task) return;

  task.completed = !task.completed;
  if (task.completed) {
    recordMeaningfulActivity(`Completed task: ${task.title}`, '✓');
    showToast(`Task completed: ${task.title}`);
  } else {
    saveState();
    renderTasks();
  }
}

function openTaskModal(taskId = null) {
  const modal = document.getElementById('modal-task');
  const titleInput = document.getElementById('task-title-input');
  const idInput = document.getElementById('task-id-input');
  const subSelect = document.getElementById('task-subject-select');
  const prioSelect = document.getElementById('task-priority-select');
  const durSelect = document.getElementById('task-duration-select');
  const modalTitle = document.getElementById('modal-task-title');

  if (taskId) {
    const task = appState.tasks.find(t => t.id === taskId);
    if (!task) return;
    if (modalTitle) modalTitle.textContent = 'Edit Task';
    if (idInput) idInput.value = task.id;
    if (titleInput) titleInput.value = task.title;
    if (subSelect) subSelect.value = task.subject || 'physics';
    if (prioSelect) prioSelect.value = task.priority || 'MED';
    if (durSelect) durSelect.value = String(task.duration || 60);
  } else {
    if (modalTitle) modalTitle.textContent = "Add Today's Task";
    if (idInput) idInput.value = '';
    if (titleInput) titleInput.value = '';
    if (subSelect) subSelect.value = 'physics';
    if (prioSelect) prioSelect.value = 'MED';
    if (durSelect) durSelect.value = '60';
  }

  if (modal) modal.classList.remove('hidden');
  if (titleInput) titleInput.focus();
}

function closeTaskModal() {
  const modal = document.getElementById('modal-task');
  if (modal) modal.classList.add('hidden');
}

function editTask(taskId) {
  openTaskModal(taskId);
}

function deleteTask(taskId) {
  appState.tasks = appState.tasks.filter(t => t.id !== taskId);
  saveState();
  renderTasks();
  showToast('Task removed');
}

function initTaskForm() {
  const form = document.getElementById('form-task');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const idInput = document.getElementById('task-id-input');
      const titleInput = document.getElementById('task-title-input');
      const subSelect = document.getElementById('task-subject-select');
      const prioSelect = document.getElementById('task-priority-select');
      const durSelect = document.getElementById('task-duration-select');

      const title = (titleInput?.value || '').trim();
      if (!title) return;

      const subject = subSelect?.value || 'physics';
      const priority = prioSelect?.value || 'MED';
      const duration = parseInt(durSelect?.value || '60', 10);

      if (idInput && idInput.value) {
        // Edit existing
        const task = appState.tasks.find(t => t.id === idInput.value);
        if (task) {
          task.title = title;
          task.subject = subject;
          task.priority = priority;
          task.duration = duration;
        }
      } else {
        // New Task
        const newTask = {
          id: 'task-' + Date.now(),
          title,
          subject,
          priority,
          duration,
          completed: false,
          createdAt: new Date().toISOString()
        };
        appState.tasks.push(newTask);
      }

      saveState();
      renderTasks();
      closeTaskModal();
    });
  }

  document.getElementById('modal-task-close')?.addEventListener('click', closeTaskModal);
  document.getElementById('btn-cancel-task')?.addEventListener('click', closeTaskModal);
  document.getElementById('btn-add-task-modal')?.addEventListener('click', () => openTaskModal());
}

/**
 * Render Daily Study Target (hours focused today vs target)
 */
function renderDailyTarget() {
  const targetSelect = document.getElementById('select-daily-target');
  const targetCompletedTimeEl = document.getElementById('target-completed-time');
  const targetGoalTimeEl = document.getElementById('target-goal-time');
  const targetPercentBadge = document.getElementById('target-percent-badge');
  const targetProgressFill = document.getElementById('target-progress-fill');

  const targetHours = appState.settings.dailyTarget || 4;
  if (targetSelect) targetSelect.value = String(targetHours);

  // Compute total focus study time today
  const today = getTodayString();
  const todaySessions = (appState.focusSessions || []).filter(s => s.date === today);
  const totalSecondsToday = todaySessions.reduce((acc, s) => acc + (s.durationSeconds || 0), 0);

  const hoursToday = Math.floor(totalSecondsToday / 3600);
  const minsToday = Math.floor((totalSecondsToday % 3600) / 60);
  const timeStr = `${hoursToday}h ${String(minsToday).padStart(2, '0')}m`;

  const targetSeconds = targetHours * 3600;
  const pct = Math.min(100, Math.round((totalSecondsToday / targetSeconds) * 100));

  if (targetCompletedTimeEl) targetCompletedTimeEl.textContent = timeStr;
  if (targetGoalTimeEl) targetGoalTimeEl.textContent = `${targetHours}h 00m`;
  if (targetPercentBadge) targetPercentBadge.textContent = `${pct}%`;
  if (targetProgressFill) targetProgressFill.style.width = `${pct}%`;
}

// ====================================================================
// 7. FOCUS TIMER (TIMESTAMP-BASED WITH PAUSE & AUDIO FALLBACK)
// ====================================================================
let focusInterval = null;
let activeFocusSession = null;

/**
 * Play a gentle two-tone harmonic chime on completion
 * Graceful fallback: If Web Audio is blocked or unavailable, silently ignored.
 */
function playCompletionSound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const now = ctx.currentTime;
    // Note 1 (523.25 Hz - C5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, now);
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 1.2);

    // Note 2 (659.25 Hz - E5)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(659.25, now + 0.25);
    gain2.gain.setValueAtTime(0.35, now + 0.25);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.6);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.25);
    osc2.stop(now + 1.6);
  } catch (err) {
    // Graceful fallback: Audio blocked by autoplay policy or unsupported
    console.log('Audio notification fallback triggered:', err);
  }
}

function openFocusSetupModal(presetSubject = null) {
  const modal = document.getElementById('modal-focus-setup');
  const subSelect = document.getElementById('focus-subject-select');
  const chSelect = document.getElementById('focus-chapter-select');

  if (presetSubject && subSelect) {
    subSelect.value = presetSubject;
  }

  updateFocusChapterDropdown();

  if (modal) modal.classList.remove('hidden');
}

function closeFocusSetupModal() {
  const modal = document.getElementById('modal-focus-setup');
  if (modal) modal.classList.add('hidden');
}

function updateFocusChapterDropdown() {
  const subSelect = document.getElementById('focus-subject-select');
  const chSelect = document.getElementById('focus-chapter-select');
  if (!subSelect || !chSelect) return;

  const chosenSub = subSelect.value;
  const filtered = Object.values(appState.chapters).filter(c => c.subject === chosenSub);

  chSelect.innerHTML = '<option value="">-- Select Chapter or Study General --</option>' +
    filtered.map(c => `<option value="${c.id}">CH ${c.num}: ${escapeHtml(c.name)}</option>`).join('');
}

function initFocusSetupListeners() {
  // Subject change triggers chapter dropdown update
  document.getElementById('focus-subject-select')?.addEventListener('change', updateFocusChapterDropdown);

  // Duration chips
  document.querySelectorAll('.duration-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.duration-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const mins = parseInt(chip.dataset.mins, 10);
      const hoursInput = document.getElementById('focus-custom-hours');
      const minsInput = document.getElementById('focus-custom-mins');
      if (hoursInput) hoursInput.value = Math.floor(mins / 60);
      if (minsInput) minsInput.value = mins % 60;
    });
  });

  document.getElementById('btn-cancel-focus-setup')?.addEventListener('click', closeFocusSetupModal);
  document.getElementById('modal-focus-close')?.addEventListener('click', closeFocusSetupModal);

  // Begin focus session button
  document.getElementById('btn-begin-focus')?.addEventListener('click', () => {
    const subSelect = document.getElementById('focus-subject-select');
    const chSelect = document.getElementById('focus-chapter-select');
    const hoursInput = document.getElementById('focus-custom-hours');
    const minsInput = document.getElementById('focus-custom-mins');

    const subject = subSelect?.value || 'physics';
    const chapterId = chSelect?.value || '';
    const chapterName = chapterId && appState.chapters[chapterId] ? appState.chapters[chapterId].name : 'General Study';

    const h = parseInt(hoursInput?.value || '0', 10) || 0;
    const m = parseInt(minsInput?.value || '0', 10) || 0;
    const totalMinutes = (h * 60) + m;

    if (totalMinutes <= 0) {
      showToast('Please set a duration greater than 0 minutes.');
      return;
    }

    closeFocusSetupModal();
    startFocusSession(subject, chapterId, chapterName, totalMinutes * 60);
  });

  // Target card start focus button
  document.getElementById('btn-start-focus-target')?.addEventListener('click', () => openFocusSetupModal());
}

/**
 * Start or resume a focus session
 */
function startFocusSession(subject, chapterId, chapterName, totalDurationSeconds) {
  const now = Date.now();
  const endTime = now + (totalDurationSeconds * 1000);

  activeFocusSession = {
    subject,
    chapterId,
    chapterName,
    totalDurationSeconds,
    endTime,
    isPaused: false,
    remainingMs: totalDurationSeconds * 1000,
    startedAt: now
  };

  saveActiveTimer();
  openFullscreenFocusUI();
  runFocusLoop();
}

function openFullscreenFocusUI() {
  const overlay = document.getElementById('fullscreen-focus');
  if (overlay) overlay.classList.remove('hidden');

  // Update Meta text
  const metaEl = document.getElementById('focus-meta-display');
  if (metaEl && activeFocusSession) {
    const subCap = activeFocusSession.subject.charAt(0).toUpperCase() + activeFocusSession.subject.slice(1);
    metaEl.textContent = `${subCap} • ${activeFocusSession.chapterName}`;
  }

  updatePauseResumeBtnUI();
}

function runFocusLoop() {
  if (focusInterval) clearInterval(focusInterval);

  focusInterval = setInterval(() => {
    if (!activeFocusSession || activeFocusSession.isPaused) return;

    const remainingMs = Math.max(0, activeFocusSession.endTime - Date.now());
    activeFocusSession.remainingMs = remainingMs;

    updateFocusDisplayDigits(remainingMs);

    if (remainingMs <= 0) {
      completeFocusSession();
    }
  }, 250);
}

function updateFocusDisplayDigits(ms) {
  const digitsEl = document.getElementById('focus-digits');
  if (!digitsEl) return;

  const totalSecs = Math.ceil(ms / 1000);
  const h = Math.floor(totalSecs / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const s = totalSecs % 60;

  if (h > 0) {
    digitsEl.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  } else {
    digitsEl.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
}

function pauseFocusTimer() {
  if (!activeFocusSession || activeFocusSession.isPaused) return;

  activeFocusSession.remainingMs = Math.max(0, activeFocusSession.endTime - Date.now());
  activeFocusSession.isPaused = true;
  saveActiveTimer();

  const indicator = document.getElementById('focus-status-text');
  if (indicator) {
    indicator.textContent = 'SESSION PAUSED';
    indicator.classList.add('paused');
  }

  updatePauseResumeBtnUI();
}

function resumeFocusTimer() {
  if (!activeFocusSession || !activeFocusSession.isPaused) return;

  activeFocusSession.endTime = Date.now() + activeFocusSession.remainingMs;
  activeFocusSession.isPaused = false;
  saveActiveTimer();

  const indicator = document.getElementById('focus-status-text');
  if (indicator) {
    indicator.textContent = 'DEEP FOCUS IN PROGRESS';
    indicator.classList.remove('paused');
  }

  updatePauseResumeBtnUI();
}

function updatePauseResumeBtnUI() {
  const btn = document.getElementById('btn-pause-resume-focus');
  if (!btn || !activeFocusSession) return;

  if (activeFocusSession.isPaused) {
    btn.textContent = 'Resume ▶';
    btn.classList.add('btn-primary');
  } else {
    btn.textContent = 'Pause ⏸';
    btn.classList.remove('btn-primary');
  }
}

function completeFocusSession(isEarly = false) {
  if (focusInterval) clearInterval(focusInterval);
  if (!activeFocusSession) return;

  let loggedSeconds = activeFocusSession.totalDurationSeconds;
  if (isEarly) {
    const elapsedMs = activeFocusSession.totalDurationSeconds * 1000 - activeFocusSession.remainingMs;
    loggedSeconds = Math.max(0, Math.floor(elapsedMs / 1000));
  }

  // Play audio chime
  playCompletionSound();

  // Close focus UI
  closeFullscreenFocusUI();

  // If session was meaningful (>= 60s), record it
  if (loggedSeconds >= 60) {
    const today = getTodayString();
    const sessionRecord = {
      id: 'focus-' + Date.now(),
      date: today,
      timestamp: Date.now(),
      durationSeconds: loggedSeconds,
      subject: activeFocusSession.subject,
      chapterId: activeFocusSession.chapterId,
      chapterName: activeFocusSession.chapterName
    };

    appState.focusSessions.push(sessionRecord);

    const h = Math.floor(loggedSeconds / 3600);
    const m = Math.floor((loggedSeconds % 3600) / 60);
    const durationStr = h > 0 ? `${h}h ${m}m` : `${m}m`;

    recordMeaningfulActivity(`Focused ${durationStr} on ${activeFocusSession.chapterName}`, '⏱️');

    // Show celebration modal
    showCelebrationModal(durationStr, activeFocusSession.subject, activeFocusSession.chapterName);
  } else {
    showToast('Focus session ended (under 1 minute not logged).');
  }

  // Clear timer state
  activeFocusSession = null;
  localStorage.removeItem(TIMER_STORAGE_KEY);
  renderDashboard();
  renderDailyTarget();
}

function abortFocusSession() {
  if (confirm('Exit focus mode? Unsaved progress will be discarded.')) {
    if (focusInterval) clearInterval(focusInterval);
    closeFullscreenFocusUI();
    activeFocusSession = null;
    localStorage.removeItem(TIMER_STORAGE_KEY);
    showToast('Focus session aborted.');
  }
}

function closeFullscreenFocusUI() {
  const overlay = document.getElementById('fullscreen-focus');
  if (overlay) overlay.classList.add('hidden');
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }
}

function showCelebrationModal(durationStr, subject, chapterName) {
  const modal = document.getElementById('modal-focus-complete');
  const durEl = document.getElementById('completed-session-duration');
  const subEl = document.getElementById('completed-session-subject');
  const chEl = document.getElementById('completed-session-chapter');

  if (durEl) durEl.textContent = durationStr;
  if (subEl) subEl.textContent = subject.toUpperCase();
  if (chEl) chEl.textContent = chapterName;

  if (modal) modal.classList.remove('hidden');
}

function saveActiveTimer() {
  if (!activeFocusSession) {
    localStorage.removeItem(TIMER_STORAGE_KEY);
    return;
  }
  try {
    localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(activeFocusSession));
  } catch (err) {
    console.error('Failed to save active timer:', err);
  }
}

function checkAndRestoreActiveTimer() {
  try {
    const raw = localStorage.getItem(TIMER_STORAGE_KEY);
    if (!raw) return;

    const saved = JSON.parse(raw);
    if (!saved || !saved.totalDurationSeconds) return;

    activeFocusSession = saved;

    if (saved.isPaused) {
      openFullscreenFocusUI();
      updateFocusDisplayDigits(saved.remainingMs);
      const indicator = document.getElementById('focus-status-text');
      if (indicator) {
        indicator.textContent = 'SESSION PAUSED';
        indicator.classList.add('paused');
      }
      updatePauseResumeBtnUI();
    } else {
      const remainingMs = Math.max(0, saved.endTime - Date.now());
      if (remainingMs <= 0) {
        // Completed while away
        completeFocusSession();
      } else {
        activeFocusSession.remainingMs = remainingMs;
        openFullscreenFocusUI();
        runFocusLoop();
      }
    }
  } catch (err) {
    console.error('Failed to restore active timer:', err);
  }
}

function initFocusControls() {
  document.getElementById('btn-pause-resume-focus')?.addEventListener('click', () => {
    if (activeFocusSession?.isPaused) {
      resumeFocusTimer();
    } else {
      pauseFocusTimer();
    }
  });

  document.getElementById('btn-complete-early-focus')?.addEventListener('click', () => {
    completeFocusSession(true);
  });

  document.getElementById('btn-abort-focus')?.addEventListener('click', abortFocusSession);

  document.getElementById('btn-close-focus-celebration')?.addEventListener('click', () => {
    document.getElementById('modal-focus-complete')?.classList.add('hidden');
  });

  // Native Fullscreen Toggle
  document.getElementById('btn-toggle-native-fs')?.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  });

  // ESC Listener to exit focus mode safely
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const overlay = document.getElementById('fullscreen-focus');
      if (overlay && !overlay.classList.contains('hidden')) {
        abortFocusSession();
      }
    }
  });
}

// ====================================================================
// 8. SYLLABUS & CHAPTER MODAL
// ====================================================================
let currentSyllabusSubjectFilter = 'all';
let currentSyllabusStatusFilter = 'all';
let currentSyllabusSearchQuery = '';

function renderSyllabus() {
  const container = document.getElementById('chapters-grid');
  if (!container) return;

  const chapters = Object.values(appState.chapters);

  // Update syllabus header pills
  const phyDone = chapters.filter(c => c.subject === 'physics' && c.completed).length;
  const chemDone = chapters.filter(c => c.subject === 'chemistry' && c.completed).length;
  const bioDone = chapters.filter(c => c.subject === 'biology' && c.completed).length;

  document.getElementById('syl-pill-physics').textContent = `Physics: ${phyDone}/14`;
  document.getElementById('syl-pill-chemistry').textContent = `Chemistry: ${chemDone}/10`;
  document.getElementById('syl-pill-biology').textContent = `Biology: ${bioDone}/13`;

  // Apply filters
  const filtered = chapters.filter(ch => {
    // Subject filter
    if (currentSyllabusSubjectFilter !== 'all' && ch.subject !== currentSyllabusSubjectFilter) {
      return false;
    }
    // Status filter
    if (currentSyllabusStatusFilter !== 'all' && ch.status !== currentSyllabusStatusFilter) {
      return false;
    }
    // Search query
    if (currentSyllabusSearchQuery) {
      const q = currentSyllabusSearchQuery.toLowerCase();
      const matchName = ch.name.toLowerCase().includes(q);
      const matchNum = String(ch.num).includes(q);
      if (!matchName && !matchNum) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="task-empty-state" style="grid-column: 1 / -1;">
        <p>No chapters match your selected filters.</p>
        <button class="btn btn-secondary btn-sm mt-2" onclick="resetSyllabusFilters()">Clear Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(ch => {
    const subTag = ch.subject === 'physics' ? 'tag-physics' : ch.subject === 'chemistry' ? 'tag-chemistry' : 'tag-biology';
    const subLabel = ch.subject.toUpperCase();
    const statusClass = 'status-' + ch.status.toLowerCase().replace(/\s+/g, '-');
    const isChecked = ch.completed;

    const revsDone = (ch.revisions?.r1 ? 1 : 0) + (ch.revisions?.r2 ? 1 : 0) + (ch.revisions?.r3 ? 1 : 0);
    const pyqsDone = ch.pyqs ? ch.pyqs.done : 0;
    const pyqsTotal = ch.pyqs ? ch.pyqs.total : 20;

    return `
      <div class="chapter-card ${isChecked ? 'completed-card' : ''}" onclick="openChapterModal('${ch.id}')" data-chapter-id="${ch.id}">
        <div class="chapter-card-header">
          <div>
            <span class="sub-tag ${subTag}">${subLabel}</span>
            <span class="chapter-num-tag ml-1">CH ${ch.num}</span>
          </div>
          <button class="chapter-check-btn ${isChecked ? 'checked' : ''}" onclick="event.stopPropagation(); toggleChapterCompletedQuick('${ch.id}')" title="Toggle Completed">
            ${isChecked ? '☑' : '☐'}
          </button>
        </div>

        <h4 class="chapter-card-title">${escapeHtml(ch.name)}</h4>

        <div class="chapter-card-footer">
          <span class="chapter-status-pill ${statusClass}">${ch.status}</span>
          <div class="text-xs text-muted">
            <span>🔄 ${revsDone}/3</span> • <span>📝 ${pyqsDone}/${pyqsTotal}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterSyllabusSubject(sub) {
  currentSyllabusSubjectFilter = sub;
  document.querySelectorAll('[data-subject]').forEach(chip => {
    if (chip.dataset.subject === sub) chip.classList.add('active');
    else chip.classList.remove('active');
  });
  renderSyllabus();
}

function resetSyllabusFilters() {
  currentSyllabusSubjectFilter = 'all';
  currentSyllabusStatusFilter = 'all';
  currentSyllabusSearchQuery = '';

  const searchInput = document.getElementById('syl-search-input');
  if (searchInput) searchInput.value = '';

  const statusSelect = document.getElementById('syl-status-filter');
  if (statusSelect) statusSelect.value = 'all';

  document.querySelectorAll('[data-subject]').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.subject === 'all');
  });

  renderSyllabus();
}

function toggleChapterCompletedQuick(chapterId) {
  const chapter = appState.chapters[chapterId];
  if (!chapter) return;

  chapter.completed = !chapter.completed;
  if (chapter.completed) {
    chapter.status = 'Completed';
    chapter.completedDate = getTodayString();
    recordMeaningfulActivity(`Completed ${chapter.name}`, '✓');
    showToast(`Marked ${chapter.name} as Completed`);
  } else {
    chapter.status = 'Learning';
    chapter.completedDate = null;
    saveState();
    renderSyllabus();
    renderDashboard();
  }
}

/**
 * Open Chapter Detail Modal
 */
let currentModalChapterId = null;

function openChapterModal(chapterId) {
  const chapter = appState.chapters[chapterId];
  if (!chapter) return;

  currentModalChapterId = chapterId;
  const modal = document.getElementById('modal-chapter-detail');
  const titleEl = document.getElementById('chapter-modal-title');
  const subTagEl = document.getElementById('chapter-modal-sub-tag');
  const statusSelect = document.getElementById('chapter-status-select');
  const toggleBtn = document.getElementById('btn-toggle-chapter-completed');
  const iconEl = document.getElementById('btn-toggle-completed-icon');
  const textEl = document.getElementById('btn-toggle-completed-text');

  const r1Chk = document.getElementById('chk-rev-1');
  const r2Chk = document.getElementById('chk-rev-2');
  const r3Chk = document.getElementById('chk-rev-3');
  const revDueDateInput = document.getElementById('input-rev-due-date');

  const pyqSolvedEl = document.getElementById('modal-pyq-solved');
  const pyqTotalEl = document.getElementById('modal-pyq-total');
  const pyqTotalInput = document.getElementById('input-pyq-total');
  const pyqFillEl = document.getElementById('modal-pyq-fill');
  const notesTextarea = document.getElementById('chapter-notes-textarea');

  if (titleEl) titleEl.textContent = `CH ${chapter.num}: ${chapter.name}`;
  if (subTagEl) {
    subTagEl.className = `sub-tag tag-${chapter.subject}`;
    subTagEl.textContent = chapter.subject.toUpperCase();
  }

  if (statusSelect) statusSelect.value = chapter.status;

  updateChapterModalCompletionButtonUI(chapter.completed);

  // Revisions
  if (r1Chk) r1Chk.checked = !!chapter.revisions?.r1;
  if (r2Chk) r2Chk.checked = !!chapter.revisions?.r2;
  if (r3Chk) r3Chk.checked = !!chapter.revisions?.r3;
  if (revDueDateInput) revDueDateInput.value = chapter.revisions?.dueDate || '';

  // PYQs
  const done = chapter.pyqs ? chapter.pyqs.done : 0;
  const total = chapter.pyqs ? chapter.pyqs.total : 20;
  if (pyqSolvedEl) pyqSolvedEl.textContent = String(done);
  if (pyqTotalEl) pyqTotalEl.textContent = String(total);
  if (pyqTotalInput) pyqTotalInput.value = String(total);
  const pct = Math.round((done / total) * 100);
  if (pyqFillEl) pyqFillEl.style.width = `${pct}%`;

  // Notes
  if (notesTextarea) notesTextarea.value = chapter.notes || '';

  if (modal) modal.classList.remove('hidden');
}

function updateChapterModalCompletionButtonUI(isCompleted) {
  const iconEl = document.getElementById('btn-toggle-completed-icon');
  const textEl = document.getElementById('btn-toggle-completed-text');
  const toggleBtn = document.getElementById('btn-toggle-chapter-completed');

  if (isCompleted) {
    if (iconEl) iconEl.textContent = '✓';
    if (textEl) textEl.textContent = 'Completed';
    toggleBtn?.classList.add('btn-primary');
    toggleBtn?.classList.remove('btn-secondary');
  } else {
    if (iconEl) iconEl.textContent = '☐';
    if (textEl) textEl.textContent = 'Mark Completed';
    toggleBtn?.classList.remove('btn-primary');
    toggleBtn?.classList.add('btn-secondary');
  }
}

function closeChapterModal() {
  const modal = document.getElementById('modal-chapter-detail');
  if (modal) modal.classList.add('hidden');
  currentModalChapterId = null;
}

function saveChapterModal() {
  if (!currentModalChapterId) return;
  const chapter = appState.chapters[currentModalChapterId];
  if (!chapter) return;

  const statusSelect = document.getElementById('chapter-status-select');
  const r1Chk = document.getElementById('chk-rev-1');
  const r2Chk = document.getElementById('chk-rev-2');
  const r3Chk = document.getElementById('chk-rev-3');
  const revDueDateInput = document.getElementById('input-rev-due-date');
  const pyqTotalInput = document.getElementById('input-pyq-total');
  const notesTextarea = document.getElementById('chapter-notes-textarea');

  const oldCompleted = chapter.completed;
  chapter.status = statusSelect?.value || 'Not Started';

  if (chapter.status === 'Completed' || chapter.status === 'Mastered') {
    chapter.completed = true;
  } else if (chapter.status === 'Not Started' || chapter.status === 'Learning') {
    chapter.completed = false;
  }

  if (!chapter.revisions) chapter.revisions = {};
  chapter.revisions.r1 = !!r1Chk?.checked;
  chapter.revisions.r2 = !!r2Chk?.checked;
  chapter.revisions.r3 = !!r3Chk?.checked;
  chapter.revisions.dueDate = revDueDateInput?.value || '';

  if (!chapter.pyqs) chapter.pyqs = { done: 0, total: 20 };
  const newTotal = parseInt(pyqTotalInput?.value || '20', 10);
  chapter.pyqs.total = Math.max(1, newTotal);
  chapter.pyqs.done = Math.min(chapter.pyqs.done, chapter.pyqs.total);

  chapter.notes = notesTextarea?.value || '';

  if (!oldCompleted && chapter.completed) {
    chapter.completedDate = getTodayString();
    recordMeaningfulActivity(`Completed ${chapter.name}`, '✓');
  } else {
    saveState();
  }

  closeChapterModal();
  renderSyllabus();
  renderDashboard();
  showToast('Chapter details saved');
}

function initChapterModalListeners() {
  document.getElementById('modal-chapter-close')?.addEventListener('click', closeChapterModal);
  document.getElementById('btn-close-chapter-detail')?.addEventListener('click', closeChapterModal);
  document.getElementById('btn-save-chapter-detail')?.addEventListener('click', saveChapterModal);

  // Toggle completed button inside modal
  document.getElementById('btn-toggle-chapter-completed')?.addEventListener('click', () => {
    if (!currentModalChapterId) return;
    const chapter = appState.chapters[currentModalChapterId];
    if (!chapter) return;

    chapter.completed = !chapter.completed;
    const statusSelect = document.getElementById('chapter-status-select');
    if (chapter.completed) {
      if (statusSelect) statusSelect.value = 'Completed';
    } else {
      if (statusSelect) statusSelect.value = 'Learning';
    }
    updateChapterModalCompletionButtonUI(chapter.completed);
  });

  // PYQ Stepper inside Chapter Modal
  document.getElementById('btn-pyq-increment')?.addEventListener('click', () => {
    if (!currentModalChapterId) return;
    adjustChapterPyq(currentModalChapterId, 1);
  });

  document.getElementById('btn-pyq-decrement')?.addEventListener('click', () => {
    if (!currentModalChapterId) return;
    adjustChapterPyq(currentModalChapterId, -1);
  });

  // Syllabus Search Input
  document.getElementById('syl-search-input')?.addEventListener('input', (e) => {
    currentSyllabusSearchQuery = e.target.value.trim();
    renderSyllabus();
  });

  // Syllabus Subject Chips
  document.querySelectorAll('[data-subject]').forEach(chip => {
    chip.addEventListener('click', () => {
      filterSyllabusSubject(chip.dataset.subject);
    });
  });

  // Syllabus Status Select
  document.getElementById('syl-status-filter')?.addEventListener('change', (e) => {
    currentSyllabusStatusFilter = e.target.value;
    renderSyllabus();
  });
}

function adjustChapterPyq(chapterId, delta) {
  const chapter = appState.chapters[chapterId];
  if (!chapter) return;
  if (!chapter.pyqs) chapter.pyqs = { done: 0, total: 20 };

  const prev = chapter.pyqs.done;
  chapter.pyqs.done = Math.max(0, Math.min(chapter.pyqs.total, chapter.pyqs.done + delta));

  // Update modal display if modal is open
  const pyqSolvedEl = document.getElementById('modal-pyq-solved');
  const pyqTotalEl = document.getElementById('modal-pyq-total');
  const pyqFillEl = document.getElementById('modal-pyq-fill');

  if (pyqSolvedEl) pyqSolvedEl.textContent = String(chapter.pyqs.done);
  if (pyqTotalEl) pyqTotalEl.textContent = String(chapter.pyqs.total);
  const pct = Math.round((chapter.pyqs.done / chapter.pyqs.total) * 100);
  if (pyqFillEl) pyqFillEl.style.width = `${pct}%`;

  if (delta > 0 && chapter.pyqs.done > prev) {
    recordMeaningfulActivity(`Solved PYQs in ${chapter.name} (${chapter.pyqs.done}/${chapter.pyqs.total})`, '📝');
  } else {
    saveState();
  }

  renderPyqs();
}

// ====================================================================
// 9. REVISION TRACKER
// ====================================================================
let currentRevisionFilter = 'all';
let currentRevisionSubFilter = 'all';

function renderRevision() {
  const container = document.getElementById('revision-grid');
  if (!container) return;

  const chapters = Object.values(appState.chapters);
  const today = getTodayString();

  // Tomorrow calculation in YYYY-MM-DD
  const tomDate = new Date();
  tomDate.setDate(tomDate.getDate() + 1);
  const tomorrow = tomDate.toISOString().slice(0, 10);

  let dueTodayCount = 0;
  let dueTomorrowCount = 0;
  let completedRevsCount = 0;

  chapters.forEach(ch => {
    const is3Done = ch.revisions?.r1 && ch.revisions?.r2 && ch.revisions?.r3;
    if (is3Done) completedRevsCount++;

    const d = ch.revisions?.dueDate;
    if (d && !is3Done) {
      if (d <= today) dueTodayCount++;
      else if (d === tomorrow) dueTomorrowCount++;
    }
  });

  document.getElementById('rev-badge-due-today').textContent = `🔴 ${dueTodayCount} Due Today`;
  document.getElementById('rev-badge-due-tomorrow').textContent = `🟡 ${dueTomorrowCount} Due Tomorrow`;
  document.getElementById('rev-badge-completed').textContent = `✓ ${completedRevsCount} Fully Revised`;

  // Filtering
  const filtered = chapters.filter(ch => {
    if (currentRevisionSubFilter !== 'all' && ch.subject !== currentRevisionSubFilter) {
      return false;
    }

    const d = ch.revisions?.dueDate;
    const is3Done = ch.revisions?.r1 && ch.revisions?.r2 && ch.revisions?.r3;

    if (currentRevisionFilter === 'due-today') {
      return d && d <= today && !is3Done;
    }
    if (currentRevisionFilter === 'due-tomorrow') {
      return d && d === tomorrow && !is3Done;
    }
    if (currentRevisionFilter === 'upcoming') {
      return d && d > tomorrow && !is3Done;
    }
    if (currentRevisionFilter === 'completed') {
      return is3Done;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="task-empty-state" style="grid-column: 1 / -1;">
        <p>No revision items match the selected filter.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(ch => {
    const is3Done = ch.revisions?.r1 && ch.revisions?.r2 && ch.revisions?.r3;
    let badgeHtml = '';
    const d = ch.revisions?.dueDate;

    if (is3Done) {
      badgeHtml = '<span class="badge badge-emerald">✓ Fully Revised (3/3)</span>';
    } else if (d) {
      if (d <= today) {
        badgeHtml = '<span class="badge badge-rose">🔴 Due Today</span>';
      } else if (d === tomorrow) {
        badgeHtml = '<span class="badge badge-amber">🟡 Due Tomorrow</span>';
      } else {
        badgeHtml = `<span class="badge badge-indigo">🟢 Due ${d}</span>`;
      }
    } else {
      badgeHtml = '<span class="text-xs text-muted">No date set</span>';
    }

    return `
      <div class="revision-card">
        <div class="rev-header">
          <div>
            <span class="sub-tag tag-${ch.subject}">${ch.subject.toUpperCase()}</span>
            <h4 class="rev-title mt-1">${escapeHtml(ch.name)}</h4>
          </div>
          ${badgeHtml}
        </div>

        <div class="rev-stages-row">
          <label class="rev-stage-box">
            <input type="checkbox" class="rev-stage-chk" ${ch.revisions?.r1 ? 'checked' : ''} onchange="toggleRevisionCycle('${ch.id}', 'r1')">
            <span>Rev 1</span>
          </label>
          <label class="rev-stage-box">
            <input type="checkbox" class="rev-stage-chk" ${ch.revisions?.r2 ? 'checked' : ''} onchange="toggleRevisionCycle('${ch.id}', 'r2')">
            <span>Rev 2</span>
          </label>
          <label class="rev-stage-box">
            <input type="checkbox" class="rev-stage-chk" ${ch.revisions?.r3 ? 'checked' : ''} onchange="toggleRevisionCycle('${ch.id}', 'r3')">
            <span>Rev 3</span>
          </label>
        </div>

        <div class="rev-footer-row">
          <span class="rev-due-date-text">
            Scheduled: ${ch.revisions?.dueDate || 'Not set'}
          </span>
          <button class="btn btn-secondary btn-sm" onclick="openChapterModal('${ch.id}')">
            Schedule Date
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function toggleRevisionCycle(chapterId, cycleKey) {
  const chapter = appState.chapters[chapterId];
  if (!chapter) return;
  if (!chapter.revisions) chapter.revisions = {};

  chapter.revisions[cycleKey] = !chapter.revisions[cycleKey];

  if (chapter.revisions[cycleKey]) {
    recordMeaningfulActivity(`Revised ${chapter.name} (${cycleKey.toUpperCase()})`, '🔄');
    showToast(`Marked ${cycleKey.toUpperCase()} for ${chapter.name}`);
  } else {
    saveState();
    renderRevision();
  }
}

function initRevisionFilters() {
  document.querySelectorAll('[data-rev-filter]').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('[data-rev-filter]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentRevisionFilter = chip.dataset.revFilter;
      renderRevision();
    });
  });

  document.querySelectorAll('[data-rev-sub]').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('[data-rev-sub]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentRevisionSubFilter = chip.dataset.revSub;
      renderRevision();
    });
  });
}

// ====================================================================
// 10. PYQ TRACKER
// ====================================================================
let currentPyqSubFilter = 'all';
let currentPyqSearchQuery = '';

function renderPyqs() {
  const container = document.getElementById('pyq-grid');
  if (!container) return;

  const chapters = Object.values(appState.chapters);

  const totalSolved = chapters.reduce((acc, c) => acc + (c.pyqs ? c.pyqs.done : 0), 0);
  const totalTarget = chapters.reduce((acc, c) => acc + (c.pyqs ? c.pyqs.total : 20), 0);
  const totalPct = totalTarget === 0 ? 0 : Math.round((totalSolved / totalTarget) * 100);

  document.getElementById('pyq-total-stat').textContent = `${totalSolved} / ${totalTarget}`;
  document.getElementById('pyq-total-percent').textContent = `${totalPct}% Solved Overall`;

  // Filtering
  const filtered = chapters.filter(ch => {
    if (currentPyqSubFilter !== 'all' && ch.subject !== currentPyqSubFilter) {
      return false;
    }
    if (currentPyqSearchQuery) {
      const q = currentPyqSearchQuery.toLowerCase();
      if (!ch.name.toLowerCase().includes(q) && !String(ch.num).includes(q)) {
        return false;
      }
    }
    return true;
  });

  container.innerHTML = filtered.map(ch => {
    const done = ch.pyqs ? ch.pyqs.done : 0;
    const total = ch.pyqs ? ch.pyqs.total : 20;
    const pct = Math.round((done / total) * 100);

    return `
      <div class="pyq-card">
        <div class="pyq-card-header">
          <div>
            <span class="sub-tag tag-${ch.subject}">${ch.subject.toUpperCase()}</span>
            <h4 class="pyq-card-title mt-1">${escapeHtml(ch.name)}</h4>
          </div>
          <span class="pyq-percent-label">${pct}%</span>
        </div>

        <div class="progress-bar-track">
          <div class="progress-bar-fill progress-fill-indigo" style="width: ${pct}%;"></div>
        </div>

        <div class="pyq-stepper-row">
          <div class="pyq-stepper">
            <button class="pyq-step-btn" onclick="adjustChapterPyq('${ch.id}', -1)" title="Subtract 1">−</button>
            <div class="pyq-numbers">
              <strong>${done}</strong> / ${total}
            </div>
            <button class="pyq-step-btn" onclick="adjustChapterPyq('${ch.id}', 1)" title="Add 1">+</button>
          </div>

          <button class="btn btn-secondary btn-sm" onclick="openChapterModal('${ch.id}')" title="Edit Total Target">
            Edit Target
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function initPyqFilters() {
  document.querySelectorAll('[data-pyq-sub]').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('[data-pyq-sub]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentPyqSubFilter = chip.dataset.pyqSub;
      renderPyqs();
    });
  });

  document.getElementById('pyq-search-input')?.addEventListener('input', (e) => {
    currentPyqSearchQuery = e.target.value.trim();
    renderPyqs();
  });
}

// ====================================================================
// 11. STUDY ANALYTICS & LIGHTWEIGHT SVG CHARTS
// ====================================================================
function renderAnalytics() {
  const sessions = appState.focusSessions || [];
  const todayStr = getTodayString();

  // Today study time
  const todaySecs = sessions
    .filter(s => s.date === todayStr)
    .reduce((acc, s) => acc + (s.durationSeconds || 0), 0);

  // This Week study time (Monday -> Sunday of current week)
  const curr = new Date();
  const day = curr.getDay();
  // distance to previous Monday: (day + 6) % 7
  const diffToMon = (day + 6) % 7;
  const monday = new Date(curr);
  monday.setDate(curr.getDate() - diffToMon);
  monday.setHours(0, 0, 0, 0);

  const weekSecs = sessions
    .filter(s => {
      const d = new Date(s.timestamp || s.date);
      return d >= monday;
    })
    .reduce((acc, s) => acc + (s.durationSeconds || 0), 0);

  // This Month study time
  const thisYearMonth = todayStr.slice(0, 7); // YYYY-MM
  const monthSecs = sessions
    .filter(s => s.date && s.date.startsWith(thisYearMonth))
    .reduce((acc, s) => acc + (s.durationSeconds || 0), 0);

  // Total study time
  const totalSecs = sessions.reduce((acc, s) => acc + (s.durationSeconds || 0), 0);

  document.getElementById('analytics-time-today').textContent = formatHoursMins(todaySecs);
  document.getElementById('analytics-time-week').textContent = formatHoursMins(weekSecs);
  document.getElementById('analytics-time-month').textContent = formatHoursMins(monthSecs);
  document.getElementById('analytics-time-total').textContent = formatHoursMins(totalSecs);

  // Target comparison
  const targetSecs = (appState.settings.dailyTarget || 4) * 3600;
  const targetCompPct = Math.round((todaySecs / targetSecs) * 100);
  document.getElementById('analytics-target-comp').textContent = `${targetCompPct}% of daily target`;

  // Secondary Counts
  const chapters = Object.values(appState.chapters);
  const doneChapters = chapters.filter(c => c.completed).length;
  const revCount = chapters.reduce((acc, c) => acc + (c.revisions?.r1 ? 1 : 0) + (c.revisions?.r2 ? 1 : 0) + (c.revisions?.r3 ? 1 : 0), 0);
  const pyqCount = chapters.reduce((acc, c) => acc + (c.pyqs ? c.pyqs.done : 0), 0);

  document.getElementById('stat-chapters-done').textContent = `${doneChapters} / 37`;
  document.getElementById('stat-revisions-done').textContent = String(revCount);
  document.getElementById('stat-pyqs-done').textContent = String(pyqCount);
  document.getElementById('stat-sessions-done').textContent = String(sessions.length);

  // Render SVG Charts
  renderWeeklyBarChart(monday, sessions);
  renderSubjectComparisonChart();
  renderProgressTrendChart();

  // Render Achievements
  renderAchievements();

  // Render Activity Feed
  renderActivityFeed();
}

function formatHoursMins(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${String(m).padStart(2, '0')}m`;
}

/**
 * Chart 1: Pure SVG Weekly Study Bar Chart (Mon -> Sun)
 */
function renderWeeklyBarChart(mondayDate, sessions) {
  const container = document.getElementById('weekly-chart-container');
  if (!container) return;

  const daysLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayTotals = [0, 0, 0, 0, 0, 0, 0]; // in minutes

  // Populate Monday to Sunday
  for (let i = 0; i < 7; i++) {
    const d = new Date(mondayDate);
    d.setDate(mondayDate.getDate() + i);
    const dateStr = d.toISOString().slice(0, 10);

    const daySecs = sessions
      .filter(s => s.date === dateStr)
      .reduce((acc, s) => acc + (s.durationSeconds || 0), 0);

    dayTotals[i] = Math.round(daySecs / 60);
  }

  const weekTotalMins = dayTotals.reduce((a, b) => a + b, 0);
  document.getElementById('chart-week-total-badge').textContent = formatHoursMins(weekTotalMins * 60);

  const maxMins = Math.max(120, ...dayTotals); // at least 2h max for scale

  const width = 500;
  const height = 220;
  const paddingBottom = 30;
  const paddingTop = 25;
  const chartH = height - paddingBottom - paddingTop;
  const colWidth = 38;
  const gap = (width - (colWidth * 7)) / 8;

  let barsSvg = '';
  for (let i = 0; i < 7; i++) {
    const x = gap + i * (colWidth + gap);
    const val = dayTotals[i];
    const barH = (val / maxMins) * chartH;
    const y = height - paddingBottom - barH;

    const hoursVal = (val / 60).toFixed(1);
    const labelVal = val > 0 ? `${hoursVal}h` : '0h';

    barsSvg += `
      <g class="chart-bar-group">
        <rect class="chart-bar-rect" x="${x}" y="${y}" width="${colWidth}" height="${barH}" rx="6" fill="#4f46e5">
          <title>${daysLabels[i]}: ${val} mins (${labelVal})</title>
        </rect>
        <text class="chart-val-text" x="${x + colWidth / 2}" y="${y - 6}" text-anchor="middle">${labelVal}</text>
        <text class="chart-axis-text" x="${x + colWidth / 2}" y="${height - 10}" text-anchor="middle">${daysLabels[i]}</text>
      </g>
    `;
  }

  container.innerHTML = `
    <svg class="svg-chart" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">
      <!-- Baseline -->
      <line x1="10" y1="${height - paddingBottom}" x2="${width - 10}" y2="${height - paddingBottom}" stroke="var(--border-color)" stroke-width="1.5" />
      ${barsSvg}
    </svg>
  `;
}

/**
 * Chart 2: Pure SVG Subject Completion Comparative Chart
 */
function renderSubjectComparisonChart() {
  const container = document.getElementById('subject-chart-container');
  if (!container) return;

  const subjects = [
    { name: 'Physics', key: 'physics', total: 14, color: '#2563eb' },
    { name: 'Chemistry', key: 'chemistry', total: 10, color: '#7c3aed' },
    { name: 'Biology', key: 'biology', total: 13, color: '#059669' }
  ];

  const width = 500;
  const height = 220;
  const barHeight = 24;
  const startX = 100;
  const maxBarW = 320;

  let rowsSvg = '';
  subjects.forEach((sub, idx) => {
    const done = Object.values(appState.chapters).filter(c => c.subject === sub.key && c.completed).length;
    const pct = Math.round((done / sub.total) * 100);
    const barW = Math.max(4, (pct / 100) * maxBarW);
    const y = 35 + idx * 55;

    rowsSvg += `
      <g>
        <text class="chart-axis-text" x="${startX - 12}" y="${y + 16}" text-anchor="end" font-weight="700">${sub.name}</text>
        <rect x="${startX}" y="${y}" width="${maxBarW}" height="${barHeight}" rx="12" fill="var(--bg-surface-secondary)" />
        <rect x="${startX}" y="${y}" width="${barW}" height="${barHeight}" rx="12" fill="${sub.color}">
          <title>${sub.name}: ${done}/${sub.total} chapters (${pct}%)</title>
        </rect>
        <text class="chart-val-text" x="${startX + maxBarW + 15}" y="${y + 17}">${pct}% (${done}/${sub.total})</text>
      </g>
    `;
  });

  container.innerHTML = `
    <svg class="svg-chart" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">
      ${rowsSvg}
    </svg>
  `;
}

/**
 * Chart 3: Pure SVG Syllabus Completion Progress Trend
 */
function renderProgressTrendChart() {
  const container = document.getElementById('trend-chart-container');
  if (!container) return;

  const chapters = Object.values(appState.chapters);
  const totalChapters = 37;

  // Group chapters completed by date
  const completedChapters = chapters.filter(c => c.completed && c.completedDate);
  const completedByDate = {};
  completedChapters.forEach(c => {
    completedByDate[c.completedDate] = (completedByDate[c.completedDate] || 0) + 1;
  });

  const dates = Object.keys(completedByDate).sort();
  let cumulative = 0;
  const trendData = dates.map(d => {
    cumulative += completedByDate[d];
    return { date: d, count: cumulative };
  });

  // If no completed dates or very few, add placeholder starting point
  if (trendData.length === 0) {
    trendData.push({ date: 'Start', count: 0 });
  }

  const width = 800;
  const height = 200;
  const padL = 40;
  const padR = 40;
  const padT = 20;
  const padB = 35;
  const chartW = width - padL - padR;
  const chartH = height - padT - padB;

  // Draw grid lines
  let gridSvg = '';
  [0, 10, 20, 30, 37].forEach(milestone => {
    const y = height - padB - (milestone / totalChapters) * chartH;
    gridSvg += `
      <line x1="${padL}" y1="${y}" x2="${width - padR}" y2="${y}" class="chart-grid-line" />
      <text class="chart-axis-text" x="${padL - 8}" y="${y + 4}" text-anchor="end">${milestone}</text>
    `;
  });

  // Compute point coordinates
  const n = trendData.length;
  let points = '';
  trendData.forEach((pt, i) => {
    const x = padL + (n === 1 ? chartW / 2 : (i / (n - 1)) * chartW);
    const y = height - padB - (pt.count / totalChapters) * chartH;
    points += `${x},${y} `;
  });

  let dateLabelsSvg = '';
  if (n > 1) {
    const firstX = padL;
    const lastX = width - padR;
    dateLabelsSvg = `
      <text class="chart-axis-text" x="${firstX}" y="${height - 10}" text-anchor="start">${trendData[0].date}</text>
      <text class="chart-axis-text" x="${lastX}" y="${height - 10}" text-anchor="end">${trendData[n - 1].date}</text>
    `;
  }

  container.innerHTML = `
    <svg class="svg-chart" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">
      ${gridSvg}
      <polyline fill="none" stroke="#4f46e5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="${points}" />
      ${trendData.map((pt, i) => {
        const x = padL + (n === 1 ? chartW / 2 : (i / (n - 1)) * chartW);
        const y = height - padB - (pt.count / totalChapters) * chartH;
        return `<circle cx="${x}" cy="${y}" r="5" fill="#4f46e5" stroke="#ffffff" stroke-width="2"><title>${pt.date}: ${pt.count} chapters</title></circle>`;
      }).join('')}
      ${dateLabelsSvg}
    </svg>
  `;
}

// ====================================================================
// 12. ACHIEVEMENTS & RECENT ACTIVITY
// ====================================================================
function renderAchievements() {
  const container = document.getElementById('achievements-grid');
  const countBadge = document.getElementById('achievements-count-badge');
  if (!container) return;

  let unlockedCount = 0;

  container.innerHTML = ACHIEVEMENTS_DEF.map(ach => {
    const state = appState.achievements[ach.id] || { unlocked: false };
    if (state.unlocked) unlockedCount++;

    return `
      <div class="achievement-card ${state.unlocked ? 'unlocked' : 'locked'}">
        <div class="ach-icon-circle">${ach.icon}</div>
        <div class="ach-info">
          <span class="ach-name">${ach.name}</span>
          <span class="ach-desc">${ach.desc}</span>
          ${state.unlocked ? `<span class="ach-date">Unlocked ${state.unlockedAt || ''}</span>` : '<span class="text-xs text-muted">Locked</span>'}
        </div>
      </div>
    `;
  }).join('');

  if (countBadge) countBadge.textContent = `${unlockedCount} / ${ACHIEVEMENTS_DEF.length} Unlocked`;
}

function renderActivityFeed() {
  const container = document.getElementById('activity-feed-list');
  if (!container) return;

  const acts = appState.activities || [];
  if (acts.length === 0) {
    container.innerHTML = `
      <div class="task-empty-state">
        <p>No recent activity recorded yet.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = acts.map(item => `
    <div class="activity-item">
      <div class="act-left">
        <span class="act-icon">${item.icon || '⚡'}</span>
        <span>${escapeHtml(item.description)}</span>
      </div>
      <span class="act-time">${item.date} ${item.time || ''}</span>
    </div>
  `).join('');

  // Clear activity button
  document.getElementById('btn-clear-activity')?.addEventListener('click', () => {
    if (confirm('Clear activity log history?')) {
      appState.activities = [];
      saveState();
      renderActivityFeed();
      showToast('Activity log cleared');
    }
  });
}

// ====================================================================
// 13. SETTINGS, BACKUP, IMPORT & EXPORT
// ====================================================================
function initSettings() {
  // Daily Target Select
  const dailyTargetSelect = document.getElementById('settings-daily-target');
  if (dailyTargetSelect) {
    dailyTargetSelect.value = String(appState.settings.dailyTarget || 4);
    dailyTargetSelect.addEventListener('change', (e) => {
      appState.settings.dailyTarget = parseInt(e.target.value, 10);
      saveState();
      renderDashboard();
      showToast(`Daily target set to ${appState.settings.dailyTarget} hours`);
    });
  }

  // Also sync dashboard daily target select
  document.getElementById('select-daily-target')?.addEventListener('change', (e) => {
    appState.settings.dailyTarget = parseInt(e.target.value, 10);
    if (dailyTargetSelect) dailyTargetSelect.value = e.target.value;
    saveState();
    renderDailyTarget();
    showToast(`Daily target updated: ${e.target.value}h`);
  });

  // Theme Toggles
  document.getElementById('theme-set-light')?.addEventListener('click', () => {
    applyTheme('light');
    showToast('Switched to Light Mode');
  });

  document.getElementById('theme-set-dark')?.addEventListener('click', () => {
    applyTheme('dark');
    showToast('Switched to Dark Mode');
  });

  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    showToast(`Switched to ${next === 'dark' ? 'Dark' : 'Light'} Mode`);
  });

  // Data Export
  document.getElementById('btn-export-backup')?.addEventListener('click', exportBackupData);

  // Data Import
  document.getElementById('file-import-backup')?.addEventListener('change', handleImportBackup);

  // Reset Progress Flow
  initResetSafeguard();
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  appState.settings.theme = theme;
  saveState();

  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

/**
 * Export data backup as JSON file
 */
function exportBackupData() {
  try {
    const dataStr = JSON.stringify(appState, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'class12-tracker-backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Backup downloaded successfully!');
  } catch (err) {
    console.error('Export failed:', err);
    showToast('⚠️ Export failed. Please try again.');
  }
}

/**
 * Handle JSON Backup Import
 */
function handleImportBackup(e) {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const content = event.target?.result;
      const parsed = JSON.parse(content);

      // Validate structure
      if (!parsed || typeof parsed !== 'object' || !parsed.chapters) {
        throw new Error('Malformed backup structure');
      }

      appState = parsed;
      saveState();

      // Refresh UI completely
      renderDashboard();
      renderSyllabus();
      renderRevision();
      renderPyqs();
      renderAnalytics();
      applyTheme(appState.settings?.theme || 'light');

      showToast('🎉 Data restored successfully from backup!');
    } catch (err) {
      console.error('Import validation failed:', err);
      showToast('Invalid backup file. Your existing data was not changed.');
    }
  };

  reader.readAsText(file);
  // Reset input value so same file can be selected again
  e.target.value = '';
}

/**
 * Reset Safeguard Modal
 */
function initResetSafeguard() {
  const modal = document.getElementById('modal-reset-confirm');
  const openBtn = document.getElementById('btn-open-reset-modal');
  const closeBtn = document.getElementById('modal-reset-close');
  const cancelBtn = document.getElementById('btn-cancel-reset');
  const execBtn = document.getElementById('btn-execute-reset');
  const confirmInput = document.getElementById('reset-confirm-text');

  openBtn?.addEventListener('click', () => {
    if (confirmInput) confirmInput.value = '';
    if (execBtn) execBtn.disabled = true;
    if (modal) modal.classList.remove('hidden');
  });

  const closeModal = () => modal?.classList.add('hidden');
  closeBtn?.addEventListener('click', closeModal);
  cancelBtn?.addEventListener('click', closeModal);

  confirmInput?.addEventListener('input', (e) => {
    if (execBtn) {
      execBtn.disabled = e.target.value.trim().toUpperCase() !== 'RESET';
    }
  });

  execBtn?.addEventListener('click', () => {
    // Reset all state to clean initial
    appState = {
      version: 1,
      chapters: {},
      tasks: [],
      focusSessions: [],
      settings: {
        dailyTarget: 4,
        theme: 'light'
      },
      streak: {
        current: 0,
        best: 0,
        lastActiveDate: null,
        activeDates: []
      },
      activities: [],
      achievements: {}
    };

    INITIAL_CHAPTERS_DATA.forEach(meta => {
      appState.chapters[meta.id] = createDefaultChapter(meta);
    });

    ACHIEVEMENTS_DEF.forEach(ach => {
      appState.achievements[ach.id] = { unlocked: false, unlockedAt: null };
    });

    saveState();
    localStorage.removeItem(TIMER_STORAGE_KEY);

    closeModal();
    renderDashboard();
    renderSyllabus();
    renderRevision();
    renderPyqs();
    renderAnalytics();

    showToast('All progress has been reset.');
  });
}

// ====================================================================
// 14. UI HELPERS & NOTIFICATIONS
// ====================================================================
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 200ms ease';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 200);
  }, 3500);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ====================================================================
// 15. SERVICE WORKER / PWA REGISTRATION
// ====================================================================
function initPWA() {
  if ('serviceWorker' in navigator && (window.location.protocol === 'http:' || window.location.protocol === 'https:')) {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => {
        console.log('PWA Service Worker registered successfully:', reg.scope);
      })
      .catch((err) => {
        console.log('Service Worker registration skipped or failed:', err);
      });
  }
}

// ====================================================================
// 16. APPLICATION INITIALIZATION
// ====================================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Load application state from localStorage
  loadState();

  // 2. Initialize Countdown to Feb 1, 2027
  initExamCountdown();

  // 3. Initialize Navigation
  initNavigation();

  // 4. Initialize Forms & Modals
  initTaskForm();
  initFocusSetupListeners();
  initFocusControls();
  initChapterModalListeners();
  initRevisionFilters();
  initPyqFilters();
  initSettings();

  // 5. Render initial views
  renderDashboard();
  renderSyllabus();

  // 6. Check for active focus timer in progress
  checkAndRestoreActiveTimer();

  // 7. Register PWA Service Worker if on HTTP/HTTPS
  initPWA();
});
