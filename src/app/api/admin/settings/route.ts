import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany({
      orderBy: [
        { category: 'asc' },
        { key: 'asc' }
      ]
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch site settings' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { settings } = await request.json()

    if (!Array.isArray(settings)) {
      return NextResponse.json(
        { error: 'Settings must be an array' },
        { status: 400 }
      )
    }

    // Use transaction for better reliability
    const result = await prisma.$transaction(async (tx) => {
      const updatePromises = settings.map(async (setting: { key: string; value: string; description?: string; category?: string; type?: string }) => {
        return tx.siteSetting.upsert({
          where: { key: setting.key },
          update: { 
            value: setting.value,
            updatedAt: new Date()
          },
          create: {
            key: setting.key,
            value: setting.value,
            description: setting.description || null,
            category: setting.category || 'general',
            type: setting.type || 'text',
          },
        })
      })
      
      return await Promise.all(updatePromises)
    }, {
      timeout: 30000, // 30 second timeout
    })

    return NextResponse.json({ success: true, updated: result.length })
  } catch (error: unknown) {
    console.error('Error updating site settings:', error)
    
    // Check if it's a connection error
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P1001') {
      return NextResponse.json(
        { error: 'Database connection failed. Please check your database connection and try again.' },
        { status: 503 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to update site settings' },
      { status: 500 }
    )
  }
}