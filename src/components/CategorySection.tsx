"use client";

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

interface CategoryProduct {
  id: string;
  title: string;
  originalPrice?: number;
  salePrice: number;
  status: "available" | "sold_out";
  image: string;
  badge?: string;
}

interface Category {
  id: string;
  name: string;
  products: CategoryProduct[];
}

const categories: Category[] = [
  {
    id: "personal-hygiene",
    name: "PERSONAL HYGIENE",
    products: [
      {
        id: "1",
        title: "2Ply Facial Tissue Box 100 Pulls - (Pack of 3)",
        salePrice: 299,
        status: "sold_out",
        image: "https://prd.place/400?id=1",
        badge: "3 BOXES"
      },
      {
        id: "2", 
        title: "Premium Face Wash Set",
        salePrice: 199,
        status: "available",
        image: "https://prd.place/400?id=2"
      },
      {
        id: "6",
        title: "Hand Sanitizer Gel 500ml",
        originalPrice: 150,
        salePrice: 120,
        status: "available",
        image: "https://prd.place/400?id=6",
        badge: "500ML"
      }
    ]
  },
  {
    id: "food-wrapping",
    name: "FOOD WRAPPING",
    products: [
      {
        id: "3",
        title: "2Ply Facial Tissue Box 200 Pulls - (Pack of 3)",
        originalPrice: 525,
        salePrice: 299,
        status: "available",
        image: "https://prd.place/400?id=3",
        badge: "3 BOXES"
      },
      {
        id: "7",
        title: "Food Storage Containers Set",
        salePrice: 599,
        status: "available",
        image: "https://prd.place/400?id=7",
        badge: "SET OF 5"
      },
      {
        id: "8",
        title: "Aluminum Foil Roll 30m",
        salePrice: 180,
        status: "available",
        image: "https://prd.place/400?id=8"
      }
    ]
  },
  {
    id: "kitchen-hygiene",
    name: "KITCHEN HYGIENE", 
    products: [
      {
        id: "4",
        title: "2Ply Napkin Tissue Box 50 Pulls - (Pack of 4)",
        salePrice: 250,
        status: "sold_out",
        image: "https://prd.place/400?id=4",
        badge: "4 BOXES"
      },
      {
        id: "9",
        title: "Kitchen Cleaning Wipes",
        originalPrice: 99,
        salePrice: 79,
        status: "available",
        image: "https://prd.place/400?id=9",
        badge: "80 WIPES"
      },
      {
        id: "10",
        title: "Dish Soap Liquid 500ml",
        salePrice: 145,
        status: "available",
        image: "https://prd.place/400?id=10"
      }
    ]
  },
  {
    id: "household-cleaner",
    name: "HOUSEHOLD CLEANER",
    products: [
      {
        id: "5",
        title: "3 Ply Toilet Tissue Paper Rolls - (Pack Of 4)",
        salePrice: 275,
        status: "available", 
        image: "https://prd.place/400?id=5",
        badge: "3 PLY"
      },
      {
        id: "11",
        title: "Multi-Surface Cleaner Spray",
        originalPrice: 199,
        salePrice: 159,
        status: "available",
        image: "https://prd.place/400?id=1",
        badge: "750ML"
      },
      {
        id: "12",
        title: "Floor Cleaner Concentrate",
        salePrice: 220,
        status: "sold_out",
        image: "https://prd.place/400?id=2"
      }
    ]
  }
];

export default function CategorySection() {
  const [activeCategory, setActiveCategory] = useState("personal-hygiene");

  const currentCategory = categories.find(cat => cat.id === activeCategory);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Shop By Category
        </h2>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeCategory === category.id
                  ? "border-amber-800 text-amber-800"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Carousel */}
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {currentCategory?.products.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <div className="p-2">
                <Card className="group relative overflow-hidden border-gray-200 hover:shadow-lg transition-shadow h-full flex flex-col">
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
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/300x300?text=Product+Image";
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                        {product.title}
                      </h3>
                      
                      {/* Price */}
                      <div className="mb-3 flex-1">
                        {product.status === "sold_out" ? (
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
                          product.status === "sold_out"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-amber-800 hover:bg-amber-900"
                        }`}
                        disabled={product.status === "sold_out"}
                      >
                        {product.status === "sold_out" ? "SOLD OUT" : "ADD TO CART"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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