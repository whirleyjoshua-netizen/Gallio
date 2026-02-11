import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getUser } from '@/lib/auth'

const CODE_REGEX = /^[a-z0-9][a-z0-9-]{1,48}[a-z0-9]$/

// GET /api/share-links?displayId=xxx - List share links for a display
export async function GET(request: NextRequest) {
  const user = await getUser(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const displayId = request.nextUrl.searchParams.get('displayId')
  if (!displayId) {
    return NextResponse.json({ error: 'displayId is required' }, { status: 400 })
  }

  // Verify ownership
  const display = await db.display.findFirst({
    where: { id: displayId, userId: user.id },
  })
  if (!display) {
    return NextResponse.json({ error: 'Display not found' }, { status: 404 })
  }

  const links = await db.shareLink.findMany({
    where: { displayId },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(links)
}

// POST /api/share-links - Create a share link
export async function POST(request: NextRequest) {
  const user = await getUser(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { displayId, code, label } = await request.json()

    if (!displayId || !code) {
      return NextResponse.json({ error: 'displayId and code are required' }, { status: 400 })
    }

    // Validate code format
    const normalizedCode = code.toLowerCase().trim()
    if (!CODE_REGEX.test(normalizedCode)) {
      return NextResponse.json(
        { error: 'Code must be 3-50 characters, lowercase letters, numbers, and hyphens only' },
        { status: 400 }
      )
    }

    // Verify display ownership
    const display = await db.display.findFirst({
      where: { id: displayId, userId: user.id },
    })
    if (!display) {
      return NextResponse.json({ error: 'Display not found' }, { status: 404 })
    }

    // Check code uniqueness
    const existing = await db.shareLink.findUnique({
      where: { code: normalizedCode },
    })
    if (existing) {
      return NextResponse.json({ error: 'This code is already taken' }, { status: 409 })
    }

    const link = await db.shareLink.create({
      data: {
        code: normalizedCode,
        displayId,
        label: label || null,
      },
    })

    return NextResponse.json(link, { status: 201 })
  } catch (error) {
    console.error('Create share link error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
