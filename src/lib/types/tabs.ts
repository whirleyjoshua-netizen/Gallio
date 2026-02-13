// Tab Navigation Types — each tab is a fully independent page

import type { Section } from './canvas'
import type { HeaderCardConfig } from './header-card'
import type { BackgroundConfig } from './background'

export interface Tab {
  id: string
  label: string
  slug: string             // URL-friendly identifier
  sections: Section[]      // Full canvas content for this tab
  headerCard?: HeaderCardConfig  // Per-tab header (optional, falls back to display-level)
  background?: BackgroundConfig  // Per-tab background (optional, falls back to display-level)
}

export interface TabsConfig {
  enabled: boolean
  tabs: Tab[]
  style?: 'underline' | 'pills' | 'boxed'
  alignment?: 'left' | 'center' | 'stretch'
}

export const DEFAULT_TABS_CONFIG: TabsConfig = {
  enabled: false,
  tabs: [],
  style: 'underline',
  alignment: 'center',
}

export function createTab(label: string): Tab {
  return {
    id: `tab-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    label,
    slug: label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    sections: [{
      id: `section-${Date.now()}`,
      layout: 'full-width',
      columns: [{ id: `col-${Date.now()}`, elements: [] }],
    }],
  }
}
