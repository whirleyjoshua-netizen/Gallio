'use client'

import {
  Package, Star, Zap, TrendingUp, Crown, Users, Lightbulb,
  Shield, Handshake, Lock, ClipboardCheck, Sprout, ShieldCheck
} from 'lucide-react'

const ACHIEVEMENT_ICONS: Record<string, { icon: typeof Star; color: string }> = {
  delivery: { icon: Package, color: '#3b82f6' },
  quality: { icon: Star, color: '#f59e0b' },
  speed: { icon: Zap, color: '#ef4444' },
  impact: { icon: TrendingUp, color: '#10b981' },
  leadership: { icon: Crown, color: '#8b5cf6' },
  mentorship: { icon: Users, color: '#06b6d4' },
  innovation: { icon: Lightbulb, color: '#f97316' },
  reliability: { icon: Shield, color: '#64748b' },
  collaboration: { icon: Handshake, color: '#ec4899' },
  security: { icon: Lock, color: '#14b8a6' },
  compliance: { icon: ClipboardCheck, color: '#6366f1' },
  growth: { icon: Sprout, color: '#22c55e' },
}

interface VouchCardProps {
  data: Record<string, any>
  style?: 'default' | 'compact' | 'detailed'
}

export function VouchCard({ data, style = 'default' }: VouchCardProps) {
  const {
    name, title, company, avatarUrl,
    referenceCount = 0, managerReferences = 0, peerReferences = 0,
    reportReferences = 0, clientReferences = 0,
    topAchievements = [], verifiedReferences = 0,
    latestRating, latestPeriod, isPlaceholder,
  } = data

  if (style === 'compact') {
    return (
      <div className="relative flex items-center gap-4 p-4 bg-white rounded-xl border border-emerald-200 shadow-sm">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex-shrink-0 overflow-hidden border-2 border-white shadow">
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
          <div className="flex items-center gap-2 mt-0.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs text-emerald-600 font-medium">{verifiedReferences} verified references</span>
          </div>
        </div>

        {isPlaceholder && (
          <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-amber-50 text-amber-600 text-[10px] font-medium rounded">
            Preview
          </div>
        )}
      </div>
    )
  }

  // Default and detailed styles
  return (
    <div className="relative bg-white rounded-xl border border-emerald-200 shadow-sm overflow-hidden">
      {/* Header gradient */}
      <div className="h-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

      <div className="p-5">
        {/* Profile header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex-shrink-0 overflow-hidden border-2 border-white shadow-md">
            {avatarUrl ? (
              <img src={avatarUrl} alt={name || 'Profile'} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-xl font-bold">
                {(name || '?')[0]?.toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-900 truncate">{name || 'Your Name'}</h3>
            <p className="text-sm text-slate-500">
              {title || 'Job Title'}{company ? ` at ${company}` : ''}
            </p>
          </div>
          <ShieldCheck className="w-6 h-6 text-emerald-500 flex-shrink-0" />
        </div>

        {/* Reference summary */}
        <div className="bg-slate-50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">References</span>
            <span className="text-lg font-bold text-emerald-600">{referenceCount}</span>
          </div>
          <div className="flex gap-1">
            {managerReferences > 0 && (
              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                {managerReferences} manager
              </span>
            )}
            {peerReferences > 0 && (
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                {peerReferences} peer
              </span>
            )}
            {reportReferences > 0 && (
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                {reportReferences} report
              </span>
            )}
            {clientReferences > 0 && (
              <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full">
                {clientReferences} client
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 mt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs text-emerald-600 font-medium">{verifiedReferences} verified</span>
          </div>
        </div>

        {/* Achievement badges */}
        {topAchievements.length > 0 && (
          <div className="mb-4">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 block">Achievements</span>
            <div className="flex flex-wrap gap-2">
              {topAchievements.map((achievement: any, i: number) => {
                const config = ACHIEVEMENT_ICONS[achievement.type] || ACHIEVEMENT_ICONS.delivery
                const Icon = config.icon
                return (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 rounded-lg border border-slate-100"
                    title={achievement.title}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: config.color }} />
                    <span className="text-xs font-medium text-slate-700">{achievement.title}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Latest review - detailed only */}
        {style === 'detailed' && latestRating && (
          <div className="border-t border-slate-100 pt-3">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1 block">Latest Review</span>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-900">{latestRating}</span>
              {latestPeriod && <span className="text-xs text-slate-400">{latestPeriod}</span>}
            </div>
          </div>
        )}
      </div>

      {/* Placeholder watermark */}
      {isPlaceholder && (
        <div className="absolute top-5 right-4 px-2 py-1 bg-amber-50 text-amber-600 text-[10px] font-medium rounded border border-amber-200">
          Preview Data
        </div>
      )}
    </div>
  )
}
