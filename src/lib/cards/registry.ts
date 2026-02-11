// Card Provider Registry
// Adding a new provider = one entry here + one renderer component

export interface CardField {
  key: string
  label: string
  type: 'text' | 'url' | 'textarea' | 'number' | 'select'
  placeholder?: string
  required?: boolean
  options?: { label: string; value: string }[]
}

export interface CardProviderConfig {
  id: string
  name: string
  description: string
  icon: string // Lucide icon name
  defaultData: Record<string, any>
  fields: CardField[]
}

export const CARD_PROVIDERS: Record<string, CardProviderConfig> = {
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    description: 'Professional profile card',
    icon: 'Linkedin',
    defaultData: {
      name: '',
      title: '',
      company: '',
      headline: '',
      profileUrl: '',
      avatarUrl: '',
      connectionCount: '',
      backgroundUrl: '',
    },
    fields: [
      { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Josh Smith', required: true },
      { key: 'title', label: 'Job Title', type: 'text', placeholder: 'Senior Engineer' },
      { key: 'company', label: 'Company', type: 'text', placeholder: 'Acme Inc.' },
      { key: 'headline', label: 'Headline', type: 'textarea', placeholder: 'Building the future of...' },
      { key: 'profileUrl', label: 'LinkedIn URL', type: 'url', placeholder: 'https://linkedin.com/in/...' },
      { key: 'avatarUrl', label: 'Profile Photo URL', type: 'url', placeholder: 'https://...' },
      { key: 'connectionCount', label: 'Connections', type: 'text', placeholder: '500+' },
      { key: 'backgroundUrl', label: 'Banner Image URL', type: 'url', placeholder: 'https://...' },
    ],
  },
  vouch: {
    id: 'vouch',
    name: 'Vouch',
    description: 'Professional credibility card',
    icon: 'ShieldCheck',
    defaultData: {
      name: 'Jane Doe',
      title: 'Engineering Manager',
      company: 'TechCorp',
      avatarUrl: '',
      referenceCount: 12,
      managerReferences: 3,
      peerReferences: 6,
      reportReferences: 2,
      clientReferences: 1,
      topAchievements: [
        { type: 'leadership', title: 'Team Growth Leader' },
        { type: 'delivery', title: 'Q4 Ship Excellence' },
        { type: 'mentorship', title: 'Mentorship Champion' },
      ],
      verifiedReferences: 8,
      latestRating: 'Exceeds Expectations',
      latestPeriod: 'H2 2025',
      isPlaceholder: true,
    },
    fields: [
      { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Jane Doe', required: true },
      { key: 'title', label: 'Job Title', type: 'text', placeholder: 'Engineering Manager' },
      { key: 'company', label: 'Company', type: 'text', placeholder: 'TechCorp' },
      { key: 'avatarUrl', label: 'Avatar URL', type: 'url', placeholder: 'https://...' },
      { key: 'referenceCount', label: 'Total References', type: 'number', placeholder: '12' },
      { key: 'verifiedReferences', label: 'Verified References', type: 'number', placeholder: '8' },
      { key: 'latestRating', label: 'Latest Review Rating', type: 'text', placeholder: 'Exceeds Expectations' },
      { key: 'latestPeriod', label: 'Review Period', type: 'text', placeholder: 'H2 2025' },
    ],
  },
}

// Achievement type icons + colors (maps to Vouch's 12 types)
export const ACHIEVEMENT_ICONS: Record<string, { icon: string; color: string }> = {
  delivery: { icon: 'Package', color: '#3b82f6' },
  quality: { icon: 'Star', color: '#f59e0b' },
  speed: { icon: 'Zap', color: '#ef4444' },
  impact: { icon: 'TrendingUp', color: '#10b981' },
  leadership: { icon: 'Crown', color: '#8b5cf6' },
  mentorship: { icon: 'Users', color: '#06b6d4' },
  innovation: { icon: 'Lightbulb', color: '#f97316' },
  reliability: { icon: 'Shield', color: '#64748b' },
  collaboration: { icon: 'Handshake', color: '#ec4899' },
  security: { icon: 'Lock', color: '#14b8a6' },
  compliance: { icon: 'ClipboardCheck', color: '#6366f1' },
  growth: { icon: 'Sprout', color: '#22c55e' },
}
