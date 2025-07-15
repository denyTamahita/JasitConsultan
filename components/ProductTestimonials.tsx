'use client';

import { useState } from 'react';
import Image from 'next/image';

// Define the testimonial type
interface Testimonial {
  id: string;
  name: string;
  company?: string;
  image?: string;
  rating: number;
  text: string;
}

interface ProductTestimonialsProps {
  productId: string;
}

export default function ProductTestimonials({ productId }: ProductTestimonialsProps) {
  // In a real application, you would fetch testimonials from your database
  // For this demo, we'll use mock data
  const mockTestimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Budi Santoso',
      company: 'PT Maju Bersama',
      rating: 5,
      text: 'JASIT Consultan memberikan layanan yang sangat profesional. Website yang mereka buat sangat sesuai dengan kebutuhan bisnis kami dan responsif di semua perangkat.',
    },
    {
      id: '2',
      name: 'Siti Rahayu',
      company: 'Rahayu Fashion',
      rating: 4,
      text: 'Saya sangat puas dengan aplikasi mobile yang dikembangkan oleh JASIT Consultan. Fitur-fiturnya lengkap dan user interface-nya sangat menarik.',
      image: 'https://placehold.co/100x100/F59E0B/FFFFFF/png?text=SR',
    },
    {
      id: '3',
      name: 'Ahmad Hidayat',
      company: 'Hidayat Tech',
      rating: 5,
      text: 'Tim JASIT sangat kooperatif dan responsif selama proses pengembangan. Mereka selalu memberikan solusi terbaik untuk setiap masalah yang kami hadapi.',
    },
  ];
  
  const [testimonials] = useState<Testimonial[]>(mockTestimonials);
  
  // If there are no testimonials, don't render anything
  if (testimonials.length === 0) {
    return null;
  }
  
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Full star
        stars.push(
          <svg key={i} className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        // Empty star
        stars.push(
          <svg key={i} className="h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    
    return stars;
  };
  
  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold mb-6">Testimonial Pelanggan</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                {testimonial.image ? (
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-500 text-lg font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
              </div>
              
              <div className="ml-4">
                <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                {testimonial.company && (
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                )}
              </div>
            </div>
            
            <div className="flex mb-3">
              {renderStars(testimonial.rating)}
            </div>
            
            <p className="text-gray-700">{testimonial.text}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <button className="btn btn-outline">
          Lihat Semua Testimonial
        </button>
      </div>
    </div>
  );
}
