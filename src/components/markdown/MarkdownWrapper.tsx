'use client'

import { FC, useRef, useState } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable'
import MarkdownSection from './MarkdownSection'
import Preview from './Preview'
import { ImperativePanelHandle } from 'react-resizable-panels'

interface MarkdownWrapperProps {

}

/**
 * 
 * TODO: Correct height calculation
 * @param param0 
 * @returns 
 */
const MarkdownWrapper: FC<MarkdownWrapperProps> = ({ }) => {
  // mdRef is used as a ref to ResizablePanel
  const mdRef = useRef<ImperativePanelHandle>(null)
  const previewRef = useRef<ImperativePanelHandle>(null)

  const [showPreview, setShowPreview] = useState<boolean>(false)

  const toggleShowPreview = () => {
    setShowPreview((prev) => !prev)
  }

  return (
    <>
      <div className="hidden sm:block">
        <ResizablePanelGroup direction='horizontal' className="min-w-[300px] w-full min-h-[calc(100dvh-72px)] max-h-[calc(100dvh-72px)]">
          <ResizablePanel ref={mdRef} defaultSize={50} className="min-h-full max-h-full">
            <MarkdownSection parentPanelRef={mdRef} />
          </ResizablePanel>
          <ResizableHandle withHandle className='bg-gray-300' />
          <ResizablePanel ref={previewRef} defaultSize={50} className="min-h-full max-h-full">
            <Preview parentPanelRef={previewRef} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="sm:hidden w-full h-full flex flex-col">
        {showPreview ? <Preview toggleShowPreview={toggleShowPreview} /> : <MarkdownSection toggleShowPreview={toggleShowPreview} />}
      </div>
    </>
  )
}

export default MarkdownWrapper