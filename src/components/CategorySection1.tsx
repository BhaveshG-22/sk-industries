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
        id: "3",
        title: "Hand Sanitizer Gel 500ml",
        originalPrice: 150,
        salePrice: 120,
        status: "available",
        image: "https://prd.place/400?id=6",
        badge: "500ML"
      },
      {
        id: "4",
        title: "Moisturizing Body Lotion 200ml",
        originalPrice: 180,
        salePrice: 149,
        status: "available",
        image: "https://prd.place/400?id=13",
        badge: "ORGANIC"
      },
      {
        id: "5",
        title: "Toothbrush Set Electric",
        salePrice: 899,
        status: "available",
        image: "https://prd.place/400?id=18",
        badge: "RECHARGEABLE"
      },
      {
        id: "6",
        title: "Body Wash Antibacterial",
        originalPrice: 249,
        salePrice: 199,
        status: "available",
        image: "https://prd.place/400?id=19"
      },
      {
        id: "7",
        title: "Hand Cream Moisturizing",
        salePrice: 129,
        status: "sold_out",
        image: "https://prd.place/400?id=20",
        badge: "VITAMIN E"
      },
      {
        id: "8",
        title: "Nail Care Kit Complete",
        originalPrice: 399,
        salePrice: 299,
        status: "available",
        image: "https://prd.place/400?id=21",
        badge: "12 PIECES"
      },
      {
        id: "9",
        title: "Deodorant Spray Set",
        salePrice: 449,
        status: "available",
        image: "https://prd.place/400?id=22",
        badge: "PACK OF 3"
      },
      {
        id: "10",
        title: "Lip Balm Collection",
        originalPrice: 199,
        salePrice: 149,
        status: "available",
        image: "https://prd.place/400?id=23",
        badge: "6 FLAVORS"
      }
    ]
  },
  {
    id: "food-wrapping",
    name: "FOOD WRAPPING",
    products: [
      {
        id: "11",
        title: "Food Wrapping Paper 21 Meters - (Pack of 2)",
        salePrice: 245,
        status: "sold_out",
        image: "https://prd.place/400?id=24",
        badge: "21 METERS"
      },
      {
        id: "12",
        title: "Aluminium Foil 9 Meters - (Pack of 2)",
        salePrice: 199,
        status: "sold_out",
        image: "https://prd.place/400?id=25"
      },
      {
        id: "13",
        title: "Baking Paper Sheets 10.25*10.25 Inches - 100 Sheets",
        originalPrice: 299,
        salePrice: 245,
        status: "available",
        image: "https://prd.place/400?id=26",
        badge: "100 SHEETS"
      },
      {
        id: "14",
        title: "2Ply Facial Tissue Box 200 Pulls - (Pack of 3)",
        originalPrice: 525,
        salePrice: 299,
        status: "available",
        image: "https://prd.place/400?id=27",
        badge: "3 BOXES"
      },
      {
        id: "15",
        title: "Plastic Wrap Heavy Duty",
        salePrice: 179,
        status: "available",
        image: "https://prd.place/400?id=28",
        badge: "500M"
      },
      {
        id: "16",
        title: "Vacuum Seal Bags Pack",
        originalPrice: 399,
        salePrice: 299,
        status: "available",
        image: "https://prd.place/400?id=29",
        badge: "PACK OF 50"
      },
      {
        id: "17",
        title: "Food Storage Containers",
        salePrice: 699,
        status: "available",
        image: "https://prd.place/400?id=30",
        badge: "SET OF 10"
      },
      {
        id: "18",
        title: "Freezer Bags Assorted",
        salePrice: 249,
        status: "sold_out",
        image: "https://prd.place/400?id=31",
        badge: "MULTI-SIZE"
      },
      {
        id: "19",
        title: "Wax Paper Roll",
        originalPrice: 149,
        salePrice: 119,
        status: "available",
        image: "https://prd.place/400?id=32"
      },
      {
        id: "20",
        title: "Ziplock Bags Premium",
        salePrice: 329,
        status: "available",
        image: "https://prd.place/400?id=33",
        badge: "LEAK-PROOF"
      }
    ]
  }
];

export default function CategorySection1() {
  const [activeSection, setActiveSection] = useState("personal-hygiene"); // "both", "personal-hygiene", "food-wrapping"

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
          onClick={() => setActiveSection(activeSection === "personal-hygiene" ? "both" : "personal-hygiene")}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeSection === "personal-hygiene"
              ? "border-amber-800 text-amber-800"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          {categories[0]?.name}
        </button>
        <button
          onClick={() => setActiveSection(activeSection === "food-wrapping" ? "both" : "food-wrapping")}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeSection === "food-wrapping"
              ? "border-amber-800 text-amber-800"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          {categories[1]?.name}
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
              if (activeSection === "personal-hygiene") {
                productsToShow = categories[0]?.products || [];
              } else if (activeSection === "food-wrapping") {
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