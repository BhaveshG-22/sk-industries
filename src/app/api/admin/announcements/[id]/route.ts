import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const data = await request.json()

    const announcement = await prisma.announcement.update({
      where: { id: resolvedParams.id },
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
    console.error('Error updating announcement:', error)
    return NextResponse.json(
      { error: 'Failed to update announcement' },
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
    await prisma.announcement.delete({
      where: { id: resolvedParams.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting announcement:', error)
    return NextResponse.json(
      { error: 'Failed to delete announcement' },
      { status: 500 }
    )
  }
}