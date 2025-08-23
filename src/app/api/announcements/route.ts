import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({
      where: {
        AND: [
          { status: 'ACTIVE' },
          { isVisible: true },
          {
            OR: [
              { startDate: null },
              { startDate: { lte: new Date() } }
            ]
          },
          {
            OR: [
              { endDate: null },
              { endDate: { gte: new Date() } }
            ]
          }
        ]
      },
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' }
      ],
      select: {
        id: true,
        title: true,
        message: true,
        type: true,
        priority: true,
        backgroundColor: true,
        textColor: true,
        iconName: true,
        isScrolling: true,
        showCloseButton: true,
        autoHide: true,
        autoHideDelay: true,
        linkUrl: true,
        linkText: true
      }
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