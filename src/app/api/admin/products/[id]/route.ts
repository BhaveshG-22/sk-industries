import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidateProductPages } from '@/lib/revalidate'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()

    await prisma.product.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        originalPrice: data.originalPrice,
        salePrice: data.salePrice,
        status: data.status,
        image: data.image || null,
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
        where: { productId: id }
      })

      // Create new images if provided
      if (data.productImages.length > 0) {
        await prisma.productImage.createMany({
          data: data.productImages.map((img: { url: string; altText?: string; sequence: number; isActive: boolean }) => ({
            productId: id,
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
      where: { id },
      include: {
        category: true,
        images: {
          orderBy: { sequence: 'asc' }
        }
      }
    })

    // Revalidate pages that display products
    revalidateProductPages()

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
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.product.delete({
      where: { id }
    })

    // Revalidate pages that display products
    revalidateProductPages()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}