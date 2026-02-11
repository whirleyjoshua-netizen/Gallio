import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/share-links/check?code=xxx - Check if a code is available
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')?.toLowerCase().trim()

  if (!code) {
    return NextResponse.json({ error: 'code is required' }, { status: 400 })
  }

  const existing = await db.shareLink.findUnique({
    where: { code },
  })

  if (existing) {
    // Suggest alternative
    let suggestion = `${code}-1`
    let counter = 1
    while (true) {
      const check = await db.shareLink.findUnique({
        where: { code: suggestion },
      })
      if (!check) break
      counter++
      suggestion = `${code}-${counter}`
    }

    return NextResponse.json({ available: false, suggestion })
  }

  return NextResponse.json({ available: true })
}
