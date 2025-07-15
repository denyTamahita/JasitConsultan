'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getCurrentUser, signOut } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

// Define the Order type
type OrderItem = {
  id: string;
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
};

type Order = {
  id: string;
  created_at: string;
  status: string;
  total: number;
  items: OrderItem[];
};

export default function OrdersPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

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
        
        // Fetch user orders
        // In a real application, you would fetch this from your database
        // For this demo, we'll create some mock orders
        const mockOrders: Order[] = [
          {
            id: '1',
            created_at: '2025-07-10T09:30:00Z',
            status: 'completed',
            total: 5000000,
            items: [
              {
                id: '101',
                product_id: '1',
                name: 'Website Development',
                price: 5000000,
                quantity: 1,
                image_url: 'https://placehold.co/200x200/3B82F6/FFFFFF/png?text=Website'
              }
            ]
          },
          {
            id: '2',
            created_at: '2025-07-05T14:20:00Z',
            status: 'processing',
            total: 8000000,
            items: [
              {
                id: '102',
                product_id: '2',
                name: 'Mobile App Development',
                price: 8000000,
                quantity: 1,
                image_url: 'https://placehold.co/200x200/10B981/FFFFFF/png?text=Mobile+App'
              }
            ]
          }
        ];
        
        setOrders(mockOrders);
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadUser();
  }, [router]);
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Berhasil keluar');
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Selesai';
      case 'processing':
        return 'Diproses';
      case 'pending':
        return 'Menunggu';
      case 'cancelled':
        return 'Dibatalkan';
      default:
        return status;
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
      <h1 className="text-3xl font-bold mb-8">Pesanan Saya</h1>
      
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
              <Link href="/profile/orders" className="block px-4 py-2 rounded-md bg-gray-100 text-primary font-medium">
                Pesanan Saya
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 text-red-600"
              >
                Keluar
              </button>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="w-full md:w-3/4">
          {orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h2 className="text-xl font-semibold mb-2">Belum Ada Pesanan</h2>
              <p className="text-gray-600 mb-6">Anda belum memiliki pesanan apapun.</p>
              <Link href="/products" className="btn btn-primary">
                Lihat Layanan
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 border-b">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold mb-1">Pesanan #{order.id}</h2>
                        <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center py-3 border-b last:border-b-0">
                        <div className="relative h-16 w-16 flex-shrink-0">
                          <Image
                            src={item.image_url || "https://placehold.co/200x200/3B82F6/FFFFFF/png?text=JASIT"}
                            alt={item.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <div className="text-sm font-medium">{item.name}</div>
                          <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                        </div>
                        <div className="text-sm font-medium">
                          Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-sm text-gray-600">Total Pesanan</div>
                      <div className="text-lg font-semibold text-primary">
                        Rp {order.total.toLocaleString('id-ID')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 px-6 py-4">
                    <Link href={`/profile/orders/${order.id}`} className="text-primary hover:text-blue-700 text-sm font-medium">
                      Lihat Detail Pesanan →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
