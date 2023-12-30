'use client'

import Image from 'next/image'
import { FC, HTMLAttributes, useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'

interface FileTitleProps extends HTMLAttributes<HTMLDivElement> {
  docName: string
  variant?: 'main' | 'secondary'
  createdAt?: string
}

/**
 * File rename component for renaming the document
 *
 * TODO: Add functionality to actually rename the document 
 * 
 * @param param0 
 * @returns 
 */
const FileTitle: FC<FileTitleProps> = ({ docName, className, variant, createdAt, ...props }) => {
  const [documentName, setDocumentName] = useState<string>(docName)
  const [fileDate, setFileDate] = useState<string>('01 April 2022')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    createdAt && setFileDate(createdAt)
  }, [createdAt])

  const handleDocNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentName(e.target.value)
  }

  const handleDocNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    //setDocumentName(e.target.value)
    try {
      if (!inputRef.current) return

      inputRef.current.selectionStart = 0
    } catch (err) {
      console.error(err)
    }
  }

  const handleDocNameFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    try {
      if (!inputRef.current) return

      const fileExtensionLength = (inputRef.current.value.split('.').pop()?.length ?? -1) + 1

      inputRef.current.selectionStart = 0
      inputRef.current.selectionEnd = inputRef.current.value.length - fileExtensionLength

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={cn("h-full flex items-center gap-4 w-fit", className)} {...props}>
      <Image
        src="/assets/icon-document.svg"
        alt="Document Icon"
        width={15} height={15}
        className="object-contain"
      />
      <div className="flex flex-col items-start">
        <p className="app-body-secondary text-gray-400">
          {variant === 'main' ? `Document Name` : fileDate}
        </p>
        <Input
          onMouseDown={e => { variant === 'secondary' && e.preventDefault() }}
          // Open on double click
          onDoubleClick={() => { variant === 'secondary' && inputRef.current?.focus() }}
          id="doc-name"
          value={documentName}
          ref={inputRef}
          className={`${variant === 'main' ? 'min-w-36 md:min-w-52 lg:w-72 max-w-full' : 'w-full'} 
                    h-6 px-0 rounded-none cursor-pointer
                    app-heading text-white font-light ${variant === 'secondary' && 'group-hover:text-orange-500'}
                    border-0 ${variant === 'main' && 'hover:border-b-[1px]'} 
                    focus-visible:ring-0 focus-visible:border-b-[1px]`}
          onChange={handleDocNameChange}
          onBlur={handleDocNameBlur}
          onFocus={handleDocNameFocus}
        />
      </div>
    </div>
  )
}

export default FileTitle