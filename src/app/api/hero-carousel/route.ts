import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const carouselImages = await prisma.heroCarousel.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        sequence: 'asc',
      },
      select: {
        id: true,
        imageUrl: true,
        sequence: true,
      },
    });

    return NextResponse.json(carouselImages);
  } catch (error) {
    console.error('Error fetching hero carousel images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch carousel images' },
      { status: 500 }
    );
  }
}