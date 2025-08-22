"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard, { ProductCardProps } from "@/components/ProductCard";
import React from "react";

const sampleProducts: ProductCardProps[] = [
  {
    title: "Wireless Headphones",
    description: "Premium noise-cancelling headphones with surround sound technology",
    price: 98.96,
    rating: 4.7,
    reviewCount: 65,
    discount: "20% OFF",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    freeShipping: true
  },
  {
    title: "Smart Watch",
    description: "Advanced fitness tracking with heart rate monitor and GPS",
    price: 199.99,
    rating: 4.5,
    reviewCount: 128,
    discount: "15% OFF",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    freeShipping: true
  },
  {
    title: "Bluetooth Speaker",
    description: "Portable wireless speaker with rich bass and clear sound",
    price: 79.99,
    rating: 4.3,
    reviewCount: 92,
    discount: null,
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
    freeShipping: true
  },
  {
    title: "Gaming Mouse",
    description: "High-precision gaming mouse with customizable RGB lighting",
    price: 59.99,
    rating: 4.8,
    reviewCount: 156,
    discount: "30% OFF",
    imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
    freeShipping: false
  },
  {
    title: "Wireless Keyboard",
    description: "Mechanical keyboard with backlit keys and wireless connectivity",
    price: 149.99,
    rating: 4.6,
    reviewCount: 89,
    discount: "25% OFF",
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop",
    freeShipping: true
  },
  {
    title: "Phone Case",
    description: "Durable protective case with wireless charging compatibility",
    price: 24.99,
    rating: 4.4,
    reviewCount: 203,
    discount: null,
    imageUrl: "https://images.unsplash.com/photo-1601593346740-925612772716?w=300&h=300&fit=crop",
    freeShipping: false
  }
];

export default function ProductSlider() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Featured Products
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Discover our handpicked selection of premium products
        </p>
      </div>
      
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {sampleProducts.map((product, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <div className="p-2">
                <ProductCard
                  {...product}
                  onAddToCart={() => console.log(`Added ${product.title} to cart`)}
                  onBuyNow={() => console.log(`Buy now clicked for ${product.title}`)}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}