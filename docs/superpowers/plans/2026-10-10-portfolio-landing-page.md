# Portfolio Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Membangun landing page portofolio interaktif dan responsif berbasis Astro untuk Nanda Addi Wijaya, dengan Hero section presisi sesuai gambar referensi, galeri Video Showcase dengan filter kategori & pemutar video modal popup, metrik statistik, dan Direct Action Contact Hub.

**Architecture:** Menggunakan Astro 5 dengan Vanilla CSS murni dan Google Font "Inter" untuk performa statis maksimal (100/100 Lighthouse). Seluruh data disimpan terpusat di `src/data/portfolio.ts` menggunakan TypeScript types. Interaktivitas (Video Modal, Filter Kategori, Copy-to-Clipboard Toast, Sticky Navbar) diimplementasikan dengan modul Vanilla JavaScript ringan tanpa dependensi runtime berat.

**Tech Stack:** Astro 5.x, TypeScript, Vanilla CSS3 (Custom Properties & Mesh Gradients), Google Fonts Inter, Vanilla JS.

**Spec:** `docs/superpowers/specs/2026-10-10-portfolio-landing-page-design.md`

## Global Constraints

- Wajib menggunakan font resmi Google Fonts "Inter".
- Desain visual: Pure Light Theme dengan ethereal soft cyan/blue mesh gradient (`#e0f2fe`, `#bae6fd`, `#f0fdfa`, `#f8fafc`).
- Hero section harus mereplikasi struktur referensi visual: kartu foto Polaroid + tanda tangan (`profile.png`), sapaan "Hi! I'm Nanda Addi Wijaya", bio naratif, grid 3-kolom (Education & Languages, Experience, Softwares 8 ikon & Contact).
- Video Showcase harus memiliki filter kategori fungsional dan modal popup player responsif 16:9 yang otomatis mematikan pemutaran audio/video saat ditutup.
- Contact Hub harus memiliki tombol Salin Email yang memicu toast notifikasi interaktif.
- Responsive untuk mobile (375px+), tablet (768px), dan desktop (1200px+).

---

### Task 1: Inisialisasi Proyek Astro & Konfigurasi Aset

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create / Copy: `public/images/profile.png`
- Create / Copy: `public/images/icon-*.png` (8 ikon software)
- Create: `public/favicon.svg`

**Interfaces:**
- Consumes: Aset di folder `images/`
- Produces: Lingkungan build Astro yang siap pakai dengan perintah `npm run build` dan `npm run dev`.

- [ ] **Step 1: Inisialisasi package.json dan install dependensi Astro**
  Jalankan instalasi Astro dan dependensi minimal:
  ```bash
  npm init -y
  npm install astro@latest typescript @types/node
  ```

- [ ] **Step 2: Buat `astro.config.mjs` dan `tsconfig.json`**
  Konfigurasikan Astro untuk mode static output dan TypeScript:
  ```js
  // astro.config.mjs
  import { defineConfig } from 'astro/config';

  export default defineConfig({
    site: 'https://nandaaddiwijaya.my.id',
    output: 'static'
  });
  ```
  ```json
  // tsconfig.json
  {
    "extends": "astro/tsconfigs/strict",
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@/*": ["src/*"]
      }
    }
  }
  ```

- [ ] **Step 3: Salin seluruh aset ke direktori `public/images/`**
  Pastikan `public/images/` memiliki `profile.png` dan ke-8 ikon software (`icon-after-effects.png`, `icon-audition.png`, `icon-canva.png`, `icon-capcut.png`, `icon-google-flow.png`, `icon-photoshop.png`, `icon-premiere.png`, `icon-seadance.png`). Buat juga `public/favicon.svg` yang modern.

- [ ] **Step 4: Uji build verifikasi awal**
  Jalankan `npx astro check` atau `npm run build` dengan halaman placeholder sementara untuk memastikan Astro terinstal dan berfungsi tanpa error.

- [ ] **Step 5: Git commit**
  ```bash
  git add package.json astro.config.mjs tsconfig.json public/
  git commit -m "chore: initialize Astro project structure and static assets"
  ```

---

### Task 2: Design Tokens, Global CSS & Data Layer

**Files:**
- Create: `src/styles/global.css`
- Create: `src/data/portfolio.ts`
- Create: `src/layouts/Layout.astro`

**Interfaces:**
- Consumes: Google Fonts "Inter", aset dari `public/images/`
- Produces: 
  - Token CSS variabel (warna, shadow, tipografi) dan layout reset.
  - TypeScript types (`Project`, `ExperienceItem`, `SoftwareTool`, `ProfileData`) dan dataset terstruktur `portfolioData`.
  - Layout master `Layout.astro` yang menginjeksikan meta tags SEO, favicon, font Inter, dan stylesheet.

- [ ] **Step 1: Definisikan dataset `src/data/portfolio.ts`**
  Buat tipe TypeScript dan data lengkap yang mencakup:
  - Profil Nanda Addi Wijaya, bio profesional.
  - 8 software tools dengan path ikon dan nama tampilan.
  - Pendidikan (State University of Malang, Educational Technology, 2023 - Present) + level bahasa (Indonesia, English).
  - 4 entri riwayat pengalaman (Indopride Roleplay, Kultus Visual, Aksara Picture, Bina Project).
  - 4 metrik statistik (500+ videos, 100K+ views, 9 websites, 4+ years).
  - 6 video showcase realistis lengkap dengan ID video YouTube (video editing BANGSATRIO, commercial Aksara Picture, motion graphics Kultus Visual, website Webenze Labs, video reel, dll.), kategori, deskripsi peran, dan software yang digunakan.
  - Informasi kontak & tautan sosial media.

- [ ] **Step 2: Buat `src/styles/global.css`**
  Terapkan:
  - Import Google Fonts Inter (`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');`).
  - CSS Custom Properties (`--bg-primary`, `--accent-blue: #0284c7`, `--accent-blue-hover: #0369a1`, `--text-main: #1e293b`, `--text-muted: #64748b`, `--card-bg`, dll.).
  - Ethereal mesh gradient background pada body menggunakan multi-radial gradient (`radial-gradient(at 0% 0%, #e0f2fe 0px, transparent 50%)`, dll.).
  - Utility styling untuk container responsif, button modern, badge tag, dan scroll behavior halus (`scroll-behavior: smooth`).

- [ ] **Step 3: Buat `src/layouts/Layout.astro`**
  Layout standar yang menerima props `title` dan `description`, memasang meta tag SEO OpenGraph, favicon, dan menyertakan `<slot />`.

- [ ] **Step 4: Uji kompilasi TypeScript dan CSS**
  Pastikan `src/data/portfolio.ts` tervalidasi tipe secara ketat tanpa error linter.

- [ ] **Step 5: Git commit**
  ```bash
  git add src/styles/global.css src/data/portfolio.ts src/layouts/Layout.astro
  git commit -m "feat: setup design tokens, global styling and portfolio data layer"
  ```

---

### Task 3: Hero Section & Komponen Profil Presisi

**Files:**
- Create: `src/components/Hero.astro`
- Test: Verifikasi visual kesesuaian dengan gambar referensi `profile.png`, teks bio, dan 3 kolom info.

**Interfaces:**
- Consumes: `portfolioData` dari `src/data/portfolio.ts`
- Produces: Komponen Hero section yang mereplikasi desain referensi secara pixel-perfect.

- [ ] **Step 1: Struktur Baris Atas Hero (Polaroid + Bio Naratif)**
  - Kolom kiri: Kartu foto Polaroid (`/images/profile.png`) dengan frame putih gading, bayangan realistis, dan tanda tangan asli di bawah foto. Tambahkan efek CSS 3D tilt mikro saat kursor mendekati kartu.
  - Kolom kanan:
    - Heading: *"Hi! I'm Nanda Addi Wijaya"* (tulisan "Hi!" dengan font bold biru vibran berukuran besar).
    - Subtitle italic: *"Videographer & Video Editor"*.
    - Paragraf bio lengkap sesuai teks referensi.

- [ ] **Step 2: Struktur Baris Bawah Hero (Grid 3 Kolom)**
  - Kolom 1 (Education & Languages):
    - Sub-heading biru *"Education"* & *"Languages"*.
    - Logo UM (SVG seal rapi) + *"State University of Malang"*, *"Educational Technology"*, *"2023 - Present"*.
    - Level bahasa: Indonesia (Native, 5 dot terisi), English (Conversational, 3 dot terisi, 2 kosong).
  - Kolom 2 (Experience):
    - Sub-heading biru *"Experience"*.
    - Daftar timeline rapi (Aug 2024-Present Indopride Roleplay, Apr 2025-Present Kultus Visual, Mar 2024-Present Aksara Picture, Jun 2023-Jun 2024 Bina Project Construction) dengan format 2 kolom tanggal dan detail jabatan.
  - Kolom 3 (Softwares & Contact):
    - Sub-heading biru *"Softwares"* & *"Contact"*.
    - Grid 4x2 ikon software dari `/images/icon-*.png` dengan label teks di bawahnya serta efek hover zoom halus.
    - Kontak: Email `hello@nandaaddiwijaya.my.id`, Telepon `+62 858-7684-5192`, Instagram `@nandaaddiwijaya`.

- [ ] **Step 3: Buat styling CSS terisolasi & responsif**
  - Desktop (>1024px): Layout 2 kolom atas dan 3 kolom bawah persis seperti gambar.
  - Tablet (640px-1023px): Tata letak fleksibel 2 kolom rapi.
  - Mobile (<640px): Tumpukan vertikal elegan dengan ukuran font dan padding yang seimbang.

- [ ] **Step 4: Uji render komponen**
  Render `Hero.astro` di `src/pages/index.astro` dan verifikasi bahwa semua gambar software, kartu foto, dan teks muncul dengan sempurna.

- [ ] **Step 5: Git commit**
  ```bash
  git add src/components/Hero.astro src/pages/index.astro
  git commit -m "feat: implement hero section matching reference design"
  ```

---

### Task 4: Sticky Navbar & Metrik Sorotan / Brand Klien

**Files:**
- Create: `src/components/Navbar.astro`
- Create: `src/components/StatsClients.astro`

**Interfaces:**
- Consumes: Data brand dan metrik dari `src/data/portfolio.ts`
- Produces: 
  - Navbar atas yang menempel saat di-scroll dengan efek blur latar belakang dan menu mobile.
  - Section statistik & banner klien mitra.

- [ ] **Step 1: Implementasikan `src/components/Navbar.astro`**
  - Brand name: "Nanda Addi Wijaya" dengan pill status hijau *"Available for Collab"*.
  - Tautan navigasi: Beranda, Tentang, Karya Video, Pengalaman, Kontak.
  - Tombol aksi: "Hubungi Saya" (CTA terarah ke nomor WhatsApp).
  - Mobile menu: Tombol toggle hamburger dengan dropdown animasi mulus untuk layar HP.
  - CSS glassmorphism: `backdrop-filter: blur(16px)`, background semi-transparan `rgba(255, 255, 255, 0.85)`.

- [ ] **Step 2: Implementasikan `src/components/StatsClients.astro`**
  - 4 Kartu metrik dengan angka besar dan label deskriptif:
    - 500+ Video Diproduksi & Diedit
    - 100K+ Penayangan Tertinggi YouTube
    - 9 Website Responsif Dikembangkan
    - 4+ Tahun Pengalaman Kreatif
  - Badge baris kolaborator/brand: BANGSATRIO, Indopride Roleplay, Kultus Visual, Aksara Picture, Bina Project, Webenze Labs dengan efek hover interaktif.

- [ ] **Step 3: Uji fungsi navigasi anchor dan tampilan responsive**
  Verifikasi link navigasi melakukan smooth scroll ke masing-masing target section.

- [ ] **Step 4: Git commit**
  ```bash
  git add src/components/Navbar.astro src/components/StatsClients.astro
  git commit -m "feat: add sticky glassmorphic navbar and stats client highlights"
  ```

---

### Task 5: Video Showcase dengan Filter Kategori & Modal Video Player

**Files:**
- Create: `src/components/Showcase.astro`
- Create: `src/components/VideoModal.astro`

**Interfaces:**
- Consumes: Proyek video dari `src/data/portfolio.ts`
- Produces: Galeri karya video yang dapat difilter secara instan dan pemutar video popup modal lengkap dengan kontrol keyboard.

- [ ] **Step 1: Implementasikan `src/components/Showcase.astro`**
  - Judul section: "Featured Works" / "Karya Video Pilihan" dengan deskripsi singkat.
  - Tab kategori filter:
    - `Semua` (All)
    - `Video Editing` (YouTube, Gaming, Vlogs)
    - `Commercial Video` (Videografi Komersial & Brand)
    - `Motion Graphics` (Animasi, Visual Mapping)
  - Grid kartu video 16:9:
    - Thumbnail video beresolusi tinggi dengan overlay gelap saat hover.
    - Ikon tombol Play dengan efek pulse/glow.
    - Tag kategori dan durasi.
    - Judul proyek, nama klien, dan ringkasan peran.
    - Atribut HTML data (`data-category`, `data-video-id`, `data-title`, `data-client`, `data-desc`, `data-tools`).

- [ ] **Step 2: Implementasikan `src/components/VideoModal.astro`**
  - Dialog overlay transparan gelap dengan backdrop-filter blur.
  - Kotak modal di tengah dengan rasio 16:9 responsif untuk iframe YouTube embed (`https://www.youtube.com/embed/{id}?autoplay=1&rel=0`).
  - Panel info di bawah player: Judul proyek, nama klien, tag software (mis. Premiere Pro, After Effects), dan uraian deskripsi lengkap.
  - Tombol tutup (X) melayang di pojok kanan atas.

- [ ] **Step 3: Tambahkan logika interaktivitas JavaScript Vanilla**
  - Filter kategori: Menangani klik tab filter, menambahkan kelas `.active`, memfilter kartu dengan animasi transisi fade/scale tanpa reload halaman.
  - Kontrol modal video:
    - Membuka modal saat kartu diklik, memuat video sesuai `data-video-id` dengan autoplay.
    - Menghentikan dan membersihkan iframe saat modal ditutup agar audio video langsung mati.
    - Mendukung penutupan via tombol Escape, tombol close (X), atau klik di area luar backdrop.
    - Mengunci scroll body (`overflow: hidden`) saat modal terbuka.

- [ ] **Step 4: Uji fungsionalitas filter dan pemutar video**
  Pastikan setiap kategori memfilter karya dengan benar, klik kartu memutar video di modal, dan penutupan modal mematikan audio seketika.

- [ ] **Step 5: Git commit**
  ```bash
  git add src/components/Showcase.astro src/components/VideoModal.astro
  git commit -m "feat: implement interactive video showcase with filtering and video modal"
  ```

---

### Task 6: Direct Action Contact Hub, Toast Notification & Footer

**Files:**
- Create: `src/components/ContactHub.astro`

**Interfaces:**
- Consumes: Data kontak dari `src/data/portfolio.ts`
- Produces: Hub kontak dengan aksi instan (WhatsApp, Email copy dengan toast feedback, Instagram, LinkedIn) dan footer halaman.

- [ ] **Step 1: Buat Banner Ajakan Kolaborasi**
  - Headline inspiratif: *"Siap Mengembangkan Konten Visual Anda ke Level Berikutnya?"*
  - Subteks ramah yang mengundang kreator, agensi, bisnis, dan startup untuk berdiskusi.

- [ ] **Step 2: Buat Action Cards Interaktif**
  - **WhatsApp Direct:** Tombol hijau modern ke `https://wa.me/6285876845192` dengan pre-filled text *"Halo Nanda, saya tertarik untuk mendiskusikan proyek video..."*.
  - **Email Client & Salin:** Tautan `mailto:hello@nandaaddiwijaya.my.id` ditambah tombol *"Salin Alamat Email"* dengan ikon clipboard.
  - **Instagram:** Card link ke profil `@nandaaddiwijaya`.
  - **LinkedIn:** Card link ke profil LinkedIn Nanda.

- [ ] **Step 3: Implementasikan Floating Toast Notification**
  - Logika Vanilla JS: Saat tombol *"Salin Alamat Email"* ditekan, alamat email disalin ke clipboard via `navigator.clipboard.writeText()` dan elemen Toast *"Alamat email berhasil disalin ke clipboard!"* muncul dengan animasi slide-up dan hilang otomatis setelah 2.5 detik.

- [ ] **Step 4: Tambahkan Footer**
  - Hak cipta © 2026 Nanda Addi Wijaya. All rights reserved.
  - Sub-kredit: *"Designed & Developed with Astro & Modern Vanilla CSS"*.
  - Tombol *"Kembali ke Atas"* (*Back to Top*) dengan smooth scrolling.

- [ ] **Step 5: Uji aksi salin email dan link sosial**
  Pastikan toast notification muncul dan link WhatsApp membuka chat dengan nomor yang benar.

- [ ] **Step 6: Git commit**
  ```bash
  git add src/components/ContactHub.astro
  git commit -m "feat: add direct action contact hub with copy-to-clipboard toast notification and footer"
  ```

---

### Task 7: Integrasi Akhir, Verifikasi Build & Pengujian Tampilan

**Files:**
- Modify: `src/pages/index.astro`
- Test: Build produksi Astro dan inspeksi visual di browser

**Interfaces:**
- Consumes: Seluruh komponen Astro yang dibuat di Tasks 1-6
- Produces: Halaman landing page lengkap yang terintegrasi, siap deploy dan teruji.

- [ ] **Step 1: Gabungkan seluruh komponen di `src/pages/index.astro`**
  Rangkai urutan halaman:
  1. `Navbar`
  2. `Hero` (Sesuai referensi visual)
  3. `StatsClients` (Metrik 500+ video & logo brand)
  4. `Showcase` (Filter kategori + galeri proyek)
  5. `VideoModal` (Modal video interaktif)
  6. `ContactHub` (Banner CTA, aksi kontak, toast, & footer)

- [ ] **Step 2: Jalankan build produksi**
  ```bash
  npm run build
  ```
  Pastikan proses build Astro selesai dengan kode keluar 0 tanpa error atau warning.

- [ ] **Step 3: Uji server lokal dan verifikasi visual**
  Jalankan server dev/preview dan uji semua fitur interaktif:
  - Hero layout presisi dengan referensi (foto polaroid, tanda tangan, info 3 kolom).
  - Filter kategori pada Video Showcase.
  - Pembukaan dan penutupan Video Modal player.
  - Salin email to clipboard dan munculnya toast.
  - Responsivitas pada ukuran layar mobile, tablet, dan desktop.

- [ ] **Step 4: Final commit**
  ```bash
  git add .
  git commit -m "feat: complete interactive portfolio landing page for Nanda Addi Wijaya"
  ```
