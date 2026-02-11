'use client'

import type { CanvasElement } from '@/lib/types/canvas'
import { LinkedInCard } from './cards/LinkedInCard'
import { VouchCard } from './cards/VouchCard'

const CARD_RENDERERS: Record<string, React.ComponentType<{ data: Record<string, any>; style?: 'default' | 'compact' | 'detailed' }>> = {
  linkedin: LinkedInCard,
  vouch: VouchCard,
}

interface PublicCardElementProps {
  element: CanvasElement
}

export function PublicCardElement({ element }: PublicCardElementProps) {
  const provider = element.cardProvider || 'linkedin'
  const data = element.cardData || {}
  const style = element.cardStyle || 'default'

  const Renderer = CARD_RENDERERS[provider]

  if (!Renderer) {
    return (
      <div className="p-4 rounded-lg bg-muted/30 border border-border text-center text-sm text-muted-foreground">
        Unknown card provider: {provider}
      </div>
    )
  }

  return <Renderer data={data} style={style} />
}
