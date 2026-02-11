'use client'

import { useState, useRef } from 'react'
import { Trash2, Settings, FileCode } from 'lucide-react'
import { Highlight, themes } from 'prism-react-renderer'

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'markup', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'json', label: 'JSON' },
  { value: 'bash', label: 'Bash / Shell' },
  { value: 'sql', label: 'SQL' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'java', label: 'Java' },
  { value: 'c', label: 'C' },
  { value: 'cpp', label: 'C++' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'yaml', label: 'YAML' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'jsx', label: 'JSX' },
  { value: 'tsx', label: 'TSX' },
]

interface CodeElementProps {
  content: string
  language: string
  theme: 'dark' | 'light'
  showLineNumbers: boolean
  filename: string
  isSelected: boolean
  onSelect: () => void
  onDelete: () => void
  onChange: (updates: {
    content?: string
    language?: string
    theme?: 'dark' | 'light'
    showLineNumbers?: boolean
    filename?: string
  }) => void
}

export function CodeElement({
  content,
  language,
  theme,
  showLineNumbers,
  filename,
  isSelected,
  onSelect,
  onDelete,
  onChange,
}: CodeElementProps) {
  const [showSettings, setShowSettings] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const isDark = theme === 'dark'
  const themeObject = isDark ? themes.vsDark : themes.github

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const target = e.target as HTMLTextAreaElement
      const start = target.selectionStart
      const end = target.selectionEnd
      const newContent = content.substring(0, start) + '  ' + content.substring(end)
      onChange({ content: newContent })
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 2
      })
    }
  }

  const lineCount = Math.max(5, content.split('\n').length + 1)

  return (
    <div
      className={`relative group rounded-lg overflow-hidden transition-all ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
    >
      {/* Filename header */}
      {filename && (
        <div className={`flex items-center gap-2 px-4 py-2 text-sm ${
          isDark ? 'bg-[#2d2d2d] text-gray-300' : 'bg-gray-100 text-gray-600'
        }`}>
          <FileCode className="w-4 h-4" />
          <span>{filename}</span>
        </div>
      )}

      {/* Code area */}
      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => onChange({ content: e.target.value })}
          onBlur={() => setIsEditing(false)}
          onKeyDown={handleKeyDown}
          autoFocus
          rows={lineCount}
          className={`w-full p-4 text-sm font-mono resize-none outline-none ${
            isDark
              ? 'bg-[#1e1e1e] text-gray-200'
              : 'bg-[#ffffff] text-gray-800'
          }`}
          style={{ tabSize: 2 }}
          spellCheck={false}
        />
      ) : (
        <div
          className="cursor-text"
          onClick={(e) => {
            e.stopPropagation()
            onSelect()
            setIsEditing(true)
          }}
        >
          <Highlight theme={themeObject} code={content || ' '} language={language}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={`${className} overflow-x-auto text-sm`}
                style={{ ...style, margin: 0, padding: '1rem' }}
              >
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {showLineNumbers && (
                      <span className="inline-block w-8 text-right mr-4 opacity-40 select-none text-xs">
                        {i + 1}
                      </span>
                    )}
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      )}

      {/* Controls */}
      {isSelected && (
        <div className="absolute -top-3 right-2 flex items-center gap-1 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowSettings(!showSettings)
            }}
            className="p-1.5 bg-background border border-border rounded-md shadow-sm hover:bg-muted transition"
          >
            <Settings className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            className="p-1.5 bg-background border border-border rounded-md shadow-sm hover:bg-destructive hover:text-destructive-foreground transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && isSelected && (
        <div
          className="absolute top-full left-0 mt-2 w-72 bg-background border border-border rounded-lg shadow-xl p-4 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <h4 className="font-medium mb-3 text-sm">Code Block Settings</h4>

          {/* Language */}
          <div className="mb-3">
            <label className="text-xs text-muted-foreground block mb-1">Language</label>
            <select
              value={language}
              onChange={(e) => onChange({ language: e.target.value })}
              className="w-full px-2 py-1.5 text-sm bg-muted border border-border rounded-md outline-none focus:ring-2 focus:ring-primary"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>{lang.label}</option>
              ))}
            </select>
          </div>

          {/* Theme */}
          <div className="mb-3">
            <label className="text-xs text-muted-foreground block mb-1">Theme</label>
            <div className="flex gap-1">
              {(['dark', 'light'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => onChange({ theme: t })}
                  className={`flex-1 py-1.5 text-xs rounded-md border transition capitalize ${
                    theme === t
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-muted border-border hover:border-muted-foreground'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Line Numbers */}
          <div className="mb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showLineNumbers}
                onChange={(e) => onChange({ showLineNumbers: e.target.checked })}
                className="w-4 h-4 rounded"
              />
              <span className="text-xs text-muted-foreground">Show line numbers</span>
            </label>
          </div>

          {/* Filename */}
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Filename</label>
            <input
              type="text"
              value={filename}
              onChange={(e) => onChange({ filename: e.target.value })}
              placeholder="e.g., app.tsx"
              className="w-full px-2 py-1.5 text-sm bg-muted border border-border rounded-md outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      )}
    </div>
  )
}
