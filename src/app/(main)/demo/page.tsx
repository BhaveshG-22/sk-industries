import HeroSection from "@/components/HeroSection";
import FeaturedProductsDB from "@/components/demo/FeaturedProductsDB";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import { prisma } from '@/lib/prisma';


async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        isFeatured: true
      },
      include: {
        images: {
          where: {
            isActive: true
          },
          orderBy: {
            sequence: 'asc'
          }
        },
        category: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
    
    // Transform Prisma types to match our interface
    return products.map(product => ({
      ...product,
      originalPrice: product.originalPrice ? Number(product.originalPrice) : null,
      salePrice: Number(product.salePrice),
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

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

export default async function DemoPage() {
  const [products, blogPosts] = await Promise.all([
    getProducts(),
    getBlogPosts()
  ]);

  return (
    <>
      <HeroSection />
      <FeaturedProductsDB products={products} />
      <BlogSection posts={blogPosts} />
      <ContactSection />
    </>
  );
}