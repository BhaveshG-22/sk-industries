import { prisma } from '@/lib/prisma';
import HeroCarousel from './HeroCarousel';

interface CarouselImage {
  id: string;
  imageUrl: string;
  sequence: number;
}

async function getCarouselImages(): Promise<CarouselImage[]> {
  try {
    const images = await prisma.heroCarousel.findMany({
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

    return images;
  } catch (error) {
    console.error('Error fetching carousel images:', error);
    return [];
  }
}

export default async function HeroSection() {
  const images = await getCarouselImages();
  
  return <HeroCarousel images={images} />;
}