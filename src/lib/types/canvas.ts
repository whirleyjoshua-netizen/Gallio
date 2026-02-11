// Canvas Types - Section/Column/Element Architecture

// Layout modes for sections
export type LayoutMode = 'full-width' | 'two-column' | 'three-column'

// Element types (Tier 1 + Tier 2 + Tier 3)
export type ElementType =
  | 'text'
  | 'heading'
  | 'image'
  | 'embed'
  | 'button'
  | 'list'
  | 'quote'
  // Tier 2: Differentiators
  | 'kpi'
  | 'table'
  | 'callout'
  | 'toggle'
  // Tier 3: Form elements
  | 'mcq'       // Multiple choice question
  | 'rating'    // Star/numeric rating
  | 'shortanswer' // Short text input
  // Tier 3: Premium elements
  | 'chart'     // Bar, line, pie charts with 3D effects
  // Tier 3: Premium elements
  | 'code'      // Code block with syntax highlighting
  // Tier 4: Social / Engagement
  | 'comment'   // Comment section for visitor feedback
  | 'poll'      // Poll with voting
  // Tier 5: Integration cards (on hold)
  | 'card'      // App cards (LinkedIn, Vouch, custom)

// Base element interface
export interface CanvasElement {
  id: string
  type: ElementType
  content?: string
  // Heading specific
  level?: 1 | 2 | 3 | 4 | 5 | 6
  // Image specific
  url?: string
  alt?: string
  caption?: string
  // Embed specific
  embedUrl?: string
  embedType?: 'youtube' | 'vimeo' | 'twitter' | 'other'
  // Button specific
  buttonText?: string
  buttonUrl?: string
  buttonVariant?: 'solid' | 'outline' | 'ghost'
  buttonColor?: 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'slate'
  buttonAlign?: 'left' | 'center' | 'right'
  // List specific
  listType?: 'bulleted' | 'numbered'
  listTitle?: string
  listColumns?: 1 | 2 | 3
  items?: string[]
  // Quote specific
  quoteText?: string
  quoteAuthor?: string
  // KPI/Stat specific
  kpiLabel?: string
  kpiValue?: string
  kpiPrefix?: string
  kpiSuffix?: string
  kpiTrend?: 'up' | 'down' | 'neutral'
  kpiTrendValue?: string
  kpiColor?: 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'slate'
  // Table specific
  tableHeaders?: string[]
  tableRows?: string[][]
  // Callout specific
  calloutType?: 'info' | 'warning' | 'success' | 'error'
  calloutTitle?: string
  calloutContent?: string
  // Toggle specific
  toggleTitle?: string
  toggleContent?: string
  toggleOpen?: boolean
  // MCQ (Multiple Choice Question) specific
  mcqQuestion?: string
  mcqOptions?: string[]
  mcqAllowMultiple?: boolean
  mcqRequired?: boolean
  // Rating specific
  ratingQuestion?: string
  ratingMax?: number  // 5 or 10
  ratingStyle?: 'stars' | 'numeric'
  ratingRequired?: boolean
  // Short Answer specific
  shortAnswerQuestion?: string
  shortAnswerPlaceholder?: string
  shortAnswerRequired?: boolean
  shortAnswerMaxLength?: number
  // Chart specific
  chartType?: 'bar' | 'line' | 'pie'
  chartTitle?: string
  chartData?: { label: string; value: number; color?: string }[]
  chartMultiLineData?: {
    labels: string[]
    series: { name: string; color: string; values: number[] }[]
    yAxisLabels?: string[]
  }
  chartEnable3D?: boolean
  chartEnableGlow?: boolean
  chartEnableGradient?: boolean
  chartShowValues?: boolean
  chartShowLegend?: boolean
  chartShowGrid?: boolean
  chartNodeSize?: number  // Line chart dot size in px (0 = hidden, default 8)
  // Code block specific
  codeContent?: string
  codeLanguage?: string
  codeTheme?: 'dark' | 'light'
  codeShowLineNumbers?: boolean
  codeFilename?: string
  // Card specific
  cardProvider?: string    // 'linkedin' | 'vouch' | 'custom'
  cardData?: Record<string, any>  // Provider-specific data (JSON)
  cardStyle?: 'default' | 'compact' | 'detailed'
  // Comment specific
  commentTitle?: string
  commentRequireName?: boolean
  commentRequireEmail?: boolean
  commentModerated?: boolean       // If true, comments need approval
  commentMaxLength?: number
  commentTheme?: string            // Preset theme key
  // Poll specific
  pollQuestion?: string
  pollOptions?: string[]
  pollAllowMultiple?: boolean
  pollShowResultsBeforeVote?: boolean
}

// Column settings for styling
export interface ColumnSettings {
  background: 'transparent' | 'translucent' | 'solid'
  backgroundColor: string
  borderVisible: boolean
  borderColor: string
  borderRadius: number
  padding: number
}

// Column structure
export interface Column {
  id: string
  elements: CanvasElement[]
  settings?: ColumnSettings
}

// Section structure
export interface Section {
  id: string
  layout: LayoutMode
  columns: Column[]
}

// Default column settings
export const DEFAULT_COLUMN_SETTINGS: ColumnSettings = {
  background: 'transparent',
  backgroundColor: '#ffffff',
  borderVisible: false,
  borderColor: '#e2e8f0',
  borderRadius: 8,
  padding: 16,
}

// Helper to create a new section
export function createSection(layout: LayoutMode): Section {
  const columnCount = layout === 'full-width' ? 1 : layout === 'two-column' ? 2 : 3
  const columns: Column[] = []

  for (let i = 0; i < columnCount; i++) {
    columns.push({
      id: `col-${Date.now()}-${i}`,
      elements: [],
    })
  }

  return {
    id: `section-${Date.now()}`,
    layout,
    columns,
  }
}

// Helper to create a new element with defaults
export function createElement(type: ElementType): CanvasElement {
  const base: CanvasElement = {
    id: `el-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
  }

  switch (type) {
    case 'text':
      return { ...base, content: '' }
    case 'heading':
      return { ...base, content: '', level: 2 }
    case 'image':
      return { ...base, url: '', alt: '', caption: '' }
    case 'embed':
      return { ...base, embedUrl: '', embedType: 'youtube' }
    case 'button':
      return {
        ...base,
        buttonText: 'Click me',
        buttonUrl: '',
        buttonVariant: 'solid',
        buttonColor: 'blue',
        buttonAlign: 'left',
      }
    case 'list':
      return { ...base, listType: 'bulleted', listTitle: '', listColumns: 1, items: [''] }
    case 'quote':
      return { ...base, quoteText: '', quoteAuthor: '' }
    case 'kpi':
      return {
        ...base,
        kpiLabel: 'Metric',
        kpiValue: '0',
        kpiPrefix: '',
        kpiSuffix: '',
        kpiTrend: 'neutral',
        kpiTrendValue: '',
        kpiColor: 'blue',
      }
    case 'table':
      return {
        ...base,
        tableHeaders: ['Column 1', 'Column 2', 'Column 3'],
        tableRows: [['', '', '']],
      }
    case 'callout':
      return {
        ...base,
        calloutType: 'info',
        calloutTitle: '',
        calloutContent: '',
      }
    case 'toggle':
      return {
        ...base,
        toggleTitle: 'Click to expand',
        toggleContent: '',
        toggleOpen: false,
      }
    case 'mcq':
      return {
        ...base,
        mcqQuestion: 'Your question here',
        mcqOptions: ['Option 1', 'Option 2', 'Option 3'],
        mcqAllowMultiple: false,
        mcqRequired: false,
      }
    case 'rating':
      return {
        ...base,
        ratingQuestion: 'How would you rate this?',
        ratingMax: 5,
        ratingStyle: 'stars',
        ratingRequired: false,
      }
    case 'shortanswer':
      return {
        ...base,
        shortAnswerQuestion: 'Your question here',
        shortAnswerPlaceholder: 'Type your answer...',
        shortAnswerRequired: false,
        shortAnswerMaxLength: 500,
      }
    case 'chart':
      return {
        ...base,
        chartType: 'bar',
        chartTitle: 'Chart Title',
        chartData: [
          { label: 'Jan', value: 30, color: '#3b82f6' },
          { label: 'Feb', value: 45, color: '#10b981' },
          { label: 'Mar', value: 35, color: '#f59e0b' },
          { label: 'Apr', value: 55, color: '#ef4444' },
          { label: 'May', value: 40, color: '#8b5cf6' },
        ],
        chartMultiLineData: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          series: [
            { name: 'Product A', color: '#3b82f6', values: [20, 45, 35, 80] },
            { name: 'Product B', color: '#ef4444', values: [30, 25, 55, 65] },
          ],
          yAxisLabels: ['0', '25', '50', '75', '100'],
        },
        chartEnable3D: true,
        chartEnableGlow: true,
        chartEnableGradient: true,
        chartShowValues: true,
        chartShowLegend: true,
        chartShowGrid: true,
        chartNodeSize: 8,
      }
    case 'code':
      return {
        ...base,
        codeContent: '// Write your code here\nconsole.log("Hello, world!");',
        codeLanguage: 'javascript',
        codeTheme: 'dark',
        codeShowLineNumbers: true,
        codeFilename: '',
      }
    case 'card':
      return {
        ...base,
        cardProvider: 'linkedin',
        cardData: {},
        cardStyle: 'default' as const,
      }
    case 'comment':
      return {
        ...base,
        commentTitle: 'Comments',
        commentRequireName: true,
        commentRequireEmail: false,
        commentModerated: false,
        commentMaxLength: 1000,
        commentTheme: 'minimal',
      }
    case 'poll':
      return {
        ...base,
        pollQuestion: 'What do you think?',
        pollOptions: ['Option 1', 'Option 2', 'Option 3'],
        pollAllowMultiple: false,
        pollShowResultsBeforeVote: false,
      }
    default:
      return base
  }
}
