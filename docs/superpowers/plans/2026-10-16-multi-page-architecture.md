# Multi-Page Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the single-page bilingual portfolio into a clean multi-page site with dedicated Home and About pages for both English and Indonesian locales.

**Architecture:** Refactor `Hero.astro` into `compact` (Home: profile polaroid & bio description + CTA to About) and `full` (About: complete profile + 3-column dossier grid). Update `Navbar.astro` to handle multi-page routing, active page styling, and locale switching between `/` ⇄ `/id` and `/about` ⇄ `/id/about`. Create `about.astro` and `id/about.astro`.

**Tech Stack:** Astro v5, TypeScript, Vanilla CSS.

**Spec:** [`docs/superpowers/specs/2026-10-16-multi-page-architecture-design.md`](file:///d:/WEBENZE/nandavideo/docs/superpowers/specs/2026-10-16-multi-page-architecture-design.md)

## Global Constraints
- Preserve existing responsive styling, CSS variables, and design tokens.
- Zero regression on existing bilingual features (`en` and `id`).
- Ensure all pages build statically via `astro build` with zero TypeScript or syntax errors.

---

### Task 1: Update Locales Types & Dictionaries

**Files:**
- Modify: `src/data/locales/types.ts`
- Modify: `src/data/locales/en.ts`
- Modify: `src/data/locales/id.ts`

**Interfaces:**
- Consumes: Existing `HeroTranslations` and `LocaleDictionary`
- Produces: `hero.moreAboutMe: string` and `dict.aboutMeta: { title: string; description: string }`

- [ ] **Step 1: Update `types.ts`**
Add `moreAboutMe?: string;` to `HeroTranslations` and `aboutMeta: { title: string; description: string; };` to `LocaleDictionary`.

```typescript
export interface HeroTranslations {
  tag: string;
  greetingTitle: string;
  roles: string[];
  bio: string;
  moreAboutMe?: string;
  primaryCta: string;
  secondaryCta: string;
  // ... rest of interface unchanged
}

export interface LocaleDictionary {
  locale: Locale;
  meta: {
    title: string;
    description: string;
  };
  aboutMeta: {
    title: string;
    description: string;
  };
  nav: NavTranslations;
  hero: HeroTranslations;
  showcase: ShowcaseTranslations;
  contact: ContactTranslations;
  modal: VideoModalTranslations;
  projects: ProjectItemTranslation[];
}
```

- [ ] **Step 2: Update `en.ts` and `id.ts`**
In `en.ts`:
- Set `aboutMeta`:
  ```typescript
  aboutMeta: {
    title: 'About | Nanda Addi Wijaya - Videographer & Video Editor',
    description: 'Background, education, experience, creative tools, and contact info of Nanda Addi Wijaya.',
  },
  ```
- Set `hero.moreAboutMe`: `'More about me →'`

In `id.ts`:
- Set `aboutMeta`:
  ```typescript
  aboutMeta: {
    title: 'Tentang | Nanda Addi Wijaya - Portofolio Videografer & Video Editor',
    description: 'Latar belakang, pendidikan, pengalaman kerja, perangkat lunak kreatif, dan informasi kontak Nanda Addi Wijaya.',
  },
  ```
- Set `hero.moreAboutMe`: `'Selengkapnya tentang saya →'`

- [ ] **Step 3: Verify TypeScript compilation**
Run: `npx astro check || npm run build`
Expected: Passes without type mismatch errors.

- [ ] **Step 4: Commit**
```bash
git add src/data/locales/types.ts src/data/locales/en.ts src/data/locales/id.ts
git commit -m "feat(locales): add aboutMeta and moreAboutMe translations"
```

---

### Task 2: Refactor `Hero.astro` with Compact and Full Variants

**Files:**
- Modify: `src/components/Hero.astro`

**Interfaces:**
- Consumes: `Props` with optional `variant?: 'compact' | 'full'` (default: `'full'`), `locale: Locale`, `hero: HeroTranslations`
- Produces: Rendered markup for either compact intro with About CTA or full profile with 3-column info grid.

- [ ] **Step 1: Update `Hero.astro` frontmatter Props**
Add `variant?: 'compact' | 'full';` to `Props` with default `'full'`:
```astro
interface Props {
  hero?: HeroTranslations;
  locale?: Locale;
  variant?: 'compact' | 'full';
}

const { hero, locale = 'en', variant = 'full' } = Astro.props;
const aboutHref = locale === 'id' ? '/id/about' : '/about';
const moreAboutMeText = currentHero.moreAboutMe || (locale === 'id' ? 'Selengkapnya tentang saya →' : 'More about me →');
```

- [ ] **Step 2: Update template markup**
In `.hero-bio-container`, add the CTA button when `variant === 'compact'`:
```astro
{variant === 'compact' && (
  <div class="hero-actions">
    <a href={aboutHref} class="btn-more-about">
      <span>{moreAboutMeText}</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="arrow-icon">
        <path d="M5 12h14"></path>
        <path d="M12 5l7 7-7 7"></path>
      </svg>
    </a>
  </div>
)}
```

Wrap `.hero-bottom-grid` in `{variant === 'full' && ( ... )}` so that in compact mode, only the top row (Polaroid + Bio) renders.

- [ ] **Step 3: Add CSS for `.hero-actions` and `.btn-more-about`**
```css
.hero-actions {
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
}

.btn-more-about {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent-primary, #0f172a);
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: var(--radius-sm, 8px);
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  transition: all var(--transition-fast, 0.2s ease);
}

.btn-more-about:hover {
  background: #ffffff;
  border-color: var(--accent-primary, #0f172a);
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.08);
  transform: translateY(-1px);
}

.btn-more-about .arrow-icon {
  transition: transform var(--transition-fast, 0.2s ease);
}

.btn-more-about:hover .arrow-icon {
  transform: translateX(3px);
}
```

- [ ] **Step 4: Verify build**
Run: `npm run build`
Expected: Build passes.

- [ ] **Step 5: Commit**
```bash
git add src/components/Hero.astro
git commit -m "feat(hero): support compact and full variants with about page CTA"
```

---

### Task 3: Refactor `Navbar.astro` for Multi-Page Navigation

**Files:**
- Modify: `src/components/Navbar.astro`

**Interfaces:**
- Consumes: `Props` with `currentPage?: 'home' | 'about'`, `currentLocale?: Locale`, `nav?: NavTranslations`
- Produces: Dynamic navigation URLs, active link indicators, and contextual language switcher links.

- [ ] **Step 1: Update Props and Href computations**
```astro
interface Props {
  currentLocale?: Locale;
  currentPage?: 'home' | 'about';
  nav?: NavTranslations;
}

const {
  currentLocale = 'en',
  currentPage = 'home',
  nav = {
    about: 'About',
    showcase: 'Selected Work',
    contact: 'Contact',
    ctaText: 'Get in Touch',
  },
} = Astro.props;

const homeHref = currentLocale === 'id' ? '/id' : '/';
const aboutHref = currentLocale === 'id' ? '/id/about' : '/about';
const showcaseHref = currentPage === 'home' 
  ? '#showcase' 
  : (currentLocale === 'id' ? '/id#showcase' : '/#showcase');
const contactHref = '#contact';

const enHref = currentPage === 'about' ? '/about' : '/';
const idHref = currentPage === 'about' ? '/id/about' : '/id';
```

- [ ] **Step 2: Update Navbar desktop and mobile link templates**
Update brand logo:
```astro
<a href={homeHref} class="nav-brand">
  <span class="brand-name">{name}</span>
</a>
```

Update desktop nav links:
```astro
<nav class="nav-links-desktop">
  <a href={showcaseHref} class="nav-link">{nav.showcase}</a>
  <a href={aboutHref} class={`nav-link ${currentPage === 'about' ? 'active' : ''}`}>{nav.about}</a>
  <a href={contactHref} class="nav-link">{nav.contact}</a>
</nav>
```

Update mobile nav links:
```astro
<nav class="mobile-nav-links">
  <a href={showcaseHref} class="mobile-link">{nav.showcase}</a>
  <a href={aboutHref} class={`mobile-link ${currentPage === 'about' ? 'active' : ''}`}>{nav.about}</a>
  <a href={contactHref} class="mobile-link">{nav.contact}</a>
  ...
</nav>
```

- [ ] **Step 3: Update CSS for active link styling**
```css
.nav-link.active {
  color: var(--accent-primary, #0f172a);
  font-weight: 600;
  position: relative;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--accent-primary, #0f172a);
  border-radius: 2px;
}

.mobile-link.active {
  color: var(--accent-primary, #0f172a);
  font-weight: 600;
}
```

- [ ] **Step 4: Update language switcher script**
Ensure the client script preserves `#showcase` or `#contact` hash when toggling between EN and ID:
```typescript
const langLinks = document.querySelectorAll<HTMLAnchorElement>('.lang-btn');
langLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const hash = window.location.hash;
    if (hash) {
      const baseHref = link.getAttribute('data-href-base') || link.getAttribute('href') || '/';
      link.href = `${baseHref}${hash}`;
    }
  });
});
```

- [ ] **Step 5: Verify build**
Run: `npm run build`
Expected: Build passes.

- [ ] **Step 6: Commit**
```bash
git add src/components/Navbar.astro
git commit -m "feat(navbar): support multi-page navigation and smart locale toggling"
```

---

### Task 4: Update Home Pages (`src/pages/index.astro` and `src/pages/id/index.astro`)

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/id/index.astro`

**Interfaces:**
- Consumes: `Hero` with `variant="compact"`, `Navbar` with `currentPage="home"`
- Produces: Minimal profile hero on home page followed by Showcase gallery and ContactHub.

- [ ] **Step 1: Update `src/pages/index.astro`**
```astro
---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/Navbar.astro';
import Hero from '../components/Hero.astro';
import Showcase from '../components/Showcase.astro';
import VideoModal from '../components/VideoModal.astro';
import ContactHub from '../components/ContactHub.astro';
import { getDictionary } from '../data/locales';
import { getProjectsForLocale } from '../lib/portfolio-service';

const dict = getDictionary('en');
const projects = await getProjectsForLocale('en');
---

<Layout title={dict.meta.title} description={dict.meta.description} lang="en">
  <Navbar currentLocale="en" currentPage="home" nav={dict.nav} />
  <main>
    <Hero hero={dict.hero} locale="en" variant="compact" />
    <Showcase showcase={dict.showcase} projects={projects} />
    <ContactHub contactContent={dict.contact} locale="en" />
  </main>
  <VideoModal modal={dict.modal} />
</Layout>
```

- [ ] **Step 2: Update `src/pages/id/index.astro`**
```astro
---
import Layout from '../../layouts/Layout.astro';
import Navbar from '../../components/Navbar.astro';
import Hero from '../../components/Hero.astro';
import Showcase from '../../components/Showcase.astro';
import VideoModal from '../../components/VideoModal.astro';
import ContactHub from '../../components/ContactHub.astro';
import { getDictionary } from '../../data/locales';
import { getProjectsForLocale } from '../../lib/portfolio-service';

const dict = getDictionary('id');
const projects = await getProjectsForLocale('id');
---

<Layout title={dict.meta.title} description={dict.meta.description} lang="id">
  <Navbar currentLocale="id" currentPage="home" nav={dict.nav} />
  <main>
    <Hero hero={dict.hero} locale="id" variant="compact" />
    <Showcase showcase={dict.showcase} projects={projects} />
    <ContactHub contactContent={dict.contact} locale="id" />
  </main>
  <VideoModal modal={dict.modal} />
</Layout>
```

- [ ] **Step 3: Verify build**
Run: `npm run build`
Expected: Build passes.

- [ ] **Step 4: Commit**
```bash
git add src/pages/index.astro src/pages/id/index.astro
git commit -m "feat(pages): configure home pages with compact hero"
```

---

### Task 5: Create About Pages (`src/pages/about.astro` and `src/pages/id/about.astro`)

**Files:**
- Create: `src/pages/about.astro`
- Create: `src/pages/id/about.astro`

**Interfaces:**
- Consumes: `Hero` with `variant="full"`, `Navbar` with `currentPage="about"`, `ContactHub`, `dict.aboutMeta`
- Produces: Dedicated About page routes `/about` and `/id/about`.

- [ ] **Step 1: Create `src/pages/about.astro`**
```astro
---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/Navbar.astro';
import Hero from '../components/Hero.astro';
import ContactHub from '../components/ContactHub.astro';
import { getDictionary } from '../data/locales';

const dict = getDictionary('en');
---

<Layout title={dict.aboutMeta.title} description={dict.aboutMeta.description} lang="en">
  <Navbar currentLocale="en" currentPage="about" nav={dict.nav} />
  <main>
    <Hero hero={dict.hero} locale="en" variant="full" />
    <ContactHub contactContent={dict.contact} locale="en" />
  </main>
</Layout>
```

- [ ] **Step 2: Create `src/pages/id/about.astro`**
```astro
---
import Layout from '../../layouts/Layout.astro';
import Navbar from '../../components/Navbar.astro';
import Hero from '../../components/Hero.astro';
import ContactHub from '../../components/ContactHub.astro';
import { getDictionary } from '../../data/locales';

const dict = getDictionary('id');
---

<Layout title={dict.aboutMeta.title} description={dict.aboutMeta.description} lang="id">
  <Navbar currentLocale="id" currentPage="about" nav={dict.nav} />
  <main>
    <Hero hero={dict.hero} locale="id" variant="full" />
    <ContactHub contactContent={dict.contact} locale="id" />
  </main>
</Layout>
```

- [ ] **Step 3: Verify build generates 5 static routes**
Run: `npm run build`
Expected: Output includes:
- `/index.html`
- `/about/index.html`
- `/id/index.html`
- `/id/about/index.html`
- `/admin/index.html`

- [ ] **Step 4: Commit**
```bash
git add src/pages/about.astro src/pages/id/about.astro
git commit -m "feat(pages): create dedicated about pages for en and id locales"
```

---

### Task 6: Comprehensive Verification & Visual Check

**Files:**
- None (Verification step)

- [ ] **Step 1: Run static build and check bundle outputs**
Run: `npm run build`
Verify all 5 routes build without errors or warnings.

- [ ] **Step 2: Verify live local server behavior**
Run: `npm run preview` or test pages in browser.
Check:
- `http://localhost:4321/`: Compact hero (only photo & bio + 'More about me →') followed immediately by Showcase gallery and ContactHub.
- Click 'More about me →' or 'About' in navbar → Lands on `/about`.
- `http://localhost:4321/about`: Full hero (photo, bio, and 3-column grid of Education, Languages, Experience, Softwares, Compact Contact) + ContactHub.
- On `/about`, click 'ID' in navbar → Switches to `/id/about`.
- On `/id/about`, click 'Karya Pilihan' → Navigates to `/id#showcase`.
- On `/id`, compact hero shows Indonesian bio and 'Selengkapnya tentang saya →'.

- [ ] **Step 3: Final Git status check**
Run: `git status`
Confirm working tree is clean and all tasks are accounted for.
