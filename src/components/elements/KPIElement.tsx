'use client'

import { useState } from 'react'
import { Trash2, TrendingUp, TrendingDown, Minus, Settings, X } from 'lucide-react'

interface KPIElementProps {
  label: string
  value: string
  prefix?: string
  suffix?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  color?: 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'slate'
  isSelected: boolean
  onSelect: () => void
  onDelete: () => void
  onChange: (updates: {
    label?: string
    value?: string
    prefix?: string
    suffix?: string
    trend?: 'up' | 'down' | 'neutral'
    trendValue?: string
    color?: 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'slate'
  }) => void
}

const COLOR_THEMES = {
  blue: {
    gradient: 'from-blue-500 to-blue-600',
    light: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-100 dark:border-blue-900/50',
    text: 'text-blue-600 dark:text-blue-400',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
    icon: 'text-blue-500/20',
    ring: 'ring-blue-500',
    dot: 'bg-blue-500',
  },
  green: {
    gradient: 'from-green-500 to-green-600',
    light: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-100 dark:border-green-900/50',
    text: 'text-green-600 dark:text-green-400',
    badge: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
    icon: 'text-green-500/20',
    ring: 'ring-green-500',
    dot: 'bg-green-500',
  },
  red: {
    gradient: 'from-red-500 to-red-600',
    light: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-100 dark:border-red-900/50',
    text: 'text-red-600 dark:text-red-400',
    badge: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
    icon: 'text-red-500/20',
    ring: 'ring-red-500',
    dot: 'bg-red-500',
  },
  purple: {
    gradient: 'from-purple-500 to-purple-600',
    light: 'bg-purple-50 dark:bg-purple-950/30',
    border: 'border-purple-100 dark:border-purple-900/50',
    text: 'text-purple-600 dark:text-purple-400',
    badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
    icon: 'text-purple-500/20',
    ring: 'ring-purple-500',
    dot: 'bg-purple-500',
  },
  orange: {
    gradient: 'from-orange-500 to-orange-600',
    light: 'bg-orange-50 dark:bg-orange-950/30',
    border: 'border-orange-100 dark:border-orange-900/50',
    text: 'text-orange-600 dark:text-orange-400',
    badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
    icon: 'text-orange-500/20',
    ring: 'ring-orange-500',
    dot: 'bg-orange-500',
  },
  slate: {
    gradient: 'from-slate-500 to-slate-600',
    light: 'bg-slate-50 dark:bg-slate-900/50',
    border: 'border-slate-100 dark:border-slate-800',
    text: 'text-slate-600 dark:text-slate-400',
    badge: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    icon: 'text-slate-500/20',
    ring: 'ring-slate-500',
    dot: 'bg-slate-500',
  },
}

export function KPIElement({
  label,
  value,
  prefix = '',
  suffix = '',
  trend = 'neutral',
  trendValue = '',
  color = 'blue',
  isSelected,
  onSelect,
  onDelete,
  onChange,
}: KPIElementProps) {
  const [showSettings, setShowSettings] = useState(false)
  const theme = COLOR_THEMES[color]

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const trendColorClass =
    trend === 'up' ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30' :
    trend === 'down' ? 'text-red-600 bg-red-50 dark:bg-red-950/30' :
    'text-slate-500 bg-slate-50 dark:bg-slate-800'

  return (
    <div
      className={`relative group rounded-2xl transition-all duration-200 bg-white dark:bg-slate-900 border shadow-sm hover:shadow-md ${theme.border} ${
        isSelected ? `ring-2 ${theme.ring}` : ''
      }`}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
    >
      {/* Gradient accent strip */}
      <div className={`absolute top-0 left-4 right-4 h-1 rounded-b-full bg-gradient-to-r ${theme.gradient}`} />

      <div className="p-5 pt-4">
        {/* Header row: label + dot indicator */}
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-2 h-2 rounded-full ${theme.dot} flex-shrink-0`} />
          <input
            type="text"
            value={label}
            onChange={(e) => onChange({ label: e.target.value })}
            placeholder="Metric name"
            className="flex-1 bg-transparent text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest border-none outline-none"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Main value */}
        <div className="flex items-baseline gap-0.5 mb-2">
          <input
            type="text"
            value={prefix}
            onChange={(e) => onChange({ prefix: e.target.value })}
            placeholder=""
            className={`bg-transparent text-2xl font-bold ${theme.text} border-none outline-none w-6 text-right flex-shrink-0`}
            style={{ width: prefix ? `${Math.max(prefix.length * 16, 16)}px` : '0px', padding: 0 }}
            onClick={(e) => e.stopPropagation()}
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange({ value: e.target.value })}
            placeholder="0"
            className={`bg-transparent text-4xl font-extrabold tracking-tight ${theme.text} border-none outline-none flex-1 min-w-0`}
            onClick={(e) => e.stopPropagation()}
          />
          {suffix && (
            <span className={`text-lg font-semibold ${theme.text} opacity-70 flex-shrink-0`}>{suffix}</span>
          )}
        </div>

        {/* Trend badge */}
        {(trend !== 'neutral' || trendValue) && (
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${trendColorClass}`}>
            <TrendIcon className="w-3.5 h-3.5" />
            {trendValue && <span>{trendValue}</span>}
          </div>
        )}
      </div>

      {/* Controls */}
      {isSelected && (
        <div className="absolute -top-2.5 right-2 flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowSettings(!showSettings)
            }}
            className="p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition"
          >
            <Settings className="w-3.5 h-3.5 text-slate-500" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            className="p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:bg-red-50 hover:border-red-200 dark:hover:bg-red-950/30 transition"
          >
            <Trash2 className="w-3.5 h-3.5 text-slate-500 hover:text-red-500" />
          </button>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && isSelected && (
        <div
          className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold text-sm text-slate-700 dark:text-slate-300">KPI Settings</h4>
            <button onClick={() => setShowSettings(false)} className="p-0.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded">
              <X className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {/* Prefix/Suffix */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5">Prefix</label>
                <input
                  type="text"
                  value={prefix}
                  onChange={(e) => onChange({ prefix: e.target.value })}
                  placeholder="$"
                  className="w-full px-2.5 py-1.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5">Suffix</label>
                <input
                  type="text"
                  value={suffix}
                  onChange={(e) => onChange({ suffix: e.target.value })}
                  placeholder="%"
                  className="w-full px-2.5 py-1.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Trend */}
            <div>
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5">Trend Direction</label>
              <div className="flex gap-1">
                {([
                  { id: 'up' as const, label: 'Up', icon: '↑' },
                  { id: 'neutral' as const, label: 'None', icon: '—' },
                  { id: 'down' as const, label: 'Down', icon: '↓' },
                ]).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => onChange({ trend: t.id })}
                    className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all ${
                      trend === t.id
                        ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Trend Value */}
            <div>
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5">Trend Text</label>
              <input
                type="text"
                value={trendValue}
                onChange={(e) => onChange({ trendValue: e.target.value })}
                placeholder="+12% from last month"
                className="w-full px-2.5 py-1.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Color */}
            <div>
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5">Theme Color</label>
              <div className="flex gap-2">
                {(Object.keys(COLOR_THEMES) as Array<keyof typeof COLOR_THEMES>).map((c) => (
                  <button
                    key={c}
                    onClick={() => onChange({ color: c })}
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${COLOR_THEMES[c].gradient} transition-all ${
                      color === c ? 'ring-2 ring-offset-2 ring-slate-900 dark:ring-white scale-110' : 'hover:scale-105'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
