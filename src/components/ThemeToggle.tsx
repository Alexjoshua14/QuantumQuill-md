import React, { FC } from 'react'
import { Switch } from './ui/switch'
import Image from 'next/image'

interface ThemeToggleProps {

}

/**
 * Theme toggle component for switching between light and dark mode
 * 
 * TODO: Add functionality to toggle between light and dark mode
 * TODO: Add functionality to persist theme preference in local storage
 * TODO: Add functionality to toggle between light and dark mode based on system preference
 * TODO: Change svg fill based on theme selected
 * 
 * @param param0 
 * @returns 
 */
const ThemeToggle: FC<ThemeToggleProps> = ({ }) => {
  return (
    <div className="flex gap-2 w-fit py-4 px-6">
      <Image src="/assets/icon-dark-mode.svg" alt="Dark Mode" width={15} height={15} className="object-contain" />
      <Switch id="theme-toggle" />
      <Image src="/assets/icon-light-mode.svg" alt="Light Mode" width={15} height={15} className="object-contain" />
    </div>
  )
}

export default ThemeToggle