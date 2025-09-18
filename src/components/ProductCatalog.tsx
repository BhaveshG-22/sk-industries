"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

interface ProductItem {
  id: string;
  title: string;
  description: string;
  size: string;
  imageUrl: string;
  category: 'cups' | 'plates' | 'bowls';
  subCategory?: string;
}

interface ProductCatalogProps {
  className?: string;
}

// New product data structure for tabbed layout
const productData = {
  cups: {
    small: [
      {
        id: 'cup-s-1',
        title: '55ml Paper Cup',
        description: 'Perfect for espresso and small servings',
        size: '55 ml',
        imageUrl: '/images/placeholder.txt',
        category: 'cups' as const,
        subCategory: 'small'
      },
      {
        id: 'cup-s-2',
        title: '100ml Paper Cup',
        description: 'Ideal for coffee shots and samples',
        size: '100 ml',
        imageUrl: '/images/placeholder.txt',
        category: 'cups' as const,
        subCategory: 'small'
      },
    ],
    medium: [
      {
        id: 'cup-m-1',
        title: '200ml Paper Cup',
        description: 'Standard coffee cup size',
        size: '200 ml',
        imageUrl: '/images/placeholder.txt',
        category: 'cups' as const,
        subCategory: 'medium'
      },
      {
        id: 'cup-m-2',
        title: '300ml Paper Cup',
        description: 'Large coffee or tea serving',
        size: '300 ml',
        imageUrl: '/images/placeholder.txt',
        category: 'cups' as const,
        subCategory: 'medium'
      },
    ],
    large: [
      {
        id: 'cup-l-1',
        title: '400ml Paper Cup',
        description: 'Extra large for beverages',
        size: '400 ml',
        imageUrl: '/images/placeholder.txt',
        category: 'cups' as const,
        subCategory: 'large'
      },
      {
        id: 'cup-l-2',
        title: '500ml Paper Cup',
        description: 'Maximum capacity cup',
        size: '500 ml',
        imageUrl: '/images/placeholder.txt',
        category: 'cups' as const,
        subCategory: 'large'
      },
    ]
  },
  plates: {
    round: [
      {
        id: 'plate-r-1',
        title: '6" Round Plate',
        description: 'Perfect for desserts and appetizers',
        size: '6 inch',
        imageUrl: '/images/placeholder.txt',
        category: 'plates' as const,
        subCategory: 'round'
      },
      {
        id: 'plate-r-2',
        title: '8" Round Plate',
        description: 'Standard dinner plate size',
        size: '8 inch',
        imageUrl: '/images/placeholder.txt',
        category: 'plates' as const,
        subCategory: 'round'
      },
      {
        id: 'plate-r-3',
        title: '10" Round Plate',
        description: 'Large serving plate',
        size: '10 inch',
        imageUrl: '/images/placeholder.txt',
        category: 'plates' as const,
        subCategory: 'round'
      },
    ],
    square: [
      {
        id: 'plate-s-1',
        title: '6" Square Plate',
        description: 'Modern square design for appetizers',
        size: '6 inch',
        imageUrl: '/images/placeholder.txt',
        category: 'plates' as const,
        subCategory: 'square'
      },
      {
        id: 'plate-s-2',
        title: '8" Square Plate',
        description: 'Contemporary dinner plate',
        size: '8 inch',
        imageUrl: '/images/placeholder.txt',
        category: 'plates' as const,
        subCategory: 'square'
      },
    ]
  },
  bowls: [
    {
      id: 'bowl-1',
      title: '150ml Paper Bowl',
      description: 'Small serving bowl for snacks',
      size: '150 ml',
      imageUrl: '/images/placeholder.txt',
      category: 'bowls' as const
    },
    {
      id: 'bowl-2',
      title: '200ml Paper Bowl',
      description: 'Medium bowl for soups and cereals',
      size: '200 ml',
      imageUrl: '/images/placeholder.txt',
      category: 'bowls' as const
    },
    {
      id: 'bowl-3',
      title: '300ml Paper Bowl',
      description: 'Large bowl for generous servings',
      size: '300 ml',
      imageUrl: '/images/placeholder.txt',
      category: 'bowls' as const
    },
    {
      id: 'bowl-4',
      title: '400ml Paper Bowl',
      description: 'Extra large family size bowl',
      size: '400 ml',
      imageUrl: '/images/placeholder.txt',
      category: 'bowls' as const
    }
  ]
};

// New Product Card Component
function NewProductCard({ product }: { product: ProductItem }) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-[var(--primary-light)]/20 hover:border-[var(--primary-light)] bg-white overflow-hidden">
      <CardContent className="p-0">
        {/* Image Section */}
        <div className="relative aspect-square bg-gradient-to-br from-[var(--accent-cream)] to-[#F8F9FA] overflow-hidden flex items-center justify-center">
          <div className="absolute top-3 right-3 z-10">
            <span className="text-xs bg-[var(--primary-light)]/20 text-[var(--primary-light)] px-2 py-1 rounded-full font-medium">
              {product.size}
            </span>
          </div>
          
          <div className="transition-transform duration-500 group-hover:scale-110 p-6">
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={160}
              height={160}
              className="object-contain w-full h-full max-h-32"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-[var(--primary-dark)] mb-1 line-clamp-1">
              {product.title}
            </h3>
            <p className="text-sm text-[var(--primary-medium)] line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--primary-medium)]">
              Eco-friendly | Durable
            </span>
            <div className="text-xs bg-[var(--accent-cream)] text-[var(--primary-dark)] px-2 py-1 rounded">
              Available
            </div>
          </div>

          <Button 
            className="w-full bg-[var(--primary-light)] hover:bg-[var(--primary-medium)] text-white font-medium py-2 transition-colors"
            size="sm"
          >
            Get Quote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Section Header Component
function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-8">
      <h3 className="text-2xl font-bold text-[var(--primary-dark)] mb-2">
        {title}
      </h3>
      {subtitle && (
        <p className="text-[var(--primary-medium)] text-sm">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default function ProductCatalog({ className = "" }: ProductCatalogProps) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 py-12 ${className}`}>
      {/* Hero Section */}
      <div className="text-center mb-12 bg-gradient-to-r from-[var(--accent-cream)] to-[#F4F3EE] rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-[var(--primary-dark)] mb-4">
          Our Product Catalog
        </h1>
        <p className="text-lg text-[var(--primary-medium)] max-w-3xl mx-auto">
          Explore our wide range of eco-friendly paper cups, plates, and bowls. 
          Quality products designed for every occasion and serving need.
        </p>
      </div>

      {/* Tabbed Navigation */}
      <Tabs defaultValue="cups" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-[var(--accent-cream)] border border-[var(--primary-light)]">
          <TabsTrigger 
            value="cups" 
            className="data-[state=active]:bg-[var(--primary-light)] data-[state=active]:text-white text-[var(--primary-dark)] font-medium"
          >
            🥤 Paper Cups
          </TabsTrigger>
          <TabsTrigger 
            value="plates"
            className="data-[state=active]:bg-[var(--primary-light)] data-[state=active]:text-white text-[var(--primary-dark)] font-medium"
          >
            🍽️ Paper Plates
          </TabsTrigger>
          <TabsTrigger 
            value="bowls"
            className="data-[state=active]:bg-[var(--primary-light)] data-[state=active]:text-white text-[var(--primary-dark)] font-medium"
          >
            🥣 Paper Bowls
          </TabsTrigger>
        </TabsList>

        {/* Paper Cups Tab */}
        <TabsContent value="cups" className="space-y-12">
          {/* Small Cups */}
          <div>
            <SectionHeader 
              title="Small Cups" 
              subtitle="Perfect for espresso, samples, and small servings (55ml - 150ml)"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productData.cups.small.map((product) => (
                <NewProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Medium Cups */}
          <div>
            <SectionHeader 
              title="Medium Cups" 
              subtitle="Standard coffee and tea servings (200ml - 350ml)"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productData.cups.medium.map((product) => (
                <NewProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Large Cups */}
          <div>
            <SectionHeader 
              title="Large Cups" 
              subtitle="Extra large beverages and bulk servings (400ml - 500ml)"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productData.cups.large.map((product) => (
                <NewProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Paper Plates Tab */}
        <TabsContent value="plates" className="space-y-12">
          {/* Round Plates */}
          <div>
            <SectionHeader 
              title="Round Plates" 
              subtitle="Classic circular plates for traditional dining"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productData.plates.round.map((product) => (
                <NewProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Square Plates */}
          <div>
            <SectionHeader 
              title="Square Plates" 
              subtitle="Modern square design for contemporary presentation"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productData.plates.square.map((product) => (
                <NewProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Paper Bowls Tab */}
        <TabsContent value="bowls" className="space-y-8">
          <div>
            <SectionHeader 
              title="Paper Bowls" 
              subtitle="Various sizes for soups, cereals, snacks, and more"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productData.bowls.map((product) => (
                <NewProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Call-to-Action Section */}
      <section className="mt-16 text-center bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary-medium)] rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Get in touch with us for bulk orders, custom designs, and competitive pricing. 
          We're here to help with all your paper product needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-[var(--primary-dark)] px-8 py-3 text-lg hover:bg-[var(--accent-cream)] font-medium"
          >
            Get Quote
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white px-8 py-3 text-lg hover:bg-white hover:text-[var(--primary-dark)] font-medium"
          >
            Contact Us
          </Button>
        </div>
      </section>

      {/* Filter/Sort Feature Placeholder (for future) */}
      {/* 
      <div className="mb-8 flex flex-wrap gap-4 justify-center">
        <Button variant="outline" size="sm">All Sizes</Button>
        <Button variant="outline" size="sm">Small</Button>
        <Button variant="outline" size="sm">Medium</Button>
        <Button variant="outline" size="sm">Large</Button>
      </div>
      */}
    </div>
  );
}

/* 
===========================================
COMMENTED OUT - ORIGINAL LAYOUT
===========================================

const sampleProducts = {
  small: [
    {
      id: '1',
      title: 'Paper Cup',
      description: 'Small serving option',
      size: '250 ml',
      imageUrl: '/images/placeholder.txt'
    },
    {
      id: '2',
      title: 'Paper Bowl',
      description: 'Compact size for snacks',
      size: '150 ml',
      imageUrl: '/images/placeholder.txt'
    },
    {
      id: '3',
      title: 'Paper Plate',
      description: 'Perfect for appetizers',
      size: '6 inch',
      imageUrl: '/images/placeholder.txt'
    },
    {
      id: '4',
      title: 'Paper Container',
      description: 'Small portion container',
      size: '200 ml',
      imageUrl: '/images/placeholder.txt'
    }
  ],
  medium: [
    {
      id: '5',
      title: 'Paper Cup',
      description: 'Standard serving size',
      size: '350 ml',
      imageUrl: '/images/placeholder.txt'
    },
    {
      id: '6',
      title: 'Paper Bowl',
      description: 'Medium serving bowl',
      size: '250 ml',
      imageUrl: '/images/placeholder.txt'
    },
    {
      id: '7',
      title: 'Paper Plate',
      description: 'Regular dinner plate',
      size: '8 inch',
      imageUrl: '/images/placeholder.txt'
    },
    {
      id: '8',
      title: 'Paper Container',
      description: 'Medium portion container',
      size: '400 ml',
      imageUrl: '/images/placeholder.txt'
    }
  ],
  large: [
    {
      id: '9',
      title: 'Paper Cup',
      description: 'Large serving option',
      size: '500 ml',
      imageUrl: '/images/placeholder.txt'
    },
    {
      id: '10',
      title: 'Paper Bowl',
      description: 'Large family size',
      size: '400 ml',
      imageUrl: '/images/placeholder.txt'
    },
    {
      id: '11',
      title: 'Paper Plate',
      description: 'Extra large serving plate',
      size: '10 inch',
      imageUrl: '/images/placeholder.txt'
    },
    {
      id: '12',
      title: 'Paper Container',
      description: 'Large portion container',
      size: '600 ml',
      imageUrl: '/images/placeholder.txt'
    }
  ]
};

function ProductCard({ product }: { product: ProductItem }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="absolute top-3 right-3 z-10">
        <span className="inline-block rounded-full bg-gradient-to-r from-red-600 to-amber-800 px-3 py-1.5 text-xs font-bold text-white">
          {product.size}
        </span>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-amber-50 p-6">
        <div className="absolute -bottom-10 left-1/2 h-32 w-32 -translate-x-1/2 transform rounded-full bg-amber-500/20 blur-3xl"></div>
        
        <div className="transition-transform duration-500 group-hover:scale-105">
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={200}
            height={150}
            className="rounded-lg object-contain h-[150px] mx-auto"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="mb-1.5 text-lg font-semibold tracking-tight text-gray-900">
            {product.title} - {product.size}
          </h3>
          <p className="text-sm text-gray-600">
            {product.description}
          </p>
        </div>

        <div className="mt-auto">
          <Button
            className="w-full bg-red-600 text-white transition-all duration-200 hover:bg-gray-600 hover:shadow-lg active:scale-95"
            style={{
              backgroundColor: 'var(--primary-light)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--primary-dark)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--primary-light)';
            }}
          >
            Get Quote
          </Button>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-bold text-gray-900 border-b-2 border-red-600 inline-block pb-1">
        {title}
      </h2>
    </div>
  );
}

// ORIGINAL LAYOUT COMPONENT:
export default function ProductCatalog({ className = "" }: ProductCatalogProps) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 py-12 ${className}`}>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Product Range</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our comprehensive collection of eco-friendly paper products designed for every occasion and serving size.
        </p>
      </div>

      <div className="mb-24">
        <SectionHeader title="Small Sizes" />
        
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
          {sampleProducts.small.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <section className="mt-24 text-center bg-gradient-to-br from-gray-50 to-amber-50 rounded-2xl p-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Custom Solutions?</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          We offer customized products and bulk orders for businesses of all sizes. Get in touch to discuss your specific requirements.
        </p>
        <Button
          size="lg"
          className="bg-gradient-to-r from-red-600 to-amber-800 text-white px-8 py-3 text-lg transition-all hover:from-red-700 hover:to-amber-900"
        >
          Contact Us
        </Button>
      </section>
    </div>
  );
}

*/