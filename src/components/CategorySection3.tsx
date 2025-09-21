"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import ProductPreviewModal from "@/components/ProductPreviewModal";
import { Category, CategoryProduct } from "@/types/shared";


interface CategorySection3Props {
  categories: Category[];
}

export default function CategorySection3({ categories }: CategorySection3Props) {
  const [selectedProduct, setSelectedProduct] = useState<CategoryProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Find only paper-cups category
  const paperCupsCategory = categories.find(cat => cat.slug === 'paper-cups');

  const handlePreviewClick = (product: CategoryProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Don't render if no paper cups category
  if (!paperCupsCategory) {
    return null;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button className="px-6 py-3 text-sm font-medium border-b-2 border-amber-800 text-amber-800">
            {paperCupsCategory.name.toUpperCase()}
          </button>
        </div>
      </div>

      {/* Products Slider */}
      <div className="mb-12">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-8">
            {(() => {
              const productsToShow = paperCupsCategory.products || [];
              return [...productsToShow, ...productsToShow].map((product, index) => {
                // Get the primary image (first image or fallback to product.image)
                const primaryImage = product.images && product.images.length > 0
                  ? product.images[0].url
                  : product.image || '/images/placeholder.txt';

                const altText = product.images && product.images.length > 0
                  ? product.images[0].altText || product.title
                  : product.title;

                return (
                  <CarouselItem key={`${product.id}-${index}`} className="pl-4 md:pl-8 basis-4/5 md:basis-1/2 lg:basis-1/4">
                    <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-[var(--soft-gray)]/20 hover:border-[var(--dark-red)] bg-white">
                      <CardContent className="p-3 md:p-6">
                        {/* Product Image */}
                        <div className="aspect-square bg-gradient-to-br from-[var(--light-gray)] to-[#F8F9FA] rounded-lg mb-2 md:mb-4 overflow-hidden flex items-center justify-center">
                          <Image
                            src={primaryImage}
                            alt={altText}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="space-y-2 md:space-y-4">
                          <div className="text-center">
                            <h3 className="text-sm md:text-xl font-semibold text-[var(--near-black)] mb-1 md:mb-2 line-clamp-2">
                              {product.title}
                            </h3>


                            {/* Stock info - Hide on mobile */}
                            {product.stock && product.stock > 0 && (
                              <div className="hidden md:block text-xs text-[var(--gray)] mb-2">
                                In Stock: {product.stock} units
                              </div>
                            )}
                          </div>

                          {/* Pricing */}
                          <div className="bg-gradient-to-r from-[var(--light-gray)] to-[#F4F3EE] rounded-lg p-2 md:p-4 text-center">
                            <div className="flex items-center justify-center gap-1 md:gap-2 mb-1">
                              <div className="text-lg md:text-2xl font-bold text-[var(--dark-red)]">
                                ₹{product.salePrice}
                              </div>
                              {product.originalPrice && product.originalPrice > product.salePrice && (
                                <div className="text-xs md:text-sm text-gray-500 line-through">
                                  ₹{product.originalPrice}
                                </div>
                              )}
                            </div>
                            <div className="text-xs md:text-sm text-[var(--gray)]">
                              per 50 pieces
                            </div>
                          </div>

                          {/* Order Button */}
                          <Button
                            onClick={() => handlePreviewClick(product)}
                            disabled={product.status === 'SOLD_OUT' || product.stock === 0}
                            className="w-full bg-[var(--dark-red)] hover:bg-[#A0571C] text-white font-medium py-1.5 md:py-2 text-sm md:text-base transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                          >
                            {product.status === 'SOLD_OUT' || product.stock === 0
                              ? 'Out of Stock'
                              : 'PREVIEW'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              });
            })()}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>

      {/* Product Preview Modal */}
      <ProductPreviewModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </div>
  );
}