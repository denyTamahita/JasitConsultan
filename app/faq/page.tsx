'use client';

import { useState } from 'react';
import Link from 'next/link';

// FAQ item type
interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  // FAQ data
  const faqs: FAQItem[] = [
    {
      question: 'Apa saja layanan yang ditawarkan oleh JASIT Consultan?',
      answer: 'JASIT Consultan menawarkan berbagai layanan IT seperti pengembangan website, pengembangan aplikasi mobile, desain UI/UX, konsultasi IT, dan pengembangan e-commerce. Kami fokus pada solusi teknologi yang dapat membantu bisnis Anda berkembang.',
      category: 'layanan'
    },
    {
      question: 'Berapa lama waktu yang dibutuhkan untuk mengembangkan sebuah website?',
      answer: 'Waktu pengembangan website bervariasi tergantung pada kompleksitas proyek. Website sederhana dapat selesai dalam 2-4 minggu, sementara website yang lebih kompleks dengan fitur kustom dapat memakan waktu 1-3 bulan. Kami akan memberikan estimasi waktu yang lebih akurat setelah berdiskusi tentang kebutuhan spesifik Anda.',
      category: 'layanan'
    },
    {
      question: 'Apakah JASIT Consultan menyediakan layanan pemeliharaan website?',
      answer: 'Ya, kami menyediakan layanan pemeliharaan website yang mencakup pembaruan keamanan, backup rutin, perbaikan bug, dan dukungan teknis. Kami menawarkan paket pemeliharaan bulanan atau tahunan sesuai dengan kebutuhan Anda.',
      category: 'layanan'
    },
    {
      question: 'Bagaimana proses pembayaran untuk layanan JASIT Consultan?',
      answer: 'Kami biasanya meminta uang muka sebesar 30-50% dari total biaya proyek untuk memulai pekerjaan. Sisa pembayaran dapat dilakukan dalam beberapa tahap sesuai dengan kemajuan proyek atau setelah proyek selesai. Kami menerima pembayaran melalui transfer bank atau metode pembayaran online lainnya.',
      category: 'pembayaran'
    },
    {
      question: 'Apakah saya akan mendapatkan source code dari aplikasi yang dikembangkan?',
      answer: 'Ya, setelah proyek selesai dan pembayaran lunas, Anda akan menerima semua source code dan aset yang terkait dengan proyek. Anda memiliki hak penuh atas kode tersebut sesuai dengan perjanjian yang telah disepakati.',
      category: 'teknis'
    },
    {
      question: 'Bagaimana jika saya ingin menambahkan fitur baru setelah proyek selesai?',
      answer: 'Kami dengan senang hati akan membantu Anda menambahkan fitur baru ke proyek yang sudah ada. Kami akan menilai permintaan Anda, memberikan estimasi biaya dan waktu, dan melanjutkan pengembangan setelah mendapatkan persetujuan Anda.',
      category: 'layanan'
    },
    {
      question: 'Apakah JASIT Consultan menyediakan layanan hosting?',
      answer: 'Ya, kami menyediakan layanan hosting untuk website dan aplikasi yang kami kembangkan. Kami juga dapat membantu Anda memilih penyedia hosting yang sesuai dengan kebutuhan dan anggaran Anda jika Anda ingin mengelola hosting sendiri.',
      category: 'layanan'
    },
    {
      question: 'Bagaimana cara memulai proyek dengan JASIT Consultan?',
      answer: 'Untuk memulai proyek, Anda dapat menghubungi kami melalui formulir kontak di website, email, atau telepon. Kami akan mengatur konsultasi awal untuk membahas kebutuhan Anda, memberikan estimasi biaya dan waktu, dan menyiapkan proposal proyek. Setelah proposal disetujui dan kontrak ditandatangani, kami akan mulai bekerja pada proyek Anda.',
      category: 'umum'
    },
    {
      question: 'Apakah JASIT Consultan memiliki portofolio proyek sebelumnya?',
      answer: 'Ya, kami memiliki portofolio proyek yang telah kami kerjakan sebelumnya. Anda dapat melihat beberapa contoh pekerjaan kami di halaman Portofolio di website kami. Kami juga dapat memberikan studi kasus atau referensi klien sesuai permintaan.',
      category: 'umum'
    },
    {
      question: 'Apakah aplikasi mobile yang dikembangkan tersedia untuk Android dan iOS?',
      answer: 'Ya, kami mengembangkan aplikasi mobile untuk kedua platform, Android dan iOS. Kami menggunakan teknologi cross-platform seperti React Native atau Flutter untuk mengembangkan aplikasi yang dapat berjalan di kedua platform dengan codebase yang sama, sehingga lebih efisien dalam hal biaya dan waktu pengembangan.',
      category: 'teknis'
    }
  ];
  
  const [activeCategory, setActiveCategory] = useState('semua');
  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>({});
  
  // Get unique categories
  const uniqueCategories = Array.from(new Set(faqs.map(faq => faq.category)));
  const categories = ['semua', ...uniqueCategories];
  
  // Filter FAQs based on active category
  const filteredFAQs = activeCategory === 'semua' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);
  
  // Toggle FAQ item expansion
  const toggleItem = (question: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [question]: !prev[question]
    }));
  };
  
  // Category label mapping
  const categoryLabels: {[key: string]: string} = {
    'semua': 'Semua',
    'layanan': 'Layanan',
    'pembayaran': 'Pembayaran',
    'teknis': 'Teknis',
    'umum': 'Umum'
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-2">Pertanyaan yang Sering Diajukan</h1>
      <p className="text-gray-600 text-center mb-12">Temukan jawaban untuk pertanyaan umum tentang layanan JASIT Consultan</p>
      
      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {categoryLabels[category] || category}
          </button>
        ))}
      </div>
      
      {/* FAQ items */}
      <div className="max-w-3xl mx-auto">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Tidak ada pertanyaan dalam kategori ini.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(faq.question)}
                  className="flex justify-between items-center w-full p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                  <svg 
                    className={`h-5 w-5 text-gray-500 transition-transform ${expandedItems[faq.question] ? 'transform rotate-180' : ''}`} 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </button>
                
                {expandedItems[faq.question] && (
                  <div className="p-5 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Contact section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-3">Masih punya pertanyaan?</h2>
          <p className="text-gray-700 mb-4">
            Jika Anda tidak menemukan jawaban yang Anda cari, jangan ragu untuk menghubungi tim kami.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/contact" className="btn btn-primary">
              Hubungi Kami
            </Link>
            <Link href="/products" className="btn btn-outline">
              Lihat Layanan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
