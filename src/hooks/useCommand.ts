import { useState } from "react"


export const useCommand = (textareaRef: React.RefObject<HTMLTextAreaElement>) => {
  const [commandQuery, setCommandQuery] = useState<string>('')
  const [commandActive, setCommandActive] = useState<boolean>(false)
  const [commandIndex, setCommandIndex] = useState<number>(0)

  const resetCommand = () => {
    setCommandActive(false)
    setCommandQuery('')
    setCommandIndex(1)
  }

  /** 
   * TODO: Move this logic to separate file and clean it up! 
   * TODO: Handle user deleting multiple characters using shift/option/etc + arrow keys
   * TODO: Handle user clicking on textarea to move cursor, this should just reset the command
   * TODO: Handle user using undo/redo, this should just reset the command for now
   * TODO: Create dictionary of commands and their respective functions
   * 
   */
  const checkForShortcuts = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (commandActive) {
      if (e.key === 'Enter') {
        e.preventDefault()
        console.log("Command entered: ", commandQuery)
        resetCommand()
      } else if (e.key === 'Escape') {
        e.preventDefault()
        console.log("Command canceled")
        resetCommand()
      } else if (e.key === 'Backspace') {
        if (commandQuery.length === 0) {
          resetCommand()
          console.log("Backed out of command")
          return
        }
        if (commandQuery.length > commandIndex)
          setCommandQuery(prev => commandQuery.slice(0, commandIndex - 1) + commandQuery.slice(commandIndex))
        else
          setCommandQuery(prev => commandQuery.slice(0, -1))

        setCommandIndex(prev => prev - 1)

      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        console.log("Up arrow pressed")
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        console.log("Down arrow pressed")
      } else if (e.key === 'ArrowLeft') {
        if (commandIndex > 0)
          setCommandIndex(prev => prev - 1)
        else {
          console.log("Moving past beginning of command")
          resetCommand()
          return
        }
      } else if (e.key === 'ArrowRight') {
        if (commandIndex < commandQuery.length)
          setCommandIndex(prev => prev + 1)
        else {
          console.log("Moving past end of command")
          resetCommand()
          return
        }

      } else if (/^[a-zA-Z0-9]$/.test(e.key)) {

        if (commandQuery.length > commandIndex)
          setCommandQuery(prev => prev.slice(0, commandIndex) + e.key + prev.slice(commandIndex))
        else
          setCommandQuery(prev => prev + e.key)

        setCommandIndex(prev => prev + 1)

        /// TEMP CODE
        if (commandQuery.length > commandIndex)
          console.log("Command query: ", commandQuery.slice(0, commandIndex) + e.key + commandQuery.slice(commandIndex))
        else
          console.log("Command query: ", commandQuery + e.key)

      }
    } else if (e.key === '/') {
      try {
        console.log("Potential hit!")
        let prevKey = ''
        // Check if character before is a character, if so, don't activate command
        if (textareaRef.current?.selectionStart !== 0) {
          prevKey = textareaRef.current?.value[textareaRef.current?.selectionStart - 1] ?? ''
        }


        if (prevKey === ' ' || prevKey === '\n' || prevKey === '') {
          console.log("Looks like we have a true hit!")
          setCommandActive(true)
        } else {
          console.log("Looks like we have a false hit!")
        }
      } catch (err) {
        console.error("Error: ", err)
      }
    }
  }

  const handleClick = () => {
    if (commandActive) {
      console.log("Clicked textarea")
      resetCommand()
    }
  }

  return {
    commandQuery,
    commandActive,
    commandIndex,
    setCommandQuery,
    setCommandActive,
    setCommandIndex,
    checkForShortcuts,
    handleClick
  }

}