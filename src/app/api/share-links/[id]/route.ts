import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getUser } from '@/lib/auth'

interface Params {
  params: Promise<{ id: string }>
}

// PATCH /api/share-links/[id] - Update a share link
export async function PATCH(request: NextRequest, { params }: Params) {
  const user = await getUser(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  // Find link and verify ownership
  const link = await db.shareLink.findUnique({
    where: { id },
    include: { display: { select: { userId: true } } },
  })

  if (!link || link.display.userId !== user.id) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  try {
    const { isActive, label } = await request.json()

    const updated = await db.shareLink.update({
      where: { id },
      data: {
        ...(typeof isActive === 'boolean' ? { isActive } : {}),
        ...(typeof label === 'string' ? { label } : {}),
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Update share link error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/share-links/[id] - Delete a share link
export async function DELETE(request: NextRequest, { params }: Params) {
  const user = await getUser(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  // Find link and verify ownership
  const link = await db.shareLink.findUnique({
    where: { id },
    include: { display: { select: { userId: true } } },
  })

  if (!link || link.display.userId !== user.id) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  await db.shareLink.delete({ where: { id } })

  return NextResponse.json({ success: true })
}
