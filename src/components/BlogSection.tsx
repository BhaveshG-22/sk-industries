"use client"

import { ArrowRight, Calendar, User } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import Link from 'next/link'
import { BlogPost } from "@/types/shared";

interface BlogSectionProps {
  posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {

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
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      width={400}
                      height={225}
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>
              ) : (
                <div className="aspect-video w-full bg-gradient-to-br from-[var(--warm-tan)] to-[var(--burnt-orange)] flex items-center justify-center">
                  <div className="text-center text-[var(--dark-forest)]">
                    <div className="text-4xl font-bold mb-2">GG</div>
                    <div className="text-sm">SK INDUSTRIES</div>
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
                      <span>{formatDate(post.publishedAt?.toISOString() || post.createdAt.toISOString())}</span>
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