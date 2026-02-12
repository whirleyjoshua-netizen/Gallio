'use client'

import { useMemo } from 'react'

interface DataPoint {
  label: string
  value: number
}

interface TrackerChartProps {
  data: DataPoint[]
  chartType: 'line' | 'bar'
  color: string
  title?: string
  showGrid?: boolean
  animate?: boolean
}

export function TrackerChart({ data, chartType, color, title, showGrid = true, animate = true }: TrackerChartProps) {
  const { points, yLabels, maxVal, minVal } = useMemo(() => {
    if (data.length === 0) return { points: '', yLabels: [] as string[], maxVal: 0, minVal: 0 }

    const values = data.map(d => d.value)
    const max = Math.max(...values)
    const min = Math.min(...values)
    const range = max - min || 1
    const padding = range * 0.1

    const effectiveMin = min - padding
    const effectiveMax = max + padding
    const effectiveRange = effectiveMax - effectiveMin

    const w = 600
    const h = 200
    const marginX = 40
    const plotW = w - marginX * 2
    const plotH = h - 40

    const pts = data.map((d, i) => {
      const x = marginX + (data.length === 1 ? plotW / 2 : (i / (data.length - 1)) * plotW)
      const y = 20 + plotH - ((d.value - effectiveMin) / effectiveRange) * plotH
      return { x, y, ...d }
    })

    const pathPoints = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

    const labels: string[] = []
    for (let i = 0; i <= 4; i++) {
      const val = effectiveMin + (i / 4) * effectiveRange
      labels.push(val.toFixed(val >= 100 ? 0 : 1))
    }

    return { points: pathPoints, yLabels: labels, maxVal: effectiveMax, minVal: effectiveMin, pts }
  }, [data])

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
        No data to display
      </div>
    )
  }

  const w = 600
  const h = 200
  const marginX = 40
  const plotW = w - marginX * 2
  const plotH = h - 40

  const values = data.map(d => d.value)
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const padding = range * 0.1
  const effectiveMin = min - padding
  const effectiveMax = max + padding
  const effectiveRange = effectiveMax - effectiveMin

  const pts = data.map((d, i) => {
    const x = marginX + (data.length === 1 ? plotW / 2 : (i / (data.length - 1)) * plotW)
    const y = 20 + plotH - ((d.value - effectiveMin) / effectiveRange) * plotH
    return { x, y, ...d }
  })

  return (
    <div>
      {title && <div className="text-sm font-medium mb-2 text-muted-foreground">{title}</div>}
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {showGrid && [0, 1, 2, 3, 4].map(i => {
          const y = 20 + plotH - (i / 4) * plotH
          return (
            <g key={i}>
              <line x1={marginX} y1={y} x2={w - marginX} y2={y} stroke="currentColor" strokeOpacity="0.08" />
              <text x={marginX - 6} y={y + 4} textAnchor="end" className="fill-muted-foreground" fontSize="10">
                {(effectiveMin + (i / 4) * effectiveRange).toFixed(max >= 100 ? 0 : 1)}
              </text>
            </g>
          )
        })}

        {chartType === 'line' ? (
          <>
            {/* Area fill */}
            <path
              d={`${pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')} L ${pts[pts.length - 1].x} ${20 + plotH} L ${pts[0].x} ${20 + plotH} Z`}
              fill={`url(#grad-${color.replace('#', '')})`}
            />
            {/* Line */}
            <path
              d={pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}
              fill="none"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Dots */}
            {pts.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="4" fill={color} stroke="white" strokeWidth="2" />
            ))}
          </>
        ) : (
          <>
            {/* Bar chart */}
            {pts.map((p, i) => {
              const barW = Math.min(40, plotW / data.length * 0.7)
              const barH = 20 + plotH - p.y
              return (
                <rect
                  key={i}
                  x={p.x - barW / 2}
                  y={p.y}
                  width={barW}
                  height={barH}
                  rx="3"
                  fill={color}
                  opacity="0.85"
                />
              )
            })}
          </>
        )}

        {/* X-axis labels */}
        {pts.map((p, i) => {
          // Skip some labels if too many
          const skip = data.length > 10 ? Math.ceil(data.length / 8) : 1
          if (i % skip !== 0 && i !== data.length - 1) return null
          return (
            <text key={i} x={p.x} y={h - 4} textAnchor="middle" className="fill-muted-foreground" fontSize="9">
              {p.label}
            </text>
          )
        })}
      </svg>
    </div>
  )
}
