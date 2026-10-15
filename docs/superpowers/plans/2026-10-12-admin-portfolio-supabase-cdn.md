# Admin Portfolio Management with Supabase & Custom CDN Proxy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a secure, modern admin panel at `/admin` to manage video portfolios with Supabase database & auth, direct GitHub media uploads served via jsDelivr proxied through `hello.nandaaddiwijaya.my.id`, and SSG build-time data integration with deploy webhook triggering.

**Architecture:** 
- **Admin App:** Client-side SPA at `/admin` inside the existing Astro site, styled with modern studio aesthetics, protected by Supabase Auth (Email & Password).
- **Media CDN & Proxy:** Assets uploaded directly to a GitHub repository via GitHub REST API, served through jsDelivr and proxied via a Cloudflare Worker on `hello.nandaaddiwijaya.my.id`.
- **Data & Build Integration:** Supabase PostgreSQL table with bilingual fields (EN & ID), queried during `astro build` with seamless fallback to local seed data. Deploy webhook button in the admin dashboard triggers automatic static rebuilds.

**Tech Stack:** Astro 5, `@supabase/supabase-js`, TypeScript, Vanilla CSS (Design Tokens), Cloudflare Workers, GitHub REST API, jsDelivr CDN.

---

## Global Constraints
- Astro remains `output: 'static'` for optimal SEO, speed, and static hosting compatibility.
- Build must never fail if Supabase is offline: automatic fallback to local seed dictionaries.
- Zero external UI libraries: maintain 100% Vanilla CSS design system matching the portfolio's clean editorial style.
- Secure secrets: GitHub PAT & Deploy Webhook stored locally in admin's authenticated storage, Supabase protected by Row Level Security (RLS).

---

## Planned File Structure

```
d:/WEBENZE/nandavideo/
├── cloudflare/
│   ├── worker.js                     # Cloudflare Worker script for hello.nandaaddiwijaya.my.id
│   └── wrangler.toml                 # Cloudflare Wrangler config
├── supabase/
│   └── schema.sql                    # SQL migration with RLS policies and seed data
├── src/
│   ├── lib/
│   │   ├── supabase.ts               # Supabase client setup & helper types
│   │   ├── github-uploader.ts        # Direct GitHub REST API asset uploader
│   │   └── portfolio-service.ts      # SSG data fetcher with local fallback
│   ├── components/admin/
│   │   ├── AdminAuth.astro           # Login screen component
│   │   ├── AdminDashboard.astro      # Main portfolio management dashboard
│   │   ├── ProjectModal.astro        # Bilingual add/edit project modal
│   │   └── SettingsModal.astro       # GitHub & Deploy webhook settings modal
│   └── pages/
│       └── admin/
│           └── index.astro           # /admin route entrypoint
```

---

## Implementation Tasks

### Task 1: Supabase Database Schema & Client Configuration
**Files:**
- Create: `supabase/schema.sql`
- Create: `src/lib/supabase.ts`
- Modify: `package.json`

**Steps:**
- [ ] Install `@supabase/supabase-js`.
- [ ] Write `supabase/schema.sql` defining `portfolio_projects` table (with columns for `slug`, `category`, `duration`, `youtube_id`, `thumbnail_url`, `tools`, `sort_order`, and bilingual columns `title_en`, `title_id`, `client_en`, `client_id`, `desc_en`, `desc_id`, `full_desc_en`, `full_desc_id`, `role_en`, `role_id`).
- [ ] Add Supabase RLS policies (Public SELECT, Authenticated INSERT/UPDATE/DELETE).
- [ ] Create `src/lib/supabase.ts` with safe environment variable initialization (`PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`).

### Task 2: Cloudflare Worker CDN Proxy Configuration
**Files:**
- Create: `cloudflare/worker.js`
- Create: `cloudflare/README.md`

**Steps:**
- [ ] Implement `cloudflare/worker.js` to route requests from `hello.nandaaddiwijaya.my.id/*` to `cdn.jsdelivr.net/gh/<owner>/<repo>@<branch>/*`.
- [ ] Add caching headers (`Cache-Control: public, max-age=31536000, immutable`), CORS headers, and error handling.
- [ ] Document exact DNS setup (CNAME `hello` to worker or custom domain in Cloudflare Dashboard).

### Task 3: GitHub Media Asset Uploader Utility
**Files:**
- Create: `src/lib/github-uploader.ts`

**Steps:**
- [ ] Implement browser file reading (ArrayBuffer -> Base64).
- [ ] Implement GitHub Contents API `PUT /repos/{owner}/{repo}/contents/{path}` with commit message.
- [ ] Automatically return the proxied URL `https://hello.nandaaddiwijaya.my.id/{path}`.
- [ ] Implement local configuration manager (storing repo owner, repo name, branch, and PAT in encrypted/localStorage cache).

### Task 4: SSG Build-Time Integration with Local Fallback
**Files:**
- Create: `src/lib/portfolio-service.ts`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/id/index.astro`

**Steps:**
- [ ] Build `src/lib/portfolio-service.ts` that fetches active projects from Supabase during `astro build`.
- [ ] If Supabase is offline or env vars are empty, gracefully fall back to existing `enDictionary.projects` / `idDictionary.projects`.
- [ ] Update `src/pages/index.astro` and `src/pages/id/index.astro` to consume dynamic projects while maintaining 100% static output.

### Task 5: Admin Panel UI & Workflow (`/admin`)
**Files:**
- Create: `src/pages/admin/index.astro`
- Create: `src/components/admin/AdminAuth.astro`
- Create: `src/components/admin/AdminDashboard.astro`
- Create: `src/components/admin/ProjectModal.astro`
- Create: `src/components/admin/SettingsModal.astro`

**Steps:**
- [ ] Build `/admin` route with Supabase Auth state listener.
- [ ] Build high-end Studio Login screen matching the portfolio's typography & dark/glass aesthetic.
- [ ] Build Project List view with thumbnails, categories, reorder buttons, and Edit/Delete triggers.
- [ ] Build Bilingual Add/Edit Project Modal with EN & ID tabs, YouTube ID validator, tools selector, and GitHub drag-and-drop image upload.
- [ ] Build Settings Modal with GitHub token config and "Deploy / Rebuild Site" webhook trigger.

### Task 6: Verification & End-to-End Testing
**Steps:**
- [ ] Verify `npm run build` succeeds cleanly without Supabase credentials (fallback test).
- [ ] Verify `npm run build` succeeds with Supabase mock data.
- [ ] Test `/admin` UI responsiveness, authentication states, and modal interactions.
