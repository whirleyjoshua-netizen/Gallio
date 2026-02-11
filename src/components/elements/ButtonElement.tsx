'use client'

import { useState } from 'react'
import { X, ExternalLink, AlignLeft, AlignCenter, AlignRight } from 'lucide-react'

type ButtonVariant = 'solid' | 'outline' | 'ghost'
type ButtonColor = 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'slate'
type ButtonAlign = 'left' | 'center' | 'right'

interface ButtonElementProps {
  text: string
  url: string
  variant: ButtonVariant
  color: ButtonColor
  align: ButtonAlign
  onChange: (updates: {
    text?: string
    url?: string
    variant?: ButtonVariant
    color?: ButtonColor
    align?: ButtonAlign
  }) => void
  onDelete: () => void
  isSelected: boolean
  onSelect: () => void
}

const COLOR_CLASSES: Record<ButtonColor, Record<ButtonVariant, string>> = {
  blue: {
    solid: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    ghost: 'text-blue-600 hover:bg-blue-50',
  },
  green: {
    solid: 'bg-green-600 text-white hover:bg-green-700',
    outline: 'border-2 border-green-600 text-green-600 hover:bg-green-50',
    ghost: 'text-green-600 hover:bg-green-50',
  },
  red: {
    solid: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border-2 border-red-600 text-red-600 hover:bg-red-50',
    ghost: 'text-red-600 hover:bg-red-50',
  },
  purple: {
    solid: 'bg-purple-600 text-white hover:bg-purple-700',
    outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50',
    ghost: 'text-purple-600 hover:bg-purple-50',
  },
  orange: {
    solid: 'bg-orange-600 text-white hover:bg-orange-700',
    outline: 'border-2 border-orange-600 text-orange-600 hover:bg-orange-50',
    ghost: 'text-orange-600 hover:bg-orange-50',
  },
  slate: {
    solid: 'bg-slate-800 text-white hover:bg-slate-900',
    outline: 'border-2 border-slate-800 text-slate-800 hover:bg-slate-50',
    ghost: 'text-slate-800 hover:bg-slate-50',
  },
}

const COLORS: ButtonColor[] = ['blue', 'green', 'red', 'purple', 'orange', 'slate']
const VARIANTS: ButtonVariant[] = ['solid', 'outline', 'ghost']
const ALIGNS: { id: ButtonAlign; icon: typeof AlignLeft }[] = [
  { id: 'left', icon: AlignLeft },
  { id: 'center', icon: AlignCenter },
  { id: 'right', icon: AlignRight },
]

export function ButtonElement({
  text,
  url,
  variant,
  color,
  align,
  onChange,
  onDelete,
  isSelected,
  onSelect,
}: ButtonElementProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(text)
  const [editUrl, setEditUrl] = useState(url)

  const handleSave = () => {
    onChange({ text: editText, url: editUrl })
    setIsEditing(false)
  }

  return (
    <div
      className={`relative group transition-all ${isSelected ? 'ring-2 ring-primary rounded-lg p-2' : ''}`}
      onClick={onSelect}
    >
      {isEditing ? (
        // Edit mode
        <div className="space-y-3 p-3 bg-muted rounded-lg" onClick={(e) => e.stopPropagation()}>
          <div>
            <label className="block text-xs font-medium mb-1">Button Text</label>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Link URL</label>
            <input
              type="url"
              value={editUrl}
              onChange={(e) => setEditUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Style</label>
            <div className="flex gap-1">
              {VARIANTS.map((v) => (
                <button
                  key={v}
                  onClick={() => onChange({ variant: v })}
                  className={`px-2 py-1 text-xs rounded ${
                    variant === v ? 'bg-primary text-primary-foreground' : 'bg-background border border-border'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Color</label>
            <div className="flex gap-1">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => onChange({ color: c })}
                  className={`w-6 h-6 rounded ${
                    color === c ? 'ring-2 ring-offset-1 ring-primary' : ''
                  }`}
                  style={{
                    backgroundColor:
                      c === 'blue' ? '#2563eb' :
                      c === 'green' ? '#16a34a' :
                      c === 'red' ? '#dc2626' :
                      c === 'purple' ? '#9333ea' :
                      c === 'orange' ? '#ea580c' :
                      '#1e293b',
                  }}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Alignment</label>
            <div className="flex gap-1">
              {ALIGNS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => onChange({ align: a.id })}
                  className={`p-1.5 rounded ${
                    align === a.id ? 'bg-primary text-primary-foreground' : 'bg-background border border-border'
                  }`}
                >
                  <a.icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false)
                setEditText(text)
                setEditUrl(url)
              }}
              className="px-3 py-1.5 bg-muted-foreground/20 rounded-md text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // Display mode
        <div className={`flex items-center gap-2 ${
          align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'
        }`}>
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (isSelected) {
                  e.preventDefault()
                  setIsEditing(true)
                }
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${COLOR_CLASSES[color][variant]}`}
            >
              {text}
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsEditing(true)
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${COLOR_CLASSES[color][variant]}`}
            >
              {text}
            </button>
          )}

          {isSelected && !isEditing && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsEditing(true)
              }}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Edit
            </button>
          )}
        </div>
      )}

      {/* Delete Button */}
      {isSelected && !isEditing && (
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
