import HeroCarousel from './HeroCarousel';

interface CarouselImage {
  id: string;
  imageUrl: string;
  sequence: number;
}

interface HeroSectionProps {
  images: CarouselImage[];
}

export default function HeroSection({ images }: HeroSectionProps) {
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 md:h-96 lg:h-[32rem] xl:h-[36rem] bg-gray-100 flex items-center justify-center">
        <div className="text-gray-400">No images available</div>
      </div>
    );
  }
  
  return <HeroCarousel images={images} />;
}