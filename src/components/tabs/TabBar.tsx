'use client'

import { useState, useRef } from 'react'
import { Plus, MoreHorizontal, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Tab } from '@/lib/types/tabs'

interface TabBarProps {
  tabs: Tab[]
  activeTabId: string
  onSelectTab: (tabId: string) => void
  onAddTab?: () => void
  onRenameTab?: (tabId: string, newLabel: string) => void
  onDeleteTab?: (tabId: string) => void
  onMoveTab?: (tabId: string, direction: 'left' | 'right') => void
  isEditorMode?: boolean
  style?: 'underline' | 'pills' | 'boxed'
  alignment?: 'left' | 'center' | 'stretch'
}

export function TabBar({
  tabs,
  activeTabId,
  onSelectTab,
  onAddTab,
  onRenameTab,
  onDeleteTab,
  onMoveTab,
  isEditorMode = false,
  style = 'underline',
  alignment = 'center',
}: TabBarProps) {
  const [editingTabId, setEditingTabId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [menuTabId, setMenuTabId] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const startRename = (tab: Tab) => {
    setEditingTabId(tab.id)
    setEditValue(tab.label)
    setMenuTabId(null)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const finishRename = () => {
    if (editingTabId && editValue.trim() && onRenameTab) {
      onRenameTab(editingTabId, editValue.trim())
    }
    setEditingTabId(null)
  }

  const alignmentClass =
    alignment === 'left' ? 'justify-start' :
    alignment === 'stretch' ? '' :
    'justify-center'

  const getTabClasses = (isActive: boolean) => {
    switch (style) {
      case 'pills':
        return isActive
          ? 'bg-primary text-primary-foreground rounded-full px-4 py-1.5'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted rounded-full px-4 py-1.5'
      case 'boxed':
        return isActive
          ? 'bg-background border border-border border-b-transparent rounded-t-lg px-4 py-2 -mb-px'
          : 'text-muted-foreground hover:text-foreground px-4 py-2'
      case 'underline':
      default:
        return isActive
          ? 'border-b-2 border-primary text-foreground px-4 py-2.5'
          : 'text-muted-foreground hover:text-foreground border-b-2 border-transparent px-4 py-2.5'
    }
  }

  const containerBorder = style === 'boxed' ? 'border-b border-border' : style === 'underline' ? 'border-b border-border' : ''

  return (
    <div className={`relative flex items-center gap-1 ${containerBorder} ${alignmentClass}`}>
      {tabs.map((tab, index) => (
        <div key={tab.id} className="relative group flex items-center">
          {editingTabId === tab.id ? (
            <input
              ref={inputRef}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={finishRename}
              onKeyDown={(e) => {
                if (e.key === 'Enter') finishRename()
                if (e.key === 'Escape') setEditingTabId(null)
              }}
              className="px-3 py-1.5 text-sm font-medium border border-primary rounded bg-background outline-none w-32"
            />
          ) : (
            <button
              onClick={() => onSelectTab(tab.id)}
              onDoubleClick={() => isEditorMode && startRename(tab)}
              className={`text-sm font-medium transition-colors whitespace-nowrap ${getTabClasses(tab.id === activeTabId)} ${
                alignment === 'stretch' ? 'flex-1' : ''
              }`}
            >
              {tab.label}
            </button>
          )}

          {/* Editor mode: context menu trigger */}
          {isEditorMode && tab.id === activeTabId && editingTabId !== tab.id && (
            <div className="relative">
              <button
                onClick={() => setMenuTabId(menuTabId === tab.id ? null : tab.id)}
                className="p-1 hover:bg-muted rounded opacity-0 group-hover:opacity-100 transition-opacity ml-0.5"
              >
                <MoreHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
              </button>

              {/* Dropdown menu */}
              {menuTabId === tab.id && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMenuTabId(null)} />
                  <div className="absolute top-full right-0 mt-1 z-50 bg-background border border-border rounded-lg shadow-lg py-1 w-40">
                    <button
                      onClick={() => startRename(tab)}
                      className="w-full px-3 py-1.5 text-left text-sm hover:bg-muted flex items-center gap-2"
                    >
                      <Pencil className="w-3.5 h-3.5" /> Rename
                    </button>
                    {index > 0 && onMoveTab && (
                      <button
                        onClick={() => { onMoveTab(tab.id, 'left'); setMenuTabId(null) }}
                        className="w-full px-3 py-1.5 text-left text-sm hover:bg-muted flex items-center gap-2"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" /> Move Left
                      </button>
                    )}
                    {index < tabs.length - 1 && onMoveTab && (
                      <button
                        onClick={() => { onMoveTab(tab.id, 'right'); setMenuTabId(null) }}
                        className="w-full px-3 py-1.5 text-left text-sm hover:bg-muted flex items-center gap-2"
                      >
                        <ChevronRight className="w-3.5 h-3.5" /> Move Right
                      </button>
                    )}
                    {tabs.length > 1 && onDeleteTab && (
                      <button
                        onClick={() => { onDeleteTab(tab.id); setMenuTabId(null) }}
                        className="w-full px-3 py-1.5 text-left text-sm hover:bg-muted text-destructive flex items-center gap-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Add Tab button (editor mode only) */}
      {isEditorMode && onAddTab && (
        <button
          onClick={onAddTab}
          className="p-1.5 hover:bg-muted rounded-lg transition-colors ml-1"
          title="Add tab"
        >
          <Plus className="w-4 h-4 text-muted-foreground" />
        </button>
      )}
    </div>
  )
}
