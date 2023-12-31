'use client'

import { FC, useEffect, useState } from 'react'
import Button from '../Button'
import { useFile } from '@/hooks/useFile'
import { useScreenSize } from '@/hooks/useScreenSize'

interface FileSaveProps {

}

const FileSave: FC<FileSaveProps> = ({ }) => {
  const WIDTH_THRESHOLD = 768
  // Get size of screen to render text if screen is big enough
  const { screenWidth } = useScreenSize()

  const { initiateFileSave } = useFile()

  // Listen for <cmd> + s to save file
  // TODO: Consider creating new binding for normal <cmd> + s default action
  //       Maybe even create a throttle of sorts so that a second <cmd> + s 
  //       in rapid succession allows the default action to occur
  useEffect(() => {
    const handleSave = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 's') {
        e.preventDefault()
        initiateFileSave()
      }
    }

    window.addEventListener('keydown', handleSave)
    return () => window.removeEventListener('keydown', handleSave)
  }, [initiateFileSave])

  return (
    <Button
      text={screenWidth > WIDTH_THRESHOLD ? 'Save Changes' : ''}
      icon={{ src: '/assets/icon-save.svg', alt: 'Save Document' }}
      className='whitespace-nowrap'
      onClick={initiateFileSave}
    />
  )
}

export const PlaceholderFileSave: FC = ({ }) => {
  return (
    <Button text={''} icon={{ src: '/assets/icon-save.svg', alt: 'Save Document' }} className='whitespace-nowrap' />
  )
}

export default FileSave