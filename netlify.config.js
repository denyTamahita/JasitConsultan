// Konfigurasi tambahan untuk Netlify
module.exports = {
  // Mengaktifkan fitur-fitur Netlify untuk Next.js
  nextjs: {
    // Mengaktifkan ISR (Incremental Static Regeneration)
    enableISR: true,
    // Mengaktifkan SSR (Server Side Rendering)
    enableSSR: true,
  },
};
