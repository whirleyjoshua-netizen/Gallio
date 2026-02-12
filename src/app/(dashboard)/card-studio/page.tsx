'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ExternalLink, Code2, Layers, Search } from 'lucide-react'
import { CARD_PROVIDERS } from '@/lib/cards/registry'
import type { CardProviderConfig } from '@/lib/cards/registry'
import { LinkedInCard } from '@/components/elements/cards/LinkedInCard'
import { VouchCard } from '@/components/elements/cards/VouchCard'
import { IframeCardRenderer } from '@/components/elements/cards/IframeCardRenderer'

const BUILTIN_RENDERERS: Record<string, React.ComponentType<{ data: Record<string, any>; style?: 'default' | 'compact' | 'detailed' }>> = {
  linkedin: LinkedInCard,
  vouch: VouchCard,
}

function CardPreview({ provider }: { provider: CardProviderConfig }) {
  if (provider.type === 'external' && provider.iframeUrl) {
    return (
      <IframeCardRenderer
        url={provider.iframeUrl}
        data={provider.defaultData}
        style="default"
      />
    )
  }

  const Renderer = BUILTIN_RENDERERS[provider.id]
  if (Renderer) {
    return <Renderer data={provider.defaultData} style="default" />
  }

  return (
    <div className="p-8 rounded-lg bg-muted/30 border border-border text-center text-sm text-muted-foreground">
      No preview available
    </div>
  )
}

export default function CardStudioPage() {
  const [search, setSearch] = useState('')
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [previewStyle, setPreviewStyle] = useState<'default' | 'compact' | 'detailed'>('default')

  const providers = Object.values(CARD_PROVIDERS)
  const filtered = providers.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  )

  const selected = selectedCard ? CARD_PROVIDERS[selectedCard] : null

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-30 bg-gradient-to-r from-gallio/15 via-gallio-aqua/10 to-gallio-violet/15 backdrop-blur-xl border-b border-gallio/20 shadow-md shadow-gallio/10">
        <div className="px-6 py-3.5 flex items-center">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex-1 flex justify-center">
            <Link href="/" className="flex items-center gap-3 text-2xl font-extrabold">
              <Image src="/gallio-frog.svg" alt="" width={38} height={38} className="drop-shadow-sm" />
              <span className="text-gallio-gradient tracking-tight">Gallio</span>
            </Link>
          </div>
          <div className="w-[140px]" /> {/* Spacer to balance the back link */}
        </div>
      </nav>

      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-gallio/10 via-gallio-aqua/5 to-gallio-violet/10">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-gallio/10 rounded-xl">
                <Layers className="w-6 h-6 text-gallio" />
              </div>
              <h1 className="text-3xl font-bold">Card Studio</h1>
            </div>
            <p className="text-muted-foreground max-w-xl">
              Browse and preview app cards. Add them to any page using the editor, or build your own with the developer SDK.
            </p>

            {/* Search */}
            <div className="mt-6 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search cards..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-background/60 backdrop-blur-sm border border-border/50 rounded-full text-sm outline-none focus:ring-2 focus:ring-gallio/30 focus:border-gallio/30 transition-all"
              />
            </div>

            {/* Stats */}
            <div className="mt-6 flex gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-background/60 backdrop-blur-sm rounded-full border border-border/50">
                <Layers className="w-4 h-4 text-gallio" />
                <span className="text-sm font-medium">{providers.length} cards</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-background/60 backdrop-blur-sm rounded-full border border-border/50">
                <Code2 className="w-4 h-4 text-gallio-aqua" />
                <span className="text-sm font-medium">
                  {providers.filter(p => p.type === 'builtin').length} built-in
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-background/60 backdrop-blur-sm rounded-full border border-border/50">
                <ExternalLink className="w-4 h-4 text-gallio-violet" />
                <span className="text-sm font-medium">
                  {providers.filter(p => p.type === 'external').length} external
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-background to-transparent" />
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {selected ? (
          // Detail view
          <div>
            <button
              onClick={() => setSelectedCard(null)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all cards
            </button>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Preview */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Preview</h2>
                  <div className="flex gap-1">
                    {(['default', 'compact', 'detailed'] as const).map(s => (
                      <button
                        key={s}
                        onClick={() => setPreviewStyle(s)}
                        className={`px-3 py-1.5 text-xs rounded-lg border transition capitalize ${
                          previewStyle === s
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-muted border-border hover:border-muted-foreground'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-6 bg-muted/20 border border-border rounded-xl">
                  {selected.type === 'external' && selected.iframeUrl ? (
                    <IframeCardRenderer
                      url={selected.iframeUrl}
                      data={selected.defaultData}
                      style={previewStyle}
                    />
                  ) : BUILTIN_RENDERERS[selected.id] ? (
                    (() => {
                      const R = BUILTIN_RENDERERS[selected.id]
                      return <R data={selected.defaultData} style={previewStyle} />
                    })()
                  ) : (
                    <div className="p-8 text-center text-muted-foreground text-sm">No preview</div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-2xl font-bold">{selected.name}</h2>
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    selected.type === 'builtin'
                      ? 'bg-gallio/10 text-gallio border border-gallio/20'
                      : 'bg-gallio-violet/10 text-gallio-violet border border-gallio-violet/20'
                  }`}>
                    {selected.type === 'builtin' ? 'Built-in' : 'External'}
                  </span>
                </div>
                <p className="text-muted-foreground mb-6">{selected.description}</p>

                {/* Fields */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-3">Configurable Fields</h3>
                  <div className="space-y-2">
                    {selected.fields.map(field => (
                      <div key={field.key} className="flex items-center gap-3 px-3 py-2.5 bg-muted/30 rounded-lg border border-border/50">
                        <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded text-muted-foreground">
                          {field.key}
                        </span>
                        <span className="text-sm flex-1">{field.label}</span>
                        <span className="text-xs text-muted-foreground capitalize">{field.type}</span>
                        {field.required && (
                          <span className="text-[10px] bg-red-50 text-red-500 px-1.5 py-0.5 rounded-full">required</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* How to use */}
                <div className="bg-muted/20 border border-border rounded-xl p-5">
                  <h3 className="text-sm font-semibold mb-2">How to use</h3>
                  <p className="text-sm text-muted-foreground">
                    Add this card to any page using the editor. Open a page, type <kbd className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">/</kbd> to open the element menu, select <strong>App Card</strong>, then choose <strong>{selected.name}</strong> from the provider dropdown in the settings panel.
                  </p>
                </div>

                {selected.type === 'external' && (
                  <div className="mt-4 bg-gallio-violet/5 border border-gallio-violet/20 rounded-xl p-5">
                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-gallio-violet" />
                      Developer Info
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      This card runs in a sandboxed iframe using the Gallio Card SDK.
                    </p>
                    <code className="text-xs font-mono bg-muted px-2 py-1 rounded block overflow-x-auto">
                      {selected.iframeUrl}
                    </code>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Gallery view
          <div>
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <Search className="w-10 h-10 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">No cards found matching &ldquo;{search}&rdquo;</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map(provider => (
                  <button
                    key={provider.id}
                    onClick={() => { setSelectedCard(provider.id); setPreviewStyle('default') }}
                    className="group text-left border border-border rounded-xl overflow-hidden hover:border-gallio/40 hover:shadow-lg hover:shadow-gallio/10 transition-all bg-background"
                  >
                    {/* Preview thumbnail */}
                    <div className="p-4 bg-muted/20 border-b border-border min-h-[160px] flex items-center justify-center">
                      <div className="w-full max-w-[280px] transform scale-[0.85] origin-center pointer-events-none">
                        <CardPreview provider={provider} />
                      </div>
                    </div>

                    {/* Card info */}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold group-hover:text-gallio transition-colors">
                          {provider.name}
                        </h3>
                        <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${
                          provider.type === 'builtin'
                            ? 'bg-gallio/10 text-gallio'
                            : 'bg-gallio-violet/10 text-gallio-violet'
                        }`}>
                          {provider.type === 'builtin' ? 'Built-in' : 'External'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{provider.description}</p>
                      <div className="mt-3 text-xs text-muted-foreground">
                        {provider.fields.length} configurable field{provider.fields.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </button>
                ))}

                {/* Build your own card */}
                <div className="border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center p-8 hover:border-gallio/40 hover:bg-gallio/[0.02] transition-all min-h-[300px]">
                  <div className="w-14 h-14 rounded-full bg-gallio/10 flex items-center justify-center mb-4">
                    <Code2 className="w-7 h-7 text-gallio" />
                  </div>
                  <h3 className="font-semibold mb-1">Build Your Own</h3>
                  <p className="text-sm text-muted-foreground text-center max-w-[200px] mb-4">
                    Create custom cards using the Gallio Card SDK
                  </p>
                  <span className="text-xs text-gallio font-medium">
                    See /sdk/example-card.html
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
