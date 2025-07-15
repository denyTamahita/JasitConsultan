'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth';
import toast from 'react-hot-toast';

export default function SignOutPage() {
  const router = useRouter();
  
  useEffect(() => {
    async function handleSignOut() {
      try {
        const { error } = await signOut();
        
        if (error) {
          toast.error('Gagal keluar: ' + error.message);
        } else {
          toast.success('Berhasil keluar!');
        }
      } catch (err: any) {
        toast.error('Terjadi kesalahan saat keluar');
      } finally {
        // Redirect to home page regardless of success or failure
        router.push('/');
      }
    }
    
    handleSignOut();
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        <h1 className="mt-6 text-2xl font-medium text-gray-900">Keluar dari akun...</h1>
      </div>
    </div>
  );
}
