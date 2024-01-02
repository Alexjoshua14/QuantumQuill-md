'use client'

import { FC, useState } from 'react'
import MarkdownSection from './MarkdownSection'
import PreviewSection from './PreviewSection'


interface MobileEditorProps {

}

const MobileEditor: FC<MobileEditorProps> = ({ }) => {
  const [showPreview, setShowPreview] = useState<boolean>(false)

  const toggleShowPreview = () => {
    setShowPreview((prev) => !prev)
  }

  return (
    <div className="sm:hidden w-full h-full flex flex-col">
      {showPreview ? <PreviewSection toggleShowPreview={toggleShowPreview} /> : <MarkdownSection toggleShowPreview={toggleShowPreview} />}
    </div>
  )
}

export default MobileEditor