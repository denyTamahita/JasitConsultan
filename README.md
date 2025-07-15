# JASIT Consultan E-Commerce

JASIT Consultan adalah aplikasi e-commerce untuk layanan konsultasi dan pengembangan aplikasi. Aplikasi ini dibangun menggunakan Next.js, Supabase, dan Tailwind CSS.

## Fitur Aplikasi

- 🏠 Halaman utama dengan daftar produk layanan
- 📝 Halaman detail produk
- 🔐 Autentikasi pengguna (login dan registrasi) dengan Supabase Auth
- 🛒 Keranjang belanja dengan penyimpanan di localStorage
- 💳 Halaman checkout sederhana (tanpa integrasi pembayaran)
- 👨‍💼 Panel admin untuk mengelola produk

## Teknologi yang Digunakan

- **Frontend**: Next.js 14 dengan TypeScript
- **Backend & Database**: Supabase (untuk database produk, autentikasi pengguna, dan penyimpanan gambar)
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Hosting**: Vercel (direncanakan)

## Struktur Proyek

```
jasit-consultan/
├── app/                      # Next.js App Router
│   ├── (auth)/               # Halaman autentikasi
│   │   ├── signin/           # Halaman login
│   │   ├── signup/           # Halaman registrasi
│   │   └── signout/          # Halaman logout
│   ├── admin/                # Halaman admin
│   │   ├── add-product/      # Tambah produk baru
│   │   └── edit-product/     # Edit produk
│   ├── cart/                 # Halaman keranjang belanja
│   ├── checkout/             # Halaman checkout
│   ├── products/             # Halaman produk
│   │   └── [id]/             # Halaman detail produk
│   ├── globals.css           # CSS global
│   ├── layout.tsx            # Layout utama
│   └── page.tsx              # Halaman beranda
├── components/               # Komponen React
│   ├── Footer.tsx            # Komponen footer
│   ├── Header.tsx            # Komponen header
│   ├── Hero.tsx              # Komponen hero section
│   └── ProductCard.tsx       # Komponen kartu produk
├── lib/                      # Fungsi dan utilitas
│   ├── auth.ts               # Fungsi autentikasi
│   ├── cartContext.tsx       # Context untuk keranjang belanja
│   ├── products.ts           # Fungsi untuk mengelola produk
│   └── supabase.ts           # Konfigurasi Supabase
├── public/                   # Aset statis
├── .env.local                # File konfigurasi lingkungan (tidak di-commit)
├── next.config.js            # Konfigurasi Next.js
├── package.json              # Dependensi npm
├── postcss.config.js         # Konfigurasi PostCSS
├── tailwind.config.ts        # Konfigurasi Tailwind CSS
└── tsconfig.json             # Konfigurasi TypeScript
```

## Instalasi dan Pengembangan Lokal

### Prasyarat

- Node.js versi 18.0.0 atau lebih baru
- Akun Supabase (gratis)

### Langkah-langkah Instalasi

1. Clone repositori ini:
   ```bash
   git clone <url-repositori>
   cd jasit-consultan
   ```

2. Instal dependensi:
   ```bash
   npm install
   ```

3. Buat proyek Supabase baru di [https://supabase.com](https://supabase.com)

4. Buat file `.env.local` di root proyek dan tambahkan konfigurasi Supabase:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

5. Jalankan aplikasi dalam mode pengembangan:
   ```bash
   npm run dev
   ```

6. Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Konfigurasi Supabase

### Struktur Database

1. Buat tabel `products` dengan struktur berikut:

   | Kolom        | Tipe     | Deskripsi                      |
   |--------------|----------|--------------------------------|
   | id           | uuid     | Primary key                    |
   | created_at   | timestamp| Dibuat otomatis oleh Supabase  |
   | name         | text     | Nama produk                    |
   | description  | text     | Deskripsi produk               |
   | price        | float    | Harga produk                   |
   | category     | text     | Kategori produk                |
   | image_url    | text     | URL gambar produk              |
   | features     | json     | Array fitur produk             |

2. Buat bucket `products` di Supabase Storage untuk menyimpan gambar produk.

3. Konfigurasi Autentikasi:
   - Aktifkan Email Auth Provider di Supabase Dashboard
   - Atur URL redirect sesuai kebutuhan

### SQL untuk Membuat Tabel

```sql
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price FLOAT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  features JSONB DEFAULT '[]'::JSONB
);

-- Contoh data awal (opsional)
INSERT INTO products (name, description, price, category, image_url, features)
VALUES 
  ('Website Development', 'Jasa pembuatan website profesional untuk bisnis Anda', 5000000, 'web', 'https://placehold.co/600x400/3B82F6/FFFFFF/png?text=Website', '["Responsive Design", "SEO Friendly", "CMS Integration"]'),
  ('Mobile App Development', 'Jasa pembuatan aplikasi mobile Android dan iOS', 8000000, 'mobile', 'https://placehold.co/600x400/10B981/FFFFFF/png?text=Mobile+App', '["Native Performance", "Cross Platform", "Push Notification"]'),
  ('UI/UX Design', 'Jasa desain antarmuka pengguna yang menarik dan user-friendly', 3000000, 'design', 'https://placehold.co/600x400/F59E0B/FFFFFF/png?text=UI/UX', '["User Research", "Wireframing", "Prototyping"]');
```

## Deployment

### Deployment ke Vercel

1. Buat akun di [Vercel](https://vercel.com) jika belum memiliki.
2. Hubungkan repositori GitHub Anda dengan Vercel.
3. Tambahkan variabel lingkungan yang sama dengan file `.env.local` Anda.
4. Deploy proyek Anda.

## Penggunaan Admin Panel

Untuk mengakses panel admin:

1. Buka `/admin` di aplikasi
2. Login dengan akun yang telah terdaftar
3. Dari panel admin, Anda dapat:
   - Melihat semua produk
   - Menambahkan produk baru
   - Mengedit produk yang ada
   - Menghapus produk

## Kontribusi

Kontribusi selalu diterima dengan baik! Silakan buat pull request atau buka issue jika Anda menemukan bug atau memiliki saran perbaikan.

## Lisensi

[MIT](LICENSE)
