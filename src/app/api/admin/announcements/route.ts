import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json(announcements)
  } catch (error) {
    console.error('Error fetching announcements:', error)
    return NextResponse.json(
      { error: 'Failed to fetch announcements' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const announcement = await prisma.announcement.create({
      data: {
        title: data.title,
        message: data.message,
        type: data.type,
        status: data.status,
        isVisible: data.isVisible,
        priority: data.priority,
        backgroundColor: data.backgroundColor,
        textColor: data.textColor,
        isScrolling: data.isScrolling,
        showCloseButton: data.showCloseButton,
        autoHide: data.autoHide,
        autoHideDelay: data.autoHideDelay,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        linkUrl: data.linkUrl,
        linkText: data.linkText,
      }
    })

    return NextResponse.json(announcement)
  } catch (error) {
    console.error('Error creating announcement:', error)
    return NextResponse.json(
      { error: 'Failed to create announcement' },
      { status: 500 }
    )
  }
}