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
      <div className="w-full h-[160px] xs:h-[180px] sm:h-[280px] md:h-[320px] lg:h-[420px] xl:h-[520px] 2xl:h-[600px] bg-gray-100 flex items-center justify-center">
        <div className="text-gray-400">No images available</div>
      </div>
    );
  }
  
  return <HeroCarousel images={images} />;
}