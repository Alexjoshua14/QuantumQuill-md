import { FC, useEffect, useState } from 'react'
import { useFile } from '@/hooks/useFile'

import Markdown from 'react-markdown'
import { ImperativePanelHandle } from 'react-resizable-panels'
import { useImperativePanelHandle } from '@/hooks/useImperativePanelHandle'
import TitleBar from './TitleBar'
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '../ui/context-menu'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'

interface PreviewSectionProps {
  parentPanelRef?: React.RefObject<ImperativePanelHandle>
  toggleShowPreview?: () => void
}

/**
 * TODO: Properly render markdown html conversion
 * 
 * @param param0 
 * @returns 
 */
const PreviewSection: FC<PreviewSectionProps> = ({ parentPanelRef, toggleShowPreview }) => {
  const { content } = useFile()

  const { fullScreen } = useImperativePanelHandle(parentPanelRef ?? null)

  /** Allow preview to be either rendered html or straight html */
  const [rendered, setRendered] = useState<boolean>(true)
  const [html, setHtml] = useState<string>("")

  useEffect(() => {
    const processMD = async () => {
      if (!content) return
      const result = await unified()
        .use(remarkParse)
        .use(remarkHtml)
        .process(content)

      setHtml(String(result))
    }

    processMD()

  }, [content])

  const toggleRendered = () => {
    // Using a timeout to allow the context menu to close before switching text
    setTimeout(() => {
      setRendered(prev => !prev)
    }, 100)
  }


  return (
    <section className="h-full overflow-y-auto flex flex-col">
      <ContextMenu>
        <ContextMenuTrigger>
          <TitleBar title="Preview" onDoubleClick={fullScreen} toggleShowPreview={toggleShowPreview} />
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuCheckboxItem onClick={toggleRendered} checked={!rendered}>
            {`Show raw HTML`}
          </ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
      {rendered ?
        <Markdown remarkPlugins={[remarkGfm]} className="m-2 p-4 h-full overflow-y-auto preview flex flex-col gap-5">
          {content}
        </Markdown>
        :
        <pre className="m-2 p-4 h-full overflow-y-auto preview flex flex-col gap-5">
          {html}
        </pre>
      }
    </section>
  )
}

export default PreviewSection