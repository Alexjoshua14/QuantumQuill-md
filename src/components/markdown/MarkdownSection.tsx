'use client'

import { FC, Ref, Suspense, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { setContent, setMarkdown } from '@/redux/slices/markdownSlice'
import { useFile } from '@/hooks/useFile'
import { ImperativePanelHandle } from 'react-resizable-panels'
import { useImperativePanelHandle } from '@/hooks/useImperativePanelHandle'

interface MarkdownProps {
  parentPanelRef?: React.RefObject<ImperativePanelHandle>
}

/**
 * TODO: Properly render markdown text
 * TODO: Add key shortcut to show a dropdown of markdown shortcuts
 * TODO: Integrate some AI/LLM to suggest autocompletions
 * TODO: Integrate some AI/LLM to help generate templates
 * TODO: Combine preview and markdown title bars into one component
 * 
 * @param param0 
 * @returns 
 */
const MarkdownSection: FC<MarkdownProps> = ({ parentPanelRef }) => {
  const [localContent, setLocalContent] = useState<string>('')

  const { content, shouldSave, saveFile } = useFile()
  const { fullScreen } = useImperativePanelHandle(parentPanelRef ?? null)

  useEffect(() => {
    setLocalContent(content)

  }, [content])

  useEffect(() => {
    if (shouldSave)
      saveFile({ content: localContent })
  }, [shouldSave, localContent, saveFile])

  const updateMarkdown = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalContent(e.target.value)
  }

  return (
    <section className="h-full overflow-y-auto flex flex-col">
      <div className="w-full min-h-10 h-10 px-2 flex items-center bg-secondary cursor-pointer" onDoubleClick={fullScreen}>
        <h2 className="app-heading-secondary pointer-events-none select-none">
          Markdown
        </h2>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="h-full p-2 max-w-full">
          <textarea
            value={localContent}
            className="w-full h-full preview-markdown whitespace-pre-wrap resize-none focus:outline-none"
            onChange={updateMarkdown}
          />
        </div>
      </Suspense>
    </section>
  )
}

export default MarkdownSection