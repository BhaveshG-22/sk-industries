"use client";

import { useState, useEffect } from 'react';
import HeroCarousel from './HeroCarousel';

interface CarouselImage {
  id: string;
  imageUrl: string;
  sequence: number;
}

export default function HeroSection() {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('/api/hero-carousel');
        if (response.ok) {
          const data = await response.json();
          setImages(data);
        }
      } catch (error) {
        console.error('Error fetching carousel images:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-96 bg-gray-100 animate-pulse flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }
  
  return <HeroCarousel images={images} />;
}