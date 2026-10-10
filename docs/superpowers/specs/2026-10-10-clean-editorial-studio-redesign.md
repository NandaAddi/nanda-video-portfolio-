# Design Specification: Clean Editorial Studio Redesign

**Project:** Nanda Addi Wijaya — Videographer & Video Editor Portfolio  
**Date:** 2026-10-10  
**Status:** Approved by User  
**Theme:** Clean Editorial Studio (Warm-Neutral Minimalist, High-Impact Cinematic)

---

## 1. Executive Summary & Aesthetic Transformation

### The Problem
The previous design suffered from generic "AI slop" syndrome:
- Cliché SaaS pastel blue gradient backgrounds (`#f0f7ff` to `#e0f2fe`).
- Generic typography (`Inter`) without editorial personality or cinematic authority.
- Repetitive badge pills, stock glassmorphism borders, and dashboard-style card stacks that made the videographer look like a SaaS software engineer rather than a creative visual storyteller.

### The New Direction: Clean Editorial Studio
- **Vibe:** Inspired by high-end creative direction agencies, independent film directors, and editorial design magazines (such as A24, Cannes Film Market archives, Pentagram, and Kinfolk).
- **Color Scheme:**
  - Base Background: Warm Bone / Studio Canvas (`#fbfaf7` to `#f7f6f2`).
  - Text Primary: Deep Ink Charcoal (`#161615`).
  - Text Secondary / Muted: Warm Stone (`#666560` and `#8a8984`).
  - Card & Container Fill: Pure Studio White (`#ffffff`) and Soft Warm Neutral (`#f2f1ec`), borderless with soft ambient shadow.
  - Accent Color: Subtle Cinema Amber / Warm Graphite (`#c25e00` / `#1c1b18`), eliminating electric SaaS blue.
- **Typography:**
  - Display / Headings: `Syne` (Google Fonts, weights 700 & 800) with tight tracking (`-0.03em`) for creative cinematic authority.
  - Body Text & Subtitles: `Plus Jakarta Sans` (Google Fonts, weights 400, 500, 600) for pristine clarity.
  - Numbers & Technical Tags: Editorial Monospaced styling (`JetBrains Mono` or clean tabular layout) for video duration, views count, and index numbers (`01`, `02`, `03`).

---

## 2. Component Architecture & Section Layouts

### 2.1. Global Design System (`src/styles/global.css`)
- Remove all electric blue variables and generic gradient backgrounds.
- Define CSS custom properties:
  - `--bg-canvas`: `#fbfaf7`
  - `--bg-surface`: `#ffffff`
  - `--bg-surface-subtle`: `#f3f2ed`
  - `--text-primary`: `#161615`
  - `--text-secondary`: `#55544f`
  - `--text-muted`: `#8e8d87`
  - `--accent-warm`: `#c25e00`
  - `--shadow-soft`: `0 8px 30px rgba(22, 22, 21, 0.05)`
  - `--shadow-hover`: `0 20px 40px rgba(22, 22, 21, 0.09)`
- All cards and buttons are **borderless** (no strokes, outlines, or harsh borders).
- Import Google Fonts `Syne` and `Plus Jakarta Sans` in `Layout.astro`.

### 2.2. Navigation (`src/components/Navbar.astro`)
- Sticky, ultra-clean header with warm frosted blur (`backdrop-filter: blur(16px); background: rgba(251, 250, 247, 0.9)`).
- Brand on left: `NANDA ADDI WIJAYA` in bold uppercase `Syne` with a refined live availability dot.
- Center navigation links: `Tentang`, `Karya Video`, `Kontak` in understated uppercase tracking.
- Right action: Minimalist editorial pill CTA button ("Hubungi Saya" via WhatsApp) with deep ink styling.

### 2.3. Hero Section (`src/components/Hero.astro`)
- **Top Row (Artistic Presentation):**
  - Left: Refined portrait card with artistic editorial framing, subtle shadow, and gentle organic rotation on hover (`profile.png`).
  - Right: Large editorial headline:
    - *"Hi! I'm Nanda Addi Wijaya"* (in bold `Syne`, size 3.25rem).
    - Role subtitle: *"Videographer & Video Editor based in Malang, Indonesia"*.
    - Narrative bio presented with editorial typography and high readability.
- **Bottom Grid (Studio Resume & Tools):**
  - Clean 3-column minimalist layout with subtle separation:
    - **Column 1 — Education & Languages:** Clean official Universitas Negeri Malang seal image (`/images/education.png`) without border, institution details, and bilingual proficiency.
    - **Column 2 — Experience:** Timeline of creative editorial roles (Indopride Roleplay, Kultus Visual, Aksara Picture, Bina Project) in clean editorial rows.
    - **Column 3 — Softwares & Quick Contact:** Clean 4x2 grid of software tools (Premiere, After Effects, Photoshop, Audition, Canva, Google Flow, Seadance AI, CapCut) in white rounded tiles without borders, plus direct contact links.

### 2.4. Showcase Section (`src/components/Showcase.astro`)
- **Section Header:**
  - Tagline: `[ Selected Works 2023 — 2025 ]` in monospaced/uppercase editorial style.
  - Title: *"Karya Video Pilihan"* in bold `Syne`.
  - Subtitle: Narrative context of viral YouTube videos, commercial videography, and motion graphics.
- **Filter Controls:**
  - Minimalist text-based tabs (Semua, YouTube & Gaming, Commercial & Event, Motion & Visual) with an elegant sliding/underline or solid ink active pill, completely borderless.
- **Project Cards (Cinematic Presentation):**
  - Aspect ratio: Crisp 16:9 cinematic video thumbnail with soft ambient shadow.
  - Hover effect: Smooth scale, dark cinematic vignette overlay, and a centered floating circular "Play Video" button.
  - Metadata:
    - Editorial index (`01`, `02`, `03`...).
    - Project title in bold typographic styling.
    - Clean text stats: Views (e.g. `100K+ Views`) and duration (`03:45`) without loud badge pills.
    - Subtle tool labels in understated monochrome tags.

### 2.5. Video Modal (`src/components/VideoModal.astro`)
- Modal player updated with deep charcoal backdrop, borderless cinematic container, clean close button, and typography matching the editorial system.

### 2.6. Contact Hub & Footer (`src/components/ContactHub.astro`)
- **Heroic Editorial Closing:**
  - Big bold statement: *"Let's create impactful visual stories together."* (in large `Syne`).
  - Subtitle: *"Open for collaboration with creators, brands, and agencies worldwide."*
- **Direct Action Links:**
  - High-contrast primary action: *"Chat on WhatsApp"* and *"Send an Email"*.
  - Social media row: Minimalist editorial text links (Instagram `↗`, LinkedIn `↗`, YouTube `↗`).
- **Footer:**
  - Location and timezone: `Malang, Indonesia • GMT+7`.
  - Minimalist copyright and smooth back-to-top button.

---

## 3. Implementation Steps & Quality Gates
1. **Fonts & Design Tokens:** Import `Syne` and `Plus Jakarta Sans` in `Layout.astro` and refactor `global.css` tokens.
2. **Hero Overhaul:** Rewrite `Hero.astro` styles and markup to achieve the Clean Editorial Studio aesthetic.
3. **Showcase Overhaul:** Transform `Showcase.astro` into the cinematic editorial gallery.
4. **Contact & Footer Overhaul:** Redesign `ContactHub.astro` with the bold editorial closing and direct links.
5. **Navbar & Modal Polish:** Update `Navbar.astro` and `VideoModal.astro` to match the warm-canvas palette.
6. **Verification:** Verify with `npm run build` and interactive browser checks to confirm zero console errors and authentic non-AI-slop visual excellence.
