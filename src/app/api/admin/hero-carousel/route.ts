import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const carouselImages = await prisma.heroCarousel.findMany({
      orderBy: {
        sequence: 'asc'
      }
    })

    return NextResponse.json(carouselImages)
  } catch (error) {
    console.error('Error fetching carousel images:', error)
    return NextResponse.json(
      { error: 'Failed to fetch carousel images' },
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
        name: data.name,
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