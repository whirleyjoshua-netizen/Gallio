'use client'

import { useRef, useEffect } from 'react'
import { X } from 'lucide-react'

interface HeadingElementProps {
  content: string
  level: 1 | 2 | 3 | 4 | 5 | 6
  onChange: (content: string) => void
  onDelete: () => void
  isSelected: boolean
  onSelect: () => void
}

const FONT_SIZES: Record<number, string> = {
  1: 'text-4xl',
  2: 'text-3xl',
  3: 'text-2xl',
  4: 'text-xl',
  5: 'text-lg',
  6: 'text-base',
}

export function HeadingElement({
  content,
  level,
  onChange,
  onDelete,
  isSelected,
  onSelect,
}: HeadingElementProps) {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content || ''
    }
  }, [content])

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    document.execCommand('insertText', false, text)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Prevent enter key from creating new lines in headings
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  return (
    <div className="relative group" onClick={onSelect}>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        onFocus={onSelect}
        className={`w-full font-bold ${FONT_SIZES[level]} bg-transparent focus:outline-none transition-all text-foreground py-1 ${
          isSelected ? 'ring-2 ring-primary rounded' : ''
        }`}
        style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
        suppressContentEditableWarning
      />

      {/* Placeholder */}
      {!content && (
        <div
          className={`absolute top-1 left-0 text-muted-foreground pointer-events-none font-bold ${FONT_SIZES[level]}`}
        >
          Heading {level}
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
