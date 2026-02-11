'use client'

import { useState } from 'react'
import { X, Play, Link } from 'lucide-react'

interface EmbedElementProps {
  url: string
  embedType: 'youtube' | 'vimeo' | 'twitter' | 'other'
  onChange: (updates: { url?: string; embedType?: string }) => void
  onDelete: () => void
  isSelected: boolean
  onSelect: () => void
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  )
  return match ? match[1] : null
}

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/)
  return match ? match[1] : null
}

function detectEmbedType(url: string): 'youtube' | 'vimeo' | 'twitter' | 'other' {
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube'
  if (url.includes('vimeo.com')) return 'vimeo'
  if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter'
  return 'other'
}

export function EmbedElement({
  url,
  embedType,
  onChange,
  onDelete,
  isSelected,
  onSelect,
}: EmbedElementProps) {
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [urlInput, setUrlInput] = useState(url)

  const handleUrlSubmit = () => {
    const type = detectEmbedType(urlInput)
    onChange({ url: urlInput, embedType: type })
    setShowUrlInput(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUrlSubmit()
    } else if (e.key === 'Escape') {
      setShowUrlInput(false)
      setUrlInput(url)
    }
  }

  const renderEmbed = () => {
    if (!url) return null

    const type = embedType || detectEmbedType(url)

    switch (type) {
      case 'youtube': {
        const videoId = getYouTubeId(url)
        if (!videoId) return <p className="text-muted-foreground">Invalid YouTube URL</p>
        return (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            className="w-full aspect-video rounded-lg"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        )
      }

      case 'vimeo': {
        const videoId = getVimeoId(url)
        if (!videoId) return <p className="text-muted-foreground">Invalid Vimeo URL</p>
        return (
          <iframe
            src={`https://player.vimeo.com/video/${videoId}`}
            className="w-full aspect-video rounded-lg"
            allowFullScreen
            allow="autoplay; fullscreen; picture-in-picture"
          />
        )
      }

      default:
        return (
          <div className="p-4 bg-muted rounded-lg">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline break-all"
            >
              {url}
            </a>
          </div>
        )
    }
  }

  return (
    <div
      className={`relative group rounded-lg overflow-hidden transition-all ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={onSelect}
    >
      {url ? (
        <div>
          {renderEmbed()}

          {/* Edit overlay on hover when selected */}
          {isSelected && (
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowUrlInput(true)
                }}
                className="px-3 py-1.5 bg-white text-black rounded-md text-sm hover:bg-gray-100"
              >
                Change URL
              </button>
            </div>
          )}
        </div>
      ) : (
        // Empty state
        <div className="min-h-[200px] border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center p-8 bg-muted/30">
          <Play className="w-12 h-12 text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground mb-4">Embed a video or link</p>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowUrlInput(true)
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 text-sm"
          >
            <Link className="w-4 h-4" />
            Add URL
          </button>
        </div>
      )}

      {/* URL Input Modal */}
      {showUrlInput && (
        <div
          className="absolute inset-0 bg-black/70 flex items-center justify-center z-20 rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-background p-4 rounded-lg w-full max-w-md mx-4">
            <label className="block text-sm font-medium mb-2">Embed URL</label>
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
            <p className="text-xs text-muted-foreground mt-2">
              Supports YouTube, Vimeo, and other URLs
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleUrlSubmit}
                className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 text-sm"
              >
                Embed
              </button>
              <button
                onClick={() => {
                  setShowUrlInput(false)
                  setUrlInput(url)
                }}
                className="px-3 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Button */}
      {isSelected && (
        <button
          className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors z-10"
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          type="button"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  )
}
