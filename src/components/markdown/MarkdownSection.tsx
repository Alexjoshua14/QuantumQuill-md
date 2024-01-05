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
  const [cursor, setCursor] = useState({ start: 0, end: 0 })
  const { checkForShortcuts, handleClick, commandActive } = useCommand(textareaRef, setLocalContent)

  const [commandListPosition, setCommandListPosition] = useState({ x: 0, y: 0 })

  /**
   * Set localContent to content on content change
   */
  useEffect(() => {
    setLocalContent(content)

  }, [content])

  /**
   * Save file on localContent change
   */
  useEffect(() => {
    if (shouldSave) {
      saveFile({ content: localContent })
    }
  }, [shouldSave, localContent, saveFile])

  /**
   * Update cursor position on localContent change
   * Mainly used to ensure cursor is positioned properly after
   * a shortcut is used
   */
  useEffect(() => {
    textareaRef.current?.setSelectionRange(cursor.start, cursor.end)

  }, [textareaRef, localContent, cursor])

  // useEffect(() => {
  //   if (commandActive) {
  //     getCaretCoordinates()
  //   }
  // }, [commandActive])

  const updateMarkdown = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCursor({ start: e.currentTarget.selectionStart, end: e.currentTarget.selectionEnd })
    setLocalContent(e.target.value)
    // console.log("Local content updated")
  }

  /**
   * Wrapper function to check for shortcuts and update cursor position
   */
  const shortcutWrapper = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const cursorPosition = checkForShortcuts(e)
    if (cursorPosition) {
      setCursor(cursorPosition)
    }
  }

  return (
    <section className="h-full overflow-y-auto flex flex-col">
      <TitleBar title="Markdown" onDoubleClick={fullScreen} toggleShowPreview={toggleShowPreview} />
      <div className="relative h-full max-w-full p-2">
        <Suspense fallback={<div>Loading...</div>}>
          <textarea
            value={localContent}
            className="w-full h-full p-4 preview-markdown whitespace-pre-wrap resize-none focus:outline-none bg-transparent"
            onChange={updateMarkdown}
            onKeyDown={shortcutWrapper}
            onClick={handleClick}
            ref={textareaRef}
          />
          {/* <Suspense>
            <div
              className={`absolute w-40 h-14 p-4 bg-orange-300 ${commandActive ? 'block' : 'hidden'}`}
              style={{ left: commandListPosition.x, top: commandListPosition.y }}
            >

            </div>
          </Suspense> */}
        </Suspense>
      </div>
    </section>
  )
}

export default MarkdownSection