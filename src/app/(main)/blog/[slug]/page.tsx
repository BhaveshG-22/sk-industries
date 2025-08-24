import Image from 'next/image'
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  featuredImage: string | null
  isPublished: boolean
  publishedAt: Date | null
  metaTitle: string | null
  metaDescription: string | null
  tags: string[]
  authorName: string | null
  authorEmail: string | null
  createdAt: Date
  updatedAt: Date
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug }
    })
    
    if (!post || !post.isPublished) {
      return null
    }
    
    return post
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const formatDate = (date: Date | null) => {
    if (!date) return ''
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }



  return (
    <div className="min-h-screen bg-[var(--cream-white)]">
      {/* Back Button */}
      <div className="bg-white border-b border-[var(--warm-tan)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="outline" asChild className="border-[var(--warm-tan)] text-[var(--dark-forest)] hover:bg-[var(--warm-tan)]">
            <Link href="/blogs" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Article Header */}
        <header className="mb-8">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="border-[var(--burnt-orange)] text-[var(--burnt-orange)]">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--dark-forest)] mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-[var(--olive-green)] mb-6 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--olive-green)] mb-8">
            {post.authorName && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.authorName}</span>
              </div>
            )}
            {post.publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="mb-8">
            <Image
              src={post.featuredImage}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg border border-[var(--warm-tan)]"
            />
          </div>
        )}

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none prose-headings:text-[var(--dark-forest)] prose-p:text-[var(--dark-forest)] prose-p:leading-relaxed prose-a:text-[var(--burnt-orange)] prose-a:no-underline hover:prose-a:underline prose-strong:text-[var(--dark-forest)] prose-ul:text-[var(--dark-forest)] prose-ol:text-[var(--dark-forest)]"
          dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
        />

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-[var(--warm-tan)]">
          <div className="flex items-center justify-between">
            <div className="text-sm text-[var(--olive-green)]">
              Last updated: {formatDate(post.updatedAt)}
            </div>
            <Button variant="outline" asChild className="border-[var(--burnt-orange)] text-[var(--burnt-orange)] hover:bg-[var(--burnt-orange)] hover:text-white">
              <Link href="/blogs">
                More Articles
              </Link>
            </Button>
          </div>
        </footer>
      </article>
    </div>
  )
}