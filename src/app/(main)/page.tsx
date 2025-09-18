import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import { prisma } from '@/lib/prisma';

async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true
      },
      include: {
        products: {
          where: {
            isActive: true
          },
          include: {
            images: {
              where: {
                isActive: true
              },
              orderBy: {
                sequence: 'asc'
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
    // Transform Prisma types to match our interface
    return categories.map(category => ({
      ...category,
      products: category.products.map(product => ({
        ...product,
        originalPrice: product.originalPrice ? Number(product.originalPrice) : null,
        salePrice: Number(product.salePrice),
      }))
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
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


export default async function Home() {
  const [categories, blogPosts] = await Promise.all([
    getCategories(),
    getBlogPosts(),
  ]);

  return (
    <>
      <HeroSection />
      <CategorySection />
      <BlogSection posts={blogPosts} />
      <ContactSection />
    </>
  );
}
