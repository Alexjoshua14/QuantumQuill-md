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
    <ResizablePanelGroup direction='horizontal' className="w-full min-h-[calc(100dvh-144px)] bg-gray-700">
      <ResizablePanel className="w-full h-full bg-gray-500" >
        <section className="h-full flex flex-col">
          <div className="w-full h-10 px-2 flex items-center bg-secondary">
            <h2 className="app-heading-secondary">
              Markdown
            </h2>
          </div>
          <div className="h-full px-2 bg-orange-300">
            some markdown goes here
          </div>
        </section>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <section className="flex flex-col ">
          <div className="w-full h-10 px-2 flex items-center  bg-secondary">
            <h2 className="app-heading-secondary">
              Preview
            </h2>
          </div>
          <div className="h-full px-2 bg-orange-300">
            some preview goes here
          </div>
        </section>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default MarkdownWrapper