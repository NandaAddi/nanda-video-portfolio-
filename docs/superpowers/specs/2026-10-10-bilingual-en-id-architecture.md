# Bilingual Website Architecture (English Default & Indonesian Subpath)

## 1. Executive Summary & Goals
Transform the portfolio website into a fully bilingual experience:
* **Primary Route (`/`)**: English (Default locale).
* **Secondary Route (`/id`)**: Indonesian (`id` locale).
* **Full Bilingual Content**: Complete translation of UI copy, bio, experiences, and all video project descriptions.
* **Language Switcher UI**: Sleek minimalist pill toggle (`EN | ID`) in the Navbar desktop (adjacent to the CTA button) and integrated into the mobile drawer menu.
* **Smart Anchor Preservation**: Preserves active page anchors (e.g. `/#showcase` switches to `/id#showcase` and vice-versa).
* **SEO**: Accurate `<html lang="...">`, meta titles, and descriptions per locale.

---

## 2. Astro 5 i18n Configuration
Update `astro.config.mjs` to enable Astro 5 native internationalization:

```javascript
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

With `prefixDefaultLocale: false`:
* Root `/` serves English without url prefix.
* Subpath `/id` serves Indonesian.

---

## 3. Data Architecture & Type Definitions

### 3.1 Directory Structure
```
src/
├── data/
│   ├── portfolio.ts (shared constants, e.g. tools, images, social links)
│   └── locales/
│       ├── types.ts (LocaleDictionary interface definition)
│       ├── en.ts (English copy and translated project data)
│       └── id.ts (Indonesian copy and translated project data)
├── pages/
│   ├── index.astro (English landing page)
│   └── id/
│       └── index.astro (Indonesian landing page)
```

### 3.2 Locale Interface Contract (`src/data/locales/types.ts`)
```typescript
export type Locale = 'en' | 'id';

export interface NavTranslations {
  about: string;
  showcase: string;
  contact: string;
  ctaText: string;
}

export interface HeroTranslations {
  tag: string;
  title: string;
  roles: string[];
  bio: string;
  primaryCta: string;
  secondaryCta: string;
  stats: {
    experience: { value: string; label: string };
    videos: { value: string; label: string };
    websites: { value: string; label: string };
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
  watchVideo: string;
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

---

## 4. Component Updates & Prop Specifications

All components will receive locale context:

1. **`src/layouts/Layout.astro`**:
   - Accepts `lang: 'en' | 'id'`, `title: string`, `description: string`.
   - Renders `<html lang={lang}>`.
   - Sets localized meta description and OpenGraph tags.

2. **`src/components/Navbar.astro`**:
   - Accepts `currentLocale: 'en' | 'id'`, `nav: NavTranslations`.
   - Renders localized navigation links (`#about`, `#showcase`, `#contact`).
   - Renders localized CTA button.
   - Renders Language Switcher pill toggle `EN | ID`.
   - Includes client-side script for **Smart Anchor Preservation**:
     - When switching between `/` and `/id`, appends `window.location.hash` so users stay on `#showcase` or `#contact`.

3. **`src/components/Hero.astro`**:
   - Accepts `hero: HeroTranslations`.
   - Renders localized bio, education, experience history, and stat counters.

4. **`src/components/Showcase.astro`**:
   - Accepts `showcase: ShowcaseTranslations`, `projects: ProjectItemTranslation[]`.
   - Renders localized category tabs ("All Projects / Video Editing / Commercial Video / Motion Graphics" vs "Semua Karya / Video Editing / Commercial Video / Motion Graphics").
   - Maintains the silky **Cinematic Focus Blur** filter transition.

5. **`src/components/ContactHub.astro`**:
   - Accepts `contactContent: ContactTranslations`, `contactData: ContactInfo`.
   - Renders localized collaboration banner, contact cards, and footer copyright text.

6. **`src/components/VideoModal.astro`**:
   - Receives localized modal label strings (e.g. `closeAria: string`).

---

## 5. Verification & Testing Strategy
* **Build Check**: Run `npm run build` to verify route generation for both `/` and `/id`.
* **Link Validation**: Verify all anchors on `/` stay on `/` and anchors on `/id` stay on `/id`.
* **Language Switcher Validation**: Check that clicking `ID` on `/#showcase` navigates to `/id#showcase` seamlessly.
* **Content Accuracy**: Ensure full translation fidelity without missing keys.
