// ============================================================
// sec-projects v2 — Project Data Catalog
// Central registry for all projects — drives search, filtering, rendering
// ============================================================

const PROJECTS = [
  // ==================== FUNDAMENTALS ====================
  {
    id: "password-strength-checker",
    title: "Password Strength Checker",
    category: "fundamentals",
    difficulty: "beginner",
    time: "1-2 hours",
    skills: ["python", "regex", "entropy"],
    summary: "Build a tool that evaluates password strength using entropy calculation, pattern detection, and common password checks.",
    resources: [
      { name: "NIST Password Guidelines", url: "https://pages.nist.gov/800-63-3/sp800-63b.html" },
      { name: "Have I Been Pwned API", url: "https://haveibeenpwned.com/API/v3" }
    ],
    page: "projects/fundamentals/password-strength-checker.html"
  },
  {
    id: "file-integrity-monitor",
    title: "File Integrity Monitor",
    category: "fundamentals",
    difficulty: "beginner",
    time: "2-3 hours",
    skills: ["python", "hashing", "filesystem"],
    summary: "Create a FIM tool that detects unauthorized file changes by comparing cryptographic hashes over time.",
    resources: [
      { name: "Python hashlib Docs", url: "https://docs.python.org/3/library/hashlib.html" },
      { name: "Understanding FIM", url: "https://www.cisa.gov/topics/cybersecurity-best-practices" }
    ],
    page: "projects/fundamentals/file-integrity-monitor.html"
  },
  {
    id: "encrypted-file-vault",
    title: "Encrypted File Vault",
    category: "fundamentals",
    difficulty: "beginner",
    time: "2-4 hours",
    skills: ["python", "aes", "cryptography"],
    summary: "Build a personal file vault that encrypts/decrypts files using AES-256 with a password-derived key.",
    resources: [
      { name: "Python Cryptography Library", url: "https://cryptography.io/" },
      { name: "AES Encryption Explained", url: "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.197.pdf" }
    ],
    page: "projects/fundamentals/encrypted-file-vault.html"
  },
  {
    id: "secure-password-manager",
    title: "Secure Password Manager",
    category: "fundamentals",
    difficulty: "intermediate",
    time: "3-5 hours",
    skills: ["python", "encryption", "sqlite", "cli"],
    summary: "Develop a CLI password manager with encrypted storage, master password authentication, and password generation.",
    resources: [
      { name: "PBKDF2 Key Derivation", url: "https://cryptography.io/en/latest/hazmat/primitives/key-derivation-functions/#pbkdf2" },
      { name: "OWASP Password Storage Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html" }
    ],
    page: "projects/fundamentals/secure-password-manager.html"
  },
  {
    id: "caesar-cipher-tool",
    title: "Caesar Cipher & Frequency Analyzer",
    category: "fundamentals",
    difficulty: "beginner",
    time: "1-2 hours",
    skills: ["python", "crypto-basics", "frequency-analysis"],
    summary: "Implement classic substitution ciphers and break them using frequency analysis — your first step into cryptanalysis.",
    resources: [
      { name: "Practical Cryptography", url: "http://practicalcryptography.com/ciphers/caesar-cipher/" },
      { name: "THM: Cryptography Intro", url: "https://tryhackme.com/room/cryptographyintro" }
    ],
    page: "projects/fundamentals/caesar-cipher-tool.html"
  },
  {
    id: "basic-hash-cracker",
    title: "Basic Hash Cracker",
    category: "fundamentals",
    difficulty: "intermediate",
    time: "2-3 hours",
    skills: ["python", "hashing", "dictionary-attack"],
    summary: "Build a dictionary-based hash cracker supporting MD5, SHA1, and SHA256 — understand how password cracking tools work under the hood.",
    resources: [
      { name: "RockYou Wordlist", url: "https://github.com/brannondorsey/naive-hashcat/releases" },
      { name: "Hashcat Wiki", url: "https://hashcat.net/wiki/" }
    ],
    page: "projects/fundamentals/basic-hash-cracker.html"
  },

  // ==================== NETWORK ====================
  {
    id: "port-scanner",
    title: "Port Scanner",
    category: "network",
    difficulty: "beginner",
    time: "2-3 hours",
    skills: ["python", "sockets", "nmap", "tcp"],
    summary: "Build a TCP port scanner from scratch — learn socket programming, TCP handshakes, and service detection.",
    resources: [
      { name: "Nmap Network Scanning", url: "https://nmap.org/book/" },
      { name: "THM: Nmap Room", url: "https://tryhackme.com/room/furthernmap" }
    ],
    page: "projects/network/port-scanner.html"
  },
  {
    id: "packet-sniffer",
    title: "Network Packet Sniffer",
    category: "network",
    difficulty: "intermediate",
    time: "3-4 hours",
    skills: ["python", "scapy", "wireshark", "pcap"],
    summary: "Capture and analyze live network traffic — extract IP headers, detect protocols, and reconstruct TCP streams.",
    resources: [
      { name: "Scapy Documentation", url: "https://scapy.readthedocs.io/" },
      { name: "Wireshark User Guide", url: "https://www.wireshark.org/docs/wsug_html/" }
    ],
    page: "projects/network/packet-sniffer.html"
  },
  {
    id: "traffic-analyzer",
    title: "Network Traffic Analyzer",
    category: "network",
    difficulty: "intermediate",
    time: "3-5 hours",
    skills: ["python", "scapy", "data-viz", "anomaly-detection"],
    summary: "Analyze PCAP files to detect anomalies, visualize traffic patterns, and identify potential security incidents.",
    resources: [
      { name: "Malware Traffic Analysis", url: "https://www.malware-traffic-analysis.net/" },
      { name: "THM: Wireshark", url: "https://tryhackme.com/room/wireshark" }
    ],
    page: "projects/network/traffic-analyzer.html"
  },
  {
    id: "arp-spoof-detector",
    title: "ARP Spoof Detector",
    category: "network",
    difficulty: "intermediate",
    time: "2-3 hours",
    skills: ["python", "scapy", "arp", "mitm"],
    summary: "Detect ARP spoofing attacks on your network by monitoring ARP tables and flagging MAC address inconsistencies.",
    resources: [
      { name: "ARP Spoofing Explained", url: "https://www.varonis.com/blog/arp-poisoning" },
      { name: "THM: ARP Spoofing", url: "https://tryhackme.com/room/arpspoofing" }
    ],
    page: "projects/network/arp-spoof-detector.html"
  },
  {
    id: "dns-enum-tool",
    title: "DNS Enumeration Tool",
    category: "network",
    difficulty: "beginner",
    time: "2-3 hours",
    skills: ["python", "dns", "recon", "dnspython"],
    summary: "Perform DNS reconnaissance — enumerate A/AAAA/MX/NS/TXT records, zone transfers, and subdomain discovery.",
    resources: [
      { name: "DNSDumpster", url: "https://dnsdumpster.com/" },
      { name: "THM: Passive Reconnaissance", url: "https://tryhackme.com/room/passiverecon" }
    ],
    page: "projects/network/dns-enum-tool.html"
  },
  {
    id: "firewall-rule-builder",
    title: "Firewall Rule Generator",
    category: "network",
    difficulty: "intermediate",
    time: "3-4 hours",
    skills: ["python", "iptables", "firewall", "networking"],
    summary: "Create a tool that generates iptables/nftables rules from high-level policy descriptions — bridge the gap between policy and implementation.",
    resources: [
      { name: "iptables Tutorial", url: "https://www.netfilter.org/documentation/" },
      { name: "nftables Wiki", url: "https://wiki.nftables.org/" }
    ],
    page: "projects/network/firewall-rule-builder.html"
  },

  // ==================== WEB ====================
  {
    id: "log-analyzer",
    title: "Log Analyzer & Intrusion Detector",
    category: "web",
    difficulty: "intermediate",
    time: "3-5 hours",
    skills: ["python", "regex", "log-analysis", "siem-basics"],
    summary: "Parse web server logs to detect attack patterns — SQLi, XSS, path traversal, brute force — and generate alert reports.",
    resources: [
      { name: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" },
      { name: "MITRE ATT&CK", url: "https://attack.mitre.org/" }
    ],
    page: "projects/web/log-analyzer.html"
  },
  {
    id: "web-vuln-scanner",
    title: "Web Vulnerability Scanner",
    category: "web",
    difficulty: "advanced",
    time: "4-6 hours",
    skills: ["python", "http", "web-security", "owasp"],
    summary: "Build an automated scanner that checks for common web vulnerabilities — SQLi, XSS, CSRF, misconfigurations.",
    resources: [
      { name: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security" },
      { name: "OWASP Testing Guide", url: "https://owasp.org/www-project-web-security-testing-guide/" }
    ],
    page: "projects/web/web-vuln-scanner.html"
  },
  {
    id: "sqli-tester",
    title: "SQLi Parameter Tester",
    category: "web",
    difficulty: "intermediate",
    time: "2-4 hours",
    skills: ["python", "sql", "web-security", "sqli"],
    summary: "Automate SQL injection testing — detect vulnerable parameters, test blind/time-based SQLi, and extract database info.",
    resources: [
      { name: "PortSwigger: SQL Injection", url: "https://portswigger.net/web-security/sql-injection" },
      { name: "SQLMap Documentation", url: "https://sqlmap.org/" }
    ],
    page: "projects/web/sqli-tester.html"
  },
  {
    id: "xss-playground",
    title: "XSS Payload Playground",
    category: "web",
    difficulty: "intermediate",
    time: "2-3 hours",
    skills: ["javascript", "html", "xss", "web-security"],
    summary: "Create a safe environment to test and understand XSS payloads — reflected, stored, DOM-based, and filter evasion.",
    resources: [
      { name: "OWASP XSS Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/XSS_Filter_Evasion_Cheat_Sheet.html" },
      { name: "Google XSS Game", url: "https://xss-game.appspot.com/" }
    ],
    page: "projects/web/xss-playground.html"
  },
  {
    id: "cookie-auditor",
    title: "Cookie & Session Auditor",
    category: "web",
    difficulty: "beginner",
    time: "1-2 hours",
    skills: ["python", "http", "cookies", "session-security"],
    summary: "Analyze website cookies for security flags — HttpOnly, Secure, SameSite — and generate a security report card.",
    resources: [
      { name: "MDN: Set-Cookie", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie" },
      { name: "OWASP Session Management", url: "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html" }
    ],
    page: "projects/web/cookie-auditor.html"
  },
  {
    id: "dir-brute-forcer",
    title: "Directory Brute-Forcer",
    category: "web",
    difficulty: "beginner",
    time: "1-2 hours",
    skills: ["python", "http", "recon", "enumeration"],
    summary: "Build a tool to discover hidden directories and files on web servers using wordlist-based brute force.",
    resources: [
      { name: "SecLists", url: "https://github.com/danielmiessler/SecLists" },
      { name: "Gobuster", url: "https://github.com/OJ/gobuster" }
    ],
    page: "projects/web/dir-brute-forcer.html"
  },

  // ==================== FORENSICS ====================
  {
    id: "file-carver",
    title: "File Carver",
    category: "forensics",
    difficulty: "intermediate",
    time: "3-4 hours",
    skills: ["python", "binary-analysis", "file-headers", "forensics"],
    summary: "Recover deleted or hidden files from disk images by searching for file headers/magic bytes and reconstructing files.",
    resources: [
      { name: "File Signatures Table", url: "https://www.garykessler.net/library/file_sigs.html" },
      { name: "Foremost (reference tool)", url: "https://github.com/gerryamurphy/Foremost" }
    ],
    page: "projects/forensics/file-carver.html"
  },
  {
    id: "metadata-extractor",
    title: "Image Metadata Extractor",
    category: "forensics",
    difficulty: "beginner",
    time: "1-2 hours",
    skills: ["python", "exif", "forensics", "osint"],
    summary: "Extract EXIF/GPS metadata from images — camera info, location data, timestamps — useful for OSINT investigations.",
    resources: [
      { name: "ExifTool", url: "https://exiftool.org/" },
      { name: "THM: OhSINT", url: "https://tryhackme.com/room/ohsint" }
    ],
    page: "projects/forensics/metadata-extractor.html"
  },
  {
    id: "pcap-analyzer",
    title: "PCAP Artifact Extractor",
    category: "forensics",
    difficulty: "advanced",
    time: "4-6 hours",
    skills: ["python", "scapy", "forensics", "network-analysis"],
    summary: "Extract files, images, credentials, and other artifacts from packet captures — reconstruct what happened on the network.",
    resources: [
      { name: "NetworkMiner", url: "https://www.netresec.com/?page=NetworkMiner" },
      { name: "THM: Network Forensics", url: "https://tryhackme.com/room/networkforensics" }
    ],
    page: "projects/forensics/pcap-analyzer.html"
  },
  {
    id: "usb-history-inspector",
    title: "USB Device History Inspector",
    category: "forensics",
    difficulty: "beginner",
    time: "2-3 hours",
    skills: ["python", "registry", "forensics", "windows"],
    summary: "Parse Windows registry hives and Linux logs to enumerate connected USB devices — serials, timestamps, vendor IDs.",
    resources: [
      { name: "USB Detective (reference)", url: "https://usbdetective.com/" },
      { name: "SANS Windows Forensics Poster", url: "https://www.sans.org/posters/windows-forensic-analysis/" }
    ],
    page: "projects/forensics/usb-history-inspector.html"
  },

  // ==================== CRYPTO ====================
  {
    id: "aes-file-encryptor",
    title: "AES-256 File Encryptor",
    category: "crypto",
    difficulty: "intermediate",
    time: "2-3 hours",
    skills: ["python", "aes", "cryptography", "key-management"],
    summary: "Implement AES-256-GCM file encryption with proper key derivation, authentication, and secure key storage.",
    resources: [
      { name: "NIST AES Standard", url: "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.197.pdf" },
      { name: "Cryptography Best Practices", url: "https://cryptography.io/en/latest/hazmat/primitives/symmetric-encryption/" }
    ],
    page: "projects/crypto/aes-file-encryptor.html"
  },
  {
    id: "rsa-key-generator",
    title: "RSA Key Generator & Message Signer",
    category: "crypto",
    difficulty: "intermediate",
    time: "2-3 hours",
    skills: ["python", "rsa", "asymmetric-crypto", "signatures"],
    summary: "Generate RSA key pairs, encrypt/decrypt messages, and create/verify digital signatures — understand PKI foundations.",
    resources: [
      { name: "RSA Algorithm Explained", url: "https://crypto.stanford.edu/~dabo/papers/RSA-survey.pdf" },
      { name: "PKCS#1 Standard", url: "https://datatracker.ietf.org/doc/html/rfc8017" }
    ],
    page: "projects/crypto/rsa-key-generator.html"
  },
  {
    id: "cert-inspector",
    title: "SSL/TLS Certificate Inspector",
    category: "crypto",
    difficulty: "beginner",
    time: "1-2 hours",
    skills: ["python", "ssl", "tls", "certificates"],
    summary: "Fetch and analyze SSL/TLS certificates — check expiry, issuer chain, cipher suites, and security configuration.",
    resources: [
      { name: "SSL Labs", url: "https://www.ssllabs.com/ssltest/" },
      { name: "Mozilla SSL Configuration Generator", url: "https://ssl-config.mozilla.org/" }
    ],
    page: "projects/crypto/cert-inspector.html"
  },
  {
    id: "jwt-analyzer",
    title: "JWT Token Analyzer",
    category: "crypto",
    difficulty: "beginner",
    time: "1-2 hours",
    skills: ["python", "jwt", "token-analysis", "auth"],
    summary: "Decode and analyze JSON Web Tokens — inspect headers, payloads, signatures, and detect common JWT vulnerabilities.",
    resources: [
      { name: "JWT.io Debugger", url: "https://jwt.io/" },
      { name: "PortSwigger: JWT Attacks", url: "https://portswigger.net/web-security/jwt" }
    ],
    page: "projects/crypto/jwt-analyzer.html"
  },

  // ==================== ADVANCED ====================
  {
    id: "secure-chat-app",
    title: "End-to-End Encrypted Chat",
    category: "advanced",
    difficulty: "advanced",
    time: "5-8 hours",
    skills: ["python", "e2ee", "networking", "cryptography"],
    summary: "Build a CLI chat application with end-to-end encryption using the Signal protocol concepts — perfect forward secrecy, key exchange.",
    resources: [
      { name: "Signal Protocol Docs", url: "https://signal.org/docs/" },
      { name: "Double Ratchet Algorithm", url: "https://signal.org/docs/specifications/doubleratchet/" }
    ],
    page: "projects/advanced/secure-chat-app.html"
  },
  {
    id: "security-audit-tool",
    title: "Automated Security Audit Tool",
    category: "advanced",
    difficulty: "advanced",
    time: "5-7 hours",
    skills: ["python", "linux", "hardening", "compliance"],
    summary: "Scan a Linux system for security misconfigurations — file permissions, open ports, outdated packages, weak SSH config — and generate an audit report.",
    resources: [
      { name: "CIS Benchmarks", url: "https://www.cisecurity.org/cis-benchmarks/" },
      { name: "Lynis (reference)", url: "https://cisofy.com/lynis/" }
    ],
    page: "projects/advanced/security-audit-tool.html"
  },
  {
    id: "ssh-honeypot",
    title: "SSH Honeypot",
    category: "advanced",
    difficulty: "advanced",
    time: "3-5 hours",
    skills: ["python", "ssh", "honeypot", "threat-intel"],
    summary: "Deploy a fake SSH server that logs attacker behavior — capture credentials, commands, and malware samples for threat intelligence.",
    resources: [
      { name: "Cowrie Honeypot", url: "https://github.com/cowrie/cowrie" },
      { name: "THM: Honeypots", url: "https://tryhackme.com/room/honeypots" }
    ],
    page: "projects/advanced/ssh-honeypot.html"
  },
  {
    id: "keylogger-detector",
    title: "Keylogger Detector",
    category: "advanced",
    difficulty: "advanced",
    time: "3-4 hours",
    skills: ["python", "linux", "process-analysis", "malware-detection"],
    summary: "Build a behavioral keylogger detector — monitor keyboard device files, hook detection, process behavior analysis.",
    resources: [
      { name: "Linux Kernel Keylogger Detection", url: "https://www.kernel.org/doc/html/latest/input/input.html" },
      { name: "MITRE ATT&CK: Input Capture", url: "https://attack.mitre.org/techniques/T1056/" }
    ],
    page: "projects/advanced/keylogger-detector.html"
  },
  {
    id: "siem-dashboard",
    title: "SIEM Dashboard (Mini)",
    category: "advanced",
    difficulty: "expert",
    time: "6-10 hours",
    skills: ["python", "elasticsearch", "kibana", "siem", "dashboard"],
    summary: "Build a mini SIEM — ingest logs, create detection rules, visualize threats on a dashboard. Your intro to security operations.",
    resources: [
      { name: "Elastic Security", url: "https://www.elastic.co/security" },
      { name: "THM: Splunk (if preferred)", url: "https://tryhackme.com/room/splunk101" }
    ],
    page: "projects/advanced/siem-dashboard.html"
  },

  // ==================== DEFENSE / BLUE TEAM ====================
  {
    id: "yara-rule-writer",
    title: "YARA Rule Writer & Scanner",
    category: "forensics",
    difficulty: "intermediate",
    time: "2-3 hours",
    skills: ["python", "yara", "malware-analysis", "signature"],
    summary: "Write custom YARA rules to detect malware patterns and scan files/directories — foundational skill for malware analysis.",
    resources: [
      { name: "YARA Documentation", url: "https://yara.readthedocs.io/" },
      { name: "Awesome YARA", url: "https://github.com/InQuest/awesome-yara" }
    ],
    page: "projects/forensics/yara-rule-writer.html"
  }
];

// ===== Derived Data =====

// Category metadata
const CATEGORIES = {
  fundamentals: { name: "Fundamentals", icon: "🔰", order: 1, description: "Core concepts: passwords, encryption, hashing" },
  network:      { name: "Network Security", icon: "🌐", order: 2, description: "Scanning, sniffing, firewalls, protocols" },
  web:          { name: "Web Security", icon: "🌍", order: 3, description: "SQLi, XSS, CSRF, session attacks" },
  forensics:    { name: "Forensics", icon: "🔍", order: 4, description: "File recovery, PCAP analysis, OSINT" },
  crypto:       { name: "Cryptography", icon: "🔐", order: 5, description: "AES, RSA, certificates, tokens" },
  advanced:     { name: "Advanced", icon: "⚡", order: 6, description: "Chat apps, honeypots, SIEM, audit tools" }
};

const DIFFICULTY = {
  beginner:     { label: "Beginner",     class: "badge-beginner",     order: 1 },
  intermediate: { label: "Intermediate", class: "badge-intermediate", order: 2 },
  advanced:     { label: "Advanced",     class: "badge-advanced",     order: 3 },
  expert:       { label: "Expert",       class: "badge-expert",       order: 4 }
};

// Unique skill tags (derived from all projects)
const ALL_SKILLS = [...new Set(PROJECTS.flatMap(p => p.skills))].sort();
