// Client-side analytics tracking

// Generate or retrieve session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return ''

  let sessionId = sessionStorage.getItem('pages_session_id')
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem('pages_session_id', sessionId)
  }
  return sessionId
}

// Track a page view
export async function trackPageView(displayId: string): Promise<void> {
  try {
    const sessionId = getSessionId()

    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        displayId,
        eventType: 'view',
        sessionId,
      }),
    })
  } catch (error) {
    // Silently fail - analytics should not break the page
    console.error('Analytics tracking failed:', error)
  }
}

// Track a custom event (click, scroll, etc.)
export async function trackEvent(
  displayId: string,
  eventType: string,
  metadata?: Record<string, unknown>
): Promise<void> {
  try {
    const sessionId = getSessionId()

    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        displayId,
        eventType,
        sessionId,
        metadata,
      }),
    })
  } catch (error) {
    console.error('Analytics tracking failed:', error)
  }
}
