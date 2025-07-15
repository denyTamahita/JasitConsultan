/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'xsgames.co', 'placehold.co'],
  },
  // Konfigurasi untuk Vercel deployment - mendukung semua fitur Next.js
  // Termasuk API routes dan dynamic routes
}

module.exports = nextConfig
