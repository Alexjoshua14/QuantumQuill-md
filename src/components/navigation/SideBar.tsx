'use client'

import { FC } from 'react'
import { Sheet, SheetContent, SheetFooter, SheetTitle, SheetTrigger } from '../ui/sheet'
import Image from 'next/image'
import Button from '../Button'
import ThemeToggle from '../ThemeToggle'
import { SignInButton, SignOutButton } from '../oauth/OAuthButtons'
import { useSession } from 'next-auth/react'

interface SideBarProps {
  signedIn?: boolean
  children?: React.ReactNode
}

const SideBar: FC<SideBarProps> = ({ signedIn, children }) => {
  const { status } = useSession()

  return (
    <Sheet>
      <SheetTrigger className="h-full min-w-fit px-6 text-white bg-gray-600 hover:bg-orange-500 transition-colors">
        <Image src="/assets/icon-menu.svg" alt="Menu" width={30} height={18} className="object-contain" priority />
      </SheetTrigger>
      <SheetContent side={'left'} className='bg-gray-800 text-white w-64 flex flex-col gap-7 border-0'>
        <SheetTitle className="app-heading-secondary text-gray-400">
          {`My Documents`.toUpperCase()}
        </SheetTitle>

        <div className="h-full pb-10 flex flex-col justify-between">
          <div className="grid grid-flow-row gap-4">
            {status === 'unauthenticated' && <SignInButton />}
            <Button className="w-full grid place-content-center" text="+ New Document" />
            {children}

          </div>
          <div className="w-full flex">
            {status === 'authenticated' && <SignOutButton className='w-full' />}
          </div>
        </div>
        <SheetFooter className="absolute bottom-1 left-0">
          <ThemeToggle />
        </SheetFooter>

      </SheetContent>
    </Sheet>
  )
}

export default SideBar