
import 'client-only'
import { useCallback, useEffect, useState } from "react"


export const useScreenSize = () => {
  const [screenWidth, setScreenWidth] = useState(window === undefined ? 0 : window.innerWidth)
  const [screenHeight, setScreenHeight] = useState(window === undefined ? 0 : window.innerHeight)

  const handleResize = useCallback(() => {
    if (window === undefined) return
    setScreenWidth(window.innerWidth)
    setScreenHeight(window.innerHeight)
  }, [])

  useEffect(() => {
    if (window === undefined) return

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return { screenWidth, screenHeight }
}