'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProductById, updateProduct } from '@/lib/products';
import { getCurrentUser } from '@/lib/auth';
import { supabase, Product } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image_url: '',
    features: ['']
  });
  
  useEffect(() => {
    async function checkAdmin() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        
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
    async function fetchProduct() {
      try {
        const product = await getProductById(params.id);
        
        if (product) {
          setFormData({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            category: product.category,
            image_url: product.image_url,
            features: product.features && product.features.length > 0 
              ? product.features 
              : ['']
          });
        } else {
          toast.error('Produk tidak ditemukan');
          router.push('/admin');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Gagal memuat data produk');
        router.push('/admin');
      }
    }
    
    if (params.id) {
      fetchProduct();
    }
  }, [params.id, router]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: updatedFeatures }));
  };
  
  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };
  
  const removeFeature = (index: number) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: updatedFeatures }));
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `product-images/${fileName}`;
    
    setUploading(true);
    
    try {
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);
      
      if (uploadError) {
        throw uploadError;
      }
      
      const { data } = supabase.storage.from('products').getPublicUrl(filePath);
      
      setFormData(prev => ({ ...prev, image_url: data.publicUrl }));
      toast.success('Gambar berhasil diunggah');
    } catch (error: any) {
      toast.error('Gagal mengunggah gambar: ' + error.message);
    } finally {
      setUploading(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Filter out empty features
      const filteredFeatures = formData.features.filter(feature => feature.trim() !== '');
      
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        image_url: formData.image_url,
        features: filteredFeatures
      };
      
      const { data, error } = await updateProduct(params.id, productData);
      
      if (error) {
        toast.error('Gagal memperbarui produk: ' + error.message);
      } else {
        toast.success('Produk berhasil diperbarui');
        router.push('/admin');
      }
    } catch (error: any) {
      toast.error('Terjadi kesalahan: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  if (!user) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Edit Produk</h1>
        <button
          onClick={() => router.push('/admin')}
          className="btn btn-outline"
        >
          Kembali
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="label">Nama Produk</label>
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
              <label htmlFor="category" className="label">Kategori</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Pilih Kategori</option>
                <option value="web">Web Development</option>
                <option value="mobile">Mobile App Development</option>
                <option value="design">UI/UX Design</option>
                <option value="consulting">Konsultasi IT</option>
                <option value="other">Lainnya</option>
              </select>
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="description" className="label">Deskripsi</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="input"
              required
            ></textarea>
          </div>
          
          <div className="mb-6">
            <label htmlFor="price" className="label">Harga (Rp)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="input"
              min="0"
              step="1000"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="image" className="label">Gambar Produk</label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="image"
                className="btn btn-outline cursor-pointer"
              >
                {uploading ? 'Mengunggah...' : 'Ganti Gambar'}
              </label>
              {formData.image_url && (
                <div className="text-sm text-green-600">
                  Gambar tersedia
                </div>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Format yang didukung: JPG, PNG, GIF (maks. 5MB)
            </p>
          </div>
          
          <div className="mb-6">
            <label className="label">Fitur Produk</label>
            {formData.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="input"
                  placeholder={`Fitur ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="text-red-600 hover:text-red-900"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addFeature}
              className="btn btn-outline mt-2"
            >
              Tambah Fitur
            </button>
          </div>
          
          <div className="mt-8">
            <button
              type="submit"
              disabled={loading || uploading}
              className="btn btn-primary w-full py-3"
            >
              {loading ? 'Menyimpan...' : 'Perbarui Produk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
