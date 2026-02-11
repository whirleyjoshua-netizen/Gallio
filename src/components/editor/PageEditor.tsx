'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Eye, Image as ImageIcon, Save, Check, Share2, CreditCard, LayoutList } from 'lucide-react'
import Link from 'next/link'
import { useAuthStore } from '@/lib/store'
import { ColumnCanvas } from '@/components/canvas/ColumnCanvas'
import { SlashCommandMenu } from '@/components/canvas/SlashCommandMenu'
import { BackgroundSettings } from '@/components/canvas/BackgroundSettings'
import { ColumnStyleSettings } from '@/components/canvas/ColumnStyleSettings'
import { ShareDialog } from '@/components/editor/ShareDialog'
import { HeaderCard } from '@/components/header/HeaderCard'
import { HeaderCardEditor } from '@/components/header/HeaderCardEditor'
import { TabBar } from '@/components/tabs/TabBar'
import { TabEditor } from '@/components/tabs/TabEditor'
import type { Section, LayoutMode, ElementType, CanvasElement, ColumnSettings } from '@/lib/types/canvas'
import { DEFAULT_COLUMN_SETTINGS } from '@/lib/types/canvas'
import type { BackgroundConfig } from '@/lib/types/background'
import { DEFAULT_BACKGROUND_CONFIG, getBackgroundStyles } from '@/lib/types/background'
import type { HeaderCardConfig } from '@/lib/types/header-card'
import { DEFAULT_HEADER_CARD } from '@/lib/types/header-card'
import type { TabsConfig } from '@/lib/types/tabs'
import { DEFAULT_TABS_CONFIG, createTab } from '@/lib/types/tabs'

interface PageEditorProps {
  pageId?: string
}

export function PageEditor({ pageId }: PageEditorProps) {
  const router = useRouter()
  const { user, token } = useAuthStore()

  // Page state
  const [id, setId] = useState<string | null>(pageId || null)
  const [title, setTitle] = useState('Untitled Page')
  const [slug, setSlug] = useState('')
  const [published, setPublished] = useState(false)
  const [sections, setSections] = useState<Section[]>([])
  const [background, setBackground] = useState<BackgroundConfig>(DEFAULT_BACKGROUND_CONFIG)
  const [headerCard, setHeaderCard] = useState<HeaderCardConfig>(DEFAULT_HEADER_CARD)
  const [tabsConfig, setTabsConfig] = useState<TabsConfig>(DEFAULT_TABS_CONFIG)
  const [activeTabId, setActiveTabId] = useState<string | null>(null)

  // UI state
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [showBackgroundSettings, setShowBackgroundSettings] = useState(false)
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  // Slash menu state
  const [showSlashMenu, setShowSlashMenu] = useState(false)
  const [slashMenuPosition, setSlashMenuPosition] = useState({ x: 0, y: 0 })
  const [currentSection, setCurrentSection] = useState<string | null>(null)
  const [currentColumn, setCurrentColumn] = useState<string | null>(null)

  // Share dialog state
  const [showShareDialog, setShowShareDialog] = useState(false)

  // Header card & tab editor state
  const [showHeaderEditor, setShowHeaderEditor] = useState(false)
  const [showTabEditor, setShowTabEditor] = useState(false)

  // Column settings state
  const [showColumnSettings, setShowColumnSettings] = useState(false)
  const [editingColumnSection, setEditingColumnSection] = useState<string | null>(null)
  const [editingColumnId, setEditingColumnId] = useState<string | null>(null)

  // Auth check
  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
  }, [token, router])

  // Load or create page
  useEffect(() => {
    if (!token) return

    if (pageId) {
      loadPage(pageId)
    } else {
      createNewPage()
    }
  }, [pageId, token])

  // Active sections abstraction — routes to tabs when enabled
  const getActiveSections = useCallback((): Section[] => {
    if (!tabsConfig.enabled || tabsConfig.tabs.length === 0) return sections
    const tab = tabsConfig.tabs.find(t => t.id === activeTabId) || tabsConfig.tabs[0]
    return tab?.sections || []
  }, [tabsConfig, activeTabId, sections])

  const setActiveSections = useCallback((updater: Section[] | ((prev: Section[]) => Section[])) => {
    if (!tabsConfig.enabled || tabsConfig.tabs.length === 0) {
      setSections(updater)
      return
    }
    const targetId = activeTabId || tabsConfig.tabs[0]?.id
    setTabsConfig(prev => ({
      ...prev,
      tabs: prev.tabs.map(tab =>
        tab.id === targetId
          ? { ...tab, sections: typeof updater === 'function' ? updater(tab.sections) : updater }
          : tab
      ),
    }))
  }, [tabsConfig.enabled, tabsConfig.tabs, activeTabId])

  // Auto-save every 5 seconds
  useEffect(() => {
    if (!id) return

    const interval = setInterval(() => {
      savePage()
    }, 5000)

    return () => clearInterval(interval)
  }, [id, sections, background, title, headerCard, tabsConfig])

  const loadPage = async (pid: string) => {
    try {
      const res = await fetch(`/api/displays/${pid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.ok) {
        const data = await res.json()
        setId(data.id)
        setTitle(data.title)
        setSlug(data.slug)
        setPublished(data.published)

        // Parse sections
        const loadedSections = typeof data.sections === 'string'
          ? JSON.parse(data.sections)
          : data.sections || []

        // If no sections, initialize with one
        if (loadedSections.length === 0) {
          setSections([createInitialSection()])
        } else {
          setSections(loadedSections)
        }

        // Parse background
        const loadedBackground = typeof data.background === 'string'
          ? JSON.parse(data.background)
          : data.background || DEFAULT_BACKGROUND_CONFIG

        setBackground(loadedBackground)

        // Parse header card
        const loadedHeaderCard = data.headerCard
          ? (typeof data.headerCard === 'string' ? JSON.parse(data.headerCard) : data.headerCard)
          : DEFAULT_HEADER_CARD
        setHeaderCard(loadedHeaderCard)

        // Parse tabs
        const loadedTabs = data.tabs
          ? (typeof data.tabs === 'string' ? JSON.parse(data.tabs) : data.tabs)
          : DEFAULT_TABS_CONFIG
        setTabsConfig(loadedTabs)
        if (loadedTabs.enabled && loadedTabs.tabs.length > 0) {
          setActiveTabId(loadedTabs.tabs[0].id)
        }
      } else {
        // Page not found, create new
        createNewPage()
      }
    } catch (error) {
      console.error('Error loading page:', error)
      createNewPage()
    } finally {
      setLoading(false)
    }
  }

  const createNewPage = async () => {
    try {
      const res = await fetch('/api/displays', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: 'Untitled Page' }),
      })

      if (res.ok) {
        const data = await res.json()
        setId(data.id)
        setTitle(data.title)
        setSlug(data.slug)
        setPublished(false)

        // Initialize with one section
        const initialSection = createInitialSection()
        setSections([initialSection])

        // Update URL without reload
        window.history.replaceState({}, '', `/editor?id=${data.id}`)
      }
    } catch (error) {
      console.error('Error creating page:', error)
    } finally {
      setLoading(false)
    }
  }

  const createInitialSection = (): Section => ({
    id: `section-${Date.now()}`,
    layout: 'full-width',
    columns: [{ id: `col-${Date.now()}`, elements: [] }],
  })

  const savePage = useCallback(async () => {
    if (!id || saving) return

    setSaving(true)
    try {
      // When tabs are enabled, keep top-level sections synced with first tab for backward compat
      const sectionsToSave = tabsConfig.enabled && tabsConfig.tabs.length > 0
        ? tabsConfig.tabs[0].sections
        : sections

      await fetch(`/api/displays/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          sections: sectionsToSave,
          background,
          headerCard: headerCard.enabled ? headerCard : null,
          tabs: tabsConfig.enabled ? tabsConfig : null,
        }),
      })
      setLastSaved(new Date())
    } catch (error) {
      console.error('Error saving:', error)
    } finally {
      setSaving(false)
    }
  }, [id, title, sections, background, headerCard, tabsConfig, token, saving])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + S to save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        savePage()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [savePage])

  // Section operations
  const addSection = (layout: LayoutMode) => {
    const columnCount = layout === 'full-width' ? 1 : layout === 'two-column' ? 2 : 3
    const columns = Array.from({ length: columnCount }, (_, i) => ({
      id: `col-${Date.now()}-${i}`,
      elements: [],
    }))

    setActiveSections((prev) => [
      ...prev,
      { id: `section-${Date.now()}`, layout, columns },
    ])
  }

  const deleteSection = (sectionId: string) => {
    setActiveSections((prev) => prev.filter((s) => s.id !== sectionId))
  }

  // Slash menu
  const openSlashMenu = (sectionId: string, columnId: string, position?: { x: number; y: number }) => {
    setCurrentSection(sectionId)
    setCurrentColumn(columnId)
    setSlashMenuPosition(position || { x: window.innerWidth / 2 - 160, y: 200 })
    setShowSlashMenu(true)
  }

  const handleCommandSelect = (type: ElementType) => {
    if (!currentSection || !currentColumn) return

    const newElement: CanvasElement = {
      id: `el-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
    }

    // Set defaults based on type
    switch (type) {
      case 'text':
        newElement.content = ''
        break
      case 'heading':
        newElement.content = ''
        newElement.level = 2
        break
      case 'image':
        newElement.url = ''
        newElement.alt = ''
        break
      case 'embed':
        newElement.embedUrl = ''
        newElement.embedType = 'youtube'
        break
      case 'button':
        newElement.buttonText = 'Click me'
        newElement.buttonUrl = ''
        newElement.buttonVariant = 'solid'
        newElement.buttonColor = 'blue'
        newElement.buttonAlign = 'left'
        break
      case 'list':
        newElement.listType = 'bulleted'
        newElement.listTitle = ''
        newElement.listColumns = 1
        newElement.items = ['']
        break
      case 'quote':
        newElement.quoteText = ''
        newElement.quoteAuthor = ''
        break
      case 'kpi':
        newElement.kpiLabel = 'Metric'
        newElement.kpiValue = '0'
        newElement.kpiPrefix = ''
        newElement.kpiSuffix = ''
        newElement.kpiTrend = 'neutral'
        newElement.kpiTrendValue = ''
        newElement.kpiColor = 'blue'
        break
      case 'table':
        newElement.tableHeaders = ['Column 1', 'Column 2', 'Column 3']
        newElement.tableRows = [['', '', '']]
        break
      case 'callout':
        newElement.calloutType = 'info'
        newElement.calloutTitle = ''
        newElement.calloutContent = ''
        break
      case 'toggle':
        newElement.toggleTitle = 'Click to expand'
        newElement.toggleContent = ''
        newElement.toggleOpen = false
        break
      case 'mcq':
        newElement.mcqQuestion = 'Your question here'
        newElement.mcqOptions = ['Option 1', 'Option 2', 'Option 3']
        newElement.mcqAllowMultiple = false
        newElement.mcqRequired = false
        break
      case 'rating':
        newElement.ratingQuestion = 'How would you rate this?'
        newElement.ratingMax = 5
        newElement.ratingStyle = 'stars'
        newElement.ratingRequired = false
        break
      case 'shortanswer':
        newElement.shortAnswerQuestion = 'Your question here'
        newElement.shortAnswerPlaceholder = 'Type your answer...'
        newElement.shortAnswerRequired = false
        newElement.shortAnswerMaxLength = 500
        break
      case 'code':
        newElement.codeContent = '// Write your code here\nconsole.log("Hello, world!");'
        newElement.codeLanguage = 'javascript'
        newElement.codeTheme = 'dark'
        newElement.codeShowLineNumbers = true
        newElement.codeFilename = ''
        break
      case 'card':
        newElement.cardProvider = 'linkedin'
        newElement.cardData = {
          name: '',
          title: '',
          company: '',
          headline: '',
          profileUrl: '',
          avatarUrl: '',
          connectionCount: '',
          backgroundUrl: '',
        }
        newElement.cardStyle = 'default'
        break
      case 'comment':
        newElement.commentTitle = 'Comments'
        newElement.commentRequireName = true
        newElement.commentRequireEmail = false
        newElement.commentModerated = false
        newElement.commentMaxLength = 1000
        newElement.commentTheme = 'minimal'
        break
      case 'poll':
        newElement.pollQuestion = 'What do you think?'
        newElement.pollOptions = ['Option 1', 'Option 2', 'Option 3']
        newElement.pollAllowMultiple = false
        newElement.pollShowResultsBeforeVote = false
        break
    }

    setActiveSections((prev) =>
      prev.map((section) =>
        section.id === currentSection
          ? {
              ...section,
              columns: section.columns.map((col) =>
                col.id === currentColumn
                  ? { ...col, elements: [...col.elements, newElement] }
                  : col
              ),
            }
          : section
      )
    )

    setShowSlashMenu(false)
    setCurrentSection(null)
    setCurrentColumn(null)
  }

  // Element operations
  const updateElement = (
    sectionId: string,
    columnId: string,
    elementId: string,
    updates: Partial<CanvasElement>
  ) => {
    setActiveSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              columns: section.columns.map((col) =>
                col.id === columnId
                  ? {
                      ...col,
                      elements: col.elements.map((el) =>
                        el.id === elementId ? { ...el, ...updates } : el
                      ),
                    }
                  : col
              ),
            }
          : section
      )
    )
  }

  const deleteElement = (sectionId: string, columnId: string, elementId: string) => {
    setActiveSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              columns: section.columns.map((col) =>
                col.id === columnId
                  ? { ...col, elements: col.elements.filter((el) => el.id !== elementId) }
                  : col
              ),
            }
          : section
      )
    )
  }

  // Column settings
  const openColumnSettings = (sectionId: string, columnId: string) => {
    setEditingColumnSection(sectionId)
    setEditingColumnId(columnId)
    setShowColumnSettings(true)
  }

  const getCurrentColumnSettings = (): ColumnSettings => {
    if (!editingColumnSection || !editingColumnId) return DEFAULT_COLUMN_SETTINGS
    const activeSections = getActiveSections()
    const section = activeSections.find((s) => s.id === editingColumnSection)
    if (!section) return DEFAULT_COLUMN_SETTINGS
    const column = section.columns.find((c) => c.id === editingColumnId)
    return column?.settings || DEFAULT_COLUMN_SETTINGS
  }

  const updateColumnSettings = (settings: ColumnSettings) => {
    if (!editingColumnSection || !editingColumnId) return
    setActiveSections((prev) =>
      prev.map((section) =>
        section.id === editingColumnSection
          ? {
              ...section,
              columns: section.columns.map((col) =>
                col.id === editingColumnId
                  ? { ...col, settings }
                  : col
              ),
            }
          : section
      )
    )
  }

  // Publish
  const handlePublishToggle = async () => {
    const newPublished = !published
    setPublished(newPublished)

    await fetch(`/api/displays/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ published: newPublished }),
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  const backgroundStyles = getBackgroundStyles(background)

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      {!isPreviewMode && (
        <header className="border-b border-border bg-background px-4 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="p-2 hover:bg-muted rounded-lg transition"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={savePage}
              placeholder="Untitled Page"
              className="text-xl font-bold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Save Status */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {saving ? (
                <>
                  <Save className="w-4 h-4 animate-pulse" />
                  <span>Saving...</span>
                </>
              ) : lastSaved ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Saved</span>
                </>
              ) : null}
            </div>

            {/* Header Card */}
            <button
              onClick={() => setShowHeaderEditor(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-muted rounded-lg transition"
            >
              <CreditCard className="w-4 h-4" />
              Header
            </button>

            {/* Tabs */}
            <button
              onClick={() => setShowTabEditor(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-muted rounded-lg transition"
            >
              <LayoutList className="w-4 h-4" />
              Tabs
            </button>

            {/* Background */}
            <button
              onClick={() => setShowBackgroundSettings(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-muted rounded-lg transition"
            >
              <ImageIcon className="w-4 h-4" />
              Background
            </button>

            {/* Preview */}
            <button
              onClick={() => setIsPreviewMode(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-muted rounded-lg transition"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>

            {/* View Live */}
            {published && user && (
              <Link
                href={`/${user.username}/${slug}`}
                target="_blank"
                className="px-3 py-1.5 text-sm hover:bg-muted rounded-lg transition"
              >
                View Live
              </Link>
            )}

            {/* Share */}
            <button
              onClick={() => setShowShareDialog(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-muted rounded-lg transition"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>

            {/* Publish */}
            <button
              onClick={handlePublishToggle}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                published
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-primary text-primary-foreground hover:opacity-90'
              }`}
            >
              {published ? 'Published' : 'Publish'}
            </button>
          </div>
        </header>
      )}

      {/* Preview Mode Header */}
      {isPreviewMode && (
        <div className="border-b border-border bg-background px-6 py-4 flex items-center justify-between flex-shrink-0">
          <h1 className="text-2xl font-bold">{title}</h1>
          <button
            onClick={() => setIsPreviewMode(false)}
            className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition"
          >
            <Eye className="w-4 h-4" />
            Exit Preview
          </button>
        </div>
      )}

      {/* Canvas */}
      <div className="flex-1 overflow-auto" style={backgroundStyles}>
        {/* Header Card Preview */}
        {headerCard.enabled && (
          <div
            className={`${!isPreviewMode ? 'cursor-pointer ring-transparent hover:ring-2 hover:ring-primary/30 transition-all' : ''}`}
            onClick={() => !isPreviewMode && setShowHeaderEditor(true)}
          >
            <HeaderCard config={headerCard} />
          </div>
        )}

        {/* Tab Bar */}
        {tabsConfig.enabled && tabsConfig.tabs.length > 0 && (
          <div className="bg-background/80 backdrop-blur-sm sticky top-0 z-10 px-4">
            <div className="max-w-6xl mx-auto">
              <TabBar
                tabs={tabsConfig.tabs}
                activeTabId={activeTabId || tabsConfig.tabs[0]?.id}
                onSelectTab={setActiveTabId}
                onAddTab={() => {
                  const newTab = createTab(`Tab ${tabsConfig.tabs.length + 1}`)
                  setTabsConfig(prev => ({ ...prev, tabs: [...prev.tabs, newTab] }))
                }}
                onRenameTab={(tabId, newLabel) => {
                  setTabsConfig(prev => ({
                    ...prev,
                    tabs: prev.tabs.map(t =>
                      t.id === tabId
                        ? { ...t, label: newLabel, slug: newLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }
                        : t
                    ),
                  }))
                }}
                onDeleteTab={(tabId) => {
                  const remaining = tabsConfig.tabs.filter(t => t.id !== tabId)
                  if (remaining.length === 0) {
                    setTabsConfig({ ...DEFAULT_TABS_CONFIG })
                    setActiveTabId(null)
                  } else {
                    setTabsConfig(prev => ({ ...prev, tabs: remaining }))
                    if (activeTabId === tabId) setActiveTabId(remaining[0].id)
                  }
                }}
                onMoveTab={(tabId, direction) => {
                  const idx = tabsConfig.tabs.findIndex(t => t.id === tabId)
                  const newIdx = direction === 'left' ? idx - 1 : idx + 1
                  if (newIdx < 0 || newIdx >= tabsConfig.tabs.length) return
                  const newTabs = [...tabsConfig.tabs]
                  ;[newTabs[idx], newTabs[newIdx]] = [newTabs[newIdx], newTabs[idx]]
                  setTabsConfig(prev => ({ ...prev, tabs: newTabs }))
                }}
                isEditorMode={!isPreviewMode}
                style={tabsConfig.style}
                alignment={tabsConfig.alignment}
              />
            </div>
          </div>
        )}

        <ColumnCanvas
          sections={getActiveSections()}
          onSectionsChange={setActiveSections}
          onAddSection={addSection}
          onDeleteSection={deleteSection}
          onOpenSlashMenu={openSlashMenu}
          onUpdateElement={updateElement}
          onDeleteElement={deleteElement}
          onOpenColumnSettings={openColumnSettings}
          isPreviewMode={isPreviewMode}
          displayId={id || undefined}
        />
      </div>

      {/* Slash Menu */}
      {showSlashMenu && (
        <SlashCommandMenu
          position={slashMenuPosition}
          onSelect={handleCommandSelect}
          onClose={() => setShowSlashMenu(false)}
        />
      )}

      {/* Background Settings */}
      <BackgroundSettings
        isOpen={showBackgroundSettings}
        onClose={() => setShowBackgroundSettings(false)}
        config={background}
        onChange={setBackground}
      />

      {/* Share Dialog */}
      {showShareDialog && id && token && (
        <ShareDialog
          displayId={id}
          pageTitle={title}
          published={published}
          token={token}
          onClose={() => setShowShareDialog(false)}
        />
      )}

      {/* Column Style Settings */}
      <ColumnStyleSettings
        isOpen={showColumnSettings}
        onClose={() => {
          setShowColumnSettings(false)
          setEditingColumnSection(null)
          setEditingColumnId(null)
        }}
        settings={getCurrentColumnSettings()}
        onChange={updateColumnSettings}
      />

      {/* Header Card Editor */}
      <HeaderCardEditor
        isOpen={showHeaderEditor}
        onClose={() => setShowHeaderEditor(false)}
        config={headerCard}
        onChange={setHeaderCard}
      />

      {/* Tab Editor */}
      <TabEditor
        isOpen={showTabEditor}
        onClose={() => setShowTabEditor(false)}
        config={tabsConfig}
        onChange={(newConfig) => {
          setTabsConfig(newConfig)
          // Set active tab when enabling tabs
          if (newConfig.enabled && newConfig.tabs.length > 0 && !activeTabId) {
            setActiveTabId(newConfig.tabs[0].id)
          }
          // Clear active tab when disabling
          if (!newConfig.enabled) {
            // Migrate first tab's sections back to top-level
            if (tabsConfig.tabs.length > 0) {
              setSections(tabsConfig.tabs[0].sections)
            }
            setActiveTabId(null)
          }
        }}
        currentSections={sections}
      />
    </div>
  )
}
