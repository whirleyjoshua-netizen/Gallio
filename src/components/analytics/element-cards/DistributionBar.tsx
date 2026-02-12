'use client'

interface DistributionBarProps {
  label: string
  count: number
  total: number
  color?: string
}

export function DistributionBar({ label, count, total, color = 'bg-primary' }: DistributionBarProps) {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm flex-1 truncate">{label}</span>
      <span className="text-sm text-muted-foreground w-8 text-right">{count}</span>
      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm text-muted-foreground w-10 text-right">{percentage}%</span>
    </div>
  )
}
