# Pure Minimalist Studio Portfolio Card Redesign Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio project cards from bulky nested white boxes into **Pure Minimalist Studio cards**, where the 16:9 video thumbnail serves as the frameless visual hero, accented by floating frosted-glass micro-pills and an elegant two-tier editorial typography hierarchy.

**Architecture:** Component-level update in `src/components/Showcase.astro` stripping outer white container padding, enhancing thumbnail border-radius and elevation, updating badge styling to frosted micro-pills, and refining typography to a clean two-tier editorial flow.

**Tech Stack:** Astro 5, Vanilla CSS (Design Tokens from `src/styles/global.css`).

---

## Global Constraints
- 100% Vanilla CSS matching the portfolio design system.
- Zero extra external dependencies.
- Maintain existing data attributes (`data-category`, `data-video-id`, `data-videos`, etc.) for seamless modal and filter interaction.
- Smooth transition animations for filtering and hover states.

---

## Implementation Tasks

### Task 1: Update Card Markup & CSS in `Showcase.astro`
**Files:**
- Modify: `src/components/Showcase.astro`

- [ ] **Step 1: Update `.project-card` Container Styles**
  - Remove background, border, shadow, and internal padding.
  - Set card to clean transparent wrapper.

- [ ] **Step 2: Upgrade Thumbnail & Micro-Pill Badges**
  - Set `.project-thumb-wrapper` with `border-radius: 16px`, subtle 1px border, and smooth hover elevation shadow.
  - Upgrade `.thumb-duration` and `.thumb-multi-badge` with frosted micro-pill styling (`rgba(15, 23, 42, 0.65)`, `backdrop-filter: blur(8px)`, font-mono).

- [ ] **Step 3: Refine Two-Tier Editorial Metadata**
  - Update `.project-meta` to clean single-line breadcrumb (`font-mono`, `#64748b`, uppercase).
  - Update `.project-title` with `font-weight: 600`, line-height `1.35`, and subtle hover color transition to `#0284c7`.

---

### Task 2: Build & Verification
- [ ] **Step 1: Automated Build Check**
  - Run `npm run build` to verify clean SSG build without errors.
