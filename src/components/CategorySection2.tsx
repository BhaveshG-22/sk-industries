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
import React, { useState, useEffect } from "react";
import ProductPreviewModal from "@/components/ProductPreviewModal";

interface CategoryProduct {
  id: string;
  title: string;
  originalPrice?: number;
  salePrice: number;
  status: string;
  image: string;
  badge?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  products: CategoryProduct[];
}


export default function CategorySection2() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("kitchen-hygiene"); // "both", "kitchen-hygiene", "household-cleaner"
  const [selectedProduct, setSelectedProduct] = useState<CategoryProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        // Filter to show only kitchen-hygiene and household-cleaner categories
        const filteredCategories = data.filter((cat: Category) => 
          cat.slug === 'kitchen-hygiene' || cat.slug === 'household-cleaner'
        );
        setCategories(filteredCategories);
      } else {
        console.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-800 mx-auto"></div>
          <p className="mt-4 text-gray-900">Loading categories...</p>
        </div>
      </div>
    );
  }

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
          {categories.find(cat => cat.slug === 'kitchen-hygiene')?.name || 'KITCHEN HYGIENE'}
        </button>
        <button
          onClick={() => setActiveSection(activeSection === "household-cleaner" ? "both" : "household-cleaner")}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeSection === "household-cleaner"
              ? "border-amber-800 text-amber-800"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          {categories.find(cat => cat.slug === 'household-cleaner')?.name || 'HOUSEHOLD CLEANER'}
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
                productsToShow = categories.find(cat => cat.slug === 'kitchen-hygiene')?.products || [];
              } else if (activeSection === "household-cleaner") {
                productsToShow = categories.find(cat => cat.slug === 'household-cleaner')?.products || [];
              } else {
                productsToShow = categories.flatMap(cat => cat.products);
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
                          src={product.image}
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