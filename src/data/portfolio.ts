export interface EducationItem {
  institution: string;
  major: string;
  period: string;
  logo?: string;
}

export interface LanguageItem {
  language: string;
  proficiency: string;
  level: number; // 1 to 5
}

export interface ExperienceItem {
  startDate: string;
  endDate: string;
  company: string;
  role: string;
  type: string;
}

export interface SoftwareTool {
  name: string;
  category: string;
  icon: string;
}

export interface MetricStat {
  value: string;
  label: string;
  description: string;
}

export interface VideoProject {
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

export interface ContactInfo {
  email: string;
  phone: string;
  whatsappUrl: string;
  instagram: string;
  instagramUrl: string;
  linkedin: string;
  linkedinUrl: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  greetingTitle: string;
  bio: string;
  profileCardImage: string;
  education: EducationItem;
  languages: LanguageItem[];
  experiences: ExperienceItem[];
  softwares: SoftwareTool[];
  stats: MetricStat[];
  brands: string[];
  projects: VideoProject[];
  contact: ContactInfo;
}

export const portfolioData: PortfolioData = {
  name: "Nanda Addi Wijaya",
  title: "Videographer & Video Editor",
  greetingTitle: "Hi! I'm Nanda Addi Wijaya",
  bio: "with 4+ years of experience creating impactful visual content and digital experiences. I have edited 500+ videos for the BANGSATRIO YouTube channel, including multiple videos that reached 100K+ views, and developed 9 responsive websites through Webenze Labs. I also produce commercial videography and photography with Aksara Picture Malang, create projection mapping and motion graphics with Kultus Visual, and manage visual branding for businesses and organizations. Currently pursuing a Bachelor's degree in Educational Technology at Universitas Negeri Malang, I'm always open to collaborating with creators, brands, startups, and companies to create high-quality visual content and modern digital experiences. Feel free to connect or reach out here on LinkedIn.",
  profileCardImage: "/images/profile.png",
  education: {
    institution: "State University of Malang",
    major: "Educational Technology",
    period: "2023 - Present",
    logo: "/images/education.png"
  },
  languages: [
    { language: "Indonesia", proficiency: "Native", level: 5 },
    { language: "English", proficiency: "Conversational", level: 3 }
  ],
  experiences: [
    {
      startDate: "Aug 2024-",
      endDate: "Present",
      company: "Indopride Roleplay",
      role: "Video Editor",
      type: "Fulltime"
    },
    {
      startDate: "Apr 2025-",
      endDate: "Present",
      company: "Kultus Visual",
      role: "Motion Graphic Designer",
      type: "Freelance"
    },
    {
      startDate: "Mar 2024-",
      endDate: "Present",
      company: "Aksara Picture",
      role: "Fotographer & Videographer",
      type: "Freelance"
    },
    {
      startDate: "Jun 2023-",
      endDate: "Jun 2024",
      company: "Bina Project Construction",
      role: "Social Media Specialist",
      type: "Fulltime"
    }
  ],
  softwares: [
    { name: "Photoshop", category: "Design", icon: "/images/icon-photoshop.png" },
    { name: "Premiere", category: "Video Editing", icon: "/images/icon-premiere.png" },
    { name: "After Effects", category: "VFX & Motion", icon: "/images/icon-after-effects.png" },
    { name: "Audition", category: "Audio", icon: "/images/icon-audition.png" },
    { name: "Canva", category: "Visual Design", icon: "/images/icon-canva.png" },
    { name: "Google Flow", category: "Productivity", icon: "/images/icon-google-flow.png" },
    { name: "Seadance AI", category: "AI Motion", icon: "/images/icon-seadance.png" },
    { name: "CapCut", category: "Short Form", icon: "/images/icon-capcut.png" }
  ],
  stats: [
    { value: "500+", label: "Videos Edited", description: "Produced for high-engagement YouTube creators & brands" },
    { value: "100K+", label: "Peak Views", description: "Multiple viral gaming & storytelling releases" },
    { value: "9", label: "Websites Built", description: "Responsive digital experiences with Webenze Labs" },
    { value: "4+", label: "Years Experience", description: "Continuous dedication in commercial & creative video" }
  ],
  brands: [
    "BANGSATRIO",
    "Indopride Roleplay",
    "Kultus Visual",
    "Aksara Picture Malang",
    "Bina Project Construction",
    "Webenze Labs"
  ],
  projects: [
    {
      id: "project-bangsatrio-gaming",
      title: "BANGSATRIO YouTube Series - High Stakes Roleplay",
      client: "BANGSATRIO YouTube (100K+ Views)",
      category: "editing",
      categoryLabel: "Video Editing",
      duration: "18:45",
      description: "Penyuntingan video naratif intens dengan audio mixing dramatis, efek sound fx cepat, dan color grade sinematik yang menghasilkan retensi penonton tinggi.",
      fullDescription: "Salah satu episode unggulan kanal BANGSATRIO yang berhasil menembus lebih dari 100K views. Menggabungkan komedi spontan dengan storytelling dinamis, sound design presisi, serta motion tracking caption untuk meningkatkan engagement penonton YouTube.",
      youtubeId: "kJQP7kiw5Fk",
      thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
      role: "Lead Video Editor & Sound Designer",
      tools: ["Premiere", "Audition", "Photoshop"]
    },
    {
      id: "project-aksara-commercial",
      title: "Aksara Picture Commercial Visuals - Brand Story",
      client: "Aksara Picture Malang",
      category: "commercial",
      categoryLabel: "Commercial Video",
      duration: "02:15",
      description: "Produksi videografi komersial berkonsep sinematik untuk kampanye brand lokal dengan pencahayaan atmosferik dan sinematografi dinamis.",
      fullDescription: "Proyek komersial independen bersama Aksara Picture Malang. Bertanggung jawab mulai dari pengaturan tata cahaya di lokasi, komposisi framing kamera, hingga grading warna akhir untuk menghadirkan mood hangat dan eksklusif.",
      youtubeId: "L_LUpnjgPso",
      thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop",
      role: "Videographer & Colorist",
      tools: ["Premiere", "Photoshop"]
    },
    {
      id: "project-kultus-projection-mapping",
      title: "Kultus Visual - Architectural Projection Mapping & Motion FX",
      client: "Kultus Visual",
      category: "motion",
      categoryLabel: "Motion Graphics",
      duration: "01:45",
      description: "Eksplorasi visual motion graphics 3D dan projection mapping geometris untuk panggung pertunjukan visual seni multimedia.",
      fullDescription: "Karya motion graphics eksperimental berkolaborasi dengan Kultus Visual. Menggunakan teknik particle dynamics, visual illusion framing, dan audio-reactive synchronisation untuk instalasi projection mapping panggung seni.",
      youtubeId: "2g811Eo7K8U",
      thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
      role: "Motion Graphic Designer & 3D Animator",
      tools: ["After Effects", "Premiere", "Seadance AI"]
    },
    {
      id: "project-indopride-trailer",
      title: "Indopride Roleplay - Official Season Cinematic Trailer",
      client: "Indopride Roleplay",
      category: "editing",
      categoryLabel: "Video Editing",
      duration: "03:10",
      description: "Trailer sinematik peresmian season baru dengan pacing cepat, transisi kamera mulus, dan perpaduan musik orkestra megah.",
      fullDescription: "Trailer promosi resmi untuk komunitas Indopride Roleplay. Menggunakan footage multi-sudut, peredaman noise audio, subtitle kustom beranimasi, serta grading teal & orange sinematik.",
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop",
      role: "Video Editor & Sound FX Artist",
      tools: ["Premiere", "Audition", "CapCut"]
    },
    {
      id: "project-bina-construction",
      title: "Bina Project Construction - Infrastructure Corporate Showcase",
      client: "Bina Project Construction",
      category: "commercial",
      categoryLabel: "Commercial Video",
      duration: "04:20",
      description: "Video profil korporat dan dokumentasi proyek konstruksi berskala besar menggunakan aerial drone capture dan infografis modern.",
      fullDescription: "Video profil perusahaan kontraktor yang memadukan keindahan lanskap konstruksi, wawancara direksi, dan infografik progres proyek secara informatif dan elegan untuk kebutuhan presentasi investor.",
      youtubeId: "fJ9rUzIMcZQ",
      thumbnail: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
      role: "Videographer & Video Editor",
      tools: ["Premiere", "Photoshop", "Canva"]
    },
    {
      id: "project-webenze-motion",
      title: "Webenze Labs - Interactive Web Platform 3D Motion Reel",
      client: "Webenze Labs",
      category: "motion",
      categoryLabel: "Motion Graphics",
      duration: "01:30",
      description: "Motion showcase produk web interaktif dengan mockup device 3D halus, kinetic typography, dan animasi transisi responsif.",
      fullDescription: "Penyusunan video showreel peluncuran portofolio web interaktif untuk Webenze Labs. Menonjolkan kecepatan respons, keindahan layout UI/UX, dan kapabilitas interaktif website modern.",
      youtubeId: "3JZ_D3ELwOQ",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      role: "Motion Designer & UI Animator",
      tools: ["After Effects", "Google Flow", "Premiere"]
    }
  ],
  contact: {
    email: "hello@nandaaddiwijaya.my.id",
    phone: "+62 858-7684-5192",
    whatsappUrl: "https://wa.me/6285876845192?text=Halo%20Nanda%2C%20saya%20tertarik%20untuk%20berdiskusi%20mengenai%20proyek%20video.",
    instagram: "@nandaaddiwijaya",
    instagramUrl: "https://instagram.com/nandaaddiwijaya",
    linkedin: "Nanda Addi Wijaya",
    linkedinUrl: "https://www.linkedin.com/in/nandaaddiwijaya"
  }
};
