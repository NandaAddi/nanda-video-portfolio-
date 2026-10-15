# Single & Multiple Video Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement single and multiple video support for portfolio cards, featuring an interactive in-modal playlist bar, clean editorial thumbnail badges in the gallery, and dynamic video management in the admin drawer.

**Architecture:** Extend `ProjectItemTranslation` and `PortfolioProjectRecord` to support `videos?: Array<{ title: string; youtubeId: string }>`. In `Showcase.astro`, display a clean SVG multi-video badge on thumbnails with >1 video. In `VideoModal.astro`, render an interactive horizontal playlist strip below the player when multiple videos exist. In `ProjectModal.astro` (Admin), add a segmented toggle with dynamic sub-video rows.

**Tech Stack:** Astro v5, TypeScript, Vanilla CSS, Supabase JS.

**Spec:** [`docs/superpowers/specs/2026-10-16-single-multiple-video-portfolio-design.md`](file:///d:/WEBENZE/nandavideo/docs/superpowers/specs/2026-10-16-single-multiple-video-portfolio-design.md)

## Global Constraints
- 100% backward compatibility: Projects with only `youtubeId` or 1 video continue to behave as single video projects without layout disruption.
- Strictly no emojis in UI badges: Use minimalist SVG icons and clean typography.
- Ensure all pages build statically via `astro build` with zero TypeScript or syntax errors.

---

### Task 1: Update Data Models and Seed/Fallback Data

**Files:**
- Modify: `src/data/locales/types.ts`
- Modify: `src/lib/supabase.ts`
- Modify: `src/lib/portfolio-service.ts`
- Modify: `src/data/locales/en.ts`
- Modify: `src/data/locales/id.ts`

**Interfaces:**
- Consumes: Existing project types and seed data.
- Produces: `SubVideoItem`, `ProjectItemTranslation.videos`, and `PortfolioProjectRecord.videos`.

- [ ] **Step 1: Update `types.ts` and `supabase.ts`**
In `src/data/locales/types.ts`:
```typescript
export interface SubVideoItem {
  id?: string;
  title: string;
  youtubeId: string;
}

export interface ProjectItemTranslation {
  // ... existing fields ...
  youtubeId: string;
  videos?: SubVideoItem[];
  thumbnail: string;
  // ...
}
```

In `src/lib/supabase.ts`:
```typescript
export interface PortfolioProjectRecord {
  // ... existing fields ...
  youtube_id: string;
  videos?: Array<{ title: string; youtube_id: string }>;
  thumbnail_url: string;
  // ...
}
```

- [ ] **Step 2: Update `portfolio-service.ts` mapping**
Map `row.videos` to `ProjectItemTranslation.videos`:
```typescript
videos: Array.isArray(row.videos) && row.videos.length > 0
  ? row.videos.map((v) => ({
      title: v.title || 'Video',
      youtubeId: v.youtube_id || (v as any).youtubeId || '',
    }))
  : undefined,
```

- [ ] **Step 3: Add multi-video seed data to `en.ts` and `id.ts`**
In project id `1` ("Indopride Roleplay Trailer"):
Add `videos` array:
```typescript
videos: [
  { title: 'Official Trailer (Main Cut)', youtubeId: 'dQw4w9WgXcQ' },
  { title: 'Cinematic Teaser (15s Cut)', youtubeId: '9bZkp7q19f0' },
  { title: 'Behind the Scenes & VFX Breakdown', youtubeId: 'L_LUpnjgPso' },
],
```
And localized titles in `id.ts`:
```typescript
videos: [
  { title: 'Trailer Resmi (Main Cut)', youtubeId: 'dQw4w9WgXcQ' },
  { title: 'Teaser Sinematik (15 Detik)', youtubeId: '9bZkp7q19f0' },
  { title: 'Dibalik Layar & Proses Editing', youtubeId: 'L_LUpnjgPso' },
],
```

- [ ] **Step 4: Verify TypeScript compilation**
Run: `npm run build`
Expected: Build passes.

- [ ] **Step 5: Commit**
```bash
git add src/data/locales/types.ts src/lib/supabase.ts src/lib/portfolio-service.ts src/data/locales/en.ts src/data/locales/id.ts
git commit -m "feat(portfolio): add sub-video types and multi-video seed data"
```

---

### Task 2: Update Showcase Card with Multi-Video Badge & Data Attributes

**Files:**
- Modify: `src/components/Showcase.astro`

**Interfaces:**
- Consumes: `ProjectItemTranslation.videos`
- Produces: `data-videos` attribute on `.project-card` and `.thumb-multi-badge` on thumbnail.

- [ ] **Step 1: Add `data-videos` attribute and multi-video badge markup**
In `Showcase.astro`:
```astro
<article 
  class="project-card" 
  data-category={item.category}
  data-video-id={item.youtubeId}
  data-videos={JSON.stringify(item.videos || [])}
  data-title={item.title}
  data-client={item.client}
  data-desc={item.fullDescription}
  data-tools={JSON.stringify(item.tools)}
  data-duration={item.duration}
>
  <div class="project-thumb-wrapper">
    <img src={item.thumbnail} alt={item.title} class="project-thumb" width="1280" height="720" loading="lazy" />
    <div class="thumb-overlay">...</div>

    <!-- Duration Badge -->
    <span class="thumb-duration">{item.duration}</span>

    <!-- Multi-Video Badge (if >1 video) -->
    {item.videos && item.videos.length > 1 && (
      <span class="thumb-multi-badge">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" class="multi-icon">
          <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
          <polyline points="17 2 12 7 7 2"></polyline>
        </svg>
        <span>{item.videos.length} {item.videos.length === 1 ? 'Video' : (showcase.tag.includes('Galeri') ? 'Video' : 'Videos')}</span>
      </span>
    )}
  </div>
```

- [ ] **Step 2: Add CSS for `.thumb-multi-badge`**
```css
.thumb-multi-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.6rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #0f172a;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.95);
  border-radius: var(--radius-sm, 6px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.12);
}

.thumb-multi-badge .multi-icon {
  color: var(--accent-primary, #0f172a);
}
```

- [ ] **Step 3: Verify build**
Run: `npm run build`
Expected: Build passes.

- [ ] **Step 4: Commit**
```bash
git add src/components/Showcase.astro
git commit -m "feat(showcase): render multi-video badge on card thumbnails"
```

---

### Task 3: Implement Interactive Playlist Bar in `VideoModal.astro`

**Files:**
- Modify: `src/components/VideoModal.astro`

**Interfaces:**
- Consumes: `card.getAttribute('data-videos')`, `data-video-id`
- Produces: In-modal playlist strip UI with active state and instant video switching.

- [ ] **Step 1: Add Playlist Strip markup to `VideoModal.astro`**
Between `.video-player-wrapper` and `.video-details-panel`:
```astro
<!-- Playlist Strip (Only displayed when multiple videos exist) -->
<div id="modalPlaylistWrapper" class="modal-playlist-wrapper" style="display: none;">
  <div class="playlist-header">
    <span class="playlist-title-label">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"></line>
        <line x1="8" y1="12" x2="21" y2="12"></line>
        <line x1="8" y1="18" x2="21" y2="18"></line>
        <line x1="3" y1="6" x2="3.01" y2="6"></line>
        <line x1="3" y1="12" x2="3.01" y2="12"></line>
        <line x1="3" y1="18" x2="3.01" y2="18"></line>
      </svg>
      <span>Video Playlist</span>
    </span>
    <span id="modalPlaylistCount" class="playlist-count">3 Videos</span>
  </div>
  <div id="modalPlaylistTrack" class="playlist-track">
    <!-- Playlist buttons rendered dynamically -->
  </div>
</div>
```

- [ ] **Step 2: Add CSS for `.modal-playlist-wrapper`**
Style the playlist header, track, items, and active states with clean frosted glass and smooth transitions.

- [ ] **Step 3: Update Modal Script**
In `openModal(card)`:
- Read `videosJson = card.getAttribute('data-videos') || '[]'`.
- Parse `videos: SubVideoItem[] = JSON.parse(videosJson)`.
- If `videos.length > 1`:
  - Show `#modalPlaylistWrapper`.
  - Populate `#modalPlaylistTrack` with playlist buttons.
  - Set first video as active and set `iframe.src = https://www.youtube.com/embed/${videos[0].youtubeId}?autoplay=1&rel=0`.
  - On playlist item click: update active class and change `iframe.src = https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0`.
- Else (Single Video):
  - Hide `#modalPlaylistWrapper`.
  - Set `iframe.src = https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`.

- [ ] **Step 4: Verify build**
Run: `npm run build`
Expected: Build passes.

- [ ] **Step 5: Commit**
```bash
git add src/components/VideoModal.astro
git commit -m "feat(modal): implement interactive in-modal playlist bar for multiple videos"
```

---

### Task 4: Update Admin Drawer (`ProjectModal.astro`) with Single/Multiple Toggle

**Files:**
- Modify: `src/components/admin/ProjectModal.astro`

**Interfaces:**
- Consumes: Project data with optional `videos` array.
- Produces: Form fields with Single Video / Multiple Videos segmented toggle and dynamic repeater rows.

- [ ] **Step 1: Update form markup in Tab 1 (Media & Video)**
Add segmented toggle:
- `[Single Video | Multiple Videos]`
Container for Single Video:
- YouTube ID / URL input.
Container for Multiple Videos:
- Dynamic list container `#multiVideoRows`.
- `+ Tambah Video` button (`#addVideoRowBtn`).

- [ ] **Step 2: Add dynamic row management logic in `<script>`**
- Function to add a video row (Title + YouTube ID/URL + Delete button).
- Function to extract YouTube ID from full URL or standalone ID.
- Serialization on form submit: if mode is Multiple, gather rows into `videos` array and set `youtube_id = videos[0].youtube_id`.
- Deserialization on opening edit mode: if project has `videos && videos.length > 1`, select Multiple Videos mode and populate rows.

- [ ] **Step 3: Verify build**
Run: `npm run build`
Expected: Build passes with zero errors on `/admin`.

- [ ] **Step 4: Commit**
```bash
git add src/components/admin/ProjectModal.astro
git commit -m "feat(admin): add single and multiple video management to project drawer"
```

---

### Task 5: End-to-End Verification & Walkthrough Creation

**Files:**
- None (Verification step)

- [ ] **Step 1: Run `npm run build`**
Confirm 5 static pages build cleanly.

- [ ] **Step 2: Verify live in browser preview**
- Run `npm run preview`.
- Verify Showcase cards: project 1 shows multi-video badge, other projects show single duration badge.
- Click project 1: modal opens with Video 1 playing, playlist bar visible below player showing all 3 cuts.
- Click Video 2 ("Cinematic Teaser"): iframe changes to Video 2 with active styling, without modal closing.
- Click a single-video project: modal opens with clean single player, playlist bar hidden.
- Test in Indonesian (`/id`): verify badge text and playlist labels.

- [ ] **Step 3: Create Walkthrough Artifact**
Generate `walkthrough.md` with verification results.
