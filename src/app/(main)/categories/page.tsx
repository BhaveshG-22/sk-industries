"use client"

import { useState, useEffect } from 'react'
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ProductPreviewModal from "@/components/ProductPreviewModal"
import { Package, Tag } from 'lucide-react'
import { CategoryProduct, Category } from '@/types/shared'

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<CategoryProduct | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      } else {
        console.error('Failed to fetch categories')
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePreviewClick = (product: CategoryProduct) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const filteredCategories = selectedCategory === 'all' 
    ? categories 
    : categories.filter(cat => cat.slug === selectedCategory)

  const allProducts = categories.flatMap(cat => cat.products)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--burnt-orange)]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--cream-white)]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[var(--dark-forest)] to-[var(--olive-green)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--cream-white)] mb-4">
            Our Product Categories
          </h1>
          <p className="text-xl text-[var(--warm-tan)] max-w-3xl mx-auto">
            Explore our comprehensive range of quality products across different categories
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[var(--burnt-orange)] text-white'
                : 'bg-white text-[var(--dark-forest)] border border-[var(--warm-tan)] hover:bg-[var(--warm-tan)]'
            }`}
          >
            All Categories ({allProducts.length} products)
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.slug)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedCategory === category.slug
                  ? 'bg-[var(--burnt-orange)] text-white'
                  : 'bg-white text-[var(--dark-forest)] border border-[var(--warm-tan)] hover:bg-[var(--warm-tan)]'
              }`}
            >
              {category.name} ({category.products.length})
            </button>
          ))}
        </div>

        {/* Categories Display */}
        <div className="space-y-16">
          {filteredCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-[var(--olive-green)] to-[var(--burnt-orange)] p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                      <Tag className="w-8 h-8" />
                      {category.name}
                    </h2>
                    {category.description && (
                      <p className="text-[var(--warm-tan)] text-lg">{category.description}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-white">
                      <Package className="w-5 h-5" />
                      <span className="text-2xl font-bold">{category.products.length}</span>
                    </div>
                    <p className="text-[var(--warm-tan)] text-sm">Products</p>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {category.products.length > 0 ? (
                <div className="p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {category.products.map((product) => (
                      <Card key={product.id} className="group relative overflow-hidden border-[var(--warm-tan)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-0 h-full flex flex-col">
                          {/* Product Image */}
                          <div className="relative bg-[var(--cream-white)] p-6 h-64 flex items-center justify-center">
                            {product.badge && (
                              <div className="absolute top-3 right-3 z-10">
                                <span className="bg-[var(--olive-green)] text-[var(--cream-white)] text-xs font-bold px-2 py-1 rounded-full">
                                  {product.badge}
                                </span>
                              </div>
                            )}
                            <Image
                              src={product.image || "https://via.placeholder.com/300x300?text=Product+Image"}
                              alt={product.title}
                              fill
                              className="object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          {/* Product Info */}
                          <div className="p-4 flex flex-col flex-1">
                            <h3 className="text-sm font-medium text-[var(--dark-forest)] mb-2 line-clamp-2 min-h-[2.5rem]">
                              {product.title}
                            </h3>
                            
                            {/* Price */}
                            <div className="mb-4 flex-1">
                              {product.status === "SOLD_OUT" ? (
                                <span className="text-[var(--burnt-orange)] font-semibold text-sm">
                                  Sold Out
                                </span>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <span className="text-lg font-bold text-[var(--dark-forest)]">
                                    Rs. {product.salePrice}
                                  </span>
                                  {product.originalPrice && (
                                    <span className="text-sm text-[var(--olive-green)] line-through">
                                      Rs. {product.originalPrice}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Action Button */}
                            <Button 
                              className={`w-full mt-auto ${
                                product.status === "SOLD_OUT"
                                  ? "bg-[var(--olive-green)] opacity-50 cursor-not-allowed"
                                  : "bg-[var(--burnt-orange)] hover:bg-[var(--dark-forest)]"
                              }`}
                              disabled={product.status === "SOLD_OUT"}
                              onClick={() => product.status === "AVAILABLE" && handlePreviewClick(product)}
                            >
                              {product.status === "SOLD_OUT" ? "SOLD OUT" : "PREVIEW"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-16 text-center text-[var(--olive-green)]">
                  <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No products available in this category yet.</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {categories.length === 0 && (
          <div className="text-center py-16">
            <Tag className="w-24 h-24 mx-auto mb-6 text-[var(--olive-green)] opacity-50" />
            <h2 className="text-2xl font-bold text-[var(--dark-forest)] mb-4">
              No Categories Available
            </h2>
            <p className="text-[var(--olive-green)] text-lg">
              Categories will be displayed here once they are added.
            </p>
          </div>
        )}
      </div>

      {/* Product Preview Modal */}
      <ProductPreviewModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </div>
  )
}