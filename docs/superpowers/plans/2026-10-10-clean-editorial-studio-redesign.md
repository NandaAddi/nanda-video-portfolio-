# Clean Editorial Studio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul the portfolio visual identity from generic "AI slop" (pastel blue gradients, generic fonts) into a sophisticated "Clean Editorial Studio" aesthetic (warm-neutral bone canvas, editorial typography `Syne` + `Plus Jakarta Sans`, cinematic video gallery, borderless cards and buttons).

**Architecture:** Update foundational tokens and fonts in `Layout.astro` and `global.css`, then systematically transform `Navbar.astro`, `Hero.astro`, `Showcase.astro`, `ContactHub.astro`, and `VideoModal.astro` with the new design system.

**Tech Stack:** Astro, Vanilla CSS, Google Fonts (`Syne`, `Plus Jakarta Sans`), TypeScript.

**Spec:** [docs/superpowers/specs/2026-10-10-clean-editorial-studio-redesign.md](file:///d:/WEBENZE/nandavideo/docs/superpowers/specs/2026-10-10-clean-editorial-studio-redesign.md)

## Global Constraints
- Strictly **borderless** design: no strokes, outlines, or borders on cards, buttons, or badges.
- Warm-neutral palette: base canvas `#fbfaf7` / `#f7f6f2`, deep ink charcoal `#161615`. No SaaS pastel blue gradients.
- Typography: Headings in `Syne` (weights 700, 800), body text in `Plus Jakarta Sans`.
- Preserve existing data in `src/data/portfolio.ts` (including `/images/education.png`).

---

### Task 1: Global Typography & Design Tokens

**Files:**
- Modify: `src/layouts/Layout.astro`
- Modify: `src/styles/global.css`

**Interfaces:**
- Produces: CSS variables `--font-display`, `--font-body`, `--bg-canvas`, `--bg-surface`, `--text-primary`, `--text-secondary`, `--text-muted`, `--accent-warm`, `--shadow-soft`, `--shadow-hover`.

- [ ] **Step 1: Update Google Fonts link in Layout.astro**
Add `Syne:wght@700;800` and `Plus+Jakarta+Sans:wght@400;500;600;700` preconnect and stylesheet links to `<head>`.

- [ ] **Step 2: Update CSS Variables and Reset in global.css**
Replace blue variables with warm studio palette:
```css
:root {
  --font-display: 'Syne', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
  --bg-canvas: #fbfaf7;
  --bg-surface: #ffffff;
  --bg-surface-subtle: #f4f3ee;
  --text-primary: #161615;
  --text-secondary: #55544f;
  --text-muted: #8e8d87;
  --accent-warm: #1a1a19;
  --accent-highlight: #c25e00;
  --shadow-soft: 0 10px 30px rgba(22, 22, 21, 0.04);
  --shadow-hover: 0 20px 40px rgba(22, 22, 21, 0.08);
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-full: 9999px;
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
```
Update body background to `var(--bg-canvas)` and font-family to `var(--font-body)`. Update `.btn-primary` to dark charcoal ink pill.

- [ ] **Step 3: Test build**
Run: `npm run build`
Expected: PASS (Exit code 0).

- [ ] **Step 4: Commit**
```bash
git add src/layouts/Layout.astro src/styles/global.css
git commit -m "style: add Syne and Plus Jakarta Sans fonts and studio color tokens"
```

---

### Task 2: Navbar Modernization

**Files:**
- Modify: `src/components/Navbar.astro`

**Interfaces:**
- Consumes: `--font-display`, `--bg-canvas`, `--text-primary`, `--shadow-soft`

- [ ] **Step 1: Update Navbar styling to warm frosted canvas**
Set navbar background to `rgba(251, 250, 247, 0.88)` with `backdrop-filter: blur(16px);`.
Set brand name font to `var(--font-display)`, bold tracking.
Set nav links to clean uppercase tracking with active/hover underline or ink tone.
Update CTA button to sleek pill button with ink background.

- [ ] **Step 2: Verify in build**
Run: `npm run build`
Expected: PASS (Exit code 0).

- [ ] **Step 3: Commit**
```bash
git add src/components/Navbar.astro
git commit -m "style: modernize navbar to clean editorial studio aesthetic"
```

---

### Task 3: Hero Section Transformation

**Files:**
- Modify: `src/components/Hero.astro`

**Interfaces:**
- Consumes: `portfolioData`, `--font-display`, `--font-body`, `/images/education.png`

- [ ] **Step 1: Update Hero Top Row (Artistic Portrait & Editorial Headline)**
Refactor `Hero.astro`:
- Profile image in an artistic studio frame with soft ambient shadow.
- Large editorial headline: `<h1>` using `var(--font-display)` with size 3.25rem, clean line height.
- Narrative bio formatted with editorial spacing and elegant link styling.

- [ ] **Step 2: Update Hero Bottom Grid (Education, Experience, Softwares)**
- Column 1: Clean Universitas Negeri Malang logo image (`/images/education.png`), institution name, major, bilingual language indicator.
- Column 2: Experience timeline in minimal rows with high typography clarity.
- Column 3: Softwares grid with clean rounded white icon tiles and direct contact details.
- Ensure all borders are eliminated (`border: none;`).

- [ ] **Step 3: Verify in build**
Run: `npm run build`
Expected: PASS (Exit code 0).

- [ ] **Step 4: Commit**
```bash
git add src/components/Hero.astro
git commit -m "feat: redesign hero section with editorial headline and artistic framing"
```

---

### Task 4: Showcase Section Overhaul (Cinematic Gallery)

**Files:**
- Modify: `src/components/Showcase.astro`

**Interfaces:**
- Consumes: `VideoProject[]` from `portfolioData`, `--font-display`, `--shadow-soft`

- [ ] **Step 1: Update Section Header and Category Tabs**
- Header with editorial label `[ Selected Works 2023 — 2025 ]` and title in `var(--font-display)`.
- Category filter buttons styled as minimal borderless pills with ink active state.

- [ ] **Step 2: Update Video Project Cards**
- 16:9 cinematic thumbnail ratio with soft ambient shadow.
- Dark cinematic hover overlay with centered floating circular "Play Video" badge.
- Editorial project numbering (`01`, `02`, `03`...).
- Clean project title in `var(--font-display)`.
- Clean metadata row: views count and video duration in clean text without loud badge pills.
- Subtle tool tags in clean muted text.

- [ ] **Step 3: Verify in build**
Run: `npm run build`
Expected: PASS (Exit code 0).

- [ ] **Step 4: Commit**
```bash
git add src/components/Showcase.astro
git commit -m "feat: overhaul showcase gallery with cinematic 16:9 editorial cards"
```

---

### Task 5: Contact Hub & Footer Redesign

**Files:**
- Modify: `src/components/ContactHub.astro`

**Interfaces:**
- Consumes: `ContactInfo` from `portfolioData`, `--font-display`

- [ ] **Step 1: Replace collab banner with bold editorial statement**
- Big confident headline: *"Let's create impactful visual stories together."* in `var(--font-display)` (2.5rem+).
- Subtitle: *"Open for collaboration with creators, brands, and agencies worldwide."*
- Primary direct CTA buttons: WhatsApp & Email in sleek high-contrast styling.

- [ ] **Step 2: Replace 4-card grid with editorial channels and footer**
- Direct editorial contact channels row (WhatsApp, Email, Instagram, LinkedIn).
- Minimalist studio footer: location `Malang, Indonesia • GMT+7`, copyright, and smooth back-to-top button.
- Eliminate all card borders and strokes.

- [ ] **Step 3: Verify in build**
Run: `npm run build`
Expected: PASS (Exit code 0).

- [ ] **Step 4: Commit**
```bash
git add src/components/ContactHub.astro
git commit -m "feat: redesign contact section with bold editorial statement and direct links"
```

---

### Task 6: Video Modal Polish & End-to-End Verification

**Files:**
- Modify: `src/components/VideoModal.astro`

**Interfaces:**
- Consumes: Modal DOM events, YouTube embed iframe

- [ ] **Step 1: Update VideoModal styling**
- Deep charcoal backdrop with borderless cinematic player container.
- Clean close button and typography matching `var(--font-display)` and `var(--font-body)`.

- [ ] **Step 2: Run complete production build and git status check**
Run: `npm run build`
Expected: PASS with 0 errors.

- [ ] **Step 3: Commit and final report**
```bash
git add src/components/VideoModal.astro
git commit -m "polish: update video modal styling to clean editorial studio theme"
```
