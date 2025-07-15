'use client';

import { useState } from 'react';

interface ProductFeaturesProps {
  features: string[];
}

export default function ProductFeatures({ features }: ProductFeaturesProps) {
  const [expanded, setExpanded] = useState(false);
  
  // If there are no features or empty array, don't render anything
  if (!features || features.length === 0) {
    return null;
  }
  
  // Show only first 3 features if not expanded
  const displayFeatures = expanded ? features : features.slice(0, 3);
  const hasMoreFeatures = features.length > 3;
  
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Fitur Layanan</h3>
      
      <ul className="space-y-2">
        {displayFeatures.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg 
              className="h-5 w-5 text-primary flex-shrink-0 mr-2 mt-0.5" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                clipRule="evenodd" 
              />
            </svg>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      
      {hasMoreFeatures && (
        <button 
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-primary hover:text-blue-700 text-sm font-medium flex items-center"
        >
          {expanded ? (
            <>
              <span>Tampilkan lebih sedikit</span>
              <svg 
                className="ml-1 h-4 w-4" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </>
          ) : (
            <>
              <span>Lihat semua fitur ({features.length})</span>
              <svg 
                className="ml-1 h-4 w-4" 
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
            </>
          )}
        </button>
      )}
    </div>
  );
}
