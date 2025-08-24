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


interface CategorySection2Props {
  categories: Category[];
}

export default function CategorySection2({ categories }: CategorySection2Props) {
  const [activeSection, setActiveSection] = useState("kitchen-hygiene"); // "both", "kitchen-hygiene", "household-cleaner"
  const [selectedProduct, setSelectedProduct] = useState<CategoryProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter to show only kitchen-hygiene and household-cleaner categories
  const filteredCategories = categories.filter(cat => 
    cat.slug === 'kitchen-hygiene' || cat.slug === 'household-cleaner'
  );

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
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          onClick={() => setActiveSection(activeSection === "kitchen-hygiene" ? "both" : "kitchen-hygiene")}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeSection === "kitchen-hygiene"
              ? "border-amber-800 text-amber-800"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          {filteredCategories.find(cat => cat.slug === 'kitchen-hygiene')?.name || 'KITCHEN HYGIENE'}
        </button>
        <button
          onClick={() => setActiveSection(activeSection === "household-cleaner" ? "both" : "household-cleaner")}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeSection === "household-cleaner"
              ? "border-amber-800 text-amber-800"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          {filteredCategories.find(cat => cat.slug === 'household-cleaner')?.name || 'HOUSEHOLD CLEANER'}
        </button>
      </div>
      
      {/* Combined Categories Slider */}
      <div className="mb-12">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {(() => {
              let productsToShow = [];
              if (activeSection === "kitchen-hygiene") {
                productsToShow = filteredCategories.find(cat => cat.slug === 'kitchen-hygiene')?.products || [];
              } else if (activeSection === "household-cleaner") {
                productsToShow = filteredCategories.find(cat => cat.slug === 'household-cleaner')?.products || [];
              } else {
                productsToShow = filteredCategories.flatMap(cat => cat.products);
              }
              return productsToShow.map((product) => (
              <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="p-2 h-full">
                  <Card className="group relative overflow-hidden border-gray-200 hover:shadow-lg transition-shadow h-full flex flex-col min-h-[480px]">
                    <CardContent className="p-0 flex flex-col h-full">
                      {/* Product Image */}
                      <div className="relative bg-gray-50 p-6 h-64 flex items-center justify-center">
                        {product.badge && (
                          <div className="absolute top-3 right-3 z-10">
                            <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                              {product.badge}
                            </span>
                          </div>
                        )}
                        <Image
                          src={product.image || "https://via.placeholder.com/300x300?text=Product+Image"}
                          alt={product.title}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform"
                          onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/300x300?text=Product+Image";
                          }}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
                          {product.title}
                        </h3>
                        
                        {/* Price */}
                        <div className="mb-3 flex-1">
                          {product.status === "SOLD_OUT" ? (
                            <span className="text-red-600 font-semibold text-sm">
                              Sold Out
                            </span>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-gray-900">
                                Rs. {product.salePrice}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                  Rs. {product.originalPrice}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Action Button */}
                        <Button 
                          className={`w-full mt-auto ${
                            product.status === "SOLD_OUT"
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-amber-800 hover:bg-amber-900"
                          }`}
                          disabled={product.status === "SOLD_OUT"}
                          onClick={() => product.status === "AVAILABLE" && handlePreviewClick(product)}
                        >
                          {product.status === "SOLD_OUT" ? "SOLD OUT" : "PREVIEW"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              ));
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