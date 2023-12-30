'use client'

import { FC } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '../ui/sheet'
import Image from 'next/image'

interface SideBarProps {

}

const SideBar: FC<SideBarProps> = ({ }) => {
  return (
    <Sheet>
      <SheetTrigger className="h-full min-w-fit px-6 text-white bg-gray-600">
        <Image src="/assets/icon-menu.svg" alt="Menu" width={30} height={18} className="object-contain" />
      </SheetTrigger>
      <SheetContent side={'left'} className='bg-gray-700 text-white'>
        <SheetTitle>
          Title Here
        </SheetTitle>
        <SheetDescription>
          Description Here
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}

export default SideBar