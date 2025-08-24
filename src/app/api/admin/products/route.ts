import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        variants: true,
        images: {
          orderBy: { sequence: 'asc' }
        }
      },
      orderBy: [
        { isFeatured: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    console.log('📤 Creating product with data:', {
      title: data.title,
      hasImage: !!data.image,
      imageCount: data.productImages?.length || 0
    })

    const product = await prisma.product.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        originalPrice: data.originalPrice,
        salePrice: data.salePrice,
        status: data.status,
        image: data.image || null,
        badge: data.badge,
        sku: data.sku,
        stock: data.stock,
        showStockCount: data.showStockCount,
        isActive: data.isActive,
        isFeatured: data.isFeatured,
        categoryId: data.categoryId,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        tags: data.tags || [],
      },
      include: {
        category: true,
        images: true
      }
    })
    
    console.log('✅ Product created successfully:', product.id)

    // Create ProductImage records if provided
    if (data.productImages && data.productImages.length > 0) {
      await prisma.productImage.createMany({
        data: data.productImages.map((img: { url: string; altText?: string; sequence: number; isActive: boolean }) => ({
          productId: product.id,
          url: img.url,
          altText: img.altText,
          sequence: img.sequence,
          isActive: img.isActive
        }))
      })
    }

    // Fetch the complete product with images
    const productWithImages = await prisma.product.findUnique({
      where: { id: product.id },
      include: {
        category: true,
        images: {
          orderBy: { sequence: 'asc' }
        }
      }
    })

    return NextResponse.json(productWithImages)
  } catch (error) {
    console.error('❌ Error creating product:', error)
    console.error('❌ Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    })
    return NextResponse.json(
      { 
        error: 'Failed to create product',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}