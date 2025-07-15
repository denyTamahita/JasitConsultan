# Panduan Deployment JASIT Consultan E-Commerce

Dokumen ini berisi panduan lengkap untuk men-deploy aplikasi JASIT Consultan E-Commerce ke Vercel dan mengintegrasikannya dengan Supabase.

## 1. Setup Supabase

### Membuat Proyek Supabase Baru

1. Buka [https://supabase.com](https://supabase.com) dan login ke akun Anda (atau buat akun baru jika belum memiliki)
2. Klik tombol "New Project"
3. Masukkan nama proyek, misalnya "jasit-consultan"
4. Masukkan password database (simpan dengan aman)
5. Pilih region yang terdekat dengan pengguna Anda (misalnya Singapore untuk pengguna Indonesia)
6. Klik "Create New Project"

### Mengatur Database Schema

1. Setelah proyek dibuat, buka tab "SQL Editor" di dashboard Supabase
2. Copy seluruh isi file `supabase/schema.sql` dari proyek ini
3. Paste ke SQL Editor dan klik "Run" untuk membuat semua tabel dan data awal

### Mengatur Autentikasi

1. Di dashboard Supabase, buka tab "Authentication" > "Providers"
2. Pastikan "Email" provider diaktifkan
3. Opsional: Atur "Site URL" ke URL produksi Anda (setelah deploy ke Vercel)
4. Opsional: Kustomisasi template email untuk konfirmasi email, reset password, dll.

### Mengatur Storage

1. Di dashboard Supabase, buka tab "Storage"
2. Klik "Create New Bucket" dan beri nama "products"
3. Atur akses bucket:
   - Untuk pengembangan, Anda bisa mengatur "Public bucket" ke "ON"
   - Untuk produksi, sebaiknya atur "Public bucket" ke "OFF" dan gunakan RLS policies

### Mendapatkan Kredensial API

1. Di dashboard Supabase, buka tab "Settings" > "API"
2. Salin nilai dari:
   - URL: `https://[YOUR_PROJECT_ID].supabase.co`
   - anon/public key (untuk digunakan di frontend)

## 2. Konfigurasi Lingkungan Lokal

1. Buat file `.env.local` di root proyek dengan isi:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://[YOUR_PROJECT_ID].supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR_ANON_KEY]
   ```

2. Ganti `[YOUR_PROJECT_ID]` dan `[YOUR_ANON_KEY]` dengan nilai yang Anda salin dari dashboard Supabase

## 3. Deployment ke Vercel

### Persiapan

1. Buat akun di [Vercel](https://vercel.com) jika belum memiliki
2. Install Vercel CLI (opsional):
   ```bash
   npm i -g vercel
   ```

### Deployment Menggunakan GitHub

1. Push kode Anda ke repositori GitHub
2. Login ke [Vercel](https://vercel.com)
3. Klik "Add New" > "Project"
4. Pilih repositori GitHub Anda
5. Konfigurasi pengaturan proyek:
   - Framework Preset: Next.js
   - Root Directory: `./` (atau sesuaikan jika berbeda)
   - Build Command: `next build` (default)
   - Output Directory: `.next` (default)
6. Tambahkan Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: URL Supabase Anda
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Anon key Supabase Anda
7. Klik "Deploy"

### Deployment Menggunakan Vercel CLI

1. Login ke Vercel CLI:
   ```bash
   vercel login
   ```

2. Deploy proyek:
   ```bash
   vercel
   ```

3. Ikuti petunjuk interaktif untuk mengonfigurasi proyek
4. Untuk deployment produksi:
   ```bash
   vercel --prod
   ```

## 4. Konfigurasi Pasca-Deployment

### Mengatur URL Callback di Supabase

1. Setelah mendapatkan URL Vercel (misalnya `https://jasit-consultan.vercel.app`), buka dashboard Supabase
2. Buka tab "Authentication" > "URL Configuration"
3. Atur "Site URL" ke URL Vercel Anda
4. Tambahkan URL redirect yang diizinkan:
   - `https://jasit-consultan.vercel.app/auth/callback`
   - `https://jasit-consultan.vercel.app/`

### Mengatur Domain Kustom (Opsional)

1. Di dashboard Vercel, buka proyek Anda
2. Buka tab "Settings" > "Domains"
3. Tambahkan domain kustom Anda dan ikuti petunjuk untuk mengonfigurasi DNS

## 5. Pemeliharaan dan Pemantauan

### Pemantauan Performa

1. Gunakan Vercel Analytics untuk memantau performa aplikasi
2. Di dashboard Vercel, buka tab "Analytics" untuk melihat metrik seperti Web Vitals

### Pembaruan Aplikasi

1. Untuk memperbarui aplikasi, cukup push perubahan ke repositori GitHub Anda (jika menggunakan GitHub integration)
2. Vercel akan otomatis men-deploy perubahan tersebut

### Pemantauan Database

1. Di dashboard Supabase, gunakan tab "Database" > "Monitoring" untuk memantau performa database
2. Pantau penggunaan Storage di tab "Storage" > "Usage"

## 6. Troubleshooting

### Masalah Umum dan Solusi

1. **Error 500 pada autentikasi**
   - Periksa URL Supabase dan Anon Key di environment variables
   - Pastikan URL callback sudah dikonfigurasi dengan benar di Supabase

2. **Gambar tidak muncul**
   - Periksa konfigurasi bucket Storage di Supabase
   - Pastikan domain Vercel sudah ditambahkan di `next.config.js` pada `images.domains`

3. **CORS Error**
   - Pastikan URL aplikasi Anda terdaftar di pengaturan API Supabase

## 7. Sumber Daya Tambahan

- [Dokumentasi Next.js](https://nextjs.org/docs)
- [Dokumentasi Supabase](https://supabase.com/docs)
- [Dokumentasi Vercel](https://vercel.com/docs)
- [Panduan Supabase Auth dengan Next.js](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
