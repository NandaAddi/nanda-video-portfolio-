# Bilingual English Default & Indonesian Subpath Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the portfolio into a fully bilingual website where the root domain (`/`) serves English by default and the `/id` subpath serves Indonesian, complete with full UI & project translation and a minimalist Navbar language switcher with smart anchor preservation.

**Architecture:** Utilize native Astro 5 i18n routing (`prefixDefaultLocale: false`), typed locale dictionary modules (`src/data/locales/`), component props for locale dictionary passing, and client-side hash preservation for language switching.

**Tech Stack:** Astro 5, TypeScript, Vanilla CSS, Vanilla JavaScript.

**Spec:** `docs/superpowers/specs/2026-10-10-bilingual-en-id-architecture.md`

## Global Constraints
* Root `/` MUST serve English (`lang="en"`).
* Subpath `/id` MUST serve Indonesian (`lang="id"`).
* Full bilingual translation (UI copy, bio, experiences, metrics, and all portfolio project details).
* Preserve the Cinematic Focus Blur transition in `Showcase.astro`.
* Preserve smooth scrolling and Lenis scroll integration.

---

### Task 1: Astro i18n Configuration & Locale Types

**Files:**
- Modify: `astro.config.mjs`
- Create: `src/data/locales/types.ts`

**Interfaces:**
- Produces: `Locale`, `LocaleDictionary`, `NavTranslations`, `HeroTranslations`, `ShowcaseTranslations`, `ContactTranslations`, `ProjectItemTranslation`.

- [ ] **Step 1: Update `astro.config.mjs` with i18n routing**

```javascript
// astro.config.mjs
// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
```

- [ ] **Step 2: Create TypeScript contracts in `src/data/locales/types.ts`**

Define exact interfaces for `LocaleDictionary` and each section:
```typescript
export type Locale = 'en' | 'id';

export interface NavTranslations {
  about: string;
  showcase: string;
  contact: string;
  ctaText: string;
}

export interface MetricItem {
  value: string;
  label: string;
}

export interface HeroTranslations {
  tag: string;
  greetingTitle: string;
  roles: string[];
  bio: string;
  primaryCta: string;
  secondaryCta: string;
  stats: {
    experience: MetricItem;
    videos: MetricItem;
    websites: MetricItem;
  };
  education: {
    institution: string;
    major: string;
    period: string;
  };
  experienceHeading: string;
  experiences: Array<{
    period: string;
    company: string;
    role: string;
    type: string;
  }>;
}

export interface ShowcaseTranslations {
  tag: string;
  title: string;
  description: string;
  categories: Array<{ id: string; label: string }>;
}

export interface ContactTranslations {
  collabTitle: string;
  collabSubtitle: string;
  collabCta: string;
  whatsappLabel: string;
  whatsappSub: string;
  whatsappAction: string;
  emailLabel: string;
  emailSub: string;
  instagramLabel: string;
  instagramSub: string;
  linkedinLabel: string;
  linkedinSub: string;
  footerRights: string;
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
  youtubeId: string;
  thumbnail: string;
  role: string;
  tools: string[];
}

export interface LocaleDictionary {
  locale: Locale;
  meta: {
    title: string;
    description: string;
  };
  nav: NavTranslations;
  hero: HeroTranslations;
  showcase: ShowcaseTranslations;
  contact: ContactTranslations;
  projects: ProjectItemTranslation[];
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add astro.config.mjs src/data/locales/types.ts
git commit -m "feat(i18n): configure astro i18n routing and locale types"
```

---

### Task 2: English & Indonesian Locale Dictionaries

**Files:**
- Create: `src/data/locales/en.ts`
- Create: `src/data/locales/id.ts`
- Create: `src/data/locales/index.ts`

**Interfaces:**
- Consumes: `LocaleDictionary`, `Locale` from `src/data/locales/types.ts`
- Produces: `getDictionary(locale: Locale): LocaleDictionary`

- [ ] **Step 1: Create English dictionary in `src/data/locales/en.ts`**

Full English content matching portfolio bio, metrics, hero copy, and project details.

- [ ] **Step 2: Create Indonesian dictionary in `src/data/locales/id.ts`**

Full Indonesian translation matching portfolio bio, metrics, hero copy, and project details.

- [ ] **Step 3: Create helper `src/data/locales/index.ts`**

Export `getDictionary(locale: Locale): LocaleDictionary` returning `en` or `id`.

- [ ] **Step 4: Verify build & TypeScript compilation**

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/data/locales/
git commit -m "feat(i18n): add comprehensive English and Indonesian locale dictionaries"
```

---

### Task 3: Layout & Navbar Internationalization (Language Switcher & Smart Anchor)

**Files:**
- Modify: `src/layouts/Layout.astro`
- Modify: `src/components/Navbar.astro`

**Interfaces:**
- Consumes: `Locale`, `NavTranslations`
- Produces: `<html lang={lang}>`, localized navbar links, `EN | ID` switcher with hash preservation script.

- [ ] **Step 1: Update `Layout.astro` to accept `lang: Locale`, `title`, and `description`**

Set `<html lang={lang}>` and localized meta tags.

- [ ] **Step 2: Update `Navbar.astro` with language switcher pill & smart anchor script**

Add `EN | ID` switcher in desktop actions and mobile drawer.
Add script:
```javascript
const langLinks = document.querySelectorAll('.lang-btn');
langLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const hash = window.location.hash;
    if (hash) {
      const baseHref = link.getAttribute('data-href-base') || link.getAttribute('href');
      link.setAttribute('href', baseHref + hash);
    }
  });
});
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Layout.astro src/components/Navbar.astro
git commit -m "feat(i18n): add localized navbar with language switcher and smart anchor"
```

---

### Task 4: Hero, Showcase, ContactHub & VideoModal Component Updates

**Files:**
- Modify: `src/components/Hero.astro`
- Modify: `src/components/Showcase.astro`
- Modify: `src/components/ContactHub.astro`
- Modify: `src/components/VideoModal.astro`

**Interfaces:**
- Consumes: `HeroTranslations`, `ShowcaseTranslations`, `ContactTranslations`, `ProjectItemTranslation[]`

- [ ] **Step 1: Update `Hero.astro` to accept `hero: HeroTranslations` and `contactData`**

Render localized bio, roles, education, experiences, and metrics.

- [ ] **Step 2: Update `Showcase.astro` to accept `showcase: ShowcaseTranslations` and `projects: ProjectItemTranslation[]`**

Render localized category filters and project items while keeping the **Cinematic Focus Blur** filter transition intact.

- [ ] **Step 3: Update `ContactHub.astro` to accept `contactContent: ContactTranslations` and `contactData`**

Render localized collaboration banner, contact cards, and footer.

- [ ] **Step 4: Update `VideoModal.astro` with localized labels**

Accept optional localized labels for modal accessibility.

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/
git commit -m "feat(i18n): localize Hero, Showcase, ContactHub, and VideoModal components"
```

---

### Task 5: Pages Routing (`/` for English and `/id` for Indonesian)

**Files:**
- Modify: `src/pages/index.astro`
- Create: `src/pages/id/index.astro`

**Interfaces:**
- `src/pages/index.astro`: Renders `getDictionary('en')` with `lang="en"`.
- `src/pages/id/index.astro`: Renders `getDictionary('id')` with `lang="id"`.

- [ ] **Step 1: Update `src/pages/index.astro` to render English default**

Import `getDictionary('en')` and pass data to all components.

- [ ] **Step 2: Create `src/pages/id/index.astro` to render Indonesian**

Import `getDictionary('id')` and pass data to all components.

- [ ] **Step 3: Verify build output**

Run: `npm run build`
Expected: Verify both `/index.html` and `/id/index.html` are generated without errors.

- [ ] **Step 4: Commit**

```bash
git add src/pages/
git commit -m "feat(i18n): add English root page and Indonesian subpath page"
```

---

### Task 6: End-to-End Verification & Polish

**Files:**
- Verification only

- [ ] **Step 1: Run full production build**

Run: `npm run build`
Expected: Build passes with 0 errors, outputting both `/index.html` and `/id/index.html`.

- [ ] **Step 2: Verify static files content**

Check `dist/index.html` has `<html lang="en">` and English text.
Check `dist/id/index.html` has `<html lang="id">` and Indonesian text.

- [ ] **Step 3: Final commit & git status clean**
