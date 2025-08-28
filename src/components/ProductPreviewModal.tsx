"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CategoryProduct } from "@/types/shared";

interface ProductPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: CategoryProduct | null;
}

export default function ProductPreviewModal({
  isOpen,
  onClose,
  product,
}: ProductPreviewModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Use actual product images if available, otherwise just show the main image
  const productImages = React.useMemo(() => {
    if (!product) return [];
    if (product.images && product.images.length > 0) {
      // Sort images by sequence and return URLs
      return product.images
        .sort((a, b) => a.sequence - b.sequence)
        .map(img => img.url);
    }
    // Fallback to just the main image
    return [product.image || "https://via.placeholder.com/400x400?text=Product+Image"];
  }, [product]);

  if (!product) return null;

  const handleContactForOrder = () => {
    const subject = `Need to enquire about ${product.title}`;
    const message = `Hi, I am interested in learning more about the ${product.title} (₹${product.salePrice} per 100 pieces).

Please provide me with more details about availability, bulk pricing, and delivery options.

Thank you!`;
    
    // Create URL with query parameters for prefilling the form
    const contactUrl = `/contact?subject=${encodeURIComponent(subject)}&message=${encodeURIComponent(message)}`;
    
    onClose();
    // Redirect to contact page with prefilled data
    window.location.href = contactUrl;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const discount = product.originalPrice 
    ? `${Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)}% OFF`
    : null;

  const rating = 4.45;
  const reviewCount = 362;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-none !w-[95vw] !max-h-[85vh] sm:!max-h-[95vh] overflow-y-auto p-0" style={{width: '95vw', maxWidth: 'none'}}>
        <DialogHeader className="sr-only">
          <DialogTitle>{product.title}</DialogTitle>
        </DialogHeader>
        <div className="bg-card grid grid-cols-4 gap-6 rounded-lg p-6">
          <div className="relative col-span-4 w-full md:col-span-2">
            {/* Image Slider */}
            <div className="relative w-full h-96 bg-gray-50 rounded-lg overflow-hidden group">
              {/* Badges */}
              {discount && (
                <div className="absolute top-2 left-2 z-20 w-fit rounded-lg bg-purple-500/80 p-2">
                  <p className="text-xs font-semibold text-white">{discount}</p>
                </div>
              )}
              {product.badge && (
                <div className="absolute top-2 right-2 z-20 w-fit rounded-lg bg-green-600/80 p-2">
                  <p className="text-xs font-semibold text-white">{product.badge}</p>
                </div>
              )}

              {/* Main Image with Animation */}
              <div className="relative w-full h-full">
                {productImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                      index === currentImageIndex
                        ? 'opacity-100 scale-100 translate-x-0'
                        : index < currentImageIndex
                        ? 'opacity-0 scale-95 -translate-x-8'
                        : 'opacity-0 scale-95 translate-x-8'
                    }`}
                  >
                    <Image
                      src={image || "https://via.placeholder.com/400x400?text=Product+Image"}
                      alt={`${product.title} - Image ${index + 1}`}
                      fill
                      className="object-contain p-4"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/400x400?text=Product+Image";
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Arrows - Only show if multiple images */}
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </>
              )}

              {/* Image Indicators - Only show if multiple images */}
              {productImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                  {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 transform ${
                      index === currentImageIndex 
                        ? 'bg-amber-800 scale-125' 
                        : 'bg-white/60 hover:bg-white/80 hover:scale-110'
                    }`}
                  />
                ))}
                </div>
              )}

              {/* Image Counter - Only show if multiple images */}
              {productImages.length > 1 && (
                <div className="absolute bottom-2 right-2 z-20 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  {currentImageIndex + 1} / {productImages.length}
                </div>
              )}
            </div>

            {/* Thumbnail Row - Only show if multiple images */}
            {productImages.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 transform ${
                    index === currentImageIndex 
                      ? 'border-2 border-[var(--burnt-orange)] scale-105 shadow-md' 
                      : 'border border-gray-200 hover:border-gray-300 hover:scale-102'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} thumbnail ${index + 1}`}
                    width={64}
                    height={64}
                    className={`w-full h-full object-contain bg-gray-50 transition-opacity duration-300 ${
                      index === currentImageIndex ? 'opacity-100 p-2' : 'opacity-70 hover:opacity-90 p-2'
                    }`}
                  />
                </button>
              ))}
              </div>
            )}
          </div>

          <div className="col-span-4 flex flex-col gap-6 md:col-span-2">
            <div className="flex flex-col gap-2">
              <p className="text-3xl font-semibold">{product.title}</p>
              <div className="flex flex-row flex-wrap items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(rating) ? "★" : "☆"}>
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-lg">({rating})</p>
                <p className="text-muted-foreground">{reviewCount} reviews</p>
              </div>
              <p className="text-muted-foreground text-base">
                High-quality product designed for your everyday needs. Made with premium materials and crafted with attention to detail for optimal performance and durability.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {product.status === "AVAILABLE" ? (
                <div className="flex flex-row items-center gap-2">
                  <div className="w-fit rounded-lg border border-green-500 bg-green-500/30 px-2 py-1 text-sm font-semibold text-green-500 uppercase dark:border-green-300 dark:text-green-300">
                    In Stock
                  </div>
                  {product.showStockCount && product.stock !== undefined && product.stock > 0 && (
                    <p className="text-muted-foreground">+{product.stock} in stocks</p>
                  )}
                </div>
              ) : (
                <div className="w-fit rounded-lg border border-red-500 bg-red-500/30 px-2 py-1 text-sm font-semibold text-red-500 uppercase dark:border-red-300 dark:text-red-300">
                  Out of Stock
                </div>
              )}

              <p>
                <a
                  href="#"
                  className="semibold underline underline-offset-4 opacity-80 hover:opacity-100"
                >
                  Free Shipping
                </a>{" "}
                on all orders
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-4xl font-semibold">
                  Rs. {product.salePrice}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    Rs. {product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-row flex-wrap gap-4">
              <Button 
                size="lg" 
                className="w-fit bg-[#BC6C25] hover:bg-[#A0571C] text-white font-medium px-8" 
                onClick={handleContactForOrder}
                disabled={product.status === "SOLD_OUT"}
              >
                {product.status === "SOLD_OUT" ? "Out of Stock" : "Contact for Order"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}