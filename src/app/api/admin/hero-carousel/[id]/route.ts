import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()

    const carouselImage = await prisma.heroCarousel.update({
      where: { id: params.id },
      data: {
        name: data.name,
        imageUrl: data.imageUrl,
        sequence: data.sequence,
        isActive: data.isActive,
      }
    })

    return NextResponse.json(carouselImage)
  } catch (error) {
    console.error('Error updating carousel image:', error)
    return NextResponse.json(
      { error: 'Failed to update carousel image' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.heroCarousel.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Carousel image deleted successfully' })
  } catch (error) {
    console.error('Error deleting carousel image:', error)
    return NextResponse.json(
      { error: 'Failed to delete carousel image' },
      { status: 500 }
    )
  }
}