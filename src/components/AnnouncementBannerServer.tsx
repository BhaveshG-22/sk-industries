import { prisma } from '@/lib/prisma'
import AnnouncementBannerClient from './AnnouncementBannerClient'

export default async function AnnouncementBanner() {
  // During build time, skip database calls
  if (process.env.NODE_ENV === 'development' || process.env.NEXT_PHASE === 'phase-production-build') {
    return null
  }

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

    // If no announcements, return null for better SEO (no empty div)
    if (!announcements.length) {
      return null
    }

    return <AnnouncementBannerClient initialAnnouncements={announcements} />
  } catch (error) {
    console.error('Error fetching announcements:', error)
    // Return null on error to prevent layout shift
    return null
  }
}