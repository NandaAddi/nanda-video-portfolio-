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
  moreAboutMe?: string;
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
    startDate: string;
    endDate: string;
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

export interface VideoModalTranslations {
  closeAria: string;
  watchOnYoutube: string;
}

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
  youtubeId: string;
  videos?: SubVideoItem[];
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
