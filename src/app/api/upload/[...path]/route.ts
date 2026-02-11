import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const UPLOAD_DIR = path.join(process.cwd(), 'uploads')

const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathSegments } = await params

    if (!pathSegments || pathSegments.length < 2) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 })
    }

    // Sanitize path to prevent directory traversal
    const sanitizedPath = pathSegments.map((segment) =>
      segment.replace(/[^a-zA-Z0-9._-]/g, '')
    )

    const filepath = path.join(UPLOAD_DIR, ...sanitizedPath)

    // Ensure the path is within the upload directory
    const realUploadDir = path.resolve(UPLOAD_DIR)
    const realFilepath = path.resolve(filepath)

    if (!realFilepath.startsWith(realUploadDir)) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 403 })
    }

    // Check if file exists
    if (!existsSync(filepath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    // Read file
    const buffer = await readFile(filepath)

    // Determine content type
    const ext = path.extname(filepath).toLowerCase()
    const contentType = MIME_TYPES[ext] || 'application/octet-stream'

    // Return file with caching headers
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('File serve error:', error)
    return NextResponse.json({ error: 'Failed to serve file' }, { status: 500 })
  }
}
