# Panduan Setup Cloudflare Worker CDN Proxy

Subdomain: `hello.nandaaddiwijaya.my.id`  
Target Upstream: `https://cdn.jsdelivr.net/gh/<owner>/<repo>@<branch>/...`

---

## Opsi 1: Lewat Cloudflare Dashboard (Paling Mudah / Tanpa Install CLI)

1. **Buka Cloudflare Dashboard**:
   - Masuk ke menu **Workers & Pages** -> Klik **Create application** -> **Create Worker**.
   - Beri nama worker, misal: `hello-cdn-proxy`. Klik **Deploy**.

2. **Edit Code**:
   - Klik **Edit code**, lalu hapus kode bawaan dan salin seluruh isi dari file `cloudflare/worker.js`.
   - Klik **Deploy**.

3. **Setting Variabel Environment**:
   - Buka tab **Settings** pada worker -> **Variables and Secrets**.
   - Tambahkan variabel:
     - `GITHUB_OWNER`: Username GitHub Anda (contoh: `nandaaddiwijaya`)
     - `GITHUB_REPO`: Nama repo asset Anda (contoh: `cdn-assets`)
     - `GITHUB_BRANCH`: `main`
   - Klik **Save and deploy**.

4. **Hubungkan Subdomain `hello.nandaaddiwijaya.my.id`**:
   - Buka tab **Settings** -> **Domains & Routes** -> Klik **Add** -> **Custom Domain**.
   - Masukkan domain: `hello.nandaaddiwijaya.my.id`.
   - Cloudflare akan otomatis mengonfigurasi DNS record CNAME dan sertifikat SSL/TLS gratis.

---

## Opsi 2: Lewat Wrangler CLI

```bash
cd cloudflare
npx wrangler login
npx wrangler deploy
```

---

## Cara Kerja URL

| Request Masuk | Di-proxy ke jsDelivr |
|---|---|
| `https://hello.nandaaddiwijaya.my.id/images/banner.webp` | `https://cdn.jsdelivr.net/gh/nandaaddiwijaya/cdn-assets@main/images/banner.webp` |
| `https://hello.nandaaddiwijaya.my.id/thumbnails/proyek-1.jpg` | `https://cdn.jsdelivr.net/gh/nandaaddiwijaya/cdn-assets@main/thumbnails/proyek-1.jpg` |
| `https://hello.nandaaddiwijaya.my.id/` | JSON status check (`{"status":"online", ...}`) |
