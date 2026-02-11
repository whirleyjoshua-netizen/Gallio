import type { Column, CanvasElement, ColumnSettings } from '@/lib/types/canvas'
import { DEFAULT_COLUMN_SETTINGS } from '@/lib/types/canvas'
import { TrendingUp, TrendingDown, Minus, Info, AlertTriangle, CheckCircle, XCircle, ChevronRight, Star } from 'lucide-react'
import { PublicChartElement } from '@/components/elements/PublicChartElement'
import { PublicCardElement } from '@/components/elements/PublicCardElement'
import { PublicCodeElement } from '@/components/elements/PublicCodeElement'
import { PublicCommentSection } from '@/components/elements/PublicCommentSection'
import { PublicPollElement } from '@/components/elements/PublicPollElement'

export function getGridClass(layout: string): string {
  switch (layout) {
    case 'two-column':
      return 'grid-cols-1 md:grid-cols-2'
    case 'three-column':
      return 'grid-cols-1 md:grid-cols-3'
    default:
      return 'grid-cols-1'
  }
}

export function getColumnStyles(column: Column): React.CSSProperties {
  const settings = column.settings || DEFAULT_COLUMN_SETTINGS

  const styles: React.CSSProperties = {
    borderRadius: `${settings.borderRadius}px`,
    padding: `${settings.padding}px`,
  }

  if (settings.background === 'solid') {
    styles.backgroundColor = settings.backgroundColor
  } else if (settings.background === 'translucent') {
    styles.backgroundColor = `${settings.backgroundColor}80`
    styles.backdropFilter = 'blur(12px)'
    styles.WebkitBackdropFilter = 'blur(12px)'
    styles.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
    if (!settings.borderVisible) {
      styles.border = '1px solid rgba(255, 255, 255, 0.2)'
    }
  }

  if (settings.borderVisible) {
    styles.border = `1px solid ${settings.borderColor}`
  }

  return styles
}

export function renderElement(element: CanvasElement, displayId?: string) {
  switch (element.type) {
    case 'text':
      return (
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: element.content || '' }}
        />
      )

    case 'heading': {
      const level = element.level || 2
      const sizeClass =
        level === 1 ? 'text-4xl' :
        level === 2 ? 'text-3xl' :
        level === 3 ? 'text-2xl' :
        level === 4 ? 'text-xl' :
        level === 5 ? 'text-lg' :
        'text-base'
      return (
        <div
          className={`${sizeClass} font-bold`}
          dangerouslySetInnerHTML={{ __html: element.content || '' }}
        />
      )
    }

    case 'image':
      return element.url ? (
        <figure className="rounded-lg overflow-hidden">
          <img
            src={element.url}
            alt={element.alt || ''}
            className="w-full"
          />
          {element.caption && (
            <figcaption className="mt-2 text-sm opacity-70 text-center italic">
              {element.caption}
            </figcaption>
          )}
        </figure>
      ) : null

    case 'embed': {
      const url = element.embedUrl || ''
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = extractYouTubeId(url)
        if (videoId) {
          return (
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          )
        }
      }
      if (url.includes('vimeo.com')) {
        const videoId = extractVimeoId(url)
        if (videoId) {
          return (
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src={`https://player.vimeo.com/video/${videoId}`}
                className="w-full h-full"
                allowFullScreen
                allow="autoplay; fullscreen; picture-in-picture"
              />
            </div>
          )
        }
      }
      return url ? (
        <div className="p-4 rounded-lg bg-black/5">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80"
          >
            {url}
          </a>
        </div>
      ) : null
    }

    case 'button': {
      const buttonColorClasses: Record<string, Record<string, string>> = {
        blue: {
          solid: 'bg-blue-600 text-white hover:bg-blue-700',
          outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
          ghost: 'text-blue-600 hover:bg-blue-50',
        },
        green: {
          solid: 'bg-green-600 text-white hover:bg-green-700',
          outline: 'border-2 border-green-600 text-green-600 hover:bg-green-50',
          ghost: 'text-green-600 hover:bg-green-50',
        },
        red: {
          solid: 'bg-red-600 text-white hover:bg-red-700',
          outline: 'border-2 border-red-600 text-red-600 hover:bg-red-50',
          ghost: 'text-red-600 hover:bg-red-50',
        },
        purple: {
          solid: 'bg-purple-600 text-white hover:bg-purple-700',
          outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50',
          ghost: 'text-purple-600 hover:bg-purple-50',
        },
        orange: {
          solid: 'bg-orange-600 text-white hover:bg-orange-700',
          outline: 'border-2 border-orange-600 text-orange-600 hover:bg-orange-50',
          ghost: 'text-orange-600 hover:bg-orange-50',
        },
        slate: {
          solid: 'bg-slate-800 text-white hover:bg-slate-900',
          outline: 'border-2 border-slate-800 text-slate-800 hover:bg-slate-50',
          ghost: 'text-slate-800 hover:bg-slate-50',
        },
      }
      const color = element.buttonColor || 'blue'
      const variant = element.buttonVariant || 'solid'
      const btnClass = buttonColorClasses[color]?.[variant] || buttonColorClasses.blue.solid
      const alignClass =
        element.buttonAlign === 'center' ? 'flex justify-center' :
        element.buttonAlign === 'right' ? 'flex justify-end' :
        'flex justify-start'

      const btn = element.buttonUrl ? (
        <a
          href={element.buttonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${btnClass}`}
        >
          {element.buttonText || 'Click me'}
        </a>
      ) : (
        <span
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${btnClass}`}
        >
          {element.buttonText || 'Click me'}
        </span>
      )

      return <div className={alignClass}>{btn}</div>
    }

    case 'list': {
      const ListTag = element.listType === 'numbered' ? 'ol' : 'ul'
      const listClass = element.listType === 'numbered' ? 'list-decimal' : 'list-disc'
      const cols = element.listColumns || 1
      const columnClass =
        cols === 3 ? 'columns-3 gap-x-6' :
        cols === 2 ? 'columns-2 gap-x-6' :
        ''
      return (
        <div>
          {element.listTitle && (
            <div className="font-semibold text-lg mb-2">{element.listTitle}</div>
          )}
          <ListTag className={`${listClass} ml-6 space-y-1 ${columnClass}`}>
            {(element.items || []).map((item, i) => (
              <li key={i} className="break-inside-avoid">{item}</li>
            ))}
          </ListTag>
        </div>
      )
    }

    case 'quote':
      return (
        <blockquote className="border-l-4 border-primary/50 pl-4 py-2">
          <p className="text-lg italic">{element.quoteText}</p>
          {element.quoteAuthor && (
            <footer className="mt-2 text-sm opacity-70">
              — {element.quoteAuthor}
            </footer>
          )}
        </blockquote>
      )

    case 'kpi': {
      const kpiGradients: Record<string, { gradient: string; text: string; dot: string; border: string }> = {
        blue: { gradient: 'from-blue-500 to-blue-600', text: 'text-blue-600', dot: 'bg-blue-500', border: 'border-blue-100' },
        green: { gradient: 'from-green-500 to-green-600', text: 'text-green-600', dot: 'bg-green-500', border: 'border-green-100' },
        red: { gradient: 'from-red-500 to-red-600', text: 'text-red-600', dot: 'bg-red-500', border: 'border-red-100' },
        purple: { gradient: 'from-purple-500 to-purple-600', text: 'text-purple-600', dot: 'bg-purple-500', border: 'border-purple-100' },
        orange: { gradient: 'from-orange-500 to-orange-600', text: 'text-orange-600', dot: 'bg-orange-500', border: 'border-orange-100' },
        slate: { gradient: 'from-slate-500 to-slate-600', text: 'text-slate-600', dot: 'bg-slate-500', border: 'border-slate-100' },
      }
      const kpiColor = element.kpiColor || 'blue'
      const kpiTheme = kpiGradients[kpiColor] || kpiGradients.blue

      const TrendIcon =
        element.kpiTrend === 'up' ? TrendingUp :
        element.kpiTrend === 'down' ? TrendingDown : Minus

      const trendClass =
        element.kpiTrend === 'up' ? 'text-emerald-600 bg-emerald-50' :
        element.kpiTrend === 'down' ? 'text-red-600 bg-red-50' :
        'text-slate-500 bg-slate-50'

      return (
        <div className={`relative rounded-2xl bg-white border shadow-sm ${kpiTheme.border} overflow-hidden`}>
          <div className={`absolute top-0 left-4 right-4 h-1 rounded-b-full bg-gradient-to-r ${kpiTheme.gradient}`} />
          <div className="p-5 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2 h-2 rounded-full ${kpiTheme.dot}`} />
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{element.kpiLabel}</div>
            </div>
            <div className={`text-4xl font-extrabold tracking-tight ${kpiTheme.text} mb-2`}>
              {element.kpiPrefix}
              {element.kpiValue}
              {element.kpiSuffix && <span className="text-lg font-semibold opacity-70 ml-0.5">{element.kpiSuffix}</span>}
            </div>
            {element.kpiTrend && element.kpiTrend !== 'neutral' && (
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${trendClass}`}>
                <TrendIcon className="w-3.5 h-3.5" />
                {element.kpiTrendValue && <span>{element.kpiTrendValue}</span>}
              </div>
            )}
          </div>
        </div>
      )
    }

    case 'table':
      return (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                {(element.tableHeaders || []).map((header, i) => (
                  <th key={i} className="px-4 py-3 text-left text-sm font-medium">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(element.tableRows || []).map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t border-border">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-3 text-sm">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'callout': {
      const calloutStyles: Record<string, { bg: string; border: string; icon: typeof Info }> = {
        info: { bg: 'bg-blue-50', border: 'border-blue-200', icon: Info },
        warning: { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: AlertTriangle },
        success: { bg: 'bg-green-50', border: 'border-green-200', icon: CheckCircle },
        error: { bg: 'bg-red-50', border: 'border-red-200', icon: XCircle },
      }
      const calloutType = element.calloutType || 'info'
      const calloutStyle = calloutStyles[calloutType] || calloutStyles.info
      const CalloutIcon = calloutStyle.icon

      return (
        <div className={`rounded-lg p-4 border ${calloutStyle.bg} ${calloutStyle.border}`}>
          <div className="flex items-start gap-3">
            <CalloutIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              {element.calloutTitle && (
                <div className="font-medium mb-1">{element.calloutTitle}</div>
              )}
              <div className="text-sm opacity-80">{element.calloutContent}</div>
            </div>
          </div>
        </div>
      )
    }

    case 'toggle':
      return (
        <details className="rounded-lg border border-border">
          <summary className="px-4 py-3 cursor-pointer font-medium flex items-center gap-2 hover:bg-muted/50 transition-colors">
            <ChevronRight className="w-4 h-4 transition-transform details-open:rotate-90" />
            {element.toggleTitle}
          </summary>
          <div className="px-4 py-3 border-t border-border text-sm">
            {element.toggleContent}
          </div>
        </details>
      )

    case 'mcq':
      return (
        <div className="p-4 bg-muted/30 rounded-lg border border-border">
          <div className="text-lg font-medium mb-4">
            {element.mcqQuestion}
            {element.mcqRequired && <span className="text-destructive ml-1">*</span>}
          </div>
          <div className="space-y-2">
            {(element.mcqOptions || []).map((option, index) => (
              <label key={index} className="flex items-center gap-3 p-2 rounded hover:bg-muted/50 cursor-pointer">
                {element.mcqAllowMultiple ? (
                  <input type="checkbox" className="w-4 h-4 rounded" />
                ) : (
                  <input type="radio" name={`mcq-${element.id}`} className="w-4 h-4" />
                )}
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      )

    case 'rating': {
      const ratingMax = element.ratingMax || 5
      return (
        <div className="p-4 bg-muted/30 rounded-lg border border-border">
          <div className="text-lg font-medium mb-4">
            {element.ratingQuestion}
            {element.ratingRequired && <span className="text-destructive ml-1">*</span>}
          </div>
          {element.ratingStyle === 'stars' ? (
            <div className="flex items-center gap-1">
              {Array.from({ length: ratingMax }, (_, i) => (
                <button key={i} className="p-1 hover:scale-110 transition-transform">
                  <Star className="w-8 h-8 text-muted-foreground/30 hover:fill-yellow-400 hover:text-yellow-400 transition-colors" />
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {Array.from({ length: ratingMax }, (_, i) => (
                <button
                  key={i}
                  className="w-10 h-10 rounded-lg border-2 border-border font-medium hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )
    }

    case 'shortanswer':
      return (
        <div className="p-4 bg-muted/30 rounded-lg border border-border">
          <div className="text-lg font-medium mb-3">
            {element.shortAnswerQuestion}
            {element.shortAnswerRequired && <span className="text-destructive ml-1">*</span>}
          </div>
          <textarea
            placeholder={element.shortAnswerPlaceholder}
            maxLength={element.shortAnswerMaxLength}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={3}
          />
        </div>
      )

    case 'chart':
      return <PublicChartElement element={element} />

    case 'code':
      return <PublicCodeElement element={element} />

    case 'card':
      return <PublicCardElement element={element} />

    case 'comment':
      return <PublicCommentSection element={element} displayId={displayId || ''} />

    case 'poll':
      return <PublicPollElement element={element} displayId={displayId || ''} />

    default:
      return null
  }
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  )
  return match ? match[1] : null
}

function extractVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/)
  return match ? match[1] : null
}
