import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const data = await request.json()
    const {
      title,
      slug,
      content,
      excerpt,
      featuredImage,
      isPublished,
      publishedAt,
      metaTitle,
      metaDescription,
      tags,
      authorName,
      authorEmail
    } = data
    const { id } = resolvedParams

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required' },
        { status: 400 }
      )
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        featuredImage: featuredImage || null,
        isPublished: Boolean(isPublished),
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        tags: tags || [],
        authorName: authorName || null,
        authorEmail: authorEmail || null,
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const { id } = resolvedParams

    await prisma.blogPost.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}