'use client'

import { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { Copy, Check, FileCode } from 'lucide-react'
import type { CanvasElement } from '@/lib/types/canvas'

interface PublicCodeElementProps {
  element: CanvasElement
}

export function PublicCodeElement({ element }: PublicCodeElementProps) {
  const [copied, setCopied] = useState(false)

  const content = element.codeContent || ''
  const language = element.codeLanguage || 'javascript'
  const isDark = (element.codeTheme || 'dark') === 'dark'
  const showLineNumbers = element.codeShowLineNumbers ?? true
  const filename = element.codeFilename || ''
  const themeObject = isDark ? themes.vsDark : themes.github

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`rounded-lg overflow-hidden border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      {/* Filename header bar */}
      {filename && (
        <div className={`flex items-center gap-2 px-4 py-2 text-sm ${
          isDark ? 'bg-[#2d2d2d] text-gray-300' : 'bg-gray-100 text-gray-600'
        }`}>
          <FileCode className="w-4 h-4" />
          <span>{filename}</span>
        </div>
      )}

      {/* Code block with copy button */}
      <div className="relative group">
        <button
          onClick={handleCopy}
          className={`absolute top-3 right-3 p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity ${
            isDark
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
          }`}
          title="Copy code"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>

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
    </div>
  )
}
