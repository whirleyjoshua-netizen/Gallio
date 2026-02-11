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

interface CatalogHeaderProps {
  config: HeaderCardConfig
}

export function CatalogHeader({ config }: CatalogHeaderProps) {
  const coverH = config.coverHeight || 320
  const photoSize = config.photoSize || 64
  const overlayOpacity = Math.max((config.overlayOpacity || 0) / 100, 0.3)

  return (
    <div className="relative w-full" style={{ height: coverH }}>
      {/* Full-bleed cover */}
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-900">
        {config.coverImageUrl && (
          <img
            src={config.coverImageUrl}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
          style={{ opacity: Math.max(overlayOpacity * 2, 0.7) }}
        />
      </div>

      {/* Content overlaid at bottom */}
      <div className="relative z-10 h-full flex items-end">
        <div className="max-w-5xl mx-auto px-6 pb-8 w-full">
          <div className="flex items-end gap-5">
            {/* Small corner photo */}
            {config.photoPosition !== 'hidden' && config.photoUrl && (
              <div className="flex-shrink-0">
                <div className="rounded-lg border-2 border-white/40 shadow-xl overflow-hidden" style={{ width: photoSize, height: photoSize }}>
                  <img
                    src={config.photoUrl}
                    alt={config.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            <div className="flex-1">
              {config.name && (
                <h1 className="text-4xl font-bold text-white drop-shadow-lg">{config.name}</h1>
              )}
              {config.title && (
                <p className="text-lg text-white/80 mt-1 drop-shadow">{config.title}</p>
              )}
              {config.subtitle && (
                <p className="text-sm text-white/60 drop-shadow">{config.subtitle}</p>
              )}
              {config.bio && (
                <p className="mt-2 text-sm text-white/70 max-w-2xl drop-shadow">{config.bio}</p>
              )}

              {/* Action Buttons — under info */}
              {config.actions.length > 0 && (
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  {config.actions.map((action) => {
                    const Icon = action.icon ? iconMap[action.icon] : null
                    const btnClass = colorClasses[action.color]?.[action.variant] || colorClasses.blue.solid
                    return (
                      <a
                        key={action.id}
                        href={action.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${btnClass}`}
                      >
                        {Icon && <Icon className="w-4 h-4" />}
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
  )
}
