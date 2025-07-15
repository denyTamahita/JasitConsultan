'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/supabase';
import { useCart } from '@/lib/cartContext';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success(`${product.name} ditambahkan ke keranjang`);
  };
  
  return (
    <div 
      className="card transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 w-full">
        <Image
          src={product.image_url || "https://placehold.co/400x300/3B82F6/FFFFFF/png?text=JASIT"}
          alt={product.name}
          fill
          className="object-cover rounded-t-lg"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-primary">
            Rp {product.price.toLocaleString('id-ID')}
          </span>
          
          <div className="flex space-x-2">
            <button 
              onClick={handleAddToCart}
              className="btn btn-outline hover:bg-primary hover:text-white hover:border-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
            
            <Link href={`/products/${product.id}`} className="btn btn-primary">
              Detail
            </Link>
          </div>
        </div>
      </div>
      
      {/* Features list that appears on hover */}
      {isHovered && product.features && product.features.length > 0 && (
        <div className="absolute inset-0 bg-white bg-opacity-90 p-4 flex flex-col justify-center rounded-lg transition-opacity duration-300">
          <h4 className="text-lg font-semibold mb-2">Fitur:</h4>
          <ul className="list-disc list-inside">
            {product.features.map((feature, index) => (
              <li key={index} className="text-gray-700">{feature}</li>
            ))}
          </ul>
          <div className="mt-4 flex justify-center">
            <Link href={`/products/${product.id}`} className="btn btn-primary">
              Lihat Detail
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
