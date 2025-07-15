/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'xsgames.co', 'placehold.co'],
    unoptimized: true, // Diperlukan untuk static export
  },
  output: 'export', // Diperlukan untuk GitHub Pages
  // Konfigurasi ini hanya untuk GitHub Pages deployment
  // Untuk Vercel, hapus output: 'export' dan unoptimized: true
  
  // Konfigurasi untuk App Router
  distDir: 'out',
}

module.exports = nextConfig
