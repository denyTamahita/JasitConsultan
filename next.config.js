/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'xsgames.co', 'placehold.co'],
    // Tidak perlu unoptimized: true di Vercel
  },
  // Tidak perlu output: 'export' di Vercel
  // Vercel mendukung semua fitur Next.js secara native
}

module.exports = nextConfig
