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
  badge: string | null;
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
          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 right-3 z-10">
              <span className="text-xs bg-red-600 text-white px-2 py-1 rounded-full font-medium">
                {product.badge}
              </span>
            </div>
          )}
          
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
  const categories = Object.keys(productsByCategory);
  
  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products available at the moment.</p>
      </div>
    );
  }

  // Get category display name and emoji
  const getCategoryInfo = (slug: string) => {
    const products = productsByCategory[slug];
    if (products.length === 0) return { name: slug, emoji: '📦' };
    
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
      <TabsList className={`grid w-full mb-12 max-w-4xl mx-auto`} style={{ gridTemplateColumns: `repeat(${categories.length}, 1fr)` }}>
        {categories.map((categorySlug) => {
          const { name, emoji } = getCategoryInfo(categorySlug);
          return (
            <TabsTrigger key={categorySlug} value={categorySlug}>
              {emoji} {name}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {categories.map((categorySlug) => {
        const products = productsByCategory[categorySlug];
        const { name } = getCategoryInfo(categorySlug);
        
        return (
          <TabsContent key={categorySlug} value={categorySlug}>
            <SectionHeader title={name} count={products.length} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}