'use client'

import React, { useState, useCallback } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void
  currentImage?: string
  className?: string
  uploadType?: 'products' | 'blog-images'
}

export function ImageUpload({ onImageUpload, currentImage, className = '', uploadType = 'blog-images' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const [dragOver, setDragOver] = useState(false)

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    setUploading(true)
    
    try {
      // Step 1: Get pre-signed URL
      console.log('Getting presigned URL for:', { fileName: file.name, fileType: file.type, uploadType })
      const presignedResponse = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          uploadType: uploadType,
        }),
      })

      if (!presignedResponse.ok) {
        const errorText = await presignedResponse.text()
        console.error('Failed to get upload URL:', { status: presignedResponse.status, statusText: presignedResponse.statusText, body: errorText })
        throw new Error(`Failed to get upload URL: ${presignedResponse.status} ${presignedResponse.statusText}`)
      }

      const uploadData = await presignedResponse.json()
      console.log('Received upload data:', uploadData)
      const { uploadUrl, imageUrl } = uploadData

      // Step 2: Upload file directly to S3 using pre-signed URL
      console.log('Uploading to S3:', { uploadUrl, fileSize: file.size, fileType: file.type })
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      })

      console.log('S3 response:', { status: uploadResponse.status, statusText: uploadResponse.statusText })
      if (!uploadResponse.ok) {
        const s3ErrorText = await uploadResponse.text()
        console.error('S3 upload failed:', { status: uploadResponse.status, statusText: uploadResponse.statusText, body: s3ErrorText })
        throw new Error(`Failed to upload file to S3: ${uploadResponse.status} ${uploadResponse.statusText}`)
      }

      // Step 3: Set the public URL for the image
      setPreview(imageUrl)
      onImageUpload(imageUrl)
    } catch (error) {
      console.error('Upload error:', error)
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.error('Network error - possible CORS or connectivity issue')
        alert('Network error: Unable to connect to upload service. Please check your internet connection and try again.')
      } else if (error instanceof Error) {
        alert(`Failed to upload image: ${error.message}`)
      } else {
        alert('Failed to upload image. Please try again.')
      }
    } finally {
      setUploading(false)
    }
  }, [uploadType, onImageUpload])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragOver(false)
    
    const file = event.dataTransfer.files[0]
    if (file) {
      handleFileUpload(file)
    }
  }, [handleFileUpload])

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragOver(false)
  }, [])

  const clearImage = () => {
    setPreview(null)
    onImageUpload('')
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        Product Image
      </label>
      
      {preview ? (
        <div className="relative">
          <Image
            src={preview}
            alt="Preview"
            width={400}
            height={192}
            className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
          />
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            disabled={uploading}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center transition-colors
            ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
            ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400 cursor-pointer'}
          `}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="image-upload"
            disabled={uploading}
          />
          
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex flex-col items-center space-y-2"
          >
            {uploading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-sm text-gray-600">Uploading...</span>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                  {dragOver ? (
                    <Upload className="h-6 w-6 text-blue-600" />
                  ) : (
                    <ImageIcon className="h-6 w-6 text-gray-400" />
                  )}
                </div>
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
      )}
    </div>
  )
}