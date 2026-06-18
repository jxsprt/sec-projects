# sec-projects

> **Hands-on cybersecurity projects — from beginner to expert.** Build real tools, learn real skills.

[![Projects](https://img.shields.io/badge/projects-32-brightgreen)](#-project-catalog)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Deploy](https://img.shields.io/badge/deploy-Cloudflare%20Pages-orange)](https://sec-projects.pages.dev)

**Live site:** [sec-projects.pages.dev](https://sec-projects.pages.dev)

---

## What is sec-projects?

A curated collection of 32 cybersecurity projects with step-by-step implementation guides, real code examples, and curated learning resources. Every project is self-contained — pick one, build it, learn the concepts.

**Interactive features:**
- Real-time search across all projects
- Filter by category, difficulty, or skill tag
- Dark/light theme toggle
- Progress tracking (mark projects as done/in-progress/todo)
- Copy-pasteable code blocks with syntax highlighting

---

## Project Catalog

| Category | Projects | Difficulty Range |
|----------|----------|-----------------|
| 🔰 **Fundamentals** | 6 | Beginner → Intermediate |
| 🌐 **Network Security** | 6 | Beginner → Intermediate |
| 🌍 **Web Security** | 6 | Beginner → Advanced |
| 🔍 **Forensics** | 5 | Beginner → Advanced |
| 🔐 **Cryptography** | 4 | Beginner → Intermediate |
| ⚡ **Advanced** | 5 | Advanced → Expert |

### Highlights

- **Port Scanner** — TCP socket programming, threading, banner grabbing
- **Packet Sniffer** — Raw socket capture, protocol parsing, PCAP export
- **Web Vulnerability Scanner** — Automated SQLi, XSS, CSRF detection
- **SSH Honeypot** — Capture attacker behavior and credentials
- **SIEM Dashboard** — Mini security operations center with detection rules
- **AES-256 File Encryptor** — Authenticated encryption with proper key derivation
- **PCAP Artifact Extractor** — Network forensics and file recovery

---

## Learning Paths

Projects are mapped to certification paths:

| Path | Certs | Recommended Projects |
|------|-------|---------------------|
| **Practitioner (Red Team)** | JITA → Sec+ → eJPT → PNPT → OSCP | Port Scanner, Packet Sniffer, SQLi Tester, Honeypot |
| **Blue Team** | Sec+ → CySA+ → BTL1 → CISSP | Log Analyzer, ARP Spoof Detector, SIEM Dashboard, YARA Rules |
| **Generalist** | Sec+ → Net+ → CEH → CISSP | Encrypted Vault, Firewall Builder, RSA Generator, XSS Playground |

See [Learning Paths](https://sec-projects.pages.dev/resources/learning-paths.html) for detailed cert-to-project mapping.

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/jxsprt/sec-projects.git
cd sec-projects

# Open in browser (static site, no build step)
open index.html  # or double-click index.html

# Or serve locally
python3 -m http.server 8000
# Visit http://localhost:8000
```

No dependencies. No build step. Just HTML, CSS, and vanilla JavaScript.

---

## How to Use

1. **Browse** the grid or use **search/filters** to find a project
2. **Open** a project page — read prerequisites and objectives
3. **Code along** — every project has copy-pasteable code blocks
4. **Test** your implementation with the provided testing steps
5. **Mark as done** — track your progress across all projects
6. **Extend** — each project has extension ideas to push further

---

## Resources

Curated external resources to accelerate your learning:

- **[Tools Guide](https://sec-projects.pages.dev/resources/tools.html)** — Cheat sheets for Nmap, Wireshark, Burp Suite, Metasploit, Linux CLI
- **[Resource Directory](https://sec-projects.pages.dev/resources/links.html)** — Free training, CTF platforms, YouTube channels, books, communities

---

## Architecture

```
sec-projects/
├── index.html              # SPA shell with search, filters, project grid
├── assets/
│   ├── css/                # Shared theme, layout, components
│   └── js/                 # App logic, search, progress, theme
├── projects/               # 32 project pages across 6 categories
│   ├── fundamentals/       # 6 projects
│   ├── network/            # 6 projects
│   ├── web/                # 6 projects
│   ├── forensics/          # 5 projects
│   ├── crypto/             # 4 projects
│   └── advanced/           # 5 projects
├── resources/              # Learning paths, tools guide, curated links
└── archive/v1/             # Original v1 files (preserved)
```

---

## Contributing

Have a project idea or improvement? PRs welcome.

1. Fork the repo
2. Create a feature branch
3. Follow the [project page template](.hermes/plans/project-page-template.md)
4. Submit a PR

---

## License

MIT — build, share, and learn freely.

---

**Built by [Jaspreet Singh](https://jaspreetsec.com)** — delivery driver → cybersecurity professional. If I can build this, you can build these projects.
