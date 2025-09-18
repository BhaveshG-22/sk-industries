import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    
    const products = await prisma.product.findMany({
      where: {
        AND: [
          { isActive: true },
          category ? { category: { slug: category } } : {}
        ]
      },
      include: {
        category: true,
        images: {
          where: { isActive: true },
          orderBy: { sequence: 'asc' }
        }
      },
      orderBy: [
        { isFeatured: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    // Transform to match your existing interface
    const transformedProducts = products.map(product => ({
      id: product.id,
      title: product.title,
      originalPrice: product.originalPrice,
      salePrice: product.salePrice,
      status: product.status === 'SOLD_OUT' ? 'sold_out' : 'available',
      image: product.image,
      images: product.images,
      badge: product.badge,
      category: product.category.name,
      categorySlug: product.category.slug,
      description: product.description
    }))

    return NextResponse.json(transformedProducts)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}