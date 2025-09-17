"use client"

import { useState } from 'react'

interface Product {
  id: string
  title: string
  description: string | null
  image: string | null
  badge: string | null
  salePrice: number
  category: {
    name: string
    slug: string
  }
}

interface ProductShowcaseProps {
  categories: Array<{
    id: string
    name: string
    slug: string
    products: Product[]
  }>
}

export default function ProductShowcase({ categories }: ProductShowcaseProps) {
  // Group products by main product type
  const productGroups = {
    cups: categories.filter(cat => 
      cat.name.toLowerCase().includes('cup') || 
      cat.name.toLowerCase().includes('size')
    ).flatMap(cat => cat.products.filter(p => p.title.toLowerCase().includes('cup'))),
    
    plates: categories.filter(cat => 
      cat.name.toLowerCase().includes('plate')
    ).flatMap(cat => cat.products.filter(p => p.title.toLowerCase().includes('plate'))),
    
    bowls: categories.filter(cat => 
      cat.name.toLowerCase().includes('bowl')
    ).flatMap(cat => cat.products.filter(p => p.title.toLowerCase().includes('bowl')))
  }

  const [activeTab, setActiveTab] = useState('cups')


  const tabs = [
    { id: 'cups', label: 'Paper Cups', icon: '🥤', count: productGroups.cups.length },
    { id: 'plates', label: 'Paper Plates', icon: '🍽️', count: productGroups.plates.length },
    { id: 'bowls', label: 'Paper Bowls', icon: '🥣', count: productGroups.bowls.length }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--cream-white)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--dark-forest)] mb-4">
            Our Product Range
          </h2>
          <p className="text-lg text-[var(--olive-green)] max-w-2xl mx-auto">
            Premium quality disposable paper products for all your needs
          </p>
        </div>

        {/* Product Tabs */}
        <div className="w-full">
          {/* Tab Navigation */}
          <div className="sticky top-0 z-[60] left-0 right-0 bg-white backdrop-blur-md shadow-sm mb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-center h-16 lg:h-18">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all flex-1 sm:flex-none sm:mx-1 ${
                      activeTab === tab.id
                        ? 'bg-[var(--dark-red)] text-white shadow-md'
                        : 'text-[var(--olive-green)] hover:bg-[var(--light-gray)] hover:text-[var(--dark-forest)]'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="text-sm sm:text-base">
                      <span className="sm:hidden">{tab.label.replace('Paper ', '')}</span>
                      <span className="hidden sm:inline">{tab.label}</span>
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activeTab === tab.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-[var(--soft-gray)] text-[var(--olive-green)]'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>


          {/* Product Grid with Size Categories */}
          <div>
            {(() => {
              const currentProducts = productGroups[activeTab as keyof typeof productGroups];
              
              // Group products by size
              let sizeGroups: Array<{ name: string; products: Product[] }> = [];
              
              if (activeTab === 'cups') {
                const smallCups = currentProducts.filter(p => {
                  const ml = parseInt(p.title.match(/(\d+)\s*ml/)?.[1] || '0');
                  return ml <= 110;
                });
                const mediumCups = currentProducts.filter(p => {
                  const ml = parseInt(p.title.match(/(\d+)\s*ml/)?.[1] || '0');
                  return ml >= 150 && ml <= 200;
                });
                const largeCups = currentProducts.filter(p => {
                  const ml = parseInt(p.title.match(/(\d+)\s*ml/)?.[1] || '0');
                  return ml >= 250;
                });
                
                sizeGroups = [
                  { name: "Small Cups", products: smallCups },
                  { name: "Medium Cups", products: mediumCups },
                  { name: "Large Cups", products: largeCups }
                ].filter(group => group.products.length > 0);
              } else if (activeTab === 'plates') {
                const roundPlates = currentProducts.filter(p => 
                  p.title.toLowerCase().includes('round')
                );
                const squarePlates = currentProducts.filter(p => 
                  p.title.toLowerCase().includes('square')
                );
                
                sizeGroups = [
                  { name: "Round Plates", products: roundPlates },
                  { name: "Square Plates", products: squarePlates }
                ].filter(group => group.products.length > 0);
              } else if (activeTab === 'bowls') {
                const smallBowls = currentProducts.filter(p => {
                  const ml = parseInt(p.title.match(/(\d+)\s*ml/)?.[1] || '0');
                  return ml <= 200;
                });
                const largeBowls = currentProducts.filter(p => {
                  const ml = parseInt(p.title.match(/(\d+)\s*ml/)?.[1] || '0');
                  return ml > 200;
                });
                
                sizeGroups = [
                  { name: "Small Bowls", products: smallBowls },
                  { name: "Large Bowls", products: largeBowls }
                ].filter(group => group.products.length > 0);
              }
              
              // If no size groups, show all products
              if (sizeGroups.length === 0) {
                sizeGroups = [{ name: "", products: currentProducts }];
              }
              
              return sizeGroups.map((sizeGroup, groupIndex) => (
                <div key={groupIndex} className="mb-12">
                  {/* Size Category Header */}
                  {sizeGroup.name && (
                    <div className="mb-6">
                      <h3 className="text-2xl font-semibold text-gray-900 border-b-2 border-red-600 inline-block pb-1">
                        {sizeGroup.name}
                      </h3>
                    </div>
                  )}
                  
                  {/* Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sizeGroup.products.map((product: Product) => (
                    <div 
                      key={product.id} 
                      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[var(--soft-gray)]/20"
                    >
                      <div className="aspect-square bg-[var(--light-gray)] relative overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={product.image || '/images/placeholder.txt'} 
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute top-3 right-3">
                          <span className="bg-[var(--dark-red)] text-white px-3 py-1 rounded-full text-sm font-medium">
                            {product.badge || 'N/A'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-semibold text-[var(--dark-forest)]">
                            {product.title}
                          </h4>
                        </div>
                        
                        <p className="text-xs text-[var(--olive-green)] mb-3 leading-relaxed">
                          {product.description || 'Premium quality paper product'}
                        </p>
                        
                        <button className="w-full bg-[var(--warm-tan)] text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-[var(--burnt-orange)] transition-colors">
                          Get Quote
                        </button>
                      </div>
                    </div>
                    ))}
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-[var(--soft-gray)]/20 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-[var(--dark-forest)] mb-3">
              Need Custom Solutions?
            </h3>
            <p className="text-[var(--olive-green)] mb-6">
              We offer customized products and bulk orders for businesses of all sizes
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/contact"
                className="bg-[var(--dark-red)] text-white px-8 py-3 rounded-lg font-medium hover:bg-[var(--burnt-orange)] transition-colors"
              >
                Contact Us for Bulk Orders
              </a>
              <a
                href="/categories"
                className="border-2 border-[var(--dark-red)] text-[var(--dark-red)] px-8 py-3 rounded-lg font-medium hover:bg-[var(--dark-red)] hover:text-white transition-colors"
              >
                View All Products
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}