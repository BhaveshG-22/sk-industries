import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import CategoryTabs from "./CategoryTabs";

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

interface CategorySectionProps {
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
    badge: product.badge
  }));
}


export default async function CategorySection({ className = "" }: CategorySectionProps) {
  const allProducts = await getProducts();
  
  // Group products by category
  const productsByCategory = allProducts.reduce((acc, product) => {
    const categorySlug = product.categorySlug;
    if (!acc[categorySlug]) {
      acc[categorySlug] = [];
    }
    acc[categorySlug].push(product);
    return acc;
  }, {} as Record<string, ProductItem[]>);

  
  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-yellow-50/30 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our Product Catalog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore our wide range of eco-friendly paper products. 
            Quality products designed for every occasion and serving need.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-800 mx-auto rounded-full"></div>
        </div>

        {/* Product Categories */}
        <CategoryTabs productsByCategory={productsByCategory} />

        {/* Call-to-Action Section */}
        <div className="mt-20 text-center bg-[var(--primary-light)] rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Get in touch with us for bulk orders, custom designs, and competitive pricing. 
            We&apos;re here to help with all your paper product needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-red-800 px-8 py-3 text-lg hover:bg-yellow-50 font-medium transition-colors"
            >
              Get Quote Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white px-8 py-3 text-lg hover:bg-white hover:text-red-800 font-medium transition-colors bg-transparent"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}