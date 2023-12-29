import React from 'react'
import ThemeToggle from '@/components/ThemeToggle'
import FileRename from '@/components/documentControl/FileRename'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between lg:flex">
        <div className="flex flex-col gap-4">
          <ThemeToggle />
          <FileRename docName='Untitled Document.md' />
        </div>
      </div>
    </main>
  )
}
