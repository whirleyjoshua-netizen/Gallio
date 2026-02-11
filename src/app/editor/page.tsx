'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { PageEditor } from '@/components/editor/PageEditor'

function EditorContent() {
  const searchParams = useSearchParams()
  const pageId = searchParams.get('id')

  return <PageEditor pageId={pageId || undefined} />
}

export default function EditorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading editor...</div>
      </div>
    }>
      <EditorContent />
    </Suspense>
  )
}
