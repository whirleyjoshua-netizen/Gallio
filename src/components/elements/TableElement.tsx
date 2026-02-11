'use client'

import { useState } from 'react'
import { Trash2, Plus, X } from 'lucide-react'

interface TableElementProps {
  headers: string[]
  rows: string[][]
  isSelected: boolean
  onSelect: () => void
  onDelete: () => void
  onChange: (updates: { headers?: string[]; rows?: string[][] }) => void
}

export function TableElement({
  headers,
  rows,
  isSelected,
  onSelect,
  onDelete,
  onChange,
}: TableElementProps) {
  const [focusedCell, setFocusedCell] = useState<{ row: number; col: number } | null>(null)

  const updateHeader = (index: number, value: string) => {
    const newHeaders = [...headers]
    newHeaders[index] = value
    onChange({ headers: newHeaders })
  }

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = rows.map((row, ri) =>
      ri === rowIndex
        ? row.map((cell, ci) => (ci === colIndex ? value : cell))
        : row
    )
    onChange({ rows: newRows })
  }

  const addRow = () => {
    const newRow = new Array(headers.length).fill('')
    onChange({ rows: [...rows, newRow] })
  }

  const deleteRow = (index: number) => {
    if (rows.length <= 1) return
    onChange({ rows: rows.filter((_, i) => i !== index) })
  }

  const addColumn = () => {
    const newHeaders = [...headers, `Column ${headers.length + 1}`]
    const newRows = rows.map((row) => [...row, ''])
    onChange({ headers: newHeaders, rows: newRows })
  }

  const deleteColumn = (index: number) => {
    if (headers.length <= 1) return
    const newHeaders = headers.filter((_, i) => i !== index)
    const newRows = rows.map((row) => row.filter((_, i) => i !== index))
    onChange({ headers: newHeaders, rows: newRows })
  }

  return (
    <div
      className={`relative group rounded-lg transition-all ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {headers.map((header, colIndex) => (
                <th
                  key={colIndex}
                  className="relative bg-muted/50 border border-border px-3 py-2 text-left text-sm font-semibold text-foreground"
                >
                  <input
                    type="text"
                    value={header}
                    onChange={(e) => updateHeader(colIndex, e.target.value)}
                    className="w-full bg-transparent border-none outline-none font-semibold"
                    placeholder="Header"
                  />
                  {/* Delete column button */}
                  {isSelected && headers.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteColumn(colIndex)
                      }}
                      className="absolute -top-2 right-1 p-0.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition hover:scale-110"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </th>
              ))}
              {/* Add column button */}
              {isSelected && (
                <th className="w-10 border border-border bg-muted/30">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      addColumn()
                    }}
                    className="w-full h-full flex items-center justify-center text-muted-foreground hover:text-foreground transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="group/row">
                {row.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    className={`border border-border px-3 py-2 text-sm transition ${
                      focusedCell?.row === rowIndex && focusedCell?.col === colIndex
                        ? 'bg-primary/5'
                        : 'bg-background hover:bg-muted/30'
                    }`}
                  >
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                      onFocus={() => setFocusedCell({ row: rowIndex, col: colIndex })}
                      onBlur={() => setFocusedCell(null)}
                      className="w-full bg-transparent border-none outline-none"
                      placeholder="—"
                    />
                  </td>
                ))}
                {/* Delete row button */}
                {isSelected && rows.length > 1 && (
                  <td className="w-10 border border-border bg-muted/10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteRow(rowIndex)
                      }}
                      className="w-full h-full flex items-center justify-center text-muted-foreground hover:text-destructive transition opacity-0 group-hover/row:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add row button */}
      {isSelected && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            addRow()
          }}
          className="mt-2 w-full py-2 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 flex items-center justify-center gap-2 transition"
        >
          <Plus className="w-4 h-4" />
          Add Row
        </button>
      )}

      {/* Delete button */}
      {isSelected && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="absolute -top-3 -right-3 p-1.5 bg-background border border-border rounded-md shadow-sm hover:bg-destructive hover:text-destructive-foreground transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  )
}
