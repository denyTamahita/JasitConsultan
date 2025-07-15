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
  
  // Mengecualikan halaman admin dari static export
  distDir: 'out',
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/contact': { page: '/contact' },
      '/about': { page: '/about' },
      '/products': { page: '/products' },
      '/faq': { page: '/faq' },
      // Tidak menyertakan halaman admin dengan dynamic routes
    };
  },
}

module.exports = nextConfig
