import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/displays/[id]/comments — public, no auth needed
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const comments = await db.comment.findMany({
      where: {
        displayId: id,
        approved: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    })

    return NextResponse.json(comments)
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
  }
}

// POST /api/displays/[id]/comments — public, visitors can post
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const body = await request.json()
    const { authorName, authorEmail, content } = body

    if (!content || content.trim().length === 0) {
      return NextResponse.json({ error: 'Comment cannot be empty' }, { status: 400 })
    }

    if (content.length > 2000) {
      return NextResponse.json({ error: 'Comment too long' }, { status: 400 })
    }

    // Verify display exists
    const display = await db.display.findUnique({
      where: { id: id },
    })

    if (!display) {
      return NextResponse.json({ error: 'Display not found' }, { status: 404 })
    }

    // Check if the comment element has moderation enabled
    // Parse sections to find comment element config
    let moderated = false
    try {
      const sections = typeof display.sections === 'string'
        ? JSON.parse(display.sections)
        : display.sections || []
      for (const section of sections) {
        for (const col of section.columns || []) {
          for (const el of col.elements || []) {
            if (el.type === 'comment' && el.commentModerated) {
              moderated = true
            }
          }
        }
      }
    } catch {
      // Ignore parse errors
    }

    const comment = await db.comment.create({
      data: {
        displayId: id,
        authorName: authorName?.trim() || 'Anonymous',
        authorEmail: authorEmail?.trim() || null,
        content: content.trim(),
        approved: !moderated,
      },
    })

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 })
  }
}
