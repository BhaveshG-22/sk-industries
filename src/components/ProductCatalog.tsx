"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ProductItem {
  id: string;
  title: string;
  description: string;
  size: string;
  imageUrl: string;
}

interface ProductCatalogProps {
  className?: string;
}

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
      {/* Size Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className="inline-block rounded-full bg-gradient-to-r from-red-600 to-amber-800 px-3 py-1.5 text-xs font-bold text-white">
          {product.size}
        </span>
      </div>

      {/* Image section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-amber-50 p-6">
        {/* Glow effect */}
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

      {/* Content section */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="mb-1.5 text-lg font-semibold tracking-tight text-gray-900">
            {product.title} - {product.size}
          </h3>
          <p className="text-sm text-gray-600">
            {product.description}
          </p>
        </div>

        {/* Action button */}
        <div className="mt-auto">
          <Button
            className="w-full bg-red-600 text-white transition-all duration-200 hover:bg-gray-600 hover:shadow-lg active:scale-95"
            style={{
              backgroundColor: '#dc2626',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#4b5563';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#dc2626';
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


export default function ProductCatalog({ className = "" }: ProductCatalogProps) {

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 py-12 ${className}`}>
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Product Range</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our comprehensive collection of eco-friendly paper products designed for every occasion and serving size.
        </p>
      </div>

      {/* Small Sizes Main Category */}
      <div className="mb-24">
        <SectionHeader title="Small Sizes" />
        
        {/* Simple product grid */}
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
          {sampleProducts.small.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Custom Solutions CTA */}
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