import { FC, useEffect, useState, Ref } from 'react'
import { useFile } from '@/hooks/useFile'

import Markdown from 'react-markdown'
import { ImperativePanelHandle } from 'react-resizable-panels'
import { remark } from 'remark'
import html from 'remark-html'
import { useImperativePanelHandle } from '@/hooks/useImperativePanelHandle'
import TitleBar from './TitleBar'

interface PreviewProps {
  parentPanelRef?: React.RefObject<ImperativePanelHandle>
  toggleShowPreview?: () => void
}

/**
 * TODO: Properly render markdown html conversion
 * 
 * @param param0 
 * @returns 
 */
const Preview: FC<PreviewProps> = ({ parentPanelRef, toggleShowPreview }) => {
  const { content } = useFile()

  const { fullScreen } = useImperativePanelHandle(parentPanelRef ?? null)

  return (
    <section className="h-full overflow-y-auto flex flex-col">
      <TitleBar title="Preview" onDoubleClick={fullScreen} toggleShowPreview={toggleShowPreview} />
      <Markdown className="m-2 h-full overflow-y-auto">
        {content}
      </Markdown>
    </section>
  )
}

export default Preview