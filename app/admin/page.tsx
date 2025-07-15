'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/supabase';
import { getAllProducts, deleteProduct } from '@/lib/products';
import { getCurrentUser } from '@/lib/auth';
import toast from 'react-hot-toast';

export default function AdminPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    async function checkAdmin() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        
        // In a real app, you would check if the user has admin privileges
        // For this demo, we'll just check if the user is logged in
        setIsAdmin(!!currentUser);
        
        if (!currentUser) {
          toast.error('Anda harus login untuk mengakses halaman admin');
          router.push('/signin');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        router.push('/signin');
      }
    }
    
    checkAdmin();
  }, [router]);
  
  useEffect(() => {
    async function fetchProducts() {
      if (!isAdmin) return;
      
      try {
        const allProducts = await getAllProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Gagal memuat data produk');
      } finally {
        setLoading(false);
      }
    }
    
    if (isAdmin) {
      fetchProducts();
    }
  }, [isAdmin]);
  
  const handleDeleteProduct = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      try {
        const { error } = await deleteProduct(id);
        
        if (error) {
          toast.error('Gagal menghapus produk: ' + error.message);
        } else {
          toast.success('Produk berhasil dihapus');
          setProducts(products.filter(product => product.id !== id));
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Terjadi kesalahan saat menghapus produk');
      }
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!isAdmin) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link href="/admin/add-product" className="btn btn-primary">
          Tambah Produk Baru
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Daftar Produk</h2>
        </div>
        
        {products.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-600">Belum ada produk yang tersedia.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produk</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="relative h-10 w-10 flex-shrink-0">
                          <Image
                            src={product.image_url || "https://placehold.co/200x200/3B82F6/FFFFFF/png?text=JASIT"}
                            alt={product.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Rp {product.price.toLocaleString('id-ID')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link href={`/admin/edit-product/${product.id}`} className="text-blue-600 hover:text-blue-900">
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
