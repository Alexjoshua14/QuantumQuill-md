import { FC, useEffect, useState, Ref } from 'react'
import { useFile } from '@/hooks/useFile'

import Markdown from 'react-markdown'
import { ImperativePanelHandle } from 'react-resizable-panels'
import { remark } from 'remark'
import html from 'remark-html'
import { useImperativePanelHandle } from '@/hooks/useImperativePanelHandle'

interface PreviewProps {
  parentPanelRef?: React.RefObject<ImperativePanelHandle>
}

/**
 * TODO: Properly render markdown html conversion
 * TODO: Combine preview and markdown title bars into one component
 * 
 * @param param0 
 * @returns 
 */
const Preview: FC<PreviewProps> = ({ parentPanelRef }) => {
  const { content } = useFile()

  const { fullScreen } = useImperativePanelHandle(parentPanelRef ?? null)

  return (
    <section className="h-full overflow-y-auto flex flex-col">
      <div className="w-full min-h-10 h-10 px-2 flex items-center bg-secondary cursor-pointer" onDoubleClick={fullScreen}>
        <h2 className="app-heading-secondary  pointer-events-none select-none">
          Preview
        </h2>
      </div>
      <Markdown className="p-4">
        {content}
      </Markdown>
    </section>
  )
}

export default Preview