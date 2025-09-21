"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { scrollToContact } from "@/lib/scroll";

interface ProductImage {
  id: string;
  url: string;
  altText: string | null;
  sequence: number;
}

interface ProductItem {
  id: string;
  title: string;
  salePrice: number;
  description: string | null;
  image: string | null;
  images: ProductImage[];
  category: string;
  categorySlug: string;
}

interface CategoryTabsProps {
  productsByCategory: Record<string, ProductItem[]>;
}

// Product Card Component
function ProductCard({ product }: { product: ProductItem }) {
  const primaryImage = product.images.length > 0 ? product.images[0] : null;
  const imageUrl = primaryImage?.url || product.image || '/placeholder.jpg';
  
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-red-500 bg-white overflow-hidden h-full">
      <CardContent className="p-0 h-full flex flex-col">
        {/* Image Section */}
        <div className="relative aspect-square bg-gradient-to-br from-yellow-50 to-white overflow-hidden">
          
          {/* Product Image */}
          <div className="transition-transform duration-300 group-hover:scale-105 w-full h-full">
            <Image
              src={imageUrl}
              alt={primaryImage?.altText || product.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-800 mb-2">
              {product.title}
            </h3>
            {product.description && (
              <p className="text-sm text-gray-600 mb-3">
                {product.description}
              </p>
            )}
            <div className="text-sm font-medium text-red-600 mb-3">
              ₹{product.salePrice}
            </div>
          </div>

          <Button 
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
            size="sm"
            onClick={scrollToContact}
          >
            Get Quote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Section Header Component
function SectionHeader({ title, count }: { title: string; count?: number }) {
  return (
    <div className="text-center mb-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        {title}
        {count && (
          <span className="ml-2 text-base bg-red-100 text-red-600 px-2 py-1 rounded-full">
            {count} items
          </span>
        )}
      </h3>
    </div>
  );
}

export default function CategoryTabs({ productsByCategory }: CategoryTabsProps) {
  // Hardcoded product data
  const hardcodedProducts: Record<string, ProductItem[]> = {
    'paper-bowls': [
      // Small Bowls
      { id: '1', title: '150 ml Bowl', salePrice: 25, description: 'Small bowl for snacks', image: null, images: [], category: 'Paper Bowls', categorySlug: 'paper-bowls' },
      { id: '2', title: '200 ml Bowl', salePrice: 30, description: 'Small bowl for light meals', image: null, images: [], category: 'Paper Bowls', categorySlug: 'paper-bowls' },
      // Large Bowls
      { id: '3', title: '250 ml Bowl', salePrice: 35, description: 'Large bowl for meals', image: null, images: [], category: 'Paper Bowls', categorySlug: 'paper-bowls' },
      { id: '4', title: '360 ml Bowl', salePrice: 40, description: 'Extra large bowl', image: null, images: [], category: 'Paper Bowls', categorySlug: 'paper-bowls' },
    ],
    'paper-plates': [
      // Round Plates
      { id: '5', title: '8" Round Plate', salePrice: 20, description: 'Small round plate', image: null, images: [], category: 'Paper Plates', categorySlug: 'paper-plates' },
      { id: '6', title: '9" Round Plate', salePrice: 25, description: 'Medium round plate', image: null, images: [], category: 'Paper Plates', categorySlug: 'paper-plates' },
      { id: '7', title: '10" Round Plate', salePrice: 30, description: 'Large round plate', image: null, images: [], category: 'Paper Plates', categorySlug: 'paper-plates' },
      // Square Plates
      { id: '8', title: '4x4" Square Plate', salePrice: 15, description: 'Small square plate', image: null, images: [], category: 'Paper Plates', categorySlug: 'paper-plates' },
      { id: '9', title: '5x5" Square Plate', salePrice: 20, description: 'Medium square plate', image: null, images: [], category: 'Paper Plates', categorySlug: 'paper-plates' },
    ],
    'paper-cups': [
      // Small Sizes
      { id: '10', title: '55 ml Cup', salePrice: 10, description: 'Extra small cup', image: null, images: [], category: 'Paper Cups', categorySlug: 'paper-cups' },
      { id: '11', title: '65 ml Cup', salePrice: 12, description: 'Small cup for espresso', image: null, images: [], category: 'Paper Cups', categorySlug: 'paper-cups' },
      { id: '12', title: '85 ml Cup', salePrice: 15, description: 'Small cup for tea', image: null, images: [], category: 'Paper Cups', categorySlug: 'paper-cups' },
      { id: '13', title: '110 ml Cup', salePrice: 18, description: 'Small cup for coffee', image: null, images: [], category: 'Paper Cups', categorySlug: 'paper-cups' },
      // Medium Sizes
      { id: '14', title: '150 ml Cup', salePrice: 20, description: 'Medium cup for beverages', image: null, images: [], category: 'Paper Cups', categorySlug: 'paper-cups' },
      { id: '15', title: '200 ml Cup', salePrice: 25, description: 'Medium cup for drinks', image: null, images: [], category: 'Paper Cups', categorySlug: 'paper-cups' },
      // Large Size
      { id: '16', title: '250 ml Cup', salePrice: 30, description: 'Large cup for beverages', image: null, images: [], category: 'Paper Cups', categorySlug: 'paper-cups' },
    ]
  };

  // Use hardcoded data instead of props
  const categories = Object.keys(hardcodedProducts);
  
  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products available at the moment.</p>
      </div>
    );
  }

  // Get category display name and emoji
  const getCategoryInfo = (slug: string) => {
    const products = hardcodedProducts[slug];
    if (!products || products.length === 0) return { name: slug, emoji: '📦' };
    
    const categoryName = products[0].category;
    let emoji = '📦';
    
    if (categoryName.toLowerCase().includes('cup')) emoji = '🥤';
    else if (categoryName.toLowerCase().includes('plate')) emoji = '🍽️';
    else if (categoryName.toLowerCase().includes('bowl')) emoji = '🥣';
    else if (categoryName.toLowerCase().includes('foil')) emoji = '📄';
    
    return { name: categoryName, emoji };
  };

  return (
    <Tabs defaultValue={categories[0]} className="w-full">
      <TabsList className={`grid w-full mb-12 max-w-4xl mx-auto bg-gray-100 rounded-xl p-2`} style={{ gridTemplateColumns: `repeat(${categories.length}, 1fr)` }}>
        {categories.map((categorySlug) => {
          const { name, emoji } = getCategoryInfo(categorySlug);
          const count = hardcodedProducts[categorySlug].length;
          return (
            <TabsTrigger 
              key={categorySlug} 
              value={categorySlug}
              className="!flex !flex-col !items-center !justify-center !whitespace-normal data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-red-600 hover:bg-white/50 rounded-lg py-2 px-3 gap-1 !h-auto min-h-[70px] text-center"
            >
              <span className="text-xl">
                {emoji}
              </span>
              <div className="flex flex-col items-center">
                <span className="font-medium text-xs leading-tight">
                  {name}
                </span>
                <span className="text-xs opacity-60 mt-0.5">
                  {count} items
                </span>
              </div>
            </TabsTrigger>
          );
        })}
      </TabsList>

      {categories.map((categorySlug) => {
        const products = hardcodedProducts[categorySlug];
        const { name } = getCategoryInfo(categorySlug);
        
        return (
          <TabsContent 
            key={categorySlug} 
            value={categorySlug}
            className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300"
          >
            <SectionHeader title={name} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-in fade-in-0 slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 50}ms`, animationDuration: '400ms' }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}