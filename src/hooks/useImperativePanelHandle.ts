import { useCallback, useRef } from "react"
import { ImperativePanelHandle } from "react-resizable-panels"

export const useImperativePanelHandle = (handleRef: React.RefObject<ImperativePanelHandle> | null) => {
    /** Panel size control */
  const sizeRef = useRef<number>(50)

  const fullScreen = useCallback(() => {
    if (!handleRef?.current) return

    console.log("Should be resizing..")
    const size = handleRef.current.getSize()
    if (size === 100) {
      handleRef.current.resize(sizeRef.current)
    } else {
      sizeRef.current = size
      handleRef.current.resize(100)
    }
  }, [handleRef])

  return { fullScreen }
}