'use client'

import { FC } from 'react'
import { useScreenSize } from '@/hooks/useScreenSize'
import DesktopEditor from './DesktopEditor'
import MobileEditor from './MobileEditor'

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
    <DesktopEditor />
    : <MobileEditor />
}

export default MarkdownWrapper