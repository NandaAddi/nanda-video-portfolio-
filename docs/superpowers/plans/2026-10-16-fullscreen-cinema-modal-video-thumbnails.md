# Full-Screen Cinema Overlay & Multi-Video Thumbnails Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the portfolio project modal from a floating popup into an **immersive 100vw × 100vh Full-Screen Cinema Canvas** featuring a large 16:9 video theater, interactive multi-video thumbnail cards with real YouTube covers (`mqdefault.jpg`), dynamic play-state indicators, and responsive editorial metadata.

**Architecture:** Full-screen overlay component inside `src/components/VideoModal.astro` with dark cinema glassmorphism, responsive 16:9 iframe theater, dynamic playlist track rendering actual YouTube video thumbnail images, and smooth client-side video switcher.

**Tech Stack:** Astro 5, TypeScript, Vanilla CSS (Design Tokens), YouTube IFrame API.

---

## Global Constraints
- Must remain 100% Vanilla CSS matching the portfolio design system.
- Zero extra external client libraries.
- YouTube thumbnails dynamically loaded via standard `https://img.youtube.com/vi/<id>/mqdefault.jpg`.
- Must support bilingual labels (`/` English and `/id/` Indonesian).
- `Escape` key and backdrop click must close modal cleanly and stop video audio.

---

## Implementation Tasks

### Task 1: Re-architect Full-Screen Cinema Layout in `VideoModal.astro`
**Files:**
- Modify: `src/components/VideoModal.astro`

- [ ] **Step 1: Update Modal Container & Header HTML**
  - Change `.video-modal-backdrop` and `.video-modal-container` to a true 100vw × 100vh cinema canvas.
  - Add a sticky glass top bar with project breadcrumbs and close button with `"Tutup (Esc)"` / `"Close (Esc)"` text and icon.
  - Add responsive layout wrapper with max-width 1280px.

- [ ] **Step 2: Update Playlist Track HTML to Cinema Cards**
  - Add playlist header with title, video counter badge, and subtitle.
  - Structure `.playlist-track` as a responsive grid/horizontal scrollable cinema strip.

---

### Task 2: Implement 16:9 YouTube Thumbnail Cards & Switcher Logic
**Files:**
- Modify: `src/components/VideoModal.astro`

- [ ] **Step 1: Implement Dynamic Thumbnail Card Generator**
  - In `openModal(card)`, iterate through `videos`:
    - Generate image URL: `https://img.youtube.com/vi/${vid.youtubeId}/mqdefault.jpg`.
    - Render 16:9 thumbnail cover with dark gradient overlay, play icon, and index `#01`, `#02`.
    - Render title and status badge (`Sedang Diputar` / `Now Playing` vs `Klik untuk putar` / `Click to play`).
  - Set active border and glowing indicator on currently playing item.

- [ ] **Step 2: Wire Instant Video Switcher Interaction**
  - Add click event listener to each card to switch `iframe.src` instantly.
  - Update active states across all cards.
  - Auto-scroll smoothly to top if needed.

---

### Task 3: Cinema Styling & Polish
**Files:**
- Modify: `src/components/VideoModal.astro`

- [ ] **Step 1: Write Cinema CSS Styles**
  - Dark cinema palette (`#090d16` background, cyan/emerald glowing active borders).
  - 16:9 aspect ratio thumbnail containers with zoom hover effect.
  - Custom scrollbar styling for playlist track and full-screen view.
  - Mobile responsiveness: stack cleanly on mobile viewports (< 640px).

- [ ] **Step 2: Automated Build Verification**
  - Run `npm run build` to confirm zero build or lint issues.
