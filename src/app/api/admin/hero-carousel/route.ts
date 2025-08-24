import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log('Fetching hero carousel images...')
    
    // Use raw query to avoid Prisma schema issues with nullable name
    const carouselImages = await prisma.$queryRaw`
      SELECT id, "imageUrl", sequence, "isActive", "createdAt", "updatedAt"
      FROM hero_carousel 
      ORDER BY sequence ASC
    ` as any[]

    console.log('Found images:', carouselImages.length)

    // Add default name and format dates
    const imagesWithName = carouselImages.map((image, index) => ({
      id: image.id,
      name: `Image ${index + 1}`,
      imageUrl: image.imageUrl,
      sequence: image.sequence,
      isActive: image.isActive,
      createdAt: image.createdAt.toISOString(),
      updatedAt: image.updatedAt ? image.updatedAt.toISOString() : null
    }))

    return NextResponse.json(imagesWithName)
  } catch (error) {
    console.error('Detailed error fetching carousel images:', error)
    return NextResponse.json(
      { error: 'Failed to fetch carousel images', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Get the highest sequence number and add 1
    const maxSequence = await prisma.heroCarousel.findFirst({
      orderBy: { sequence: 'desc' },
      select: { sequence: true }
    })

    const carouselImage = await prisma.heroCarousel.create({
      data: {
        name: data.name || `Image ${(maxSequence?.sequence ?? 0) + 1}`,
        imageUrl: data.imageUrl,
        sequence: data.sequence ?? (maxSequence?.sequence ?? 0) + 1,
        isActive: data.isActive ?? true,
      }
    })

    return NextResponse.json(carouselImage)
  } catch (error) {
    console.error('Error creating carousel image:', error)
    return NextResponse.json(
      { error: 'Failed to create carousel image' },
      { status: 500 }
    )
  }
}