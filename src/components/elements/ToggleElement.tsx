'use client'

import { useState } from 'react'
import { Trash2, ChevronRight, ChevronDown } from 'lucide-react'

interface ToggleElementProps {
  title: string
  content: string
  isOpen: boolean
  isSelected: boolean
  onSelect: () => void
  onDelete: () => void
  onChange: (updates: { title?: string; content?: string; isOpen?: boolean }) => void
}

export function ToggleElement({
  title,
  content,
  isOpen,
  isSelected,
  onSelect,
  onDelete,
  onChange,
}: ToggleElementProps) {
  const [localOpen, setLocalOpen] = useState(isOpen)

  const toggleOpen = () => {
    const newOpen = !localOpen
    setLocalOpen(newOpen)
    onChange({ isOpen: newOpen })
  }

  return (
    <div
      className={`relative group rounded-lg border border-border bg-background transition-all ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 p-4 cursor-pointer hover:bg-muted/50 transition rounded-t-lg"
        onClick={(e) => {
          e.stopPropagation()
          toggleOpen()
        }}
      >
        <button className="text-muted-foreground hover:text-foreground transition flex-shrink-0">
          {localOpen ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
        <input
          type="text"
          value={title}
          onChange={(e) => onChange({ title: e.target.value })}
          onClick={(e) => e.stopPropagation()}
          placeholder="Toggle title..."
          className="flex-1 bg-transparent border-none outline-none font-medium text-foreground"
        />
      </div>

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-200 ${
          localOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 pl-11">
          <textarea
            value={content}
            onChange={(e) => onChange({ content: e.target.value })}
            onClick={(e) => e.stopPropagation()}
            placeholder="Write your content here... This will be hidden until expanded."
            rows={4}
            className="w-full bg-muted/30 border border-border rounded-md p-3 outline-none text-foreground/80 resize-none text-sm leading-relaxed focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Delete button */}
      {isSelected && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="absolute -top-3 -right-3 p-1.5 bg-background border border-border rounded-md shadow-sm hover:bg-destructive hover:text-destructive-foreground transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Visual hint when collapsed */}
      {!localOpen && content && (
        <div className="px-4 pb-2 pl-11">
          <div className="text-xs text-muted-foreground truncate">
            {content.slice(0, 60)}{content.length > 60 ? '...' : ''}
          </div>
        </div>
      )}
    </div>
  )
}
