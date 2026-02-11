import type { HeaderCardConfig } from '@/lib/types/header-card'
import { ProfileHeader } from './templates/ProfileHeader'
import { ResumeHeader } from './templates/ResumeHeader'
import { CatalogHeader } from './templates/CatalogHeader'

interface HeaderCardProps {
  config: HeaderCardConfig
}

export function HeaderCard({ config }: HeaderCardProps) {
  if (!config.enabled) return null

  switch (config.template) {
    case 'resume':
      return <ResumeHeader config={config} />
    case 'catalog':
      return <CatalogHeader config={config} />
    case 'profile':
    default:
      return <ProfileHeader config={config} />
  }
}
