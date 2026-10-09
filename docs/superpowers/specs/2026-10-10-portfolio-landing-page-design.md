# Desain Spesifikasi: Landing Page Portofolio Nanda Addi Wijaya

- **Pemilik:** Nanda Addi Wijaya (Videographer & Video Editor)
- **Teknologi:** Astro + Vanilla CSS + TypeScript Data Layer
- **Tipografi:** Google Fonts "Inter"
- **Tema Visual:** Pure Light Theme (Minimalis, Modern, Ethereal Soft Cyan/Blue Mesh Gradient)
- **Tanggal:** 2026-10-10

---

## 1. Ringkasan & Tujuan Proyek

Membangun landing page portofolio profesional berkinerja tinggi untuk Nanda Addi Wijaya yang menonjolkan keahlian di bidang videografi, video editing, motion graphics, dan multimedia. 

Landing page ini mengadaptasi layout Hero Section persis seperti desain referensi (menggunakan kartu foto polaroid dengan tanda tangan asli dan grid profil informatif), diperluas menjadi halaman portofolio interaktif lengkap dengan galeri video responsif, pemutar modal video popup, statistik pencapaian, serta pusat aksi kontak (Direct Action Hub).

---

## 2. Arsitektur & Teknologi

1. **Framework:** Astro (Static Site Generation / SSG).
   - Menghasilkan HTML murni ultra cepat dengan nol bloat JavaScript pada elemen statis.
2. **Styling:** Vanilla CSS Modern.
   - Variabel CSS (Custom Properties) untuk warna, tipografi, jarak (*spacing*), dan bayangan (*box-shadow*).
   - Penggunaan mesh gradient radial dan efek glassmorphism yang presisi.
   - Responsive breakpoints (Mobile < 640px, Tablet 640px-1024px, Desktop > 1024px).
3. **Tipografi:** Font resmi Google Fonts **Inter** (Weight: 400, 500, 600, 700, 800).
4. **Struktur Data Terpusat:** `src/data/portfolio.ts`
   - Menyimpan seluruh konten: bio, edukasi, pengalaman, kontak, daftar software, dan 6 video showcase lengkap.
5. **Aset Gambar:** Berada di `public/images/` atau `src/assets/images/`:
   - `profile.png` (Kartu polaroid dengan tanda tangan)
   - 8 Ikon Software: Photoshop, Premiere, After Effects, Audition, Canva, Google Flow, Seadance AI, CapCut.
   - SVG seal/logo Universitas Negeri Malang.

---

## 3. Komponen & Struktur Halaman

### 3.1. Sticky Navbar (`Navbar.astro`)
- **Visual:** Glassmorphic bar (transparan dengan `backdrop-filter: blur(12px)` dan border bawah halus).
- **Elemen:**
  - Logo/Identitas: *"Nanda Addi Wijaya"* dengan badge status *"Available for Projects"*.
  - Tautan Navigasi: *Tentang*, *Karya Video*, *Pengalaman*, *Kontak*.
  - Tombol CTA: *"Hubungi Saya"* (smooth scroll ke section kontak / WhatsApp).
- **Interaksi:** Mobile hamburger toggle untuk tampilan layar kecil.

### 3.2. Hero Section (`Hero.astro`) — Sesuai Referensi Visual
- **Latar Belakang:** Background dengan *soft radial cyan/blue glow* lembut di latar putih/abu-abu terang.
- **Baris Atas (Top Row - 2 Kolom):**
  - **Sisi Kiri:** Kartu Polaroid (`profile.png`) yang memiliki bayangan lembut dan tanda tangan otentik di bawah foto. Interaksi mikro 3D tilt/hover ringan.
  - **Sisi Kanan:**
    - Teks sapaan: **Hi! I'm Nanda Addi Wijaya** (teks "Hi!" biru vibran dengan ukuran kontras).
    - Subtitle italic: *Videographer & Video Editor*.
    - Paragraf bio naratif lengkap: 4+ tahun pengalaman, 500+ video BANGSATRIO YouTube (100K+ views), 9 website Webenze Labs, video komersial Aksara Picture Malang, proyeksi mapping & motion graphics Kultus Visual, serta studi S1 Teknologi Pendidikan Universitas Negeri Malang.
- **Baris Bawah (Bottom Row - 3 Kolom Grid):**
  - **Kolom 1 — Education & Languages:**
    - *Education:* Logo Universitas Negeri Malang, *Educational Technology* (2023 - Sekarang).
    - *Languages:* Indonesia (Native, 5 dot penuh), English (Conversational, 3 dot penuh, 2 dot garis/kosong).
  - **Kolom 2 — Experience:**
    - Aug 2024–Sekarang: Indopride Roleplay (Video Editor | Fulltime)
    - Apr 2025–Sekarang: Kultus Visual (Motion Graphic Designer | Freelance)
    - Mar 2024–Sekarang: Aksara Picture (Fotographer & Videographer | Freelance)
    - Jun 2023–Jun 2024: Bina Project Construction (Social Media Specialist | Fulltime)
  - **Kolom 3 — Softwares & Contact:**
    - *Softwares:* Grid 4x2 ikon software dari folder `images/` (Photoshop, Premiere, After Effects, Audition, Canva, Google Flow, Seadance AI, CapCut) dengan micro-interaction zoom & tooltip/label.
    - *Contact:* Email (`hello@nandaaddiwijaya.my.id`), Telepon/WA (`+62 858-7684-5192`), Instagram (`@nandaaddiwijaya`).

### 3.3. Metrik & Klien Sorotan (`StatsClients.astro`)
- 4 Stat Counter Card:
  - **500+** Video Diedit & Diproduksi
  - **100K+** Penayangan YouTube Tertinggi
  - **9** Website Responsif Dikembangkan
  - **4+** Tahun Dedikasi Kreatif
- Barisan logo/nama brand kolaborator: BANGSATRIO, Indopride Roleplay, Kultus Visual, Aksara Picture, Bina Project, Webenze Labs.

### 3.4. Video Showcase & Filter Kategori (`Showcase.astro`)
- **Header:** Judul section *"Featured Works"* dengan subjudul penjelasan peran.
- **Kategori Filter (Tab Buttons):**
  - *Semua* (All)
  - *Video Editing* (YouTube & Long-form)
  - *Commercial Video* (Company profile & Iklan)
  - *Motion Graphics* (Visual fx, mapping, animation)
- **Kartu Proyek (Project Cards):**
  - Thumbnail gambar video beresolusi tinggi dengan rasio 16:9.
  - Badge kategori & durasi / format.
  - Judul video & nama klien/kanal.
  - Cuplikan deskripsi peran kreatif.
  - Tombol aksi *"Tonton Video"* / Ikon Play dengan efek ripple hover.

### 3.5. Modal Pemutar Video Interaktif (`VideoModal.astro`)
- Overlay backdrop dengan efek blur dan animasi pop-in halus.
- Container pemutar video responsif 16:9 yang memuat YouTube embed player.
- Panel metadata di bawah video:
  - Judul lengkap & deskripsi proyek mendalam.
  - Software yang digunakan (dengan tag badge: Premiere Pro, After Effects, dll.).
  - Peran spesifik (mis. Editor, Motion Designer, Colorist).
- Tombol tutup (X), penutupan otomatis saat klik di luar kotak modal atau menekan tombol `Escape`, serta penghentian video otomatis saat modal ditutup.

### 3.6. Direct Action Contact Hub & Footer (`ContactHub.astro`)
- Banner ajakan proyek: *"Siap Mengembangkan Konten Visual Anda ke Level Berikutnya?"*.
- Kartu Hub Aksi Langsung:
  - **WhatsApp Direct:** Link `https://wa.me/6285876845192` dengan pesan otomatis terformat.
  - **Email Client & Salin:** Tautan `mailto:hello@nandaaddiwijaya.my.id` dan tombol *"Salin Alamat Email"* yang memunculkan floating toast notification *"Email berhasil disalin!"*.
  - **Instagram:** Tautan profil `@nandaaddiwijaya`.
  - **LinkedIn:** Tautan profil LinkedIn.
- Footer rapi dengan copyright & kredit.

---

## 4. Alur Interaksi & State Management

1. **Filtering Proyek:**
   - Dikendalikan oleh event listener Vanilla JS yang membaca atribut `data-category`.
   - Mengubah `opacity` dan `transform: scale` dengan transisi CSS yang mulus tanpa refresh halaman.
2. **Video Modal:**
   - Membaca atribut `data-video-id`, `data-title`, `data-desc`, `data-tools` pada kartu proyek.
   - Membuka modal dan menyetel URL iframe YouTube dengan parameter `autoplay=1`.
   - Menghapus URL iframe saat modal ditutup agar audio/video langsung berhenti.
3. **Copy to Clipboard:**
   - Menggunakan `navigator.clipboard.writeText('hello@nandaaddiwijaya.my.id')`.
   - Menampilkan elemen toast animasi melayang selama 2.5 detik.

---

## 5. Rencana Pengujian & Verifikasi

1. **Responsivitas Layar:**
   - Pengujian visual pada Mobile (375px & 425px), Tablet (768px), dan Desktop (1280px+).
   - Memastikan Hero layout berubah dari 2/3 kolom menjadi 1 kolom vertikal yang proporsional dan mudah dibaca pada perangkat mobile.
2. **Fungsi Modal & Filter:**
   - Memastikan klik pada setiap kartu membuka video yang benar.
   - Memastikan tombol Escape dan klik luar menutup modal dan menghentikan pemutaran audio.
   - Memastikan semua tab filter menampilkan proyek yang tepat.
3. **Fitur Salin Email & Link Eksternal:**
   - Verifikasi fungsi copy email memunculkan toast.
   - Verifikasi semua link WhatsApp, Instagram, dan LinkedIn berfungsi dengan benar.
