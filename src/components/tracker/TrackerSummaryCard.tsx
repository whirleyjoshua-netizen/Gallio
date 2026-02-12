'use client'

import { TrendingUp, TrendingDown, Minus, Trophy, Activity, Hash } from 'lucide-react'
import type { TrackerSummary } from '@/lib/kits/tracker-utils'

interface TrackerSummaryCardProps {
  summary: TrackerSummary
  color: string
  unit?: string
}

export function TrackerSummaryCard({ summary, color, unit = '' }: TrackerSummaryCardProps) {
  const formatVal = (v: number | null) => {
    if (v === null) return '—'
    return v % 1 === 0 ? v.toString() : v.toFixed(2)
  }

  const TrendIcon = summary.improvement.direction === 'up' ? TrendingUp
    : summary.improvement.direction === 'down' ? TrendingDown
    : Minus

  const trendColor = summary.improvement.direction === 'up' ? 'text-emerald-600 bg-emerald-50'
    : summary.improvement.direction === 'down' ? 'text-red-500 bg-red-50'
    : 'text-slate-500 bg-slate-50'

  const cards = [
    { label: 'Personal Best', value: formatVal(summary.personalBest), icon: Trophy, accent: color },
    { label: 'Latest', value: formatVal(summary.latest), icon: Activity, accent: color },
    { label: 'Average', value: formatVal(summary.average), icon: Hash, accent: color },
  ]

  return (
    <div className="grid grid-cols-3 gap-3">
      {cards.map(card => (
        <div key={card.label} className="relative rounded-xl bg-white border border-border/60 shadow-sm overflow-hidden">
          <div className="absolute top-0 left-3 right-3 h-0.5 rounded-b-full" style={{ backgroundColor: card.accent }} />
          <div className="p-3 pt-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <card.icon className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{card.label}</span>
            </div>
            <div className="text-xl font-bold" style={{ color: card.accent }}>
              {card.value}
              {unit && <span className="text-xs font-medium opacity-60 ml-0.5">{unit}</span>}
            </div>
          </div>
        </div>
      ))}

      {/* Improvement badge */}
      {summary.improvement.percent !== null && (
        <div className="col-span-3 flex justify-center">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${trendColor}`}>
            <TrendIcon className="w-3.5 h-3.5" />
            {summary.improvement.percent}% {summary.improvement.direction === 'up' ? 'improvement' : summary.improvement.direction === 'down' ? 'decrease' : 'no change'}
            <span className="opacity-60">over {summary.totalEntries} entries</span>
          </div>
        </div>
      )}
    </div>
  )
}
