import HeroSection from "@/components/HeroSection";
import ProductLayout from "@/components/ProductLayout";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import { prisma } from '@/lib/prisma';
 
async function getBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        isPublished: true
      },
      orderBy: {
        publishedAt: 'desc'
      },
      take: 3
    });
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

async function getHeroCarouselImages() {
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
    return carouselImages;
  } catch (error) {
    console.error('Error fetching hero carousel images:', error);
    return [];
  }
}

export default async function Home() {
  const [blogPosts, heroImages] = await Promise.all([
    getBlogPosts(),
    getHeroCarouselImages()
  ]);

  return (
    <>
      <HeroSection images={heroImages} />
      <ProductLayout />
      <BlogSection posts={blogPosts} />
      <ContactSection />
    </>
  );
}
