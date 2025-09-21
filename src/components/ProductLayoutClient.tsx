"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  isFeatured: boolean;
}

interface ProductLayoutClientProps {
  productsByCategory: Record<string, ProductItem[]>;
}

// Product Card Component
function ProductCard({ product }: { product: ProductItem }) {
  const primaryImage = product.images.length > 0 ? product.images[0] : null;
  const imageUrl = primaryImage?.url || product.image || '/placeholder.jpg';

  return (
    <Card className="group relative overflow-hidden border border-gray-200 hover:border-[var(--primary-light)] transition-all duration-300 hover:shadow-xl bg-white rounded-xl">
      {/* Featured Badge */}
      {product.isFeatured && (
        <div className="absolute top-4 right-4 z-20">
          <span className="bg-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
            Featured
          </span>
        </div>
      )}

      <CardContent className="p-0 h-full flex flex-col">
        {/* Image Section */}
        <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden rounded-t-xl">
          {/* Price Badge */}
          <div className="absolute top-3 left-3 z-20">
            <span className="text-sm bg-white text-[var(--primary-dark)] px-3 py-1.5 rounded-full font-semibold border border-gray-200 shadow-sm">
              ₹{product.salePrice}
            </span>
          </div>

          {/* Image Container - Full Size */}
          <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-105">
            <Image
              src={imageUrl}
              alt={primaryImage?.altText || product.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
              {product.title}
            </h3>
            {product.description && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          {/* Features & Status */}
          <div className="flex items-center justify-between mb-4 pt-2 border-t border-gray-100">
            <span className="text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-medium">
              Eco-friendly
            </span>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
              In Stock
            </span>
          </div>

          {/* CTA Button */}
          <Button
            className="w-full bg-[var(--primary-light)] hover:bg-[var(--primary-dark)] text-white font-semibold py-3 text-base transition-all duration-200 shadow-md hover:shadow-lg rounded-lg"
            onClick={scrollToContact}
          >
            Get Quote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProductLayoutClient({ productsByCategory }: ProductLayoutClientProps) {
  const categories = Object.keys(productsByCategory);
  const [activeCategory, setActiveCategory] = useState<string>(categories[0] || '');

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products available at the moment.</p>
      </div>
    );
  }

  // Get category display info
  const getCategoryInfo = (slug: string) => {
    const products = productsByCategory[slug];
    if (!products || products.length === 0) return { name: slug, emoji: '📦' };

    const categoryName = products[0].category;
    let emoji = '📦';

    if (categoryName.toLowerCase().includes('cup')) emoji = '🥤';
    else if (categoryName.toLowerCase().includes('plate')) emoji = '🍽️';
    else if (categoryName.toLowerCase().includes('bowl')) emoji = '🥣';
    else if (categoryName.toLowerCase().includes('foil')) emoji = '📄';

    return { name: categoryName, emoji };
  };

  const activeProducts = productsByCategory[activeCategory] || [];

  return (
    <>
      {/* Category Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-white rounded-xl p-2 shadow-md border border-gray-200 overflow-x-auto">
          {categories.map((categorySlug) => {
            const { name, emoji } = getCategoryInfo(categorySlug);
            const count = productsByCategory[categorySlug].length;

            return (
              <button
                key={categorySlug}
                onClick={() => setActiveCategory(categorySlug)}
                className={`
                  px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap
                  ${activeCategory === categorySlug
                    ? 'bg-[var(--primary-light)] text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                <span className="text-lg">{emoji}</span>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{name}</span>
                  <span className="text-xs opacity-70">{count} items</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {activeProducts.map((product, index) => (
          <div
            key={product.id}
            className="animate-in fade-in-0 slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 100}ms`, animationDuration: '400ms' }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-[var(--primary-light)] to-[var(--primary-medium)] rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Need More Options?</h3>
        <p className="text-lg mb-6 opacity-90">
          Explore our complete catalog with hundreds of products and custom solutions
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-[var(--primary-dark)] hover:bg-gray-100 font-medium px-8 py-3"
          >
            View Full Catalog
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-[var(--primary-dark)] font-medium px-8 py-3 bg-transparent"
            onClick={scrollToContact}
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </>
  );
}