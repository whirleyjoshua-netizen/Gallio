import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getUser } from '@/lib/auth'
import { slugify } from '@/lib/utils'

// GET /api/displays - List user's displays
export async function GET(request: NextRequest) {
  const user = await getUser(request)

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const displays = await db.display.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: 'desc' },
  })

  // Calculate element count from sections (and tabs if present)
  const displaysWithCounts = displays.map((display) => {
    let elementCount = 0

    const countSections = (secs: any[]) => {
      for (const section of secs) {
        for (const column of section.columns || []) {
          elementCount += (column.elements || []).length
        }
      }
    }

    // Count from tabs if present
    const tabsData = display.tabs
      ? (typeof display.tabs === 'string' ? JSON.parse(display.tabs as string) : display.tabs)
      : null

    if (tabsData?.enabled && tabsData.tabs) {
      for (const tab of tabsData.tabs) {
        countSections(tab.sections || [])
      }
    } else {
      const sections = typeof display.sections === 'string'
        ? JSON.parse(display.sections)
        : display.sections || []
      countSections(sections)
    }

    return {
      ...display,
      _count: { elements: elementCount },
    }
  })

  return NextResponse.json(displaysWithCounts)
}

// POST /api/displays - Create a new display
export async function POST(request: NextRequest) {
  const user = await getUser(request)

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { title, description } = await request.json()

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    // Generate unique slug
    let slug = slugify(title)
    let counter = 1

    while (true) {
      const existing = await db.display.findUnique({
        where: {
          userId_slug: { userId: user.id, slug },
        },
      })
      if (!existing) break
      slug = `${slugify(title)}-${counter}`
      counter++
    }

    const display = await db.display.create({
      data: {
        title,
        slug,
        description,
        userId: user.id,
        sections: [],
      },
    })

    return NextResponse.json(display, { status: 201 })
  } catch (error) {
    console.error('Create display error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
