import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()

    const product = await prisma.product.update({
      where: { id: params.id },
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

    // Handle ProductImages update
    if (data.productImages) {
      // Delete existing images for this product
      await prisma.productImage.deleteMany({
        where: { productId: params.id }
      })

      // Create new images if provided
      if (data.productImages.length > 0) {
        await prisma.productImage.createMany({
          data: data.productImages.map((img: any) => ({
            productId: params.id,
            url: img.url,
            altText: img.altText,
            sequence: img.sequence,
            isActive: img.isActive
          }))
        })
      }
    }

    // Fetch the complete updated product with images
    const productWithImages = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        images: {
          orderBy: { sequence: 'asc' }
        }
      }
    })

    return NextResponse.json(productWithImages)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}