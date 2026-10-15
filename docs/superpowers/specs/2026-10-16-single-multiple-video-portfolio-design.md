# Single & Multiple Video Portfolio Design Specification

## Overview
This specification details the architecture, user experience, data schema, and administrative capabilities required to support both **Single Video** and **Multiple Video** portfolio projects.

- **Single Video Projects**: Maintain the existing clean 16:9 embedded player within the modal.
- **Multiple Video Projects**: Provide an interactive in-modal playlist bar/strip allowing visitors to toggle smoothly between different cuts, versions, or episodes (e.g., Main Cut, Teaser, Behind-the-Scenes) without leaving the modal.
- **Gallery Presentation**: Projects with multiple videos display an editorial, emoji-free badge (clean SVG playlist/layers icon + count) on their thumbnail in the Showcase gallery.
- **Admin Management**: The `/admin` dashboard slide-over form offers a toggle between Single and Multiple video modes, with a dynamic row repeater for adding sub-video entries (Title and YouTube ID).

---

## 1. Data Schema & Interfaces

### 1.1. TypeScript Interface Updates (`src/data/locales/types.ts`)
```typescript
export interface SubVideoItem {
  id?: string;
  title: string;
  youtubeId: string;
}

export interface ProjectItemTranslation {
  id: string;
  title: string;
  client: string;
  category: 'editing' | 'commercial' | 'motion';
  categoryLabel: string;
  duration: string;
  description: string;
  fullDescription: string;
  youtubeId: string; // Primary / fallback video
  videos?: SubVideoItem[]; // Optional list for multiple video projects
  thumbnail: string;
  role: string;
  tools: string[];
}
```

### 1.2. Supabase Record Schema (`src/lib/supabase.ts`)
```typescript
export interface PortfolioProjectRecord {
  id: string;
  category: 'editing' | 'commercial' | 'motion';
  duration: string;
  youtube_id: string;
  videos?: Array<{ title: string; youtube_id: string }>;
  thumbnail_url: string;
  tools: string[];
  sort_order: number;
  is_published: boolean;
  // English
  title_en: string;
  client_en: string;
  category_label_en: string;
  role_en: string;
  description_en: string;
  full_description_en: string;
  // Indonesian
  title_id: string;
  client_id: string;
  category_label_id: string;
  role_id: string;
  description_id: string;
  full_description_id: string;
  created_at?: string;
  updated_at?: string;
}
```

---

## 2. Component Specifications

### 2.1. Showcase Gallery Card (`src/components/Showcase.astro`)
- **Card Data Attributes**:
  - `data-video-id={item.youtubeId}`
  - `data-videos={JSON.stringify(item.videos || [])}`
- **Multi-Video Indicator Badge**:
  - Rendered when `item.videos && item.videos.length > 1`.
  - Positioned elegantly on the thumbnail (adjacent to the duration badge).
  - Clean Swiss editorial style: minimal SVG icon (two stacked rectangles / playlist icon) + text (e.g., `3 Videos` / `3 Video`).
  - No emojis are used, adhering strictly to the clean editorial design language.

### 2.2. Modal Player (`src/components/VideoModal.astro`)
- **Single Video Mode**:
  - The iframe loads the primary `youtubeId`.
  - The playlist strip container is hidden (`display: none`).
- **Multiple Video Mode**:
  - The iframe loads the first video in the list (`videos[0].youtubeId`).
  - An interactive horizontal scrollable Playlist Strip renders below the video iframe and above the project details.
  - Each playlist item displays:
    - Index number (`01`, `02`, etc.) or mini thumbnail.
    - Video sub-title (e.g., "Main Commercial", "Vertical Teaser").
    - Visual "Now Playing" accent state (subtle highlight, active border, playing indicator).
  - Clicking any playlist item:
    - Instantly switches the iframe source to `https://www.youtube.com/embed/${selectedYoutubeId}?autoplay=1&rel=0`.
    - Updates the active class on the clicked item.
    - Keeps the modal open and focused.

### 2.3. Admin Slide-over Drawer (`src/components/admin/ProjectModal.astro`)
- **Segmented Control in Tab 1 (Media & Video)**:
  - Toggle between `Single Video` and `Multiple Videos`.
- **Single Video Input**:
  - Standard input for YouTube ID or URL.
- **Multiple Videos Dynamic List**:
  - Container holding dynamic item rows.
  - Each row contains:
    - Sub-video Title input (e.g., "Main Cut", "Shorts Edit").
    - YouTube ID / URL input with auto YouTube ID extractor.
    - Delete button (remove row).
  - `+ Tambah Video` button to append new rows dynamically.
- Form serialization & deserialization converts the dynamic list to JSON for the `videos` field when saving to Supabase.

---

## 3. Verification & Testing Strategy
1. **Single Video Verification**:
   - Open a project with only 1 video.
   - Verify modal opens smoothly with iframe playing, no playlist strip visible, and standard metadata.
2. **Multiple Video Verification**:
   - Open a project with 2+ videos.
   - Verify multi-video badge appears on the Showcase card in the gallery.
   - Verify modal opens with the first video active and the playlist strip populated with all sub-videos.
   - Click second and third items in the playlist strip; confirm iframe source updates smoothly without closing the modal.
3. **Bilingual Verification**:
   - Verify badges display `"X Videos"` on English routes and `"X Video"` on Indonesian routes.
4. **Build Verification**:
   - Run `npm run build` to confirm zero TypeScript or Astro compilation errors across all static routes.
