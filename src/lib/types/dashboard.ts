import type { BackgroundConfig } from './background'

export interface DashboardPrefs {
  background?: BackgroundConfig
  displayOrder?: string[]
  pinnedDisplayIds?: string[]
}

export const DEFAULT_DASHBOARD_PREFS: DashboardPrefs = {
  background: undefined,
  displayOrder: [],
  pinnedDisplayIds: [],
}
