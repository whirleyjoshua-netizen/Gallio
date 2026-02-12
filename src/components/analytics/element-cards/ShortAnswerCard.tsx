'use client'

import { Type } from 'lucide-react'

interface ShortAnswerData {
  elementId: string
  type: 'shortanswer'
  question: string
  responseCount: number
  recentAnswers: { answer: string; submittedAt: string; sessionId?: string }[]
  tabLabel?: string
}

export function ShortAnswerCard({ data }: { data: ShortAnswerData }) {
  return (
    <div className="bg-muted/30 rounded-lg p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Type className="w-5 h-5 text-green-500" />
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
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {data.recentAnswers.map((item, i) => (
            <div
              key={i}
              className="flex items-start justify-between gap-4 py-2 border-b border-border last:border-0"
            >
              <p className="text-sm flex-1">{item.answer}</p>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {new Date(item.submittedAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
