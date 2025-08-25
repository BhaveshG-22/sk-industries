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
  const [activeSection, setActiveSection] = useState("containers"); // "both", "containers", "food-wrapping"
  const [selectedProduct, setSelectedProduct] = useState<CategoryProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Find categories by slug instead of assuming array positions
  const containersCategory = categories.find(cat => cat.slug === "containers");
  const foodWrappingCategory = categories.find(cat => cat.slug === "food-wrapping");

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
        <button
          onClick={() => setActiveSection(activeSection === "containers" ? "both" : "containers")}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeSection === "containers"
              ? "border-amber-800 text-amber-800"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          {containersCategory?.name?.toUpperCase()}
        </button>
        <button
          onClick={() => setActiveSection(activeSection === "food-wrapping" ? "both" : "food-wrapping")}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeSection === "food-wrapping"
              ? "border-amber-800 text-amber-800"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          {foodWrappingCategory?.name?.toUpperCase()}
        </button>
        </div>
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
              if (activeSection === "containers") {
                productsToShow = containersCategory?.products || [];
              } else if (activeSection === "food-wrapping") {
                productsToShow = foodWrappingCategory?.products || [];
              } else {
                productsToShow = [...containersCategory?.products || [], ...foodWrappingCategory?.products || []];
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