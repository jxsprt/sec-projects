# sec-projects v2 — Cybersecurity Project Repository Renovation

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Transform `cybersecurity-project-ideas` into `sec-projects` — a polished, interactive, learner-focused cybersecurity projects hub with 30+ projects, filtering, progress tracking, and curated resources.

**Architecture:** Single-page app shell with vanilla JS + shared CSS. GitHub Pages static hosting. No frameworks — fast, zero-cost, easy to maintain. Projects are individual HTML pages loaded via fetch or direct navigation. Shared header/footer/components via JS includes. Dark/light theme with localStorage persistence. Progress tracking via localStorage.

**Tech Stack:** HTML5, CSS3 (CSS custom properties for theming), vanilla JavaScript, GitHub Pages, GitHub Actions for deploy

**Repo:** `0xjaspreet/sec-projects` (rename from `cybersecurity-project-ideas`)

---

## Phase 1 — Foundation & Repo Rename

### Task 1: Rename repo and update remote
**Objective:** Rename the GitHub repo and update local git config

**Steps:**
1. Rename on GitHub via API: `gh repo rename cybersecurity-project-ideas sec-projects` (or manually)
2. Update local remote: `git remote set-url origin https://github.com/0xjaspreet/sec-projects.git`
3. Verify: `git remote -v`

### Task 2: Create new directory structure
**Objective:** Set up clean v2 file structure, preserve old files in archive

**Steps:**
1. Create directory structure:
```
sec-projects/
├── index.html              # Main SPA shell
├── README.md               # Rewritten v2 README
├── assets/
│   ├── css/
│   │   ├── theme.css       # CSS custom properties + base styles
│   │   ├── layout.css      # Grid, cards, navigation
│   │   ├── components.css  # Badges, buttons, code blocks, search
│   │   └── dark.css        # Dark theme overrides
│   ├── js/
│   │   ├── app.js          # Main app init, router
│   │   ├── search.js       # Search + filter engine
│   │   ├── progress.js     # localStorage progress tracking
│   │   ├── theme.js        # Dark/light toggle
│   │   ├── components.js   # Shared header/footer/card renderer
│   │   └── data.js         # Project catalog data (JSON-like object)
│   └── icons/              # SVG icons (or inline)
├── projects/
│   ├── fundamentals/
│   │   ├── password-checker.html
│   │   ├── file-integrity.html
│   │   ├── encrypted-vault.html
│   │   ├── password-manager.html
│   │   └── ... (new ones)
│   ├── network/
│   │   ├── port-scanner.html
│   │   ├── packet-sniffer.html
│   │   ├── traffic-analyzer.html
│   │   └── ... (new ones)
│   ├── web/
│   │   ├── log-analyzer.html
│   │   ├── vuln-scanner.html
│   │   └── ... (new ones)
│   ├── forensics/
│   │   └── ... (new)
│   ├── crypto/
│   │   └── ... (new)
│   └── advanced/
│       ├── chat-app.html
│       ├── audit-tool.html
│       └── ... (new ones)
├── resources/
│   ├── learning-paths.html  # JITA→Sec+→eJPT etc
│   ├── tools.html           # Tool guides & cheatsheets
│   └── links.html           # Curated external resources
├── archive/                 # v1 files preserved for reference
│   └── v1/
└── .github/
    └── workflows/
        └── deploy.yml       # Updated Pages deploy
```
2. Move all existing `.html` files (except index.html) into `archive/v1/`
3. Delete old per-file CSS (it's all duplicated — we'll use shared styles)

### Task 3: Create shared CSS theme system
**Objective:** Single source of truth for all styling with dark/light support

**Files to create:**
- `assets/css/theme.css` — CSS custom properties for both themes, typography, colors
- `assets/css/layout.css` — container, grid, nav, sidebar
- `assets/css/components.css` — cards, badges, buttons, search bar, code blocks, progress indicators
- `assets/css/dark.css` — dark theme variable overrides (or use `prefers-color-scheme`)

**Key design decisions:**
- Cyber/terminal aesthetic but clean and readable
- Green-on-black accents for "hacker" feel without being cheesy
- Difficulty badges: 🟢 Beginner | 🟡 Intermediate | 🟠 Advanced | 🔴 Expert
- Project cards with: title, difficulty badge, time estimate, skill tags, one-liner

### Task 4: Create project data catalog
**Objective:** Central JS data object that drives search, filtering, and card rendering

**File:** `assets/js/data.js`

**Data structure per project:**
```javascript
{
  id: "port-scanner",
  title: "Port Scanner",
  category: "network",
  difficulty: "beginner",       // beginner | intermediate | advanced | expert
  timeEstimate: "2-3 hours",
  skills: ["python", "sockets", "nmap", "tcp"],
  description: "Build a TCP port scanner in Python...",
  resources: [
    { name: "Nmap Official Docs", url: "https://nmap.org/book/" },
    { name: "THM: Nmap Room", url: "https://tryhackme.com/room/furthernmap" }
  ],
  page: "projects/network/port-scanner.html"
}
```

**Initial catalog:** 30+ projects across 6 categories:
- **Fundamentals (6):** Password Checker, File Integrity Monitor, Encrypted Vault, Password Manager, Caesar Cipher Tool, Hash Cracker (basic)
- **Network (6):** Port Scanner, Packet Sniffer, Traffic Analyzer, ARP Spoof Detector, Firewall Rule Builder, DNS Enumeration Tool
- **Web (6):** Log Analyzer, Web Vuln Scanner, SQLi Testing Tool, XSS Detector, Cookie Auditor, Directory Brute-forcer
- **Forensics (4):** File Carver, Metadata Extractor, Memory Dump Analyzer, Log Timeline Builder
- **Crypto (4):** AES File Encryptor, RSA Key Generator, Certificate Inspector, JWT Token Analyzer
- **Advanced (5):** Secure Chat App, Security Audit Tool, Honeypot, SIEM Dashboard, Keylogger Detector

### Task 5: Create shared component system
**Objective:** JS functions that generate header, footer, nav, project cards dynamically

**File:** `assets/js/components.js`

**Components to build:**
1. `renderHeader()` — nav bar with logo, search, theme toggle
2. `renderFooter()` — links, credits
3. `renderProjectCard(project)` — one card
4. `renderProjectGrid(projects)` — full grid from filtered data
5. `renderSidebar()` — category filters, difficulty filters
6. `loadSharedAssets()` — inject shared CSS/JS into project pages

---

## Phase 2 — Core Interactivity

### Task 6: Build search + filter engine
**Objective:** Real-time search and multi-facet filtering

**File:** `assets/js/search.js`

**Features:**
- Full-text search across title, description, skills, category
- Filter by: difficulty (checkboxes), category (checkboxes), skill tag (click to filter)
- URL query params for shareable filtered views (`?category=network&difficulty=beginner`)
- "Clear filters" button
- Result count display ("Showing 12 of 34 projects")
- Keyboard shortcut: `/` to focus search

### Task 7: Build progress tracking system
**Objective:** Let users mark projects as "To Do", "In Progress", "Done" — persists in localStorage

**File:** `assets/js/progress.js`

**Features:**
- Three states per project: none → todo → in-progress → done
- Visual indicators on cards (checkmark, progress ring)
- Progress dashboard showing % complete per category
- Export/import progress as JSON (for backup)
- Reset progress button with confirmation

### Task 8: Build dark/light theme toggle
**Objective:** Toggle between dark and light themes, persist preference

**File:** `assets/js/theme.js`

**Features:**
- Toggle button in nav (sun/moon icon)
- Respects `prefers-color-scheme` on first visit
- Stores preference in localStorage
- Smooth transition on toggle
- Default: dark theme (cyber vibe)

### Task 9: Build main app shell (index.html)
**Objective:** Single page that loads everything — project grid, search, filters, sidebar

**File:** `index.html`

**Layout:**
```
┌──────────────────────────────────────┐
│  Header: Logo | Search Bar | Theme   │
├──────────┬───────────────────────────┤
│ Sidebar  │  Project Cards Grid       │
│ Filters  │  ┌────┐ ┌────┐ ┌────┐    │
│ ☐ Beg.   │  │    │ │    │ │    │    │
│ ☐ Int.   │  └────┘ └────┘ └────┘    │
│ ☐ Adv.   │  ┌────┐ ┌────┐ ┌────┐    │
│ ☐ Exp.   │  │    │ │    │ │    │    │
│          │  └────┘ └────┘ └────┘    │
│ Categs.  │                           │
│ ☐ Fund.  │  "Showing 28 projects"    │
│ ☐ Net.   │                           │
│ ☐ Web    │                           │
└──────────┴───────────────────────────┘
```

---

## Phase 3 — Project Pages (Rewrite + Expand)

### Task 10: Create project page template
**Objective:** Consistent structure for all project pages with shared assets

**Each project page structure:**
1. Breadcrumb nav (Home > Category > Project)
2. Difficulty badge + time estimate + skill tags
3. Learning objectives
4. Prerequisites
5. Step-by-step implementation
6. Full code with syntax highlighting (Prism.js or highlight.js via CDN)
7. Testing/verification steps
8. Extension ideas (what to build next)
9. Curated resources (THM rooms, HTB challenges, docs, cert relevance)
10. "Mark as Done" button (ties into progress tracking)

### Task 11: Rewrite existing 13 projects to new template
**Objective:** Migrate all existing project content to the new template structure

**Existing projects to migrate:**
- Fundamentals: password-strength-checker, file-integrity-monitor, encrypted-file-vault, secure-password-manager
- Network: port-scanner, packet-sniffer, firewall-rule-generator, network-traffic-analyzer
- Web: web-vuln-scanner, log-analyzer
- Advanced: chat-app, audit-tool
- Combined: cybersecurity-projects-for-beginners (absorb into index)

### Task 12: Create new project pages (~18 new)
**Objective:** Expand to 30+ total projects

**New projects to create:**

*Fundamentals (2 new):*
- Caesar Cipher & Frequency Analysis Tool
- Basic Hash Cracker (MD5/SHA1 dictionary attack)

*Network (2 new):*
- ARP Spoof Detector
- DNS Enumeration & Subdomain Finder

*Web (4 new):*
- SQLi Parameter Tester
- XSS Payload Playground
- Cookie & Session Auditor
- Directory/File Brute-forcer

*Forensics (4 new — new category):*
- File Carver (recover deleted files)
- Image Metadata Extractor
- PCAP Analyzer (extract artifacts from packet captures)
- USB Device History Inspector

*Crypto (4 new — new category):*
- AES-256 File Encryptor/Decryptor
- RSA Key Pair Generator & Message Signer
- SSL/TLS Certificate Inspector
- JWT Token Decoder & Analyzer

*Advanced (2 new):*
- SSH Honeypot
- Keylogger Detector (behavioral)

---

## Phase 4 — Resource Hub

### Task 13: Create learning paths page
**Objective:** Map out certification paths with project recommendations

**File:** `resources/learning-paths.html`

**Paths to cover:**
- Jaspreet's path: JITA → Sec+ → eJPT → PNPT → OSCP
- Blue team path: Sec+ → CySA+ → BTL1 → CISSP
- Red team path: eJPT → PNPT → OSCP → OSEP
- Generalist: Sec+ → CEH → CISSP

For each cert: recommended projects from this repo, external resources, time estimate

### Task 14: Create tools guide page
**Objective:** Quick reference for essential cybersecurity tools

**File:** `resources/tools.html`

**Tools to cover with cheat-sheet style entries:**
- Nmap (scan types, flags, NSE scripts)
- Wireshark (filters, display vs capture)
- Burp Suite (repeater, intruder, decoder)
- Metasploit (basic workflow)
- SQLmap, Hydra, John, Hashcat
- Linux CLI essentials for security

### Task 15: Create curated links page
**Objective:** Organized external resources directory

**File:** `resources/links.html`

**Categories:**
- Free training (THM free rooms, HTB starting point, PicoCTF, OverTheWire)
- YouTube channels (NetworkChuck, John Hammond, IppSec, David Bombal)
- Cert resources (Professor Messer, Jason Dion, TCM Security)
- CTF platforms (THM, HTB, VulnHub, CTFtime)
- Books & reading
- Discord communities

---

## Phase 5 — README & Polish

### Task 16: Rewrite README.md
**Objective:** Professional v2 README that sells the repo

**Sections:**
- Badges (stars, license, deploy status)
- What is sec-projects? (one-liner + screenshot)
- Quick start
- Project categories table
- Interactive features
- Learning paths
- Contributing guide
- Local development setup

### Task 17: Add Open Graph / SEO meta tags
**Objective:** Better link previews on Discord, Twitter, LinkedIn

**Add to all pages:**
- `og:title`, `og:description`, `og:image` (create a banner)
- Twitter card tags
- Structured data for search engines (schema.org)

### Task 18: Update GitHub Pages deploy workflow
**Objective:** Ensure clean deployment with new structure

**File:** `.github/workflows/deploy.yml`

### Task 19: Final QA pass
**Objective:** Test everything end-to-end

**Checklist:**
- [ ] All links resolve (no 404s)
- [ ] Search works across all projects
- [ ] Filters combine correctly (category + difficulty)
- [ ] Theme toggle works, persists on reload
- [ ] Progress tracking saves/loads
- [ ] Mobile responsive (test at 375px, 768px, 1024px)
- [ ] All code snippets are correct and runnable
- [ ] No broken resource links
- [ ] Page load under 2 seconds

---

## Risks & Tradeoffs

| Risk | Mitigation |
|------|------------|
| Too many projects = thin content | Prioritize 15 core projects with deep content, others can be lighter |
| localStorage limits (5MB) | Progress data is tiny, not a real concern |
| GitHub Pages doesn't support server-side | All interactivity is client-side — no issue |
| SEO with JS-rendered content | Use semantic HTML + fallback content in noscript |

## Open Questions

1. Do you want to keep the archived v1 files accessible, or delete them entirely?
2. For the project pages — do you want live Python demos via Pyodide (adds complexity + load time) or stick with copy-pasteable code blocks?
3. Want me to create a simple logo/banner for the repo?
