'use client'

import { FC } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable'
import MarkdownSection from './MarkdownSection'
import Preview from './Preview'

interface MarkdownWrapperProps {

}

/**
 * 
 * TODO: Correct height calculation
 * @param param0 
 * @returns 
 */
const MarkdownWrapper: FC<MarkdownWrapperProps> = ({ }) => {

  return (
    <ResizablePanelGroup direction='horizontal' className="min-w-[300px] w-full min-h-[calc(100dvh-72px)] max-h-[calc(100dvh-72px)]">
      <ResizablePanel className="min-h-full max-h-full">
        <MarkdownSection />
      </ResizablePanel>
      <ResizableHandle withHandle className='bg-gray-300' />
      <ResizablePanel className="min-h-full max-h-full">
        <Preview />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default MarkdownWrapper