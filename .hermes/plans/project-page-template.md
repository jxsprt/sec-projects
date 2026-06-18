# Project Page Template for sec-projects v2

Use this exact structure for every project page. Replace ALL placeholder values.

## HTML Structure

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PROJECT_TITLE — sec-projects</title>
  <meta name="description" content="PROJECT_SUMMARY_ONE_LINE">

  <meta property="og:title" content="PROJECT_TITLE — sec-projects">
  <meta property="og:description" content="PROJECT_SUMMARY_ONE_LINE">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://sec-projects.pages.dev/PROJECT_PAGE_PATH">

  <link rel="canonical" href="https://sec-projects.pages.dev/PROJECT_PAGE_PATH">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="/assets/css/theme.css">
  <link rel="stylesheet" href="/assets/css/layout.css">
  <link rel="stylesheet" href="/assets/css/components.css">
</head>
<body>
  <div class="container" style="max-width:900px; margin: calc(var(--nav-height) + var(--space-8)) auto var(--space-8); padding: 0 var(--space-6);">

    <!-- Breadcrumbs -->
    <div class="breadcrumbs">
      <a href="/">Home</a>
      <span class="breadcrumb-sep">/</span>
      <a href="/?cat=CATEGORY_ID">CATEGORY_NAME</a>
      <span class="breadcrumb-sep">/</span>
      <span>PROJECT_TITLE</span>
    </div>

    <!-- Header -->
    <div style="margin-bottom:var(--space-8);">
      <div style="display:flex;align-items:center;gap:var(--space-4);flex-wrap:wrap;margin-bottom:var(--space-3);">
        <span class="badge badge-DIFFICULTY">DIFFICULTY_LABEL</span>
        <span style="color:var(--color-text-muted);font-size:var(--font-size-sm);">&#x23F1; TIME_ESTIMATE</span>
      </div>
      <h1 style="border-bottom:none;margin-bottom:var(--space-3);">PROJECT_TITLE</h1>
      <p style="font-size:var(--font-size-lg);color:var(--color-text-secondary);">PROJECT_SUMMARY</p>
      <div style="display:flex;flex-wrap:wrap;gap:var(--space-2);margin-top:var(--space-3);">
        SKILL_TAGS_HTML
      </div>
    </div>

    <!-- Progress Button -->
    <div id="progressBtn" style="margin-bottom:var(--space-8);"></div>

    <!-- Content sections go here... see below -->

  </div>

  <!-- JS -->
  <script src="/assets/js/data.js"></script>
  <script src="/assets/js/theme.js"></script>
  <script src="/assets/js/components.js"></script>
  <script src="/assets/js/progress.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      document.body.prepend(renderNav());
      document.body.appendChild(renderFooter());
      const btnContainer = document.getElementById('progressBtn');
      if (btnContainer) btnContainer.appendChild(renderProgressButton('PROJECT_ID'));
      initCopyButtons();
    });
  </script>
</body>
</html>
```

## Placeholder Reference

- PROJECT_ID: from data.js (e.g., "port-scanner")
- PROJECT_TITLE: from data.js (e.g., "Port Scanner")
- PROJECT_SUMMARY: from data.js summary field
- PROJECT_SUMMARY_ONE_LINE: shorter version for meta description
- PROJECT_PAGE_PATH: from data.js page field (e.g., "projects/network/port-scanner.html")
- CATEGORY_ID: from data.js category field
- CATEGORY_NAME: from CATEGORIES object in data.js
- DIFFICULTY: beginner/intermediate/advanced/expert
- DIFFICULTY_LABEL: Beginner/Intermediate/Advanced/Expert
- TIME_ESTIMATE: from data.js time field
- SKILL_TAGS_HTML: <span class="tag">skill1</span> <span class="tag">skill2</span> ...

## Content Sections (add after the progress button div)

Required sections for every project page:
1. **Learning Objectives** (h2 + bullet list — 3-5 items)
2. **Prerequisites** (h2 + bullet list)
3. **Ethics callout** (callout div — if the project involves scanning/attacking)
4. **Step-by-step implementation** (h2 per step, paragraph explanation, code blocks in <pre><code>)
5. **Testing** (h2 — how to verify the project works)
6. **Extension Ideas** (h2 + bullet list — 3-5 ideas to go further)
7. **Resources** (h2 + resource-link divs)
8. **Cert Relevance** (callout div — which certs this helps with)

## CSS Classes Available

All classes from assets/css/components.css are available. Key ones:
- `.badge` + `.badge-beginner` / `.badge-intermediate` / `.badge-advanced` / `.badge-expert`
- `.tag` for skill tags
- `.callout` + `.callout-title` for callout boxes
- `.resource-link` + `.resource-link-icon` for external resource links
- `.breadcrumbs` / `.breadcrumb-sep` for navigation
- `.btn` + `.btn-primary` / `.btn-secondary` / `.btn-ghost`

## Code Style
- Use `<pre><code>` for code blocks (copy buttons are auto-added)
- Use inline `<code>` for inline code references
- Feel free to use emoji in headings sparingly
- Keep line lengths reasonable in code examples

## Content Quality Rules
- Each project must have at least 3 implementation steps
- Each step must have a code example
- Resources must link to real, working URLs (THM rooms, official docs, reputable tutorials)
- Cert relevance must mention specific certs the project helps with
- Never include placeholder "lorem ipsum" text — write real content
