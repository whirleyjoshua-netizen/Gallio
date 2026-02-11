'use client'

import { useRef, useEffect } from 'react'
import { X, Quote } from 'lucide-react'

interface QuoteElementProps {
  text: string
  author: string
  onChange: (updates: { text?: string; author?: string }) => void
  onDelete: () => void
  isSelected: boolean
  onSelect: () => void
}

export function QuoteElement({
  text,
  author,
  onChange,
  onDelete,
  isSelected,
  onSelect,
}: QuoteElementProps) {
  const textRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = 'auto'
      textRef.current.style.height = `${textRef.current.scrollHeight}px`
    }
  }, [text])

  return (
    <div
      className={`relative group transition-all ${isSelected ? 'ring-2 ring-primary rounded-lg' : ''}`}
      onClick={onSelect}
    >
      <blockquote className="border-l-4 border-primary/50 pl-4 py-2">
        <Quote className="w-8 h-8 text-primary/30 mb-2" />

        <textarea
          ref={textRef}
          value={text}
          onChange={(e) => onChange({ text: e.target.value })}
          onFocus={onSelect}
          placeholder="Enter your quote..."
          className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-lg italic text-foreground placeholder:text-muted-foreground resize-none overflow-hidden"
          rows={1}
        />

        <footer className="mt-2">
          <input
            type="text"
            value={author}
            onChange={(e) => onChange({ author: e.target.value })}
            onFocus={onSelect}
            placeholder="— Author name"
            className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-muted-foreground placeholder:text-muted-foreground"
          />
        </footer>
      </blockquote>

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
