'use client'

interface LinkedInCardProps {
  data: Record<string, any>
  style?: 'default' | 'compact' | 'detailed'
}

export function LinkedInCard({ data, style = 'default' }: LinkedInCardProps) {
  const { name, title, company, headline, profileUrl, avatarUrl, connectionCount, backgroundUrl } = data

  if (style === 'compact') {
    return (
      <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex-shrink-0 overflow-hidden border-2 border-white shadow">
          {avatarUrl ? (
            <img src={avatarUrl} alt={name || 'Profile'} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-xl font-bold">
              {(name || '?')[0]?.toUpperCase()}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-slate-900 truncate">{name || 'Your Name'}</div>
          <div className="text-sm text-slate-500 truncate">
            {title || 'Job Title'}{company ? ` at ${company}` : ''}
          </div>
          {connectionCount && (
            <div className="text-xs text-blue-600 mt-0.5">{connectionCount} connections</div>
          )}
        </div>

        {/* LinkedIn icon */}
        <div className="flex-shrink-0">
          <svg className="w-6 h-6 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </div>
      </div>
    )
  }

  // Default and detailed styles
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Banner */}
      <div className="h-24 bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 relative">
        {backgroundUrl && (
          <img src={backgroundUrl} alt="" className="w-full h-full object-cover absolute inset-0" />
        )}
      </div>

      {/* Profile section */}
      <div className="px-5 pb-5">
        {/* Avatar - overlapping banner */}
        <div className="-mt-12 mb-3">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 border-4 border-white shadow-md overflow-hidden">
            {avatarUrl ? (
              <img src={avatarUrl} alt={name || 'Profile'} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
                {(name || '?')[0]?.toUpperCase()}
              </div>
            )}
          </div>
        </div>

        {/* Name + Title */}
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-slate-900">{name || 'Your Name'}</h3>
          <p className="text-sm text-slate-600">
            {title || 'Job Title'}{company ? ` at ${company}` : ''}
          </p>
        </div>

        {/* Headline */}
        {(headline || style === 'detailed') && (
          <p className="text-sm text-slate-500 mb-3 line-clamp-2">
            {headline || 'Your professional headline...'}
          </p>
        )}

        {/* Connection count */}
        {connectionCount && (
          <p className="text-xs text-blue-600 font-medium mb-3">{connectionCount} connections</p>
        )}

        {/* Detailed extras */}
        {style === 'detailed' && (
          <div className="border-t border-slate-100 pt-3 mt-3">
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">Open to work</span>
              <span className="px-2 py-1 bg-slate-50 text-slate-600 text-xs rounded-full font-medium">Providing services</span>
            </div>
          </div>
        )}

        {/* View Profile button */}
        {profileUrl ? (
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white text-sm font-medium rounded-full hover:bg-[#004182] transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            View Profile
          </a>
        ) : (
          <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-400 text-sm font-medium rounded-full cursor-default">
            Add LinkedIn URL
          </div>
        )}
      </div>
    </div>
  )
}
