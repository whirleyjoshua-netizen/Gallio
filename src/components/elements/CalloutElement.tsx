'use client'

import { useState } from 'react'
import { Trash2, Info, AlertTriangle, CheckCircle, XCircle, Settings } from 'lucide-react'

interface CalloutElementProps {
  type: 'info' | 'warning' | 'success' | 'error'
  title: string
  content: string
  isSelected: boolean
  onSelect: () => void
  onDelete: () => void
  onChange: (updates: {
    type?: 'info' | 'warning' | 'success' | 'error'
    title?: string
    content?: string
  }) => void
}

const typeConfig = {
  info: {
    icon: Info,
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-500',
    label: 'Info',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    iconColor: 'text-amber-500',
    label: 'Warning',
  },
  success: {
    icon: CheckCircle,
    bg: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-200 dark:border-green-800',
    iconColor: 'text-green-500',
    label: 'Success',
  },
  error: {
    icon: XCircle,
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-200 dark:border-red-800',
    iconColor: 'text-red-500',
    label: 'Error',
  },
}

export function CalloutElement({
  type,
  title,
  content,
  isSelected,
  onSelect,
  onDelete,
  onChange,
}: CalloutElementProps) {
  const [showTypeSelector, setShowTypeSelector] = useState(false)
  const config = typeConfig[type]
  const Icon = config.icon

  return (
    <div
      className={`relative group rounded-lg border-l-4 ${config.bg} ${config.border} transition-all ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (isSelected) setShowTypeSelector(!showTypeSelector)
            }}
            className={`mt-0.5 flex-shrink-0 ${config.iconColor} ${isSelected ? 'cursor-pointer hover:opacity-70' : ''}`}
          >
            <Icon className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={title}
              onChange={(e) => onChange({ title: e.target.value })}
              placeholder="Callout title (optional)"
              className="w-full bg-transparent border-none outline-none font-semibold text-foreground mb-1"
            />
            <textarea
              value={content}
              onChange={(e) => onChange({ content: e.target.value })}
              placeholder="Write your callout content here..."
              rows={2}
              className="w-full bg-transparent border-none outline-none text-foreground/80 resize-none text-sm leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Type Selector Dropdown */}
      {showTypeSelector && isSelected && (
        <div
          className="absolute top-full left-4 mt-2 bg-background border border-border rounded-lg shadow-xl p-2 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-xs font-medium text-muted-foreground mb-2 px-2">Type</div>
          {(Object.keys(typeConfig) as Array<keyof typeof typeConfig>).map((t) => {
            const cfg = typeConfig[t]
            const TypeIcon = cfg.icon
            return (
              <button
                key={t}
                onClick={() => {
                  onChange({ type: t })
                  setShowTypeSelector(false)
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-md transition ${
                  type === t ? 'bg-primary/10' : 'hover:bg-muted'
                }`}
              >
                <TypeIcon className={`w-4 h-4 ${cfg.iconColor}`} />
                <span className="text-sm">{cfg.label}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* Controls */}
      {isSelected && (
        <div className="absolute -top-3 right-2 flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowTypeSelector(!showTypeSelector)
            }}
            className="p-1.5 bg-background border border-border rounded-md shadow-sm hover:bg-muted transition"
          >
            <Settings className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            className="p-1.5 bg-background border border-border rounded-md shadow-sm hover:bg-destructive hover:text-destructive-foreground transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}
