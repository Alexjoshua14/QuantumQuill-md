'use client'

import { FC, Ref, Suspense, use, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { setContent, setMarkdown } from '@/redux/slices/markdownSlice'
import { useFile } from '@/hooks/useFile'
import { ImperativePanelHandle } from 'react-resizable-panels'
import { useImperativePanelHandle } from '@/hooks/useImperativePanelHandle'
import TitleBar from './TitleBar'

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
  const [commandQuery, setCommandQuery] = useState<string>('')
  const [commandActive, setCommandActive] = useState<boolean>(false)
  const [commandIndex, setCommandIndex] = useState<number>(0)

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

  const resetCommand = () => {
    setCommandActive(false)
    setCommandQuery('')
    setCommandIndex(1)
  }

  /** 
   * TODO: Move this logic to separate file and clean it up! 
   * TODO: Handle user deleting multiple characters using shift/option/etc + arrow keys
   * TODO: Handle user clicking on textarea to move cursor, this should just reset the command
   * TODO: Handle user using undo/redo, this should just reset the command for now
   * TODO: Create dictionary of commands and their respective functions
   * 
   */
  const checkForShortcuts = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (commandActive) {
      if (e.key === 'Enter') {
        e.preventDefault()
        console.log("Command entered: ", commandQuery)
        resetCommand()
      } else if (e.key === 'Escape') {
        e.preventDefault()
        console.log("Command canceled")
        resetCommand()
      } else if (e.key === 'Backspace') {
        if (commandQuery.length === 0) {
          resetCommand()
          console.log("Backed out of command")
          return
        }
        if (commandQuery.length > commandIndex)
          setCommandQuery(prev => commandQuery.slice(0, commandIndex - 1) + commandQuery.slice(commandIndex))
        else
          setCommandQuery(prev => commandQuery.slice(0, -1))

        setCommandIndex(prev => prev - 1)

      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        console.log("Up arrow pressed")
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        console.log("Down arrow pressed")
      } else if (e.key === 'ArrowLeft') {
        if (commandIndex > 0)
          setCommandIndex(prev => prev - 1)
        else {
          console.log("Moving past beginning of command")
          resetCommand()
          return
        }
      } else if (e.key === 'ArrowRight') {
        if (commandIndex < commandQuery.length)
          setCommandIndex(prev => prev + 1)
        else {
          console.log("Moving past end of command")
          resetCommand()
          return
        }

      } else if (/^[a-zA-Z0-9]$/.test(e.key)) {

        if (commandQuery.length > commandIndex)
          setCommandQuery(prev => prev.slice(0, commandIndex) + e.key + prev.slice(commandIndex))
        else
          setCommandQuery(prev => prev + e.key)

        setCommandIndex(prev => prev + 1)

        /// TEMP CODE
        if (commandQuery.length > commandIndex)
          console.log("Command query: ", commandQuery.slice(0, commandIndex) + e.key + commandQuery.slice(commandIndex))
        else
          console.log("Command query: ", commandQuery + e.key)

      }
    } else if (e.key === '/') {
      console.log("Looks like we have a hit!")
      setCommandActive(true)
    }
  }

  const handleClick = () => {
    if (commandActive) {
      console.log("Clicked textarea")
      resetCommand()
    }
  }

  return (
    <section className="h-full overflow-y-auto flex flex-col">
      <TitleBar title="Markdown" onDoubleClick={fullScreen} toggleShowPreview={toggleShowPreview} />
      <div className="h-full max-w-full p-2">
        <Suspense fallback={<div>Loading...</div>}>
          <textarea
            value={localContent}
            className="w-full h-full p-4 preview-markdown whitespace-pre-wrap resize-none focus:outline-none "
            onChange={updateMarkdown}
            onKeyDown={checkForShortcuts}
            onClick={handleClick}
          />
        </Suspense>
      </div>
    </section>
  )
}

export default MarkdownSection