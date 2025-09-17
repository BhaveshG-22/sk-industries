import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [
      announcements,
      products,
      categories,
      blogPosts,
      contactForms
    ] = await Promise.all([
      prisma.announcement.count(),
      prisma.product.count(),
      prisma.category.count(),
      prisma.blogPost.count(),
      prisma.contactSubmission.count()
    ])

    return NextResponse.json({
      announcements,
      products,
      categories,
      blogPosts,
      contactForms
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}