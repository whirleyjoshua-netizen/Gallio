'use client'

import { useRef, useEffect } from 'react'
import { X } from 'lucide-react'

interface TextElementProps {
  content: string
  onChange: (content: string) => void
  onDelete: () => void
  isSelected: boolean
  onSelect: () => void
}

export function TextElement({
  content,
  onChange,
  onDelete,
  isSelected,
  onSelect,
}: TextElementProps) {
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

  return (
    <div className="relative group" onClick={onSelect}>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onPaste={handlePaste}
        onFocus={onSelect}
        className={`w-full min-h-[60px] p-3 bg-transparent rounded-lg focus:outline-none transition-all text-foreground ${
          isSelected
            ? 'ring-2 ring-primary'
            : 'hover:bg-muted/50'
        }`}
        style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
        suppressContentEditableWarning
      />

      {/* Placeholder */}
      {!content && (
        <div className="absolute top-3 left-3 text-muted-foreground pointer-events-none">
          Start typing...
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
