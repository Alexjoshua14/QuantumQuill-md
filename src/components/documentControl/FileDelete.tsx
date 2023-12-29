'use client'

import Image from 'next/image'
import { FC } from 'react'

interface FileDeleteProps {

}

const FileDelete: FC<FileDeleteProps> = ({ }) => {
  return (
    <button>
      <Image src='/assets/icon-delete.svg' width={18} height={20} alt="Delete Document" className='object-contain' />
    </button>
  )
}

export default FileDelete