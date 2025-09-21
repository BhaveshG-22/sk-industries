import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import ProductLayoutClient from "./ProductLayoutClient";

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

interface ProductLayoutProps {
  className?: string;
}

// Function to fetch products from database
async function getProducts() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: {
      category: true,
      images: {
        where: { isActive: true },
        orderBy: { sequence: 'asc' }
      }
    },
    orderBy: [
      { isFeatured: 'desc' },
      { createdAt: 'desc' }
    ]
  });

  return products.map(product => ({
    id: product.id,
    title: product.title,
    salePrice: Number(product.salePrice),
    description: product.description,
    image: product.image,
    images: product.images,
    category: product.category.name,
    categorySlug: product.category.slug,
    isFeatured: product.isFeatured
  }));
}

export default async function ProductLayout({ className = "" }: ProductLayoutProps) {
  const allProducts = await getProducts();

  // Group products by category for the client component
  const productsByCategory = allProducts.reduce((acc, product) => {
    const categorySlug = product.categorySlug;
    if (!acc[categorySlug]) {
      acc[categorySlug] = [];
    }
    acc[categorySlug].push(product);
    return acc;
  }, {} as Record<string, ProductItem[]>);

  // Get featured products from each category (max 6 products total)
  const featuredProducts = Object.entries(productsByCategory)
    .flatMap(([_, products]) => products.filter(p => p.isFeatured).slice(0, 2))
    .slice(0, 6);

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-dark)] mb-4">
            Our Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium collection of eco-friendly paper products designed for every occasion
          </p>
        </div>

        <ProductLayoutClient productsByCategory={productsByCategory} featuredProducts={featuredProducts} />
      </div>
    </section>
  );
}