'use client'

import { ListChecks } from 'lucide-react'
import { DistributionBar } from './DistributionBar'

interface MCQData {
  elementId: string
  type: 'mcq'
  question: string
  options: string[]
  allowMultiple: boolean
  responseCount: number
  distribution: { option: string; count: number; percentage: number }[]
  tabLabel?: string
}

export function MCQCard({ data }: { data: MCQData }) {
  return (
    <div className="bg-muted/30 rounded-lg p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-blue-500" />
          <h3 className="font-medium">{data.question}</h3>
          {data.tabLabel && (
            <span className="text-xs bg-muted px-2 py-0.5 rounded">{data.tabLabel}</span>
          )}
        </div>
        <span className="text-sm text-muted-foreground">
          {data.responseCount} response{data.responseCount !== 1 ? 's' : ''}
        </span>
      </div>

      {data.responseCount === 0 ? (
        <p className="text-sm text-muted-foreground">No responses yet</p>
      ) : (
        <div className="space-y-2">
          {data.distribution.map(d => (
            <DistributionBar
              key={d.option}
              label={d.option}
              count={d.count}
              total={data.responseCount}
              color="bg-blue-500"
            />
          ))}
        </div>
      )}
    </div>
  )
}
