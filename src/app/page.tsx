import React from 'react'
import ThemeToggle from '@/components/ThemeToggle'
import FileRename from '@/components/documentControl/FileRename'
import MarkdownWrapper from '@/components/markdown/MarkdownWrapper'

export default function Home() {
  return (
    <main className="min-h-dvh py-[72px] bg-orange-500">
      <MarkdownWrapper />
    </main>
  )
}
