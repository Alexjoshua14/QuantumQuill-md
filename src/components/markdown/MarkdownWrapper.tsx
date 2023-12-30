'use client'

import { FC } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable'

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
    <ResizablePanelGroup direction='horizontal' className="w-full min-h-[calc(100dvh-72px)]">
      <ResizablePanel className="w-full min-h-full">
        <section className="h-full flex flex-col">
          <div className="w-full h-10 px-2 flex items-center bg-secondary">
            <h2 className="app-heading-secondary">
              Markdown
            </h2>
          </div>
          <div className="h-full px-2">
            some markdown goes here
          </div>
        </section>
      </ResizablePanel>
      <ResizableHandle withHandle className='bg-gray-300' />
      <ResizablePanel className="w-full min-h-full">
        <section className="h-full flex flex-col ">
          <div className="w-full h-10 px-2 flex items-center  bg-secondary">
            <h2 className="app-heading-secondary">
              Preview
            </h2>
          </div>
          <div className="h-full px-2">
            some preview goes here
          </div>
        </section>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default MarkdownWrapper