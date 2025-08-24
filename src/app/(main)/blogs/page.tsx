import { Calendar, User, ArrowRight } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { BlogPost } from '@/types/shared'
import BlogImage from '@/components/BlogImage'

async function getBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        isPublished: true
      },
      orderBy: {
        publishedAt: 'desc'
      }
    })
    return posts
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export default async function BlogsPage() {
  const posts = await getBlogPosts()

  const formatDate = (date: Date | null) => {
    if (!date) return ''
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getFirstTag = (tags: string[]) => {
    return tags.length > 0 ? tags[0] : 'Article'
  }


  return (
    <div className="min-h-screen bg-[var(--cream-white)]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[var(--dark-forest)] to-[var(--olive-green)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--cream-white)] mb-4">
            Our Blog
          </h1>
          <p className="text-xl text-[var(--warm-tan)] max-w-3xl mx-auto">
            Stay informed with the latest insights, tips, and updates from our team
          </p>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-[var(--dark-forest)] mb-4">
              No Blog Posts Yet
            </h2>
            <p className="text-[var(--olive-green)] text-lg">
              We&apos;re working on creating great content for you. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="group overflow-hidden border-[var(--warm-tan)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {post.featuredImage ? (
                  <div className="aspect-video w-full overflow-hidden">
                    <Link href={`/blog/${post.slug}`} className="block">
                      <BlogImage
                        src={post.featuredImage}
                        alt={post.title}
                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-gradient-to-br from-[var(--warm-tan)] to-[var(--burnt-orange)] flex items-center justify-center">
                    <div className="text-center text-[var(--dark-forest)]">
                      <div className="text-4xl font-bold mb-2">GG</div>
                      <div className="text-sm">GAVALI GROUP</div>
                    </div>
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs border-[var(--burnt-orange)] text-[var(--burnt-orange)]">
                      {getFirstTag(post.tags)}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--dark-forest)] group-hover:text-[var(--burnt-orange)] transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                </CardHeader>
                
                <CardContent>
                  <p className="text-[var(--olive-green)] line-clamp-3">
                    {post.excerpt || post.content.substring(0, 150) + '...'}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-4 text-sm text-[var(--olive-green)]">
                    {post.authorName && (
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{post.authorName}</span>
                      </div>
                    )}
                    {post.publishedAt && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center text-[var(--burnt-orange)] hover:text-[var(--dark-forest)] transition-colors"
                  >
                    Read more
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}