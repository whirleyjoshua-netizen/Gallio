export interface CommentTheme {
  label: string
  icon: string
  graphics: string[]        // Decorative emoji scattered in header
  headerGradient: string    // CSS gradient for the header banner
  headerText: string        // Text color on header
  cardBg: string            // Body background
  inputBg: string           // Input field bg
  inputBorder: string       // Input field border
  accent: string            // Button / avatar color
  textPrimary: string       // Main text
  textSecondary: string     // Muted text
  divider: string           // Divider line color
}

export const COMMENT_THEMES = {
  minimal: {
    label: 'Minimal',
    icon: '💬',
    graphics: ['💬', '✨', ''],
    headerGradient: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    headerText: '#1e293b',
    cardBg: '#ffffff',
    inputBg: '#f8fafc',
    inputBorder: '#e2e8f0',
    accent: '#3b82f6',
    textPrimary: '#1e293b',
    textSecondary: '#94a3b8',
    divider: '#f1f5f9',
  },
  ocean: {
    label: 'Ocean',
    icon: '🌊',
    graphics: ['🐠', '🌊', '🐚'],
    headerGradient: 'linear-gradient(135deg, #0369a1 0%, #0ea5e9 50%, #38bdf8 100%)',
    headerText: '#ffffff',
    cardBg: '#f0f9ff',
    inputBg: '#e0f2fe',
    inputBorder: '#bae6fd',
    accent: '#0284c7',
    textPrimary: '#0c4a6e',
    textSecondary: '#7dd3fc',
    divider: '#e0f2fe',
  },
  jungle: {
    label: 'Jungle',
    icon: '🌿',
    graphics: ['🦜', '🌿', '🍃'],
    headerGradient: 'linear-gradient(135deg, #14532d 0%, #15803d 50%, #22c55e 100%)',
    headerText: '#ffffff',
    cardBg: '#f0fdf4',
    inputBg: '#dcfce7',
    inputBorder: '#bbf7d0',
    accent: '#16a34a',
    textPrimary: '#14532d',
    textSecondary: '#86efac',
    divider: '#dcfce7',
  },
  space: {
    label: 'Space',
    icon: '🚀',
    graphics: ['⭐', '🪐', '🌙'],
    headerGradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4f46e5 100%)',
    headerText: '#e0e7ff',
    cardBg: '#1e1b4b',
    inputBg: '#312e81',
    inputBorder: '#4338ca',
    accent: '#818cf8',
    textPrimary: '#e0e7ff',
    textSecondary: '#6366f1',
    divider: '#312e81',
  },
  sunset: {
    label: 'Sunset',
    icon: '🌅',
    graphics: ['🌴', '☀️', '🦩'],
    headerGradient: 'linear-gradient(135deg, #9a3412 0%, #ea580c 40%, #f59e0b 100%)',
    headerText: '#ffffff',
    cardBg: '#fffbeb',
    inputBg: '#fef3c7',
    inputBorder: '#fde68a',
    accent: '#ea580c',
    textPrimary: '#78350f',
    textSecondary: '#fbbf24',
    divider: '#fef3c7',
  },
  aurora: {
    label: 'Aurora',
    icon: '✨',
    graphics: ['🦋', '✨', '💫'],
    headerGradient: 'linear-gradient(135deg, #701a75 0%, #a21caf 30%, #06b6d4 70%, #34d399 100%)',
    headerText: '#ffffff',
    cardBg: '#fdf4ff',
    inputBg: '#fae8ff',
    inputBorder: '#f0abfc',
    accent: '#a855f7',
    textPrimary: '#581c87',
    textSecondary: '#c084fc',
    divider: '#fae8ff',
  },
  cherry: {
    label: 'Cherry',
    icon: '🌸',
    graphics: ['🌸', '🎀', '🩷'],
    headerGradient: 'linear-gradient(135deg, #9f1239 0%, #e11d48 50%, #fb7185 100%)',
    headerText: '#ffffff',
    cardBg: '#fff1f2',
    inputBg: '#ffe4e6',
    inputBorder: '#fecdd3',
    accent: '#e11d48',
    textPrimary: '#881337',
    textSecondary: '#fb7185',
    divider: '#ffe4e6',
  },
  midnight: {
    label: 'Midnight',
    icon: '🌙',
    graphics: ['🦉', '🌙', '⭐'],
    headerGradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    headerText: '#e2e8f0',
    cardBg: '#0f172a',
    inputBg: '#1e293b',
    inputBorder: '#334155',
    accent: '#38bdf8',
    textPrimary: '#e2e8f0',
    textSecondary: '#64748b',
    divider: '#1e293b',
  },
} as const

export type CommentThemeKey = keyof typeof COMMENT_THEMES
