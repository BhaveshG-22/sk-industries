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
              <CarouselItem key={product.id} className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <div className="p-1 h-full">
                  <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-[#DDA15E]/20 hover:border-[#BC6C25] bg-white h-full flex flex-col">
                    <CardContent className="p-4 flex flex-col h-full">
                      {/* Product Image */}
                      <div className="aspect-square bg-gradient-to-br from-[#FEFAE0] to-[#F8F9FA] rounded-lg mb-3 overflow-hidden flex items-center justify-center relative">
                        <Image
                          src={product.image || "https://via.placeholder.com/300x300?text=Product+Image"}
                          alt={product.title}
                          width={200}
                          height={200}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/300x300?text=Product+Image";
                          }}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="space-y-3 flex-1 flex flex-col">
                        <div className="text-center">
                          <h3 className="text-sm font-semibold text-[#283618] mb-1 line-clamp-2">
                            {product.title}
                          </h3>
                          
                          {/* Stock info */}
                          {product.stock && product.stock > 0 && (
                            <div className="text-xs text-[#606C38] mb-1">
                              In Stock: {product.stock}
                            </div>
                          )}
                        </div>

                        {/* Pricing */}
                        <div className="bg-gradient-to-r from-[#FEFAE0] to-[#F4F3EE] rounded-lg p-3 text-center">
                          <div className="flex items-center justify-center gap-2 mb-1">
                            {product.status === "SOLD_OUT" ? (
                              <span className="text-red-600 font-semibold text-sm">
                                Sold Out
                              </span>
                            ) : (
                              <>
                                <div className="text-lg font-bold text-[#BC6C25]">
                                  ₹{product.salePrice}
                                </div>
                                {product.originalPrice && product.originalPrice > product.salePrice && (
                                  <div className="text-xs text-gray-500 line-through">
                                    ₹{product.originalPrice}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                          <div className="text-xs text-[#606C38]">
                            per 100 pieces
                          </div>
                        </div>

                        {/* Action Button */}
                        <Button 
                          disabled={product.status === "SOLD_OUT" || (product.stock !== undefined && product.stock === 0)}
                          className="w-full bg-[#BC6C25] hover:bg-[#A0571C] text-white font-medium py-1.5 text-sm transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mt-auto"
                          onClick={() => product.status === "AVAILABLE" && handlePreviewClick(product)}
                        >
                          {product.status === "SOLD_OUT" || (product.stock !== undefined && product.stock === 0)
                            ? 'Out of Stock' 
                            : 'PREVIEW'}
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