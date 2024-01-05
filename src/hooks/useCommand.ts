import { handleCommand } from "@/lib/command/handleCommand"
import { Dispatch, SetStateAction, useState } from "react"


export const useCommand = (textareaRef: React.RefObject<HTMLTextAreaElement>, setLocalContent: Dispatch<SetStateAction<string>>) => {
  const [commandQuery, setCommandQuery] = useState<string>('')
  const [commandActive, setCommandActive] = useState<boolean>(false)
  const [commandIndex, setCommandIndex] = useState<number>(0)

  /**
   * Resets command query and index
   */
  const resetCommand = () => {
    setCommandActive(false)
    setCommandQuery('')
    setCommandIndex(0)
  }

  /**
   * Handles enter during command query
   * 
   * @param e - Keyboard event
   * @returns - Cursor position if command was entered, otherwise undefined
   */
  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    const cursorPosition = handleCommand(commandQuery, textareaRef, setLocalContent)
    console.log("Command entered: ", commandQuery)
    resetCommand()
    return cursorPosition
  }

  const handleEscape = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    console.log("Command canceled")
    resetCommand()
  }

  /**
   * Handles backspace during command query
   * If command query is empty, then we cancel and reset the command 
   */
  const handleBackspace = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
  }

  /**
   * Transforms arrow up into navigation of command menu
   *  
   */
  const handleArrowUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    console.log("Up arrow pressed")
  }

  /**
   * Transforms arrow down into navigation of command menu
   *  
   */
  const handleArrowDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    console.log("Down arrow pressed")
  }

  const handleArrowLeft = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (commandIndex > 0)
      setCommandIndex(prev => prev - 1)
    else {
      console.log("Moving past beginning of command")
      resetCommand()
      return
    }
  }

  const handleArrowRight = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (commandIndex < commandQuery.length)
      setCommandIndex(prev => prev + 1)
    else {
      console.log("Moving past end of command")
      resetCommand()
      return
    }
  }

  /**
   * Handles character input during command query
   * 
   * @param e - Keyboard event
   */
  const handleCharacter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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

  /**
   * Handles all keyboard input during command query
   * 
   * @param e - Keyboard event
   * @returns - Cursor position if command was entered, otherwise undefined
   */
  const handleKeyInput = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    let cursorPosition = null

    if (/^[a-zA-Z0-9]$/.test(e.key)) {
      handleCharacter(e) 
    } else {
      switch (e.key) {
        case 'Enter':
          cursorPosition = handleEnter(e)
          break
        case 'Escape':
          handleEscape(e)
          break
        case 'Backspace':
          handleBackspace(e)
          break
        case 'ArrowUp':
          handleArrowUp(e)
          break
        case 'ArrowDown':
          handleArrowDown(e)
          break
        case 'ArrowLeft':
          handleArrowLeft(e)
          break
        case 'ArrowRight':
          handleArrowRight(e)
          break
        default:
          console.log("Unknown key pressed " + e.key)
          break
      }
    }

    return cursorPosition
  }

  /**
   * Checks if the previous character is a space, newline, or empty string
   * If so, then we can confirm that the user is trying to activate a command
   * Otherwise, we can assume that the user is just typing a forward slash
   */
  const confirmShortcutKey = () => {
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


  /** 
   * Handles shortcut commands
   * if command is active, then we handle all keyboard input
   * Otherwise, we check if the user is trying to activate a command
   * 
   * @returns - Cursor position if command was entered, otherwise undefined
   * 
   * TODO: Move this logic to separate file and clean it up! 
   * TODO: Handle user deleting multiple characters using shift/option/etc + arrow keys
   * TODO: Handle user clicking on textarea to move cursor, this should just reset the command
   * TODO: Handle user using undo/redo, this should just reset the command for now
   * TODO: Create dictionary of commands and their respective functions
   * 
   */
  const checkForShortcuts = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (commandActive) {
      return handleKeyInput(e)
    } else if (e.key === '/') {
      confirmShortcutKey()
    }
  }

  /**
   * If the user clicks on the textarea, we are presuming user clicked away 
   * from command query and we should reset the command
   * 
   * TODO: User should be able to click on different spot in command query and continue typing
   */
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