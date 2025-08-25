"use client"

import { useState, useEffect, useRef } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff, Upload, GripVertical } from 'lucide-react'
import Image from 'next/image'

interface CarouselImage {
  id: string
  name?: string | null
  imageUrl: string
  sequence: number
  isActive: boolean
  createdAt: string
  updatedAt: string | null
}

export default function HeroCarouselManager() {
  const [images, setImages] = useState<CarouselImage[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingImage, setEditingImage] = useState<CarouselImage | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [draggedImage, setDraggedImage] = useState<CarouselImage | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    sequence: 1,
    isActive: true
  })

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/admin/hero-carousel')
      if (response.ok) {
        const data = await response.json()
        setImages(data)
      }
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true)
    
    try {
      // Get presigned URL
      const presignedResponse = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          uploadType: 'hero-carousel'
        }),
      })

      if (!presignedResponse.ok) {
        throw new Error('Failed to get upload URL')
      }

      const { uploadUrl, imageUrl } = await presignedResponse.json()

      // Upload to S3
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type },
      })

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image')
      }

      // Update form data with the uploaded image URL
      setFormData(prev => ({ ...prev, imageUrl }))
      
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image. Please try again.')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      alert('Please enter an image name')
      return
    }
    
    if (!formData.imageUrl) {
      alert('Please upload an image or enter an image URL')
      return
    }
    
    const url = editingImage 
      ? `/api/admin/hero-carousel/${editingImage.id}`
      : '/api/admin/hero-carousel'
    
    const method = editingImage ? 'PUT' : 'POST'

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        fetchImages()
        resetForm()
      } else {
        const errorData = await response.json()
        alert(`Error: ${errorData.error || 'Failed to save image'}`)
      }
    } catch (error) {
      console.error('Error saving image:', error)
      alert('Failed to save image. Please try again.')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      const response = await fetch(`/api/admin/hero-carousel/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchImages()
      }
    } catch (error) {
      console.error('Error deleting image:', error)
    }
  }

  const handleEdit = (image: CarouselImage) => {
    setEditingImage(image)
    setFormData({
      name: image.name || '',
      imageUrl: image.imageUrl,
      sequence: image.sequence,
      isActive: image.isActive
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      imageUrl: '',
      sequence: Math.max(...images.map(img => img.sequence), 0) + 1,
      isActive: true
    })
    setEditingImage(null)
    setShowForm(false)
  }

  const toggleStatus = async (image: CarouselImage) => {
    try {
      const response = await fetch(`/api/admin/hero-carousel/${image.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...image,
          isActive: !image.isActive
        })
      })

      if (response.ok) {
        fetchImages()
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleDragStart = (e: React.DragEvent, image: CarouselImage) => {
    setDraggedImage(image)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverIndex(index)
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    setDragOverIndex(null)

    if (!draggedImage) return

    const sortedImages = [...images].sort((a, b) => a.sequence - b.sequence)
    const dragIndex = sortedImages.findIndex(img => img.id === draggedImage.id)

    if (dragIndex === dropIndex) {
      setDraggedImage(null)
      return
    }

    // Create new order
    const newImages = [...sortedImages]
    const [removed] = newImages.splice(dragIndex, 1)
    newImages.splice(dropIndex, 0, removed)

    // Update sequences
    try {
      const updatePromises = newImages.map((img, index) =>
        fetch(`/api/admin/hero-carousel/${img.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...img, sequence: index + 1 })
        })
      )

      await Promise.all(updatePromises)
      fetchImages()
    } catch (error) {
      console.error('Error reordering images:', error)
    }

    setDraggedImage(null)
  }

  const handleDragEnd = () => {
    setDraggedImage(null)
    setDragOverIndex(null)
  }

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Homepage Slideshow</h1>
          <p className="text-gray-600 text-sm mt-1">
            Drag and drop rows to reorder slideshow images
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          Add Image
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingImage ? 'Edit Image' : 'Add New Image'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Image Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
                placeholder="Enter image name (e.g., Hero Image 1)"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Upload Image *
              </label>
              
              {/* File Upload Area */}
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  const file = e.dataTransfer.files[0]
                  if (file && file.type.startsWith('image/')) {
                    handleImageUpload(file)
                  }
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                  className="hidden"
                  id="image-upload"
                  disabled={uploadingImage}
                />
                
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  {uploadingImage ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span className="text-sm text-gray-600">Uploading...</span>
                    </div>
                  ) : formData.imageUrl ? (
                    <div className="flex flex-col items-center space-y-2">
                      <div className="relative w-32 h-20 rounded overflow-hidden">
                        <Image
                          src={formData.imageUrl}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm text-green-600">Image uploaded successfully</span>
                      <span className="text-xs text-gray-500">Click to change image</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-gray-400" />
                      <div className="text-sm text-gray-600">
                        <span className="font-medium text-blue-600">Click to upload</span>
                        {' '}or drag and drop
                      </div>
                      <div className="text-xs text-gray-400">
                        PNG, JPG, GIF up to 10MB
                      </div>
                    </>
                  )}
                </label>
              </div>

              {/* Manual URL input as fallback */}
              <div className="mt-4">
                <label className="block text-xs text-gray-500 mb-1">
                  Or enter image URL manually (optional)
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full p-2 border rounded-lg text-sm"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Sequence
              </label>
              <input
                type="number"
                value={formData.sequence}
                onChange={(e) => setFormData({ ...formData, sequence: parseInt(e.target.value) })}
                className="w-full p-2 border rounded-lg"
                min="1"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="isActive" className="text-sm font-medium">
                Active
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex-1 sm:flex-none"
              >
                {editingImage ? 'Update' : 'Add'} Image
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex-1 sm:flex-none"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preview
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Image URL
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sequence
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {images.sort((a, b) => a.sequence - b.sequence).map((image, index) => (
                <tr 
                  key={image.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, image)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`transition-all duration-200 ${
                    draggedImage?.id === image.id 
                      ? 'opacity-50 bg-blue-50' 
                      : dragOverIndex === index 
                      ? 'bg-blue-100 border-t-2 border-blue-400' 
                      : 'hover:bg-gray-50'
                  } cursor-move`}
                >
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <GripVertical className="w-4 h-4 text-gray-400 hover:text-gray-600 flex-shrink-0" />
                      <div className="relative w-12 h-8 sm:w-16 sm:h-10 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={image.imageUrl}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {image.name || `Image ${image.sequence}`}
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 hidden sm:table-cell">
                    <div className="text-sm text-gray-900 truncate max-w-xs">
                      {image.imageUrl}
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {image.sequence}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleStatus(image)}
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                        image.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {image.isActive ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                      {image.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-1 sm:gap-2">
                      <button
                        onClick={() => handleEdit(image)}
                        className="text-blue-600 hover:text-blue-700 p-1"
                        title="Edit image"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(image.id)}
                        className="text-red-600 hover:text-red-700 p-1"
                        title="Delete image"
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

        {images.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>No slideshow images found. Add your first image to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}