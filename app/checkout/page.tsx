'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cartContext';
import { getCurrentUser } from '@/lib/auth';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalItems, totalPrice, clearCart } = useCart();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    notes: '',
  });
  
  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        if (currentUser?.email) {
          setFormData(prev => ({ ...prev, email: currentUser.email }));
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadUser();
  }, []);
  
  useEffect(() => {
    // Redirect to cart if cart is empty
    if (cart.length === 0 && !loading) {
      router.push('/cart');
    }
  }, [cart, loading, router]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the order to your backend
    // For now, we'll just simulate a successful order
    
    toast.success('Pesanan berhasil dibuat!');
    clearCart();
    
    // Redirect to success page
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (cart.length === 0) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Form */}
        <div className="w-full lg:w-2/3">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Informasi Kontak</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="label">Nama Lengkap</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="label">Nomor Telepon</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="company" className="label">Perusahaan (opsional)</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="input"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="address" className="label">Alamat</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="notes" className="label">Catatan Tambahan (opsional)</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="input"
              ></textarea>
            </div>
            
            <div className="mt-8">
              <button type="submit" className="btn btn-primary w-full py-3">
                Konfirmasi Pesanan
              </button>
            </div>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Ringkasan Pesanan</h2>
            
            <div className="mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center py-3 border-b">
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
            </div>
            
            <div className="flex justify-between mb-2">
              <span>Subtotal ({totalItems} item)</span>
              <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
            </div>
            
            <div className="flex justify-between mb-2">
              <span>Pajak (11%)</span>
              <span>Rp {(totalPrice * 0.11).toLocaleString('id-ID')}</span>
            </div>
            
            <hr className="my-4" />
            
            <div className="flex justify-between mb-6">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">Rp {(totalPrice * 1.11).toLocaleString('id-ID')}</span>
            </div>
            
            <Link href="/cart" className="btn btn-outline w-full">
              Kembali ke Keranjang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
