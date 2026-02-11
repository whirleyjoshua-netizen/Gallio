'use client'

import { useState, useEffect } from 'react'
import { Send } from 'lucide-react'
import type { CanvasElement } from '@/lib/types/canvas'
import { COMMENT_THEMES, type CommentThemeKey } from './comment-themes'

interface Comment {
  id: string
  authorName: string
  content: string
  createdAt: string
}

interface PublicCommentSectionProps {
  element: CanvasElement
  displayId: string
}

export function PublicCommentSection({ element, displayId }: PublicCommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const title = element.commentTitle || 'Comments'
  const requireName = element.commentRequireName ?? true
  const requireEmail = element.commentRequireEmail ?? false
  const maxLength = element.commentMaxLength ?? 1000
  const themeKey = (element.commentTheme || 'minimal') as CommentThemeKey
  const theme = COMMENT_THEMES[themeKey] || COMMENT_THEMES.minimal

  useEffect(() => {
    if (!displayId) return
    fetch(`/api/displays/${displayId}/comments`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setComments(data)
      })
      .catch(() => {})
  }, [displayId])

  const handleSubmit = async () => {
    if (!content.trim()) return
    if (requireName && !name.trim()) { setError('Name is required'); return }
    if (requireEmail && !email.trim()) { setError('Email is required'); return }

    setSubmitting(true)
    setError('')

    try {
      const res = await fetch(`/api/displays/${displayId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName: name.trim() || 'Anonymous',
          authorEmail: email.trim() || undefined,
          content: content.trim(),
        }),
      })

      if (res.ok) {
        const newComment = await res.json()
        setComments(prev => [newComment, ...prev])
        setContent('')
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 3000)
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to post comment')
      }
    } catch {
      setError('Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'just now'
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    const days = Math.floor(hrs / 24)
    if (days < 30) return `${days}d ago`
    return new Date(dateStr).toLocaleDateString()
  }

  const initials = (n: string) => {
    return n.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?'
  }

  // Deterministic avatar colors from accent
  const avatarColors = [theme.accent, theme.textSecondary]
  const getAvatarBg = (n: string) => {
    let hash = 0
    for (let i = 0; i < n.length; i++) hash = n.charCodeAt(i) + ((hash << 5) - hash)
    return avatarColors[Math.abs(hash) % avatarColors.length]
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-lg" style={{ border: `1px solid ${theme.inputBorder}` }}>
        {/* Themed Header Banner */}
        <div className="relative px-6 py-5" style={{ background: theme.headerGradient }}>
          {/* Decorative graphics */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            <span className="absolute -top-2 -right-2 text-5xl opacity-20 rotate-12">{theme.graphics[0]}</span>
            <span className="absolute bottom-1 left-4 text-3xl opacity-15 -rotate-6">{theme.graphics[1]}</span>
            {theme.graphics[2] && (
              <span className="absolute top-2 left-1/2 text-2xl opacity-10">{theme.graphics[2]}</span>
            )}
          </div>

          <div className="relative flex items-center gap-2.5">
            <span className="text-2xl">{theme.icon}</span>
            <h3 className="text-lg font-bold" style={{ color: theme.headerText }}>{title}</h3>
            <span className="ml-auto text-sm font-medium px-2 py-0.5 rounded-full" style={{ color: theme.headerText, background: 'rgba(255,255,255,0.15)' }}>
              {comments.length}
            </span>
          </div>
        </div>

        {/* Comment Form */}
        <div className="p-5 space-y-3" style={{ background: theme.cardBg, borderBottom: `1px solid ${theme.divider}` }}>
          {(requireName || requireEmail) && (
            <div className="flex gap-3">
              {requireName && (
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 px-3 py-2.5 text-sm rounded-xl outline-none transition-all focus:ring-2"
                  style={{
                    background: theme.inputBg,
                    border: `1px solid ${theme.inputBorder}`,
                    color: theme.textPrimary,
                    '--tw-ring-color': theme.accent,
                  } as React.CSSProperties}
                />
              )}
              {requireEmail && (
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2.5 text-sm rounded-xl outline-none transition-all focus:ring-2"
                  style={{
                    background: theme.inputBg,
                    border: `1px solid ${theme.inputBorder}`,
                    color: theme.textPrimary,
                    '--tw-ring-color': theme.accent,
                  } as React.CSSProperties}
                />
              )}
            </div>
          )}
          <div className="relative">
            <textarea
              placeholder="Write a comment..."
              value={content}
              onChange={(e) => setContent(e.target.value.slice(0, maxLength))}
              rows={3}
              className="w-full px-3 py-2.5 text-sm rounded-xl outline-none resize-none transition-all focus:ring-2"
              style={{
                background: theme.inputBg,
                border: `1px solid ${theme.inputBorder}`,
                color: theme.textPrimary,
                '--tw-ring-color': theme.accent,
              } as React.CSSProperties}
            />
            <span className="absolute bottom-2 right-3 text-[11px]" style={{ color: theme.textSecondary }}>
              {content.length}/{maxLength}
            </span>
          </div>
          <div className="flex items-center justify-between">
            {error && <p className="text-sm text-red-500">{error}</p>}
            {submitted && <p className="text-sm font-medium" style={{ color: theme.accent }}>Comment posted!</p>}
            {!error && !submitted && <div />}
            <button
              onClick={handleSubmit}
              disabled={submitting || !content.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: theme.accent }}
            >
              <Send className="w-3.5 h-3.5" />
              {submitting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>

        {/* Comments List */}
        <div style={{ background: theme.cardBg }}>
          {comments.map((comment) => (
            <div key={comment.id} className="px-5 py-4 flex gap-3" style={{ borderBottom: `1px solid ${theme.divider}` }}>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ background: getAvatarBg(comment.authorName) }}
              >
                {initials(comment.authorName)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold" style={{ color: theme.textPrimary }}>{comment.authorName}</span>
                  <span className="text-xs" style={{ color: theme.textSecondary }}>{timeAgo(comment.createdAt)}</span>
                </div>
                <p className="text-sm mt-0.5 whitespace-pre-wrap break-words" style={{ color: theme.textPrimary, opacity: 0.8 }}>{comment.content}</p>
              </div>
            </div>
          ))}

          {comments.length === 0 && (
            <div className="px-5 py-10 text-center">
              <span className="text-3xl block mb-2">{theme.icon}</span>
              <p className="text-sm" style={{ color: theme.textSecondary }}>No comments yet. Be the first!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
