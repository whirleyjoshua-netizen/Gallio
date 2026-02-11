'use client'

import { useState, useEffect } from 'react'
import type { Tab } from '@/lib/types/tabs'
import { renderElement, getGridClass, getColumnStyles } from '@/lib/render-elements'

interface PublicTabViewProps {
  tabs: Tab[]
  style?: 'underline' | 'pills' | 'boxed'
  alignment?: 'left' | 'center' | 'stretch'
  displayId?: string
}

export function PublicTabView({ tabs, style = 'underline', alignment = 'center', displayId }: PublicTabViewProps) {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id)

  // Support URL hash for direct tab linking
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) {
      const tab = tabs.find(t => t.slug === hash)
      if (tab) setActiveTabId(tab.id)
    }
  }, [tabs])

  // Update hash on tab change
  const handleTabSelect = (tabId: string) => {
    setActiveTabId(tabId)
    const tab = tabs.find(t => t.id === tabId)
    if (tab) {
      window.history.replaceState(null, '', `#${tab.slug}`)
    }
  }

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0]

  const alignmentClass =
    alignment === 'left' ? 'justify-start' :
    alignment === 'stretch' ? '' :
    'justify-center'

  const getTabClasses = (isActive: boolean) => {
    switch (style) {
      case 'pills':
        return isActive
          ? 'bg-primary text-primary-foreground rounded-full px-5 py-2'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full px-5 py-2'
      case 'boxed':
        return isActive
          ? 'bg-background border border-border border-b-transparent rounded-t-lg px-5 py-2.5 -mb-px'
          : 'text-muted-foreground hover:text-foreground px-5 py-2.5'
      case 'underline':
      default:
        return isActive
          ? 'border-b-2 border-primary text-foreground px-5 py-3'
          : 'text-muted-foreground hover:text-foreground border-b-2 border-transparent px-5 py-3'
    }
  }

  const containerBorder = style === 'boxed' || style === 'underline' ? 'border-b border-border' : ''

  return (
    <div>
      {/* Tab Bar */}
      <nav className={`flex items-center gap-1 mb-8 ${containerBorder} ${alignmentClass}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabSelect(tab.id)}
            className={`text-sm font-medium transition-colors whitespace-nowrap ${getTabClasses(tab.id === activeTabId)} ${
              alignment === 'stretch' ? 'flex-1 text-center' : ''
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Active Tab Content */}
      {activeTab && (
        <div className="space-y-8">
          {activeTab.sections.map((section) => (
            <div
              key={section.id}
              className={`grid gap-6 ${getGridClass(section.layout)}`}
            >
              {section.columns.map((column) => (
                <div
                  key={column.id}
                  className="space-y-4"
                  style={getColumnStyles(column)}
                >
                  {column.elements.map((element) => (
                    <div key={element.id}>
                      {renderElement(element, displayId)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}

          {activeTab.sections.length === 0 && (
            <div className="text-center py-12 opacity-50">
              <p>This tab is empty</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
