# YouTube-Style 2-Column Light Studio Layout Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the full-screen portfolio video modal into a **clean YouTube-style 2-column studio layout**, completely aligned with the website's light editorial glassmorphism design system (`#f8fafc` canvas, white frosted surfaces, crisp slate typography, and zero artificial neon/cyberpunk aesthetics).

**Architecture:** Full-screen overlay inside `src/components/VideoModal.astro` with a 2-column desktop grid (left ~72% theater + details, right ~28% vertical playlist with 16:9 mini-thumbnails), single-video auto-centering, and stacked mobile responsiveness.

**Tech Stack:** Astro 5, TypeScript, Vanilla CSS (Design Tokens from `src/styles/global.css`), YouTube IFrame API.

---

## Global Constraints
- Must 100% align with the website design tokens (`--bg-page: #f8fafc`, `--glass-surface`, `--text-main: #0f172a`, etc.).
- ZERO artificial dark cyberpunk/neon glows or AI slop styling.
- Responsive 2-column layout on desktop (>1024px), stacked on tablet/mobile (<1024px).
- Auto-hide playlist column on single video projects and center the player.
- Keyboard `Escape` and close button must halt video audio and cleanly close modal.

---

## Implementation Tasks

### Task 1: Rebuild HTML Structure & 2-Column Grid
**Files:**
- Modify: `src/components/VideoModal.astro`

- [ ] **Step 1: Build Light Topbar & 2-Column Layout**
  - Implement `.yt-modal-backdrop` and `.yt-topbar` with light frosted glass styling.
  - Implement `.yt-grid-layout` with `.yt-main-column` (left) and `.yt-playlist-sidebar` (right).
  - Add single-video auto-centering modifier (`.is-single-video`).

- [ ] **Step 2: Build YouTube-Style Playlist Sidebar Item Markup**
  - Card with mini 16:9 YouTube thumbnail on the left (`128px`), title and status on the right.

---

### Task 2: Implement Light Studio Styling in Vanilla CSS
**Files:**
- Modify: `src/components/VideoModal.astro`

- [ ] **Step 1: Implement Light Glass Design Tokens**
  - Light backdrop: `rgba(248, 250, 252, 0.95)` with `backdrop-filter: blur(20px)`.
  - Cards: White glass with delicate borders `1px solid rgba(226, 232, 240, 0.85)` and subtle elevation shadows.
  - Typography: Clean Inter font, slate `#0f172a`, muted `#334155`, subtitle `#64748b`.
  - Active playlist item: Soft white card with crisp `#0f172a` accent border, soft shadow, and active status chip.

- [ ] **Step 2: Implement Responsive Breakpoints**
  - Desktop (>1024px): 2 columns (72% / 28%).
  - Mobile/Tablet (<1024px): 100% width stacked layout.

---

### Task 3: Update Controller Script & Switcher
**Files:**
- Modify: `src/components/VideoModal.astro`

- [ ] **Step 1: Populate YouTube Mini-Thumbnails & Handle Single Mode**
  - Generate thumbnail image URLs (`https://img.youtube.com/vi/<id>/mqdefault.jpg`).
  - Toggle `.is-single-video` class when `videos.length <= 1`.
  - Wire instant video switching and active card highlighting.

- [ ] **Step 2: Build & Verify**
  - Run `npm run build` to confirm zero compilation errors.
