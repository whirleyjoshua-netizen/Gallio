// Background Configuration Types

export interface BackgroundConfig {
  type: 'solid' | 'gradient' | 'pattern' | 'image'
  // Solid color
  solidColor?: string
  // Gradient
  gradient?: {
    type: 'linear' | 'radial'
    direction?: string
    colors: string[]
  }
  // Pattern
  patternId?: string
  // Custom image
  imageUrl?: string
  imageMode?: 'cover' | 'contain' | 'tile'
  // Behavior
  scrollBehavior: 'fixed' | 'scroll'
  opacity: number
}

// Preset gradients
export const PRESET_GRADIENTS = [
  { id: 'ocean', name: 'Ocean Blue', colors: ['#667eea', '#764ba2'], direction: '135deg' },
  { id: 'sunset', name: 'Sunset', colors: ['#f093fb', '#f5576c'], direction: '135deg' },
  { id: 'forest', name: 'Forest', colors: ['#4facfe', '#00f2fe'], direction: '135deg' },
  { id: 'purple', name: 'Purple Haze', colors: ['#a8edea', '#fed6e3'], direction: '135deg' },
  { id: 'fire', name: 'Fire', colors: ['#ff9a56', '#ff6a88'], direction: '135deg' },
  { id: 'northern', name: 'Northern Lights', colors: ['#2af598', '#009efd'], direction: '135deg' },
  { id: 'midnight', name: 'Midnight', colors: ['#0f0c29', '#302b63', '#24243e'], direction: '135deg' },
  { id: 'peach', name: 'Peach', colors: ['#ffecd2', '#fcb69f'], direction: '135deg' },
]

// Preset patterns
export const PRESET_PATTERNS = [
  {
    id: 'dots',
    name: 'Dots',
    css: 'radial-gradient(circle, #ddd 1px, transparent 1px)',
    size: '20px 20px',
  },
  {
    id: 'grid',
    name: 'Grid',
    css: 'linear-gradient(#ddd 1px, transparent 1px), linear-gradient(90deg, #ddd 1px, transparent 1px)',
    size: '20px 20px',
  },
  {
    id: 'diagonal',
    name: 'Diagonal Lines',
    css: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #ddd 10px, #ddd 11px)',
    size: 'auto',
  },
  {
    id: 'zigzag',
    name: 'Zigzag',
    css: 'linear-gradient(135deg, #f5f5f5 25%, transparent 25%), linear-gradient(225deg, #f5f5f5 25%, transparent 25%)',
    size: '20px 40px',
  },
]

// Preset solid colors
export const PRESET_COLORS = [
  // Whites & Grays
  '#ffffff', '#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8',
  // Darks
  '#64748b', '#475569', '#334155', '#1e293b', '#0f172a', '#000000',
  // Reds
  '#fef2f2', '#fee2e2', '#fca5a5', '#ef4444', '#dc2626', '#b91c1c',
  // Oranges
  '#fff7ed', '#ffedd5', '#fdba74', '#f97316', '#ea580c', '#c2410c',
  // Yellows
  '#fefce8', '#fef3c7', '#fde68a', '#fcd34d', '#f59e0b', '#d97706',
  // Greens
  '#f0fdf4', '#dcfce7', '#86efac', '#22c55e', '#16a34a', '#15803d',
  // Blues
  '#eff6ff', '#dbeafe', '#93c5fd', '#3b82f6', '#2563eb', '#1d4ed8',
  // Purples
  '#faf5ff', '#f3e8ff', '#d8b4fe', '#a855f7', '#9333ea', '#7e22ce',
  // Pinks
  '#fdf2f8', '#fce7f3', '#f9a8d4', '#ec4899', '#db2777', '#be185d',
]

// Default background config
export const DEFAULT_BACKGROUND_CONFIG: BackgroundConfig = {
  type: 'solid',
  solidColor: '#ffffff',
  scrollBehavior: 'scroll',
  opacity: 100,
}

// Generate CSS styles from background config
export function getBackgroundStyles(config: BackgroundConfig): React.CSSProperties {
  const styles: React.CSSProperties = {
    backgroundAttachment: config.scrollBehavior === 'fixed' ? 'fixed' : 'scroll',
    opacity: config.opacity / 100,
  }

  switch (config.type) {
    case 'solid':
      styles.backgroundColor = config.solidColor || '#ffffff'
      break

    case 'gradient':
      if (config.gradient) {
        const { type, direction, colors } = config.gradient
        if (type === 'linear') {
          styles.backgroundImage = `linear-gradient(${direction || '135deg'}, ${colors.join(', ')})`
        } else {
          styles.backgroundImage = `radial-gradient(circle, ${colors.join(', ')})`
        }
      }
      break

    case 'pattern':
      const pattern = PRESET_PATTERNS.find((p) => p.id === config.patternId)
      if (pattern) {
        styles.backgroundImage = pattern.css
        styles.backgroundSize = pattern.size
        styles.backgroundColor = '#ffffff'
      }
      break

    case 'image':
      if (config.imageUrl) {
        styles.backgroundImage = `url(${config.imageUrl})`
        switch (config.imageMode) {
          case 'cover':
            styles.backgroundSize = 'cover'
            styles.backgroundPosition = 'center'
            styles.backgroundRepeat = 'no-repeat'
            break
          case 'contain':
            styles.backgroundSize = 'contain'
            styles.backgroundPosition = 'center'
            styles.backgroundRepeat = 'no-repeat'
            break
          case 'tile':
            styles.backgroundRepeat = 'repeat'
            break
        }
      }
      break
  }

  return styles
}
