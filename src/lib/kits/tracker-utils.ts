import type { TrackerConfig } from './registry'

interface TrackerEntry {
  id: string
  value: any
  recordedAt: string | Date
  note?: string | null
}

export interface TrackerSummary {
  personalBest: number | null
  latest: number | null
  average: number | null
  totalEntries: number
  improvement: {
    percent: number | null
    direction: 'up' | 'down' | 'flat' | null
  }
}

export function computeTrackerSummary(entries: TrackerEntry[], valueField: string): TrackerSummary {
  if (entries.length === 0) {
    return { personalBest: null, latest: null, average: null, totalEntries: 0, improvement: { percent: null, direction: null } }
  }

  const values = entries
    .map(e => {
      const val = typeof e.value === 'object' ? e.value[valueField] : e.value
      return typeof val === 'number' ? val : parseFloat(val)
    })
    .filter(v => !isNaN(v))

  if (values.length === 0) {
    return { personalBest: null, latest: null, average: null, totalEntries: entries.length, improvement: { percent: null, direction: null } }
  }

  const personalBest = Math.max(...values)
  const latest = values[values.length - 1]
  const average = Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 100) / 100

  let improvement: TrackerSummary['improvement'] = { percent: null, direction: null }
  if (values.length >= 2) {
    const first = values[0]
    const last = values[values.length - 1]
    if (first !== 0) {
      const pct = Math.round(((last - first) / Math.abs(first)) * 1000) / 10
      improvement = {
        percent: Math.abs(pct),
        direction: pct > 0 ? 'up' : pct < 0 ? 'down' : 'flat',
      }
    }
  }

  return { personalBest, latest, average, totalEntries: entries.length, improvement }
}

export interface ChartDataPoint {
  label: string
  value: number
  date: string
}

export function entriesToChartData(entries: TrackerEntry[], valueField: string): ChartDataPoint[] {
  return entries
    .map(e => {
      const val = typeof e.value === 'object' ? e.value[valueField] : e.value
      const numVal = typeof val === 'number' ? val : parseFloat(val)
      if (isNaN(numVal)) return null
      const d = new Date(e.recordedAt)
      return {
        label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: numVal,
        date: d.toISOString(),
      }
    })
    .filter(Boolean) as ChartDataPoint[]
}

export function getTimeRangeFilter(range: string): Date | null {
  const now = new Date()
  switch (range) {
    case '7d': return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    case '30d': return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    case '90d': return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
    case '1y': return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
    case 'all': return null
    default: return null
  }
}
