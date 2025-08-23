import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { settings } = await request.json()

    if (!Array.isArray(settings)) {
      return NextResponse.json(
        { error: 'Settings must be an array' },
        { status: 400 }
      )
    }

    // Create default settings if they don't exist
    const createPromises = settings.map(async (setting: { key: string; value: string; description?: string; category?: string; type?: string }) => {
      return prisma.siteSetting.upsert({
        where: { key: setting.key },
        update: {}, // Don't update if exists
        create: {
          key: setting.key,
          value: setting.value,
          description: setting.description || null,
          category: setting.category || 'general',
          type: setting.type || 'text',
        },
      })
    })

    await Promise.all(createPromises)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error initializing site settings:', error)
    return NextResponse.json(
      { error: 'Failed to initialize site settings' },
      { status: 500 }
    )
  }
}