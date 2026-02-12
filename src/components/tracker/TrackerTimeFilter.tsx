'use client'

interface TrackerTimeFilterProps {
  value: string
  onChange: (range: string) => void
}

const RANGES = [
  { key: '7d', label: '7d' },
  { key: '30d', label: '30d' },
  { key: '90d', label: '90d' },
  { key: '1y', label: '1Y' },
  { key: 'all', label: 'All' },
]

export function TrackerTimeFilter({ value, onChange }: TrackerTimeFilterProps) {
  return (
    <div className="inline-flex rounded-lg border border-border overflow-hidden">
      {RANGES.map(r => (
        <button
          key={r.key}
          onClick={() => onChange(r.key)}
          className={`px-3 py-1 text-xs font-medium transition-colors ${
            value === r.key
              ? 'bg-primary text-primary-foreground'
              : 'bg-background text-muted-foreground hover:bg-muted'
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  )
}
