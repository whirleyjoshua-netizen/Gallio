import type { HeaderCardConfig } from '@/lib/types/header-card'
import { Download, Mail, Link, Phone, Github, Linkedin } from 'lucide-react'

const iconMap = {
  download: Download,
  mail: Mail,
  link: Link,
  phone: Phone,
  github: Github,
  linkedin: Linkedin,
}

const colorClasses: Record<string, Record<string, string>> = {
  blue: { solid: 'bg-blue-500 text-white hover:bg-blue-600', outline: 'border border-white/40 text-white hover:bg-white/10 backdrop-blur-sm', ghost: 'text-white hover:bg-white/10' },
  green: { solid: 'bg-green-500 text-white hover:bg-green-600', outline: 'border border-white/40 text-white hover:bg-white/10 backdrop-blur-sm', ghost: 'text-white hover:bg-white/10' },
  purple: { solid: 'bg-purple-500 text-white hover:bg-purple-600', outline: 'border border-white/40 text-white hover:bg-white/10 backdrop-blur-sm', ghost: 'text-white hover:bg-white/10' },
  orange: { solid: 'bg-orange-500 text-white hover:bg-orange-600', outline: 'border border-white/40 text-white hover:bg-white/10 backdrop-blur-sm', ghost: 'text-white hover:bg-white/10' },
  slate: { solid: 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm', outline: 'border border-white/40 text-white hover:bg-white/10 backdrop-blur-sm', ghost: 'text-white hover:bg-white/10' },
}

interface ResumeHeaderProps {
  config: HeaderCardConfig
}

export function ResumeHeader({ config }: ResumeHeaderProps) {
  const coverH = config.coverHeight || 200
  const photoSize = config.photoSize || 144
  const overlayOpacity = Math.max((config.overlayOpacity || 0) / 100, 0.25)

  return (
    <div className="relative w-full" style={{ marginBottom: '36px' }}>
      {/* Cover image area */}
      <div className="relative w-full" style={{ height: coverH }}>
        <div className="absolute inset-0 overflow-hidden bg-gradient-to-r from-slate-800 to-slate-900">
          {config.coverImageUrl && (
            <img
              src={config.coverImageUrl}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          )}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
            style={{ opacity: Math.max(overlayOpacity * 2, 0.6) }}
          />
        </div>

        {/* Content — left-aligned, pinned to bottom, peeking out */}
        <div
          className="absolute inset-x-0 bottom-0 z-10"
          style={{ transform: 'translateY(32px)' }}
        >
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex items-end gap-5">
              {/* Profile Photo */}
              {config.photoPosition !== 'hidden' && config.photoUrl && (
                <div className="flex-shrink-0">
                  <div className="rounded-xl border-4 border-white shadow-2xl overflow-hidden bg-slate-200 ring-4 ring-white/20" style={{ width: photoSize, height: photoSize }}>
                    <img
                      src={config.photoUrl}
                      alt={config.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Text + Buttons */}
              <div className="flex-1 min-w-0 pb-1">
                {config.name && (
                  <h1 className="text-2xl font-bold text-white drop-shadow-lg">{config.name}</h1>
                )}
                {config.title && (
                  <p className="text-sm text-white/80 mt-0.5 drop-shadow">{config.title}</p>
                )}
                {config.subtitle && (
                  <p className="text-xs text-white/60 drop-shadow">{config.subtitle}</p>
                )}
                {config.bio && (
                  <p className="mt-1.5 text-xs text-white/65 max-w-lg drop-shadow">{config.bio}</p>
                )}

                {/* Action Buttons — under info */}
                {config.actions.length > 0 && (
                  <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                    {config.actions.map((action) => {
                      const Icon = action.icon ? iconMap[action.icon] : null
                      const btnClass = colorClasses[action.color]?.[action.variant] || colorClasses.blue.solid
                      return (
                        <a
                          key={action.id}
                          href={action.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${btnClass}`}
                        >
                          {Icon && <Icon className="w-3.5 h-3.5" />}
                          {action.label}
                        </a>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
