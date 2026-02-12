import type { Section, CanvasElement } from '@/lib/types/canvas'
import type { TabsConfig, Tab } from '@/lib/types/tabs'
import type { HeaderCardConfig } from '@/lib/types/header-card'
import type { KitPageConfig } from '@/lib/types/kit'
import type { KitConfig } from './registry'

let counter = 0
function uid(prefix: string) {
  counter++
  return `${prefix}-${Date.now()}-${counter}-${Math.random().toString(36).substr(2, 6)}`
}

function makeSection(elements: CanvasElement[], layout: 'full-width' | 'two-column' | 'three-column' = 'full-width'): Section {
  const colCount = layout === 'full-width' ? 1 : layout === 'two-column' ? 2 : 3
  const columns = []
  for (let i = 0; i < colCount; i++) {
    columns.push({
      id: uid('col'),
      elements: i === 0 ? elements : [],
    })
  }
  return { id: uid('section'), layout, columns }
}

function makeElement(type: string, overrides: Partial<CanvasElement> = {}): CanvasElement {
  return { id: uid('el'), type: type as any, ...overrides }
}

export function generateKitDisplay(kit: KitConfig, userName: string) {
  counter = 0

  // Build tabs based on kit modules
  const tabs: Tab[] = kit.modules.map(mod => {
    const tabSections: Section[] = []

    switch (mod.id) {
      case 'profile':
        tabSections.push(
          makeSection([
            makeElement('kit-profile', {
              kitProfileKitId: kit.id,
              kitProfileData: {},
              kitProfileLayout: 'card',
            }),
          ])
        )
        break

      case 'performance':
        // Add tracker elements for non-game-stat trackers
        for (const tracker of kit.trackers.filter(t => t.category !== 'game-stat')) {
          tabSections.push(
            makeSection([
              makeElement('tracker', {
                trackerKitId: kit.id,
                trackerConfigId: tracker.id,
                trackerTitle: tracker.label,
                trackerColor: tracker.color,
                trackerChartType: tracker.visualization,
                trackerShowSummary: true,
                trackerTimeRange: 'all',
              }),
            ])
          )
        }
        break

      case 'stats':
        // Add game-stat trackers
        for (const tracker of kit.trackers.filter(t => t.category === 'game-stat')) {
          tabSections.push(
            makeSection([
              makeElement('tracker', {
                trackerKitId: kit.id,
                trackerConfigId: tracker.id,
                trackerTitle: tracker.label,
                trackerColor: tracker.color,
                trackerChartType: tracker.visualization,
                trackerShowSummary: true,
                trackerTimeRange: 'all',
              }),
            ])
          )
        }
        break

      case 'highlights':
        tabSections.push(
          makeSection([
            makeElement('heading', { content: 'My Highlights', level: 2 }),
            makeElement('text', { content: '<p>Add your highlight videos, photos, and media here. Use the embed element for YouTube/Hudl links.</p>' }),
          ])
        )
        break

      case 'about':
        tabSections.push(
          makeSection([
            makeElement('heading', { content: 'About Me', level: 2 }),
            makeElement('text', { content: '<p>Tell your story...</p>' }),
            makeElement('heading', { content: 'Why I Play', level: 3 }),
            makeElement('text', { content: '<p>What drives you?</p>' }),
            makeElement('heading', { content: 'Goals', level: 3 }),
            makeElement('text', { content: '<p>What are you working toward?</p>' }),
          ])
        )
        break

      default:
        tabSections.push(makeSection([]))
    }

    // Ensure at least one section
    if (tabSections.length === 0) {
      tabSections.push(makeSection([]))
    }

    return {
      id: uid('tab'),
      label: mod.tabLabel,
      slug: mod.tabLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      sections: tabSections,
    }
  })

  const tabsConfig: TabsConfig = {
    enabled: true,
    tabs,
    style: 'pills',
    alignment: 'center',
  }

  // Header card config
  const headerCard: HeaderCardConfig = {
    enabled: true,
    template: kit.defaultHeaderCard.template,
    name: userName,
    title: '',
    subtitle: '',
    photoUrl: '',
    photoPosition: kit.defaultHeaderCard.photoPosition as any,
    actions: [],
    textAlignment: 'center',
  }

  // Kit config for the Display
  const kitConfig: KitPageConfig = {
    kitId: kit.id,
    version: 1,
    profile: {},
  }

  // Top-level sections = first tab's sections (for backward compat)
  const sections = tabs[0]?.sections || []

  return { sections, tabs: tabsConfig, headerCard, kitConfig }
}
