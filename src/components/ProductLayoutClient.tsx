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
  featuredProducts: ProductItem[];
}

// Product Card Component
function ProductCard({ product }: { product: ProductItem }) {
  const primaryImage = product.images.length > 0 ? product.images[0] : null;
  const imageUrl = primaryImage?.url || product.image || '/placeholder.jpg';

  return (
    <Card className="group relative overflow-hidden border-2 border-gray-100 hover:border-[var(--primary-light)] transition-all duration-300 hover:shadow-lg bg-white">
      {/* Featured Badge */}
      {product.isFeatured && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Featured
          </span>
        </div>
      )}

      <CardContent className="p-0">
        {/* Image Section */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-[var(--accent-cream)] overflow-hidden">
          <div className="absolute top-3 left-3 z-10">
            <span className="text-xs bg-white/90 text-[var(--primary-dark)] px-2 py-1 rounded-full font-medium border">
              ₹{product.salePrice}
            </span>
          </div>

          <div className="h-full flex items-center justify-center p-6 transition-transform duration-300 group-hover:scale-105">
            <Image
              src={imageUrl}
              alt={primaryImage?.altText || product.title}
              width={160}
              height={160}
              className="object-contain w-full h-full max-h-32"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-[var(--primary-dark)] mb-2 line-clamp-1">
            {product.title}
          </h3>
          {product.description && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {product.description}
            </p>
          )}

          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              Eco-friendly
            </span>
            <span className="text-xs font-medium text-[var(--primary-light)]">
              Available
            </span>
          </div>

          <Button
            className="w-full bg-[var(--primary-light)] hover:bg-[var(--primary-medium)] text-white font-medium transition-colors"
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

export default function ProductLayoutClient({ productsByCategory, featuredProducts }: ProductLayoutClientProps) {
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
        {activeProducts.slice(0, 6).map((product, index) => (
          <div
            key={product.id}
            className="animate-in fade-in-0 slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 100}ms`, animationDuration: '400ms' }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Show more products hint if there are more than 6 */}
      {activeProducts.length > 6 && (
        <div className="text-center mb-12">
          <p className="text-gray-600 mb-4">
            Showing {Math.min(6, activeProducts.length)} of {activeProducts.length} products in {getCategoryInfo(activeCategory).name}
          </p>
          <Button variant="outline" className="text-[var(--primary-light)] border-[var(--primary-light)] hover:bg-[var(--primary-light)] hover:text-white">
            View All {getCategoryInfo(activeCategory).name}
          </Button>
        </div>
      )}

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