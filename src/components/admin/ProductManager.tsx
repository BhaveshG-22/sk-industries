"use client"

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff, Package, Tags, Upload, X, GripVertical } from 'lucide-react'
import Image from 'next/image'

interface Category {
  id: string
  name: string
  slug: string
}

interface Product {
  id: string
  title: string
  slug: string
  description: string | null
  originalPrice: number | null
  salePrice: number
  status: string
  image: string
  images: ProductImage[]
  badge: string | null
  sku: string | null
  stock: number
  showStockCount: boolean
  isActive: boolean
  isFeatured: boolean
  categoryId: string
  category: Category
  metaTitle: string | null
  metaDescription: string | null
  tags: string[]
  createdAt: string
}

interface ProductImage {
  id: string
  url: string
  altText?: string
  sequence: number
  isActive: boolean
}

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showCategoryForm, setShowCategoryForm] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    originalPrice: null as number | null,
    salePrice: 0,
    status: 'AVAILABLE',
    image: '',
    images: [] as string[],
    badge: '',
    sku: '',
    stock: 0,
    showStockCount: false,
    isActive: true,
    isFeatured: false,
    categoryId: '',
    metaTitle: '',
    metaDescription: '',
    tags: [] as string[]
  })

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    description: ''
  })
  
  const [productImages, setProductImages] = useState<ProductImage[]>([])
  const [uploadingImages, setUploadingImages] = useState(false)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title)
    })
  }

  const handleCategoryNameChange = (name: string) => {
    setCategoryForm({
      ...categoryForm,
      name,
      slug: generateSlug(name)
    })
  }

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryForm)
      })

      if (response.ok) {
        fetchCategories()
        setCategoryForm({ name: '', slug: '', description: '' })
        setShowCategoryForm(false)
      }
    } catch (error) {
      console.error('Error creating category:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const url = editingProduct 
      ? `/api/admin/products/${editingProduct.id}`
      : '/api/admin/products'
    
    const method = editingProduct ? 'PUT' : 'POST'
    
    const payload = {
      ...formData,
      originalPrice: formData.originalPrice || null,
      badge: formData.badge || null,
      sku: formData.sku || null,
      metaTitle: formData.metaTitle || null,
      metaDescription: formData.metaDescription || null,
      // Include productImages for database connection
      productImages: productImages.map(img => ({
        url: img.url,
        altText: img.altText || '',
        sequence: img.sequence,
        isActive: img.isActive
      }))
    }
    
    console.log('📤 Sending data:', payload)
    console.log('🖼️ Product images:', productImages)
    console.log('🔗 URL:', url, 'Method:', method)

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        console.log('✅ Product saved successfully')
        fetchProducts()
        resetForm()
      } else {
        const errorData = await response.text()
        console.error('❌ Server error:', response.status, response.statusText, errorData)
        alert(`Failed to save product: ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      console.error('❌ Network error saving product:', error)
      alert('Network error occurred while saving product')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchProducts()
      }
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    // Load existing product images into the image manager
    if (product.images && product.images.length > 0) {
      setProductImages(product.images)
    } else {
      setProductImages([])
    }
    
    setFormData({
      title: product.title,
      slug: product.slug,
      description: product.description || '',
      originalPrice: product.originalPrice,
      salePrice: product.salePrice,
      status: product.status,
      image: product.image,
      images: product.images?.map(img => img.url) || [],
      badge: product.badge || '',
      sku: product.sku || '',
      stock: product.stock,
      showStockCount: product.showStockCount || false,
      isActive: product.isActive,
      isFeatured: product.isFeatured,
      categoryId: product.categoryId,
      metaTitle: product.metaTitle || '',
      metaDescription: product.metaDescription || '',
      tags: product.tags
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingProduct(null)
    setProductImages([])
    setDraggedIndex(null)
    setFormData({
      title: '',
      slug: '',
      description: '',
      originalPrice: null,
      salePrice: 0,
      status: 'AVAILABLE',
      image: '',
      images: [],
      badge: '',
      sku: '',
      stock: 0,
      showStockCount: false,
      isActive: true,
      isFeatured: false,
      categoryId: '',
      metaTitle: '',
      metaDescription: '',
      tags: []
    })
  }

  const handleMultipleImageUpload = async (files: FileList) => {
    if (files.length === 0) return
    
    setUploadingImages(true)
    
    try {
      // Process each file individually with its own presigned URL
      const newImages: ProductImage[] = []
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        
        if (!file.type.startsWith('image/')) {
          console.warn(`${file.name} is not an image file, skipping`)
          continue
        }

        // Get individual pre-signed URL for each file
        const presignedResponse = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: file.name,
            fileType: file.type,
            uploadType: 'product-images'
          }),
        })

        if (!presignedResponse.ok) {
          const errorText = await presignedResponse.text()
          console.error('❌ Presigned URL error:', {
            status: presignedResponse.status,
            statusText: presignedResponse.statusText,
            error: errorText,
            fileName: file.name
          })
          throw new Error(`Failed to get upload URL for ${file.name}: ${presignedResponse.status} ${errorText}`)
        }

        const { uploadUrl, imageUrl } = await presignedResponse.json()

        // Upload to S3 with individual presigned URL
        const uploadResponse = await fetch(uploadUrl, {
          method: 'PUT',
          body: file,
          headers: { 'Content-Type': file.type },
        })

        if (!uploadResponse.ok) {
          throw new Error(`Failed to upload ${file.name}`)
        }

        const newImage: ProductImage = {
          id: `temp-${Date.now()}-${i}`,
          url: imageUrl,
          altText: file.name.replace(/\.[^/.]+$/, ''),
          sequence: productImages.length + i,
          isActive: true
        }
        
        newImages.push(newImage)
      }

      // Update productImages state
      const updatedImages = [...productImages, ...newImages]
      console.log('🖼️ Before update - existing images:', productImages.length, 'new images:', newImages.length)
      console.log('🖼️ After update - total images:', updatedImages.length)
      
      setProductImages(updatedImages)
      
      // Auto-set first image as primary image in formData
      if (updatedImages.length > 0) {
        setFormData(prev => ({ ...prev, image: updatedImages[0].url }))
      }
      
    } catch (error) {
      console.error('Upload error:', error)
      alert(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setUploadingImages(false)
    }
  }

  const handleRemoveImage = (imageId: string) => {
    setProductImages(prev => {
      const updated = prev.filter(img => img.id !== imageId)
      const resequenced = updated.map((img, index) => ({ ...img, sequence: index }))
      
      // Update primary image if the first image was removed
      if (resequenced.length > 0) {
        setFormData(current => ({ ...current, image: resequenced[0].url }))
      } else {
        setFormData(current => ({ ...current, image: '' }))
      }
      
      return resequenced
    })
  }

  const handleUpdateImageAltText = (imageId: string, altText: string) => {
    setProductImages(prev => 
      prev.map(img => img.id === imageId ? { ...img, altText } : img)
    )
  }

  const handleMoveImage = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return // No move needed
    
    setProductImages(prev => {
      // Ensure indices are valid
      if (fromIndex < 0 || fromIndex >= prev.length || toIndex < 0 || toIndex >= prev.length) {
        console.warn('Invalid drag indices:', { fromIndex, toIndex, length: prev.length })
        return prev
      }
      
      console.log('🔄 Moving image from', fromIndex, 'to', toIndex, 'Total images:', prev.length)
      
      const updated = [...prev]
      const [moved] = updated.splice(fromIndex, 1)
      updated.splice(toIndex, 0, moved)
      const resequenced = updated.map((img, index) => ({ ...img, sequence: index }))
      
      console.log('✅ Resequenced images:', resequenced.length, 'Primary will be:', resequenced[0]?.url?.slice(-20))
      
      // Update primary image if first position changed
      if (resequenced.length > 0) {
        setFormData(current => ({ ...current, image: resequenced[0].url }))
      }
      
      return resequenced
    })
  }

  const handleImportHardcodedData = async () => {
    if (!confirm('This will import all hardcoded products. Continue?')) return

    try {
      const response = await fetch('/api/admin/products/import', {
        method: 'POST'
      })

      if (response.ok) {
        fetchProducts()
        alert('Products imported successfully!')
      }
    } catch (error) {
      console.error('Error importing products:', error)
    }
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowCategoryForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Tags className="w-4 h-4" />
            Add Category
          </button>
          <button
            onClick={handleImportHardcodedData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Package className="w-4 h-4" />
            Import Hardcoded Data
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#BC6C25] text-white px-4 py-2 rounded-lg hover:bg-[#A55A1F] flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Category Form Modal */}
      {showCategoryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Add Category</h2>

            <form onSubmit={handleCategorySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={categoryForm.name}
                  onChange={(e) => handleCategoryNameChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BC6C25]"
                  placeholder="e.g., Personal Hygiene"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input
                  type="text"
                  required
                  value={categoryForm.slug}
                  onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BC6C25]"
                  placeholder="e.g., containers"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BC6C25]"
                  placeholder="Category description..."
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCategoryForm(false)
                    setCategoryForm({ name: '', slug: '', description: '' })
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? 'Edit' : 'Create'} Product
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BC6C25]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BC6C25]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BC6C25]"
                />
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price (₹)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.salePrice}
                    onChange={(e) => setFormData({ ...formData, salePrice: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BC6C25]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.originalPrice || ''}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value ? parseFloat(e.target.value) : null })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BC6C25]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock || ''}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BC6C25]"
                  />
                </div>
              </div>

              {/* Category & Details */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BC6C25]"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BC6C25]"
                  >
                    <option value="AVAILABLE">Available</option>
                    <option value="SOLD_OUT">Sold Out</option>
                    <option value="DISCONTINUED">Discontinued</option>
                    <option value="COMING_SOON">Coming Soon</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BC6C25]"
                  />
                </div>
              </div>

              {/* Badge Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="e.g., Sale, New, Best Seller"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BC6C25]"
                />
              </div>

              {/* Product Images */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Images
                  </label>
                  <span className="text-xs text-gray-500">
                    First image = Primary • Drag to reorder
                  </span>
                </div>

                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => e.target.files && handleMultipleImageUpload(e.target.files)}
                    className="hidden"
                    id="multiple-images-upload"
                    disabled={uploadingImages}
                  />
                  
                  <label
                    htmlFor="multiple-images-upload"
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    {uploadingImages ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <span className="text-sm text-gray-600">Uploading...</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-gray-400" />
                        <div className="text-sm text-gray-600">
                          <span className="font-medium text-blue-600">Click to upload</span>
                          {' '}or drag and drop
                        </div>
                        <div className="text-xs text-gray-400">
                          PNG, JPG, GIF (multiple files allowed)
                        </div>
                      </>
                    )}
                  </label>
                </div>

                {/* Images List */}
                {productImages.length > 0 && (
                  <div className="space-y-3">
                    {productImages
                      .sort((a, b) => a.sequence - b.sequence)
                      .map((image, index) => (
                        <div
                          key={image.id}
                          className={`flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm ${
                            draggedIndex === index ? 'opacity-50' : ''
                          }`}
                          draggable
                          onDragStart={(e) => {
                            e.stopPropagation()
                            setDraggedIndex(index)
                            e.dataTransfer.setData('text/plain', index.toString())
                            e.dataTransfer.effectAllowed = 'move'
                          }}
                          onDragEnd={() => {
                            setDraggedIndex(null)
                          }}
                          onDragOver={(e) => {
                            e.preventDefault()
                            e.dataTransfer.dropEffect = 'move'
                          }}
                          onDrop={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            const fromIndex = parseInt(e.dataTransfer.getData('text/plain'))
                            if (fromIndex !== index && !isNaN(fromIndex)) {
                              handleMoveImage(fromIndex, index)
                            }
                            setDraggedIndex(null)
                          }}
                        >
                          <div className="cursor-move text-gray-400 hover:text-gray-600">
                            <GripVertical className="h-5 w-5" />
                          </div>
                          
                          <div className="relative w-16 h-16 flex-shrink-0">
                            <Image
                              src={image.url}
                              alt={image.altText || 'Product image'}
                              fill
                              className="object-cover rounded"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <input
                              type="text"
                              placeholder="Alt text (optional)"
                              value={image.altText || ''}
                              onChange={(e) => handleUpdateImageAltText(image.id, e.target.value)}
                              className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              Position: {index + 1}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => window.open(image.url, '_blank')}
                              className="p-2 text-gray-400 hover:text-blue-600 rounded"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(image.id)}
                              className="p-2 text-gray-400 hover:text-red-600 rounded"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    
                    {productImages.length > 1 && (
                      <p className="text-xs text-gray-500 text-center">
                        These images will appear in the product gallery modal
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Toggles */}
              <div className="flex items-center space-x-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="mr-2"
                  />
                  Active
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="mr-2"
                  />
                  Featured
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.showStockCount}
                    onChange={(e) => setFormData({ ...formData, showStockCount: e.target.checked })}
                    className="mr-2"
                  />
                  Show Stock Count
                </label>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#BC6C25] text-white rounded-lg hover:bg-[#A55A1F]"
                >
                  {editingProduct ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {products.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No products found. Import hardcoded data or create your first product!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <Image className="h-12 w-12 rounded-lg object-cover" src={product.image || '/placeholder-image.jpg'} alt={product.title} width={48} height={48} />
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            {product.isActive ? (
                              <Eye className="w-4 h-4 text-green-500 mr-2" />
                            ) : (
                              <EyeOff className="w-4 h-4 text-gray-400 mr-2" />
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">{product.title}</div>
                              <div className="text-sm text-gray-500">SKU: {product.sku || 'N/A'}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.category.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ₹{product.salePrice}
                        {product.originalPrice && (
                          <span className="text-gray-500 line-through ml-2">₹{product.originalPrice}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        product.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' :
                        product.status === 'SOLD_OUT' ? 'bg-red-100 text-red-800' :
                        product.status === 'COMING_SOON' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}