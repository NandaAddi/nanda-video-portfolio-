# Multi-Page Architecture Design Specification

## Overview
This specification details the transformation of the single-page bilingual portfolio into a clean, multi-page web application.

- **Beranda (Home)**: Focuses on an introductory hero (photo polaroid and bio description only) followed immediately by the curated Portfolio Gallery (Showcase), concluding with the Contact Hub collaboration footer.
- **Halaman Tentang (About)**: Houses the complete personal dossier, presenting the full hero along with the comprehensive 3-column info grid (Education, Languages, Work Experience, Softwares, and Compact Contact Details), followed by the Contact Hub collaboration footer.

---

## 1. Route Architecture & Locales

The application retains its bilingual English (`en`) and Indonesian (`id`) support across distinct URL routes:

| Route | Locale | Page Description | Key Components |
|---|---|---|---|
| `/` | `en` | English Home Page | `Navbar`, `Hero (compact)`, `Showcase`, `ContactHub`, `VideoModal` |
| `/about` | `en` | English About Page | `Navbar`, `Hero (full)`, `ContactHub` |
| `/id` | `id` | Indonesian Home Page | `Navbar`, `Hero (compact)`, `Showcase`, `ContactHub`, `VideoModal` |
| `/id/about` | `id` | Indonesian About Page | `Navbar`, `Hero (full)`, `ContactHub` |

### Locale Switching Matrix
The `Navbar` language switcher intelligently toggles between matching localized routes while preserving page context:
- `/` ⇄ `/id`
- `/about` ⇄ `/id/about`

---

## 2. Component Design & Modifications

### 2.1. `Hero.astro`
- **Props**:
  ```ts
  interface Props {
    hero?: HeroTranslations;
    locale?: Locale;
    variant?: 'compact' | 'full'; // Defaults to 'full'
  }
  ```
- **Behavior**:
  - `variant="compact"` (Home page):
    - Renders `.hero-top-row`: Polaroid profile card, greeting (`Halo! Saya...` / `Hi! I'm...`), roles, and bio description.
    - Renders an elegant secondary CTA link button:
      - EN: `More about me →` linking to `/about`
      - ID: `Selengkapnya tentang saya →` linking to `/id/about`
    - Does **not** render `.hero-bottom-grid` (Education, Experience, Languages, Softwares, Compact Contact).
  - `variant="full"` (About page):
    - Renders `.hero-top-row`: Polaroid profile card, greeting, roles, and bio description.
    - Renders `.hero-bottom-grid`:
      - Column 1: Education details & Language proficiency dots.
      - Column 2: Work Experience timeline.
      - Column 3: Softwares grid & Compact Contact items.

### 2.2. `Navbar.astro`
- **Props**:
  ```ts
  interface Props {
    currentLocale?: Locale; // 'en' | 'id'
    currentPage?: 'home' | 'about'; // Defaults to 'home'
    nav?: NavTranslations;
  }
  ```
- **Navigation Logic**:
  - **Brand Logo**:
    - EN: `/`
    - ID: `/id`
  - **Selected Work / Karya Pilihan**:
    - When on `home`: `#showcase` (smooth in-page scroll)
    - When on `about`: `/#showcase` (EN) or `/id#showcase` (ID)
  - **About / Tentang**:
    - Always links to `/about` (EN) or `/id/about` (ID)
    - Styled with active indicator class `active` when `currentPage === 'about'`
  - **Contact / Kontak**:
    - Always `#contact` (smooth in-page scroll, as ContactHub is present on all pages)
  - **Language Switcher**:
    - Dynamically generates links based on `currentPage`:
      - On `home`: EN points to `/`, ID points to `/id`
      - On `about`: EN points to `/about`, ID points to `/id/about`

### 2.3. Locales & Translations (`src/data/locales/`)
- Update `types.ts` to include `hero.moreAboutMe?: string` or provide appropriate localized string fallbacks:
  - English: `"More about me"` / `"More about me →"`
  - Indonesian: `"Selengkapnya tentang saya"` / `"Selengkapnya tentang saya →"`
- Metadata definitions for About pages:
  - English About Title: `About | Nanda Addi Wijaya - Videographer & Video Editor`
  - Indonesian About Title: `Tentang | Nanda Addi Wijaya - Videografer & Video Editor`

---

## 3. Page Implementations

### 3.1. `src/pages/index.astro` (English Home)
- Renders:
  - `<Navbar currentLocale="en" currentPage="home" nav={dict.nav} />`
  - `<Hero hero={dict.hero} locale="en" variant="compact" />`
  - `<Showcase showcase={dict.showcase} projects={projects} />`
  - `<ContactHub contactContent={dict.contact} locale="en" />`
  - `<VideoModal modal={dict.modal} />`

### 3.2. `src/pages/id/index.astro` (Indonesian Home)
- Renders:
  - `<Navbar currentLocale="id" currentPage="home" nav={dict.nav} />`
  - `<Hero hero={dict.hero} locale="id" variant="compact" />`
  - `<Showcase showcase={dict.showcase} projects={projects} />`
  - `<ContactHub contactContent={dict.contact} locale="id" />`
  - `<VideoModal modal={dict.modal} />`

### 3.3. `src/pages/about.astro` (English About)
- Renders:
  - `<Navbar currentLocale="en" currentPage="about" nav={dict.nav} />`
  - `<Hero hero={dict.hero} locale="en" variant="full" />`
  - `<ContactHub contactContent={dict.contact} locale="en" />`

### 3.4. `src/pages/id/about.astro` (Indonesian About)
- Renders:
  - `<Navbar currentLocale="id" currentPage="about" nav={dict.nav} />`
  - `<Hero hero={dict.hero} locale="id" variant="full" />`
  - `<ContactHub contactContent={dict.contact} locale="id" />`

---

## 4. Verification & Testing Strategy
1. **Routing Verification**:
   - Navigate to `/` → Verify compact hero + showcase + contact hub.
   - Navigate to `/about` → Verify full hero (with 3-column grid) + contact hub.
   - Navigate to `/id` → Verify Indonesian compact hero + showcase + contact hub.
   - Navigate to `/id/about` → Verify Indonesian full hero + contact hub.
2. **Language Switcher Verification**:
   - On `/about`, click `ID` → Navigates to `/id/about`.
   - On `/id/about`, click `EN` → Navigates to `/about`.
   - On `/`, click `ID` → Navigates to `/id`.
3. **Cross-Page Anchor Verification**:
   - From `/about`, click "Selected Work" / "Karya Pilihan" → Navigates to `/#showcase` and lands at the portfolio section.
4. **Build Verification**:
   - Run `npm run build` to verify all static routes generate cleanly without TypeScript or Astro compiler errors.
