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
    id: "kitchen-hygiene",
    name: "KITCHEN HYGIENE", 
    products: [
      {
        id: "9",
        title: "Kitchen Cleaning Spray 500ml",
        originalPrice: 180,
        salePrice: 149,
        status: "available",
        image: "https://prd.place/400?id=18"
      },
      {
        id: "10",
        title: "Dishwashing Liquid 1L",
        salePrice: 99,
        status: "available", 
        image: "https://prd.place/400?id=19",
        badge: "1L"
      },
      {
        id: "11",
        title: "Microfiber Kitchen Towels Set",
        originalPrice: 299,
        salePrice: 199,
        status: "available",
        image: "https://prd.place/400?id=20",
        badge: "SET OF 5"
      },
      {
        id: "12",
        title: "Steel Scrubber Pack",
        salePrice: 75,
        status: "available",
        image: "https://prd.place/400?id=21",
        badge: "PACK OF 6"
      },
      {
        id: "13",
        title: "Oven Cleaner Heavy Duty",
        salePrice: 299,
        status: "available",
        image: "https://prd.place/400?id=26",
        badge: "DEEP CLEAN"
      },
      {
        id: "14",
        title: "Refrigerator Deodorizer",
        originalPrice: 149,
        salePrice: 119,
        status: "available",
        image: "https://prd.place/400?id=27"
      },
      {
        id: "15",
        title: "Stove Top Cleaner Gel",
        salePrice: 179,
        status: "sold_out",
        image: "https://prd.place/400?id=28"
      },
      {
        id: "16",
        title: "Garbage Disposal Cleaner",
        originalPrice: 99,
        salePrice: 79,
        status: "available",
        image: "https://prd.place/400?id=29",
        badge: "12 PODS"
      },
      {
        id: "17",
        title: "Kitchen Counter Spray",
        salePrice: 149,
        status: "available",
        image: "https://prd.place/400?id=30",
        badge: "ANTIBACTERIAL"
      },
      {
        id: "18",
        title: "Dishwasher Rinse Aid",
        originalPrice: 199,
        salePrice: 159,
        status: "available",
        image: "https://prd.place/400?id=31"
      }
    ]
  },
  {
    id: "household-cleaner",
    name: "HOUSEHOLD CLEANER",
    products: [
      {
        id: "19",
        title: "All Purpose Cleaner 1L",
        originalPrice: 250,
        salePrice: 199,
        status: "available",
        image: "https://prd.place/400?id=32",
        badge: "1L"
      },
      {
        id: "20",
        title: "Toilet Bowl Cleaner 500ml",
        salePrice: 129,
        status: "available",
        image: "https://prd.place/400?id=33"
      },
      {
        id: "21",
        title: "Glass Cleaner Spray 400ml",
        originalPrice: 160,
        salePrice: 120,
        status: "sold_out",
        image: "https://prd.place/400?id=34",
        badge: "400ML"
      },
      {
        id: "22",
        title: "Floor Cleaner Concentrate 1L",
        originalPrice: 220,
        salePrice: 175,
        status: "available",
        image: "https://prd.place/400?id=35",
        badge: "CONCENTRATE"
      },
      {
        id: "23",
        title: "Bathroom Tile Cleaner",
        salePrice: 189,
        status: "available",
        image: "https://prd.place/400?id=36",
        badge: "MOLD REMOVER"
      },
      {
        id: "24",
        title: "Carpet Stain Remover",
        originalPrice: 299,
        salePrice: 249,
        status: "available",
        image: "https://prd.place/400?id=37"
      },
      {
        id: "25",
        title: "Wood Floor Polish",
        salePrice: 219,
        status: "sold_out",
        image: "https://prd.place/400?id=38",
        badge: "NATURAL"
      },
      {
        id: "26",
        title: "Laundry Detergent Pods",
        originalPrice: 449,
        salePrice: 399,
        status: "available",
        image: "https://prd.place/400?id=39",
        badge: "60 PODS"
      },
      {
        id: "27",
        title: "Fabric Softener Liquid",
        salePrice: 159,
        status: "available",
        image: "https://prd.place/400?id=40",
        badge: "2L"
      },
      {
        id: "28",
        title: "Air Freshener Gel Pack",
        originalPrice: 179,
        salePrice: 149,
        status: "available",
        image: "https://prd.place/400?id=41",
        badge: "PACK OF 4"
      }
    ]
  }
];

export default function CategorySection2() {
  const [activeSection, setActiveSection] = useState("kitchen-hygiene"); // "both", "kitchen-hygiene", "household-cleaner"

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
          {categories[0]?.name}
        </button>
        <button
          onClick={() => setActiveSection(activeSection === "household-cleaner" ? "both" : "household-cleaner")}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeSection === "household-cleaner"
              ? "border-amber-800 text-amber-800"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          {categories[1]?.name}
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
                productsToShow = categories[0]?.products || [];
              } else if (activeSection === "household-cleaner") {
                productsToShow = categories[1]?.products || [];
              } else {
                productsToShow = [...categories[0]?.products || [], ...categories[1]?.products || []];
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
              ));
            })()}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}