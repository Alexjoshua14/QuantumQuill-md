'use client'

import { FC } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '../ui/sheet'
import Image from 'next/image'
import Button from '../Button'
import FileList from './FileList'

interface SideBarProps {
  children?: React.ReactNode
}

const SideBar: FC<SideBarProps> = ({ children }) => {
  return (
    <Sheet defaultOpen>
      <SheetTrigger className="h-full min-w-fit px-6 text-white bg-gray-600">
        <Image src="/assets/icon-menu.svg" alt="Menu" width={30} height={18} className="object-contain" />
      </SheetTrigger>
      <SheetContent side={'left'} className='bg-gray-800 text-white w-64 flex flex-col gap-7'>
        <SheetTitle className="app-heading-secondary text-gray-400">
          {`My Documents`.toUpperCase()}
        </SheetTitle>
        <SheetDescription className="grid grid-flow-row gap-4">
          <Button className="w-full grid place-content-center" text="+ New Document" />
          {children}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}

export default SideBar