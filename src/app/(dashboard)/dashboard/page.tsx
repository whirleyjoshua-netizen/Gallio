'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, ExternalLink, Eye, MoreHorizontal, BarChart3, FileText } from 'lucide-react'
import { useAuthStore } from '@/lib/store'

interface Display {
  id: string
  title: string
  slug: string
  published: boolean
  views: number
  updatedAt: string
  _count: { elements: number }
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, token, logout } = useAuthStore()
  const [displays, setDisplays] = useState<Display[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      router.push('/login')
      return
    }

    fetchDisplays()
  }, [token, router])

  const fetchDisplays = async () => {
    try {
      const res = await fetch('/api/displays', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setDisplays(data)
      }
    } finally {
      setLoading(false)
    }
  }

  const createDisplay = () => {
    // Go directly to editor - it will create the page automatically
    router.push('/editor')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Pages
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/analytics"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </Link>
            <Link
              href="/responses"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
            >
              <FileText className="w-4 h-4" />
              Responses
            </Link>
            <span className="text-sm text-muted-foreground">
              {user?.username}
            </span>
            <button
              onClick={logout}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Your Displays</h1>
          <button
            onClick={createDisplay}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            New Page
          </button>
        </div>

        {displays.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">
              You haven&apos;t created any displays yet
            </p>
            <button
              onClick={createDisplay}
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition"
            >
              Create your first display
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {displays.map((display) => (
              <div
                key={display.id}
                className="border border-border rounded-lg p-4 hover:border-muted-foreground/50 transition"
              >
                <div className="flex items-start justify-between mb-2">
                  <Link
                    href={`/editor?id=${display.id}`}
                    className="font-medium hover:underline"
                  >
                    {display.title}
                  </Link>
                  <button className="p-1 hover:bg-muted rounded">
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{display._count.elements} elements</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {display.views}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      display.published
                        ? 'bg-green-100 text-green-700'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {display.published ? 'Published' : 'Draft'}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-4">
                  {display.published && (
                    <Link
                      href={`/${user?.username}/${display.slug}`}
                      className="flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View live
                    </Link>
                  )}
                  <Link
                    href={`/analytics?displayId=${display.id}`}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <BarChart3 className="w-3 h-3" />
                    Analytics
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
