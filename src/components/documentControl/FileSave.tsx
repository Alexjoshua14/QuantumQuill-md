'use client'

import { FC, useEffect, useState } from 'react'
import Button from '../Button'

interface FileSaveProps {

}

const FileSave: FC<FileSaveProps> = ({ }) => {
  const WIDTH_THRESHOLD = 768
  // Get size of screen to render text if screen is big enough
  const [screenWidth, setScreenWidth] = useState<number>(0)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)

  }, [])

  return (
    <Button
      text={screenWidth > WIDTH_THRESHOLD ? 'Save Changes' : ''}
      icon={{ src: '/assets/icon-save.svg', alt: 'Save Document' }}
      className='whitespace-nowrap'
    />
  )
}

export default FileSave