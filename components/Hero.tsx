'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Solusi Digital untuk Bisnis Anda
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-100">
              JASIT Consultan menyediakan layanan pembuatan aplikasi web dan mobile
              dengan teknologi terkini untuk membantu bisnis Anda berkembang di era digital.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/products" className="btn bg-white text-primary hover:bg-gray-100 font-medium px-6 py-3 rounded-md text-center">
                Lihat Layanan
              </Link>
              <Link href="/contact" className="btn border border-white text-white hover:bg-white hover:bg-opacity-20 font-medium px-6 py-3 rounded-md text-center">
                Hubungi Kami
              </Link>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 mt-10 md:mt-0">
            <div className="relative h-64 md:h-96 w-full">
              <Image
                src="https://placehold.co/800x600/3B82F6/FFFFFF/png?text=JASIT+Consultan"
                alt="JASIT Consultan"
                fill
                className="object-cover rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
