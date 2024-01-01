import { FC, useRef } from 'react'
import { ImperativePanelHandle } from 'react-resizable-panels'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable'
import MarkdownSection from './MarkdownSection'
import Preview from './Preview'


interface DesktopMarkdownEditorProps {

}

const DesktopMarkdownEditor: FC<DesktopMarkdownEditorProps> = ({ }) => {
  const mdRef = useRef<ImperativePanelHandle>(null)
  const previewRef = useRef<ImperativePanelHandle>(null)

  return (
    <ResizablePanelGroup direction='horizontal' className="min-w-[300px] w-full min-h-[calc(100dvh-72px)] max-h-[calc(100dvh-72px)]">
      <ResizablePanel ref={mdRef} defaultSize={50} className="min-h-full max-h-full">
        <MarkdownSection parentPanelRef={mdRef} />
      </ResizablePanel>
      <ResizableHandle withHandle className='bg-gray-300' />
      <ResizablePanel ref={previewRef} defaultSize={50} className="min-h-full max-h-full">
        <Preview parentPanelRef={previewRef} />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default DesktopMarkdownEditor