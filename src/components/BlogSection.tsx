"use client"

import { useState, useEffect } from 'react'
import { ArrowRight, Calendar, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  featuredImage: string | null
  isPublished: boolean
  publishedAt: string | null
  metaTitle: string | null
  metaDescription: string | null
  tags: string[]
  authorName: string | null
  authorEmail: string | null
  createdAt: string
  updatedAt: string
}

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch('/api/blog')
      if (response.ok) {
        const data = await response.json()
        // Only show first 3 published posts
        const publishedPosts = data.filter((post: BlogPost) => post.isPublished).slice(0, 3)
        setPosts(publishedPosts)
      } else {
        console.error('Failed to fetch blog posts')
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getFirstTag = (tags: string[]) => {
    return tags.length > 0 ? tags[0] : 'Article'
  }

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-200 rounded-lg h-80"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Don't render the section if no posts are available
  if (posts.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-6 bg-[var(--warm-tan)] text-[var(--dark-forest)]">
            Latest Updates
          </Badge>
          <h2 className="text-3xl font-bold text-[var(--dark-forest)] mb-4 md:text-4xl lg:text-5xl">
            From Our Blog
          </h2>
          <p className="text-lg text-[var(--olive-green)] max-w-2xl mx-auto mb-8">
            Stay informed with the latest insights, tips, and updates from our team of experts.
          </p>
          <Button variant="link" className="text-[var(--burnt-orange)] hover:text-[var(--dark-forest)]" asChild>
            <Link href="/blogs">
              View all articles
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="group overflow-hidden border-[var(--warm-tan)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {post.featuredImage ? (
                <div className="aspect-video w-full overflow-hidden">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/400x225/DDA15E/283618?text=Blog+Image"
                      }}
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
                <h3 className="text-lg font-semibold text-[var(--dark-forest)] group-hover:text-[var(--burnt-orange)] transition-colors md:text-xl line-clamp-2">
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
                      <span>{formatDate(post.publishedAt)}</span>
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
      </div>
    </section>
  )
}