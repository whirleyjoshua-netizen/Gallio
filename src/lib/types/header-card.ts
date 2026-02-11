// Header Card Types — full-width hero section for display pages

export type PhotoPosition = 'left-offset' | 'center-overlap' | 'right-inline' | 'hidden'
export type HeaderTemplate = 'resume' | 'profile' | 'catalog'

export interface HeaderAction {
  id: string
  label: string
  url: string
  icon?: 'download' | 'mail' | 'link' | 'phone' | 'github' | 'linkedin'
  variant: 'solid' | 'outline' | 'ghost'
  color: 'blue' | 'green' | 'purple' | 'orange' | 'slate'
}

export interface HeaderCardConfig {
  enabled: boolean
  template: HeaderTemplate
  coverImageUrl?: string
  coverHeight?: number          // px, default 240
  photoUrl?: string
  photoSize?: number              // px, default 160
  photoPosition: PhotoPosition
  name: string
  title?: string                // e.g. "Software Engineer"
  subtitle?: string             // e.g. "San Francisco, CA"
  bio?: string
  actions: HeaderAction[]
  textAlignment?: 'left' | 'center'
  overlayOpacity?: number       // 0-100, darkens cover for readability
}

export const DEFAULT_HEADER_CARD: HeaderCardConfig = {
  enabled: false,
  template: 'profile',
  coverHeight: 240,
  photoPosition: 'center-overlap',
  name: '',
  actions: [],
  textAlignment: 'center',
  overlayOpacity: 0,
}

export function createHeaderAction(label = 'Button', url = ''): HeaderAction {
  return {
    id: `action-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    label,
    url,
    variant: 'solid',
    color: 'blue',
  }
}
