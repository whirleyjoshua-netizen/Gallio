// Tab Navigation Types — pages within a page

import type { Section } from './canvas'

export interface Tab {
  id: string
  label: string
  slug: string             // URL-friendly identifier
  sections: Section[]      // Full canvas content for this tab
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
