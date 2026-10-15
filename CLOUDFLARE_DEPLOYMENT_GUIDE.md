# Panduan Lengkap Deploy ke Cloudflare Pages

Repositori GitHub: `https://github.com/NandaAddi/nanda-video-portfolio-`  
Framework: **Astro v5 (Static Site)**  
Branch: **`main`**

---

## Langkah 1: Hubungkan Repositori ke Cloudflare Pages

1. Buka [Cloudflare Dashboard](https://dash.cloudflare.com/) dan login.
2. Pada menu navigasi sebelah kiri, klik **Compute (Workers) > Workers & Pages**.
3. Klik tombol **Create** (atau **Create application**), lalu pilih tab **Pages**.
4. Pilih **Connect to Git** dan hubungkan akun GitHub Anda (`NandaAddi`).
5. Pilih repositori: **`nanda-video-portfolio-`**.
6. Klik **Begin setup**.

---

## Langkah 2: Konfigurasi Build Settings

Pada halaman konfigurasi build, isi pengaturan berikut:

| Parameter | Nilai Konfigurasi |
|---|---|
| **Project Name** | `nanda-video-portfolio` (atau sesuai keinginan) |
| **Production Branch** | `main` |
| **Framework Preset** | **Astro** |
| **Build Command** | `npm run build` |
| **Build Output Directory** | `dist` |
| **Root Directory** | `/` (biarkan kosong / default) |

---

## Langkah 3: Tambahkan Environment Variables

Sebelum klik deploy, buka bagian **Environment variables (advanced)** dan tambahkan variabel berikut:

| Variable Name | Value | Keterangan |
|---|---|---|
| `NODE_VERSION` | `20` | Wajib untuk build Astro v5 modern |
| `PUBLIC_SUPABASE_URL` | *URL project Supabase Anda* | Contoh: `https://xyz.supabase.co` |
| `PUBLIC_SUPABASE_ANON_KEY` | *Anon key project Supabase Anda* | Dari dashboard Supabase (API Settings) |
| `PUBLIC_CDN_DOMAIN` | `hello.nandaaddiwijaya.my.id` | Domain CDN proxy Cloudflare Worker |
| `GITHUB_REPO_OWNER` | `NandaAddi` | Username GitHub |
| `GITHUB_REPO_NAME` | `portfolio-assets` | Nama repo tempat simpan gambar/thumbnail |
| `GITHUB_BRANCH` | `main` | Branch target repo aset |
| `GITHUB_ACCESS_TOKEN` | *Personal Access Token GitHub Anda* | Digunakan admin untuk upload aset langsung |

> [!TIP]
> Jika Supabase belum selesai disiapkan saat deploy pertama, jangan khawatir! Website memiliki **built-in local fallback** sehingga otomatis tetap tampil sempurna dengan seed data lokal.

---

## Langkah 4: Simpan dan Deploy

1. Klik tombol **Save and Deploy**.
2. Cloudflare Pages akan otomatis menjalankan build:
   - `npm install`
   - `npm run build` (menghasilkan 5 rute statis: `/`, `/about`, `/id`, `/id/about`, `/admin`)
3. Selesai! Website Anda akan langsung aktif dengan URL bawaan:
   `https://nanda-video-portfolio.pages.dev`

---

## Langkah 5: Hubungkan Custom Domain (Opsional)

1. Di dashboard proyek Pages Anda, buka tab **Custom domains**.
2. Klik **Set up a custom domain**.
3. Masukkan domain utama Anda (misal: `nandaaddiwijaya.my.id`).
4. Ikuti panduan aktivasi DNS Cloudflare (otomatis jika domain dikelola di Cloudflare).
5. SSL/TLS otomatis aktif secara instan dan gratis seumur hidup.

---

## Fitur Otomatisasi (CI/CD)

- Setiap kali Anda melakukan `git push origin main`, Cloudflare Pages akan otomatis mendeteksi perubahan dan melakukan build ulang dalam hitungan detik.
- Di halaman Admin (`/admin`), tombol **Picu Rebuild Site** dapat dihubungkan dengan Cloudflare Pages **Deploy Hook** (Settings > Builds & deployments > Deploy hooks) untuk memicu build otomatis tanpa membuka GitHub atau Cloudflare!
