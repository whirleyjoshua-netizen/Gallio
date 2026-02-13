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

interface ProfileHeaderProps {
  config: HeaderCardConfig
}

export function ProfileHeader({ config }: ProfileHeaderProps) {
  const coverH = config.coverHeight || 280
  const photoSize = config.photoSize || 160
  const overlayOpacity = Math.max((config.overlayOpacity || 0) / 100, 0.25)

  return (
    <div className="relative w-full">
      {/* Cover image area */}
      <div className="relative w-full" style={{ height: coverH }}>
        <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          {config.coverImageUrl && (
            <img
              src={config.coverImageUrl}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          )}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
            style={{ opacity: Math.max(overlayOpacity * 2, 0.6) }}
          />
        </div>

        {/* Content — centered, pinned to bottom, peeking out */}
        <div
          className="absolute inset-x-0 bottom-0 z-10"
          style={{ transform: 'translateY(44px)' }}
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            {/* Profile Photo */}
            {config.photoPosition !== 'hidden' && config.photoUrl && (
              <div className="inline-block mb-3">
                <div className="rounded-full border-4 border-white shadow-2xl overflow-hidden bg-slate-200 ring-4 ring-white/20" style={{ width: photoSize, height: photoSize }}>
                  <img
                    src={config.photoUrl}
                    alt={config.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Name + Info */}
            {config.name && (
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">{config.name}</h1>
            )}
            {config.title && (
              <p className="text-base text-white/85 mt-1 drop-shadow">{config.title}</p>
            )}
            {config.subtitle && (
              <p className="text-sm text-white/65 mt-0.5 drop-shadow">{config.subtitle}</p>
            )}
            {config.bio && (
              <p className="mt-2 text-sm text-white/70 max-w-xl mx-auto drop-shadow">{config.bio}</p>
            )}

            {/* Action Buttons — under info */}
            {config.actions.length > 0 && (
              <div className="flex items-center justify-center gap-2.5 mt-3 flex-wrap">
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
  )
}
