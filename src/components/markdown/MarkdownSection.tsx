'use client'

import { FC, Ref, Suspense, use, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { setContent, setMarkdown } from '@/redux/slices/markdownSlice'
import { useFile } from '@/hooks/useFile'
import { ImperativePanelHandle } from 'react-resizable-panels'
import { useImperativePanelHandle } from '@/hooks/useImperativePanelHandle'
import TitleBar from './TitleBar'
import { useCommand } from '@/hooks/useCommand'

interface MarkdownProps {
  parentPanelRef?: React.RefObject<ImperativePanelHandle>
  toggleShowPreview?: () => void
}

/**
 * TODO: Properly render markdown text
 * TODO: Add key shortcut to show a dropdown of markdown shortcuts
 * TODO: Integrate some AI/LLM to suggest autocompletions
 * TODO: Integrate some AI/LLM to help generate templates
 * TODO: Consider adding the rest of emacs keybindings, some are supported by default
 * TODO: Consider moving localContent to localStorage to persist data even on accidental refresh/close
 * TODO: Refine act of zooming on click of textarea
 * 
 * @param param0 
 * @returns 
 */
const MarkdownSection: FC<MarkdownProps> = ({ parentPanelRef, toggleShowPreview }) => {

  const { content, shouldSave, saveFile } = useFile()
  const [localContent, setLocalContent] = useState<string>('')
  const { fullScreen } = useImperativePanelHandle(parentPanelRef ?? null)


  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { checkForShortcuts, handleClick } = useCommand(textareaRef, setLocalContent)

  useEffect(() => {
    setLocalContent(content)

  }, [content])

  useEffect(() => {
    if (shouldSave) {
      saveFile({ content: localContent })
    }
  }, [shouldSave, localContent, saveFile])

  const updateMarkdown = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalContent(e.target.value)
    // console.log("Local content updated")
  }




  return (
    <section className="h-full overflow-y-auto flex flex-col">
      <TitleBar title="Markdown" onDoubleClick={fullScreen} toggleShowPreview={toggleShowPreview} />
      <div className="h-full max-w-full p-2">
        <Suspense fallback={<div>Loading...</div>}>
          <textarea
            value={localContent}
            className="w-full h-full p-4 preview-markdown whitespace-pre-wrap resize-none focus:outline-none bg-transparent"
            onChange={updateMarkdown}
            onKeyDown={checkForShortcuts}
            onClick={handleClick}
            ref={textareaRef}
          />
        </Suspense>
      </div>
    </section>
  )
}

export default MarkdownSection