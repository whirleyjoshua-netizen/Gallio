import type { HeaderCardConfig } from '@/lib/types/header-card'
import { HeaderCard } from './HeaderCard'

interface PublicHeaderCardProps {
  config: HeaderCardConfig
}

export function PublicHeaderCard({ config }: PublicHeaderCardProps) {
  return <HeaderCard config={config} />
}
