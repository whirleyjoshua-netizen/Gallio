'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface IframeCardRendererProps {
  url: string
  data: Record<string, any>
  style: 'default' | 'compact' | 'detailed'
  theme?: 'light' | 'dark'
}

const MIN_HEIGHT = 20
const MAX_HEIGHT = 2000
const LOAD_TIMEOUT = 10000

export function IframeCardRenderer({ url, data, style, theme = 'light' }: IframeCardRendererProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const readyRef = useRef(false)
  const pendingDataRef = useRef<Record<string, any> | null>(null)
  const [iframeHeight, setIframeHeight] = useState(100)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [retryKey, setRetryKey] = useState(0)
  const containerWidthRef = useRef(0)

  const sendInit = useCallback(() => {
    const iframe = iframeRef.current
    if (!iframe?.contentWindow) return

    iframe.contentWindow.postMessage({
      type: 'gallio:init',
      version: 1,
      data,
      style,
      theme,
      containerWidth: containerWidthRef.current,
    }, '*')
  }, [data, style, theme])

  // Listen for messages from iframe
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      // Only accept messages from our iframe
      if (!iframeRef.current || event.source !== iframeRef.current.contentWindow) return
      const msg = event.data
      if (!msg || typeof msg.type !== 'string') return

      if (msg.type === 'gallio:ready') {
        readyRef.current = true
        setError(false)
        sendInit()
      }

      if (msg.type === 'gallio:height' && typeof msg.height === 'number') {
        const clamped = Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, Math.ceil(msg.height)))
        setIframeHeight(clamped)
        setLoaded(true)
      }
    }

    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [sendInit])

  // Re-send data when props change
  useEffect(() => {
    if (readyRef.current) {
      sendInit()
    } else {
      pendingDataRef.current = data
    }
  }, [data, style, theme, sendInit])

  // Load timeout
  useEffect(() => {
    readyRef.current = false
    setLoaded(false)
    setError(false)

    const timeout = setTimeout(() => {
      if (!readyRef.current) {
        setError(true)
      }
    }, LOAD_TIMEOUT)

    return () => clearTimeout(timeout)
  }, [url, retryKey])

  // Track container width
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        containerWidthRef.current = Math.round(entry.contentRect.width)
      }
    })
    ro.observe(wrapper)
    return () => ro.disconnect()
  }, [])

  if (error) {
    return (
      <div className="p-6 rounded-xl border-2 border-dashed border-border bg-muted/30 text-center">
        <p className="text-sm text-muted-foreground mb-3">This card failed to load</p>
        <button
          onClick={() => setRetryKey(k => k + 1)}
          className="px-4 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div ref={wrapperRef} className="relative rounded-xl overflow-hidden">
      {/* Loading skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-muted/30 animate-pulse rounded-xl" />
      )}
      <iframe
        key={retryKey}
        ref={iframeRef}
        src={url}
        sandbox="allow-scripts"
        style={{
          width: '100%',
          height: `${iframeHeight}px`,
          border: 'none',
          display: 'block',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
        title="External card"
      />
    </div>
  )
}
