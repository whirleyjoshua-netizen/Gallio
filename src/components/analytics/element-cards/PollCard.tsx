'use client'

import { Vote } from 'lucide-react'
import { DistributionBar } from './DistributionBar'

interface PollData {
  elementId: string
  type: 'poll'
  question: string
  options: string[]
  allowMultiple: boolean
  totalVoters: number
  distribution: { option: string; count: number; percentage: number }[]
  tabLabel?: string
}

export function PollCard({ data }: { data: PollData }) {
  return (
    <div className="bg-muted/30 rounded-lg p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Vote className="w-5 h-5 text-purple-500" />
          <h3 className="font-medium">{data.question}</h3>
          {data.tabLabel && (
            <span className="text-xs bg-muted px-2 py-0.5 rounded">{data.tabLabel}</span>
          )}
        </div>
        <span className="text-sm text-muted-foreground">
          {data.totalVoters} voter{data.totalVoters !== 1 ? 's' : ''}
        </span>
      </div>

      {data.totalVoters === 0 ? (
        <p className="text-sm text-muted-foreground">No votes yet</p>
      ) : (
        <div className="space-y-2">
          {data.distribution.map(d => (
            <DistributionBar
              key={d.option}
              label={d.option}
              count={d.count}
              total={data.totalVoters}
              color="bg-purple-500"
            />
          ))}
        </div>
      )}
    </div>
  )
}
