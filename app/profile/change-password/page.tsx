'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function ChangePasswordPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser();
        
        if (!currentUser) {
          toast.error('Anda harus login untuk mengakses halaman ini');
          router.push('/signin');
          return;
        }
        
        setUser(currentUser);
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadUser();
  }, [router]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setError('');
    
    try {
      if (!user) return;
      
      if (formData.newPassword !== formData.confirmPassword) {
        setError('Password baru dan konfirmasi password tidak cocok');
        setUpdating(false);
        return;
      }
      
      // First verify the current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: formData.currentPassword,
      });
      
      if (signInError) {
        setError('Password saat ini tidak valid');
        setUpdating(false);
        return;
      }
      
      // Update the password
      const { error } = await supabase.auth.updateUser({
        password: formData.newPassword,
      });
      
      if (error) {
        setError(error.message);
        toast.error('Gagal mengubah password: ' + error.message);
      } else {
        toast.success('Password berhasil diubah');
        
        // Clear form
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        
        // Redirect back to profile after a short delay
        setTimeout(() => {
          router.push('/profile');
        }, 2000);
      }
    } catch (error: any) {
      setError(error.message || 'Terjadi kesalahan saat mengubah password');
      toast.error('Terjadi kesalahan saat mengubah password');
    } finally {
      setUpdating(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!user) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Ubah Password</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold">Pengguna</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              <Link href="/profile" className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700">
                Profil Saya
              </Link>
              <Link href="/profile/orders" className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700">
                Pesanan Saya
              </Link>
              <Link href="/profile/change-password" className="block px-4 py-2 rounded-md bg-gray-100 text-primary font-medium">
                Ubah Password
              </Link>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="w-full md:w-3/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Ubah Password</h2>
            
            <form onSubmit={handleUpdatePassword}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
                  {error}
                </div>
              )}
              
              <div className="mb-6">
                <label htmlFor="currentPassword" className="label">Password Saat Ini</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="newPassword" className="label">Password Baru</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="input"
                  required
                  minLength={6}
                />
                <p className="mt-1 text-sm text-gray-500">
                  Password minimal 6 karakter
                </p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="label">Konfirmasi Password Baru</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={updating}
                  className="btn btn-primary"
                >
                  {updating ? 'Memproses...' : 'Ubah Password'}
                </button>
                
                <Link href="/profile" className="text-gray-600 hover:text-gray-900">
                  Kembali ke Profil
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
