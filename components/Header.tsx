'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cartContext';
import { getCurrentUser } from '@/lib/auth';
import { User } from '@supabase/supabase-js';

export default function Header() {
  const router = useRouter();
  const { totalItems } = useCart();
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const navigateToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/contact');
  };
  
  useEffect(() => {
    async function loadUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    }
    
    loadUser();
  }, []);
  
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">JASIT</span>
            <span className="text-2xl font-medium ml-1">Consultan</span>
          </Link>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-primary">
              Beranda
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-primary">
              Layanan
            </Link>
            <a href="#" onClick={navigateToContact} className="text-gray-700 hover:text-primary cursor-pointer">
              Hubungi Kami
            </a>
            <Link href="/cart" className="relative text-gray-700 hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            {user ? (
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-primary">
                  <span className="mr-1">{user.email?.split('@')[0]}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Akun Saya
                  </Link>
                  <Link href="/auth/signout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Keluar
                  </Link>
                </div>
              </div>
            ) : (
              <Link href="/auth/signin" className="btn btn-primary">
                Masuk
              </Link>
            )}
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="mt-4 py-3 border-t border-gray-200 md:hidden">
            <ul className="space-y-4">
              <li>
                <Link href="/" className="block text-gray-700 hover:text-primary" onClick={() => setMenuOpen(false)}>
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/products" className="block text-gray-700 hover:text-primary" onClick={() => setMenuOpen(false)}>
                  Layanan
                </Link>
              </li>
              <li>
                <a href="#" className="block text-gray-700 hover:text-primary cursor-pointer" onClick={(e) => { navigateToContact(e); setMenuOpen(false); }}>
                  Hubungi Kami
                </a>
              </li>
              <li>
                <Link href="/cart" className="flex items-center text-gray-700 hover:text-primary" onClick={() => setMenuOpen(false)}>
                  <span>Keranjang</span>
                  {totalItems > 0 && (
                    <span className="ml-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                {user ? (
                  <>
                    <Link href="/account" className="block text-gray-700 hover:text-primary" onClick={() => setMenuOpen(false)}>
                      Akun Saya
                    </Link>
                    <Link href="/auth/signout" className="block text-gray-700 hover:text-primary mt-2" onClick={() => setMenuOpen(false)}>
                      Keluar
                    </Link>
                  </>
                ) : (
                  <Link href="/auth/signin" className="block text-gray-700 hover:text-primary" onClick={() => setMenuOpen(false)}>
                    Masuk
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
