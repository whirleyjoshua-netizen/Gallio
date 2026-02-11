'use client'

import { useEffect } from 'react'
import { trackPageView } from '@/lib/analytics'

interface PageViewTrackerProps {
  displayId: string
}

export function PageViewTracker({ displayId }: PageViewTrackerProps) {
  useEffect(() => {
    // Track page view on mount
    trackPageView(displayId)
  }, [displayId])

  // This component renders nothing
  return null
}
