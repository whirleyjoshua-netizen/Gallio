import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const user = await getUser(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const fullUser = await db.user.findUnique({
    where: { id: user.id },
    select: { dashboardPrefs: true },
  })

  return NextResponse.json(fullUser?.dashboardPrefs || {})
}

export async function PATCH(request: NextRequest) {
  const user = await getUser(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const prefs = await request.json()

  const updated = await db.user.update({
    where: { id: user.id },
    data: { dashboardPrefs: prefs },
    select: { dashboardPrefs: true },
  })

  return NextResponse.json(updated.dashboardPrefs)
}
