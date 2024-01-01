'use client'

import Image from 'next/image'
import { FC } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../ui/alert-dialog'
import { useAppSelector } from '@/hooks/reduxHooks'
import { useFile } from '@/hooks/useFile'

interface FileDeleteProps {

}

/**
 * 
 * TODO: Change font to Roboto Serif
 * TODO: Connect functionality to delete file
 * 
 * @param param0 
 * @returns 
 */
const FileDelete: FC<FileDeleteProps> = ({ }) => {
  const { filename, deleteFile } = useFile()

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Image src='/assets/icon-delete.svg' width={18} height={20} alt="Delete Document" className='object-contain' />
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-80">
        <AlertDialogHeader className="text-left">
          <AlertDialogTitle className="text-xl text-gray-600">
            {`Delete this document?`}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            {`Are you sure you want to delete the '${filename}' document and its contents?`}
            <br />
            {`This action cannot be reversed.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="font-light text-[15px]">
            {`Cancel`}
          </AlertDialogCancel>
          <AlertDialogAction onClick={deleteFile} className='w-full bg-orange-500 font-light text-[15px]'>
            {`Confirm & Delete`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>

    </AlertDialog>
  )
}

export default FileDelete