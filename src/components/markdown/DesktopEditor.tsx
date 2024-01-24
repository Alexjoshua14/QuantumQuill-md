import { FC, useRef } from 'react'
import { ImperativePanelHandle } from 'react-resizable-panels'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable'
import MarkdownSection from './MarkdownSection'
import PreviewSection from './PreviewSection'


interface DesktopEditorProps {

}

const DesktopEditor: FC<DesktopEditorProps> = ({ }) => {
  const mdRef = useRef<ImperativePanelHandle>(null)
  const previewRef = useRef<ImperativePanelHandle>(null)

  return (
    <ResizablePanelGroup direction='horizontal' className="min-w-[300px] w-full h-[calc(100dvh-72px)]">
      <ResizablePanel ref={mdRef} defaultSize={50} className="min-h-full max-h-full">
        <MarkdownSection parentPanelRef={mdRef} />
      </ResizablePanel>
      <ResizableHandle withHandle className='bg-border' />
      <ResizablePanel ref={previewRef} defaultSize={50} className="min-h-full max-h-full">
        <PreviewSection parentPanelRef={previewRef} />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default DesktopEditor