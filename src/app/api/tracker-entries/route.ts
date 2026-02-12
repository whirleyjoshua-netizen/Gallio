import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getUser } from '@/lib/auth'

// GET /api/tracker-entries?displayId=X&trackerId=Y&from=DATE&to=DATE
export async function GET(request: NextRequest) {
  const user = await getUser(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const displayId = searchParams.get('displayId')
  const trackerId = searchParams.get('trackerId')

  if (!displayId || !trackerId) {
    return NextResponse.json({ error: 'displayId and trackerId are required' }, { status: 400 })
  }

  // Verify ownership
  const display = await db.display.findFirst({
    where: { id: displayId, userId: user.id },
    select: { id: true },
  })
  if (!display) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const from = searchParams.get('from')
  const to = searchParams.get('to')

  const where: any = { displayId, trackerId }
  if (from || to) {
    where.recordedAt = {}
    if (from) where.recordedAt.gte = new Date(from)
    if (to) where.recordedAt.lte = new Date(to)
  }

  const entries = await db.trackerEntry.findMany({
    where,
    orderBy: { recordedAt: 'asc' },
  })

  return NextResponse.json(entries)
}

// POST /api/tracker-entries
export async function POST(request: NextRequest) {
  const user = await getUser(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { displayId, trackerId, category, value, recordedAt, note } = await request.json()

    if (!displayId || !trackerId || !category || !value) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify ownership
    const display = await db.display.findFirst({
      where: { id: displayId, userId: user.id },
      select: { id: true },
    })
    if (!display) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const entry = await db.trackerEntry.create({
      data: {
        displayId,
        trackerId,
        category,
        value,
        recordedAt: new Date(recordedAt || Date.now()),
        note: note || null,
      },
    })

    return NextResponse.json(entry, { status: 201 })
  } catch (error) {
    console.error('Create tracker entry error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
