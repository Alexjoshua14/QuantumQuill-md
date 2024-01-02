import React from 'react'
import dynamic from 'next/dynamic'

export default function Home() {
  const EditorWrapper = dynamic(() => import('@/components/markdown/EditorWrapper'), { ssr: false })

  return (
    <main className="h-dvh pt-[72px]">
      <EditorWrapper />
    </main>
  )
}
