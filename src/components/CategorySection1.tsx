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

interface CategorySection1Props {
  categories: Category[];
}

export default function CategorySection1({ categories }: CategorySection1Props) {
  const [selectedProduct, setSelectedProduct] = useState<CategoryProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Find only containers category
  const containersCategory = categories.find(cat => cat.slug === "containers");

  const handlePreviewClick = (product: CategoryProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Shop By Category
        </h2>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button className="px-6 py-3 text-sm font-medium border-b-2 border-amber-800 text-amber-800">
            {containersCategory?.name?.toUpperCase() || 'CONTAINERS'}
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
              const productsToShow = containersCategory?.products || [];
              return [...productsToShow, ...productsToShow].map((product, index) => {
                // Get the primary image (first image or fallback to product.image)
                const primaryImage = product.images && product.images.length > 0
                  ? product.images[0].url
                  : product.image || '/images/placeholder.txt';

                const altText = product.images && product.images.length > 0
                  ? product.images[0].altText || product.title
                  : product.title;

                return (
                  <CarouselItem key={`${product.id}-${index}`} className="pl-8 md:basis-1/2 lg:basis-1/4">
                    <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-[#DDA15E]/20 hover:border-[#BC6C25] bg-white">
                      <CardContent className="p-6">
                        {/* Product Image */}
                        <div className="aspect-square bg-gradient-to-br from-[#FEFAE0] to-[#F8F9FA] rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                          <Image
                            src={primaryImage}
                            alt={altText}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="space-y-4">
                          <div className="text-center">
                            <h3 className="text-xl font-semibold text-[#283618] mb-2">
                              {product.title}
                            </h3>

                            {/* Badge if available */}
                            {product.badge && (
                              <div className="flex justify-center mb-4">
                                <span className="text-xs bg-[#DDA15E]/20 text-[#BC6C25] px-2 py-1 rounded-full">
                                  {product.badge}
                                </span>
                              </div>
                            )}

                            {/* Stock info */}
                            {product.stock && product.stock > 0 && (
                              <div className="text-xs text-[#606C38] mb-2">
                                In Stock: {product.stock} units
                              </div>
                            )}
                          </div>

                          {/* Pricing */}
                          <div className="bg-gradient-to-r from-[#FEFAE0] to-[#F4F3EE] rounded-lg p-4 text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                              <div className="text-2xl font-bold text-[#BC6C25]">
                                ₹{product.salePrice}
                              </div>
                              {product.originalPrice && product.originalPrice > product.salePrice && (
                                <div className="text-sm text-gray-500 line-through">
                                  ₹{product.originalPrice}
                                </div>
                              )}
                            </div>
                            <div className="text-sm text-[#606C38]">
                              per 100 pieces
                            </div>
                          </div>

                          {/* Order Button */}
                          <Button
                            onClick={() => handlePreviewClick(product)}
                            disabled={product.status === 'SOLD_OUT' || product.stock === 0}
                            className="w-full bg-[#BC6C25] hover:bg-[#A0571C] text-white font-medium py-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
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