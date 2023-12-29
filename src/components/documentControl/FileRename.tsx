'use client'

import Image from 'next/image'
import { FC, HTMLAttributes, useState } from 'react'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'

interface FileRenameProps extends HTMLAttributes<HTMLDivElement> {
  docName: string
}

/**
 * File rename component for renaming the document
 *
 * TODO: Add functionality to actually rename the document 
 * 
 * @param param0 
 * @returns 
 */
const FileRename: FC<FileRenameProps> = ({ docName, className, ...props }) => {
  const [documentName, setDocumentName] = useState<string>(docName)

  const handleDocNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentName(e.target.value)
  }

  return (
    <div className={cn("h-full flex items-center gap-4 w-fit", className)} {...props}>
      <Image src="/assets/icon-document.svg" alt="Document Icon" width={15} height={15} className="object-contain" />
      <div className="flex flex-col">
        <p className="app-body-secondary text-gray-400">Document Name</p>
        <Input id="doc-name" value={documentName} className="w-72 h-6 px-0 app-heading text-white font-light focus-visible:ring-0 border-0 hover:border-b-[1px] focus-visible:border-b-[1px] rounded-none" onChange={handleDocNameChange} />
      </div>
    </div>
  )
}

export default FileRename