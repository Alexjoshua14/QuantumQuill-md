'use client'

import { FC, useRef, useState } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable'
import MarkdownSection from './MarkdownSection'
import Preview from './Preview'
import { ImperativePanelHandle } from 'react-resizable-panels'
import { useScreenSize } from '@/hooks/useScreenSize'
import DesktopMarkdownEditor from './DesktopMarkdownEditor'
import MobileMarkdownEditor from './MobileMarkdownEditor'

interface MarkdownWrapperProps {

}

/**
 * 
 * TODO: Correct height calculation
 * @param param0 
 * @returns 
 */
const MarkdownWrapper: FC<MarkdownWrapperProps> = ({ }) => {
  const { screenWidth } = useScreenSize()

  return (screenWidth > 480) ?
    <DesktopMarkdownEditor />
    : <MobileMarkdownEditor />
}

export default MarkdownWrapper