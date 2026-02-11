'use client'

import { useState } from 'react'
import { X, Settings, Star } from 'lucide-react'

interface RatingElementProps {
  question: string
  max: number
  style: 'stars' | 'numeric'
  required: boolean
  onChange: (updates: {
    question?: string
    max?: number
    style?: 'stars' | 'numeric'
    required?: boolean
  }) => void
  onDelete: () => void
  isSelected: boolean
  onSelect: () => void
}

export function RatingElement({
  question,
  max,
  style,
  required,
  onChange,
  onDelete,
  isSelected,
  onSelect,
}: RatingElementProps) {
  const [showSettings, setShowSettings] = useState(false)
  const [hoverValue, setHoverValue] = useState<number | null>(null)
  const [selectedValue, setSelectedValue] = useState<number | null>(null)

  const displayValue = hoverValue ?? selectedValue

  return (
    <div
      className={`relative group rounded-lg transition-all ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={onSelect}
    >
      <div className="p-4 bg-muted/30 rounded-lg border border-border">
        {/* Question */}
        <div className="mb-4">
          <input
            type="text"
            value={question}
            onChange={(e) => onChange({ question: e.target.value })}
            className="w-full text-lg font-medium bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
            placeholder="Your question here"
            onClick={(e) => e.stopPropagation()}
          />
          {required && (
            <span className="text-destructive text-sm ml-2">*</span>
          )}
        </div>

        {/* Rating Display */}
        {style === 'stars' ? (
          <div className="flex items-center gap-1">
            {Array.from({ length: max }, (_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedValue(i + 1)
                }}
                onMouseEnter={() => setHoverValue(i + 1)}
                onMouseLeave={() => setHoverValue(null)}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 transition-colors ${
                    displayValue && i < displayValue
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground/30'
                  }`}
                />
              </button>
            ))}
            {selectedValue && (
              <span className="ml-2 text-sm text-muted-foreground">
                {selectedValue} / {max}
              </span>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {Array.from({ length: max }, (_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedValue(i + 1)
                }}
                onMouseEnter={() => setHoverValue(i + 1)}
                onMouseLeave={() => setHoverValue(null)}
                className={`w-10 h-10 rounded-lg border-2 font-medium transition-all ${
                  displayValue && i < displayValue
                    ? 'bg-primary border-primary text-primary-foreground'
                    : selectedValue === i + 1
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Settings Panel */}
      {isSelected && showSettings && (
        <div className="mt-2 p-3 bg-background border border-border rounded-lg space-y-3">
          <div>
            <label className="block text-sm font-medium mb-2">Style</label>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onChange({ style: 'stars' })
                }}
                className={`flex-1 px-3 py-2 rounded-lg border text-sm ${
                  style === 'stars'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                Stars
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onChange({ style: 'numeric' })
                }}
                className={`flex-1 px-3 py-2 rounded-lg border text-sm ${
                  style === 'numeric'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                Numeric
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Max Value</label>
            <div className="flex gap-2">
              {[5, 10].map((val) => (
                <button
                  key={val}
                  onClick={(e) => {
                    e.stopPropagation()
                    onChange({ max: val })
                  }}
                  className={`flex-1 px-3 py-2 rounded-lg border text-sm ${
                    max === val
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={required}
              onChange={(e) => onChange({ required: e.target.checked })}
              className="rounded"
            />
            Required
          </label>
        </div>
      )}

      {/* Action Buttons */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 flex gap-1">
          <button
            className="p-1 bg-muted text-muted-foreground rounded-full hover:text-foreground transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation()
              setShowSettings(!showSettings)
            }}
            type="button"
          >
            <Settings className="w-3 h-3" />
          </button>
          <button
            className="p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            type="button"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  )
}
