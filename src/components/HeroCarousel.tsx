"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

interface CarouselImage {
  id: string;
  imageUrl: string;
  sequence: number;
}

interface HeroCarouselProps {
  images: CarouselImage[];
}

export default function HeroCarousel({ images }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning || images.length === 0) return;
    const newSlide = (currentSlide - 1 + images.length) % images.length;
    goToSlide(newSlide);
  }, [currentSlide, goToSlide, isTransitioning, images.length]);

  const goToNext = useCallback(() => {
    if (isTransitioning || images.length === 0) return;
    const newSlide = (currentSlide + 1) % images.length;
    goToSlide(newSlide);
  }, [currentSlide, goToSlide, isTransitioning, images.length]);

  useEffect(() => {
    if (!isPlaying || images.length === 0) return;
    
    const timer = setInterval(() => {
      goToNext();
    }, 4000);

    return () => clearInterval(timer);
  }, [goToNext, isPlaying, images.length]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (images.length === 0) {
    return (
      <div className="relative w-full h-64 md:h-96 lg:h-[32rem] xl:h-[36rem] bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">No images available</div>
      </div>
    );
  }

  return (
    <div className="relative w-full group" data-carousel="slide">
      <div className="relative h-64 overflow-hidden md:h-96 lg:h-[32rem] xl:h-[36rem]">
        {images.map((image, index) => {
          const isActive = index === currentSlide;
          const isPrev = index === (currentSlide - 1 + images.length) % images.length;
          const isNext = index === (currentSlide + 1) % images.length;
          
          return (
            <div
              key={image.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                isActive
                  ? "opacity-100 scale-100 translate-x-0 z-20"
                  : isPrev
                  ? "opacity-0 scale-105 -translate-x-full z-10"
                  : isNext
                  ? "opacity-0 scale-105 translate-x-full z-10"
                  : "opacity-0 scale-110 translate-x-0 z-0"
              }`}
            >
              <Image
                src={image.imageUrl}
                fill
                className="object-cover"
                alt={`Slide ${index + 1}`}
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-6 left-1/2 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`relative overflow-hidden rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "w-8 h-3 bg-white" 
                : "w-3 h-3 bg-white/60 hover:bg-white/80"
            }`}
            aria-current={index === currentSlide}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goToSlide(index)}
          >
            {index === currentSlide && (
              <div 
                className="absolute inset-0 bg-white/40 animate-pulse"
                style={{
                  animation: isPlaying ? 'slideProgress 4s linear infinite' : 'none'
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Enhanced Navigation Arrows */}
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group/nav focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={goToPrevious}
        disabled={isTransitioning}
      >
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm group-hover/nav:bg-white/30 group-focus/nav:ring-4 group-focus/nav:ring-white/50 transition-all duration-200 hover:scale-110">
          <ChevronLeft className="w-6 h-6 text-white drop-shadow-lg" />
          <span className="sr-only">Previous</span>
        </span>
      </button>

      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group/nav focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={goToNext}
        disabled={isTransitioning}
      >
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm group-hover/nav:bg-white/30 group-focus/nav:ring-4 group-focus/nav:ring-white/50 transition-all duration-200 hover:scale-110">
          <ChevronRight className="w-6 h-6 text-white drop-shadow-lg" />
          <span className="sr-only">Next</span>
        </span>
      </button>

      {/* Play/Pause Button */}
      <button
        type="button"
        className="absolute top-4 right-4 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 opacity-0 group-hover:opacity-100"
        onClick={togglePlayPause}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 text-white" />
        ) : (
          <Play className="w-4 h-4 text-white ml-0.5" />
        )}
        <span className="sr-only">{isPlaying ? 'Pause' : 'Play'} slideshow</span>
      </button>

      <style jsx global>{`
        @keyframes slideProgress {
          0% {
            transform: scaleX(0);
            transform-origin: left;
          }
          100% {
            transform: scaleX(1);
            transform-origin: left;
          }
        }
      `}</style>
    </div>
  );
}