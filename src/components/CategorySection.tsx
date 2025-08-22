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
        id: "6",
        title: "Hand Sanitizer Gel 500ml",
        originalPrice: 150,
        salePrice: 120,
        status: "available",
        image: "https://prd.place/400?id=6",
        badge: "500ML"
      },
      {
        id: "13",
        title: "Moisturizing Body Lotion 200ml",
        originalPrice: 180,
        salePrice: 149,
        status: "available",
        image: "https://prd.place/400?id=13",
        badge: "ORGANIC"
      },
      {
        id: "14",
        title: "Anti-Bacterial Soap Bar Set",
        salePrice: 89,
        status: "available",
        image: "https://prd.place/400?id=14",
        badge: "PACK OF 4"
      },
      {
        id: "15",
        title: "Dental Care Kit Complete",
        originalPrice: 299,
        salePrice: 249,
        status: "sold_out",
        image: "https://prd.place/400?id=15"
      },
      {
        id: "16",
        title: "Shampoo & Conditioner Bundle",
        salePrice: 399,
        status: "available",
        image: "https://prd.place/400?id=16",
        badge: "COMBO"
      },
      {
        id: "17",
        title: "Face Mask Sheet Pack",
        originalPrice: 120,
        salePrice: 89,
        status: "available",
        image: "https://prd.place/400?id=17",
        badge: "10 SHEETS"
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
      },
      {
        id: "18",
        title: "Cling Film Wrap 100m",
        originalPrice: 99,
        salePrice: 79,
        status: "available",
        image: "https://prd.place/400?id=18"
      },
      {
        id: "19",
        title: "Parchment Paper Sheets",
        salePrice: 149,
        status: "available",
        image: "https://prd.place/400?id=19",
        badge: "50 SHEETS"
      },
      {
        id: "20",
        title: "Vacuum Seal Bags Pack",
        salePrice: 299,
        status: "sold_out",
        image: "https://prd.place/400?id=20",
        badge: "PACK OF 20"
      },
      {
        id: "21",
        title: "Food Wrap Paper Eco",
        originalPrice: 159,
        salePrice: 129,
        status: "available",
        image: "https://prd.place/400?id=21",
        badge: "ECO-FRIENDLY"
      },
      {
        id: "22",
        title: "Ziplock Bags Assorted",
        salePrice: 199,
        status: "available",
        image: "https://prd.place/400?id=22",
        badge: "MULTI-SIZE"
      },
      {
        id: "23",
        title: "Freezer Bags Heavy Duty",
        salePrice: 249,
        status: "available",
        image: "https://prd.place/400?id=23"
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
      },
      {
        id: "24",
        title: "Scrub Sponges Multi-Pack",
        salePrice: 89,
        status: "available",
        image: "https://prd.place/400?id=24",
        badge: "PACK OF 12"
      },
      {
        id: "25",
        title: "Degreaser Spray Kitchen",
        originalPrice: 179,
        salePrice: 149,
        status: "available",
        image: "https://prd.place/400?id=25"
      },
      {
        id: "26",
        title: "Microfiber Cleaning Cloths",
        salePrice: 199,
        status: "sold_out",
        image: "https://prd.place/400?id=26",
        badge: "SET OF 6"
      },
      {
        id: "27",
        title: "Oven Cleaner Gel Strong",
        salePrice: 229,
        status: "available",
        image: "https://prd.place/400?id=27"
      },
      {
        id: "28",
        title: "Dishwasher Tablets Pack",
        originalPrice: 299,
        salePrice: 249,
        status: "available",
        image: "https://prd.place/400?id=28",
        badge: "30 TABLETS"
      },
      {
        id: "29",
        title: "Cutting Board Sanitizer",
        salePrice: 129,
        status: "available",
        image: "https://prd.place/400?id=29"
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
        image: "https://prd.place/400?id=11",
        badge: "750ML"
      },
      {
        id: "12",
        title: "Floor Cleaner Concentrate",
        salePrice: 220,
        status: "sold_out",
        image: "https://prd.place/400?id=12"
      },
      {
        id: "30",
        title: "Glass Cleaner Streak-Free",
        salePrice: 149,
        status: "available",
        image: "https://prd.place/400?id=30"
      },
      {
        id: "31",
        title: "Bathroom Cleaner Disinfectant",
        originalPrice: 189,
        salePrice: 159,
        status: "available",
        image: "https://prd.place/400?id=31"
      },
      {
        id: "32",
        title: "Laundry Detergent Pods",
        salePrice: 399,
        status: "available",
        image: "https://prd.place/400?id=32",
        badge: "40 PODS"
      },
      {
        id: "33",
        title: "Fabric Softener Liquid",
        originalPrice: 179,
        salePrice: 149,
        status: "sold_out",
        image: "https://prd.place/400?id=33"
      },
      {
        id: "34",
        title: "Air Freshener Spray Pack",
        salePrice: 199,
        status: "available",
        image: "https://prd.place/400?id=34",
        badge: "PACK OF 3"
      },
      {
        id: "35",
        title: "Carpet Cleaner Foam",
        salePrice: 279,
        status: "available",
        image: "https://prd.place/400?id=35"
      },
      {
        id: "36",
        title: "Wood Polish Spray",
        originalPrice: 149,
        salePrice: 119,
        status: "available",
        image: "https://prd.place/400?id=36"
      },
      {
        id: "37",
        title: "Stain Remover Pen Set",
        salePrice: 89,
        status: "available",
        image: "https://prd.place/400?id=37",
        badge: "SET OF 3"
      },
      {
        id: "38",
        title: "Drain Cleaner Gel",
        salePrice: 199,
        status: "sold_out",
        image: "https://prd.place/400?id=38"
      }
    ]
  }
];

export default function CategorySection() {
  const [activeFirstSection, setActiveFirstSection] = useState("both"); // "both", "personal-hygiene", "food-wrapping"
  const [activeSecondSection, setActiveSecondSection] = useState("both"); // "both", "kitchen-hygiene", "household-cleaner"


  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* First Section - First 2 Categories */}
      <div className="mb-16">
        {/* First Row Headers */}
        <div className="flex justify-center gap-8 mb-8">
          <button
            onClick={() => setActiveFirstSection(activeFirstSection === "personal-hygiene" ? "both" : "personal-hygiene")}
            className={`text-2xl font-bold pb-2 border-b-2 transition-colors ${
              activeFirstSection === "personal-hygiene"
                ? "text-amber-800 border-amber-800"
                : "text-gray-900 border-amber-800 hover:text-amber-700"
            }`}
          >
            {categories[0]?.name}
          </button>
          <button
            onClick={() => setActiveFirstSection(activeFirstSection === "food-wrapping" ? "both" : "food-wrapping")}
            className={`text-2xl font-bold pb-2 border-b-2 transition-colors ${
              activeFirstSection === "food-wrapping"
                ? "text-amber-800 border-amber-800"
                : "text-gray-900 border-amber-800 hover:text-amber-700"
            }`}
          >
            {categories[1]?.name}
          </button>
        </div>
        
        {/* Combined First Two Categories Slider */}
        <div className="mb-12">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {(() => {
                let productsToShow = [];
                if (activeFirstSection === "personal-hygiene") {
                  productsToShow = categories[0]?.products || [];
                } else if (activeFirstSection === "food-wrapping") {
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

      {/* Second Section - Last 2 Categories */}
      <div>
        {/* Second Row Headers */}
        <div className="flex justify-center gap-8 mb-8">
          <button
            onClick={() => setActiveSecondSection(activeSecondSection === "kitchen-hygiene" ? "both" : "kitchen-hygiene")}
            className={`text-2xl font-bold pb-2 border-b-2 transition-colors ${
              activeSecondSection === "kitchen-hygiene"
                ? "text-amber-800 border-amber-800"
                : "text-gray-900 border-amber-800 hover:text-amber-700"
            }`}
          >
            {categories[2]?.name}
          </button>
          <button
            onClick={() => setActiveSecondSection(activeSecondSection === "household-cleaner" ? "both" : "household-cleaner")}
            className={`text-2xl font-bold pb-2 border-b-2 transition-colors ${
              activeSecondSection === "household-cleaner"
                ? "text-amber-800 border-amber-800"
                : "text-gray-900 border-amber-800 hover:text-amber-700"
            }`}
          >
            {categories[3]?.name}
          </button>
        </div>
        
        {/* Combined Last Two Categories Slider */}
        <div className="mb-12">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {(() => {
                let productsToShow = [];
                if (activeSecondSection === "kitchen-hygiene") {
                  productsToShow = categories[2]?.products || [];
                } else if (activeSecondSection === "household-cleaner") {
                  productsToShow = categories[3]?.products || [];
                } else {
                  productsToShow = [...categories[2]?.products || [], ...categories[3]?.products || []];
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
    </div>
  );
}