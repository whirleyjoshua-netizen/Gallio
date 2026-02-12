'use client'

import { Star } from 'lucide-react'
import { DistributionBar } from './DistributionBar'

interface RatingData {
  elementId: string
  type: 'rating'
  question: string
  ratingMax: number
  ratingStyle: 'stars' | 'numeric'
  responseCount: number
  average: number
  distribution: { value: number; count: number }[]
  tabLabel?: string
}

export function RatingCard({ data }: { data: RatingData }) {
  return (
    <div className="bg-muted/30 rounded-lg p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
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
        <p className="text-sm text-muted-foreground">No ratings yet</p>
      ) : (
        <>
          {/* Average rating */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
            <span className="text-3xl font-bold">{data.average}</span>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: data.ratingMax }, (_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(data.average)
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              out of {data.ratingMax}
            </span>
          </div>

          {/* Distribution */}
          <div className="space-y-2">
            {data.distribution.map(d => (
              <DistributionBar
                key={d.value}
                label={`${d.value} ${data.ratingStyle === 'stars' ? '★' : ''}`}
                count={d.count}
                total={data.responseCount}
                color="bg-yellow-500"
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
