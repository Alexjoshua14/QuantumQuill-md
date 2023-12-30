import { useCallback, useEffect, useState } from "react"


export const useScreenSize = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [screenHeight, setScreenHeight] = useState(window.innerHeight)

  const handleResize = useCallback(() => {
    setScreenWidth(window.innerWidth)
    setScreenHeight(window.innerHeight)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return { screenWidth, screenHeight }
}