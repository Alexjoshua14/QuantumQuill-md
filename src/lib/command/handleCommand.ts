import { Dispatch, SetStateAction } from "react"
import { COMMANDS } from "./commands"

/**
 * Handles the command and executes it
 * 
 * @param command - Command to be executed
 * @param textareaRef - Reference to textarea element
 */
export const handleCommand = (command: string, textareaRef: React.RefObject<HTMLTextAreaElement>, setLocalContent: Dispatch<SetStateAction<string>>) => {
  if (!textareaRef.current) return

  // const cursorPosition = textareaRef.current.selectionStart
  const selectedCommand = getCommand(command)
  if (selectedCommand === undefined) {
    console.log("Command not found")
  } else {
    return insertCommand(textareaRef, setLocalContent, selectedCommand)
  }

}

const getCommand = (command: string) => {
  // Look for command in COMMANDS
  // If found, return command action

  const output = COMMANDS.get(command)

  return output
}

/**
 * 
 * TODO: Cursor should be placed at the end of the command
 * TODO: If command is something like code, italics, etc, cursor should be placed between the characters
 * 
 * @param textareaRef 
 * @param setLocalContent 
 * @param command 
 * @returns - Cursor position if command was entered, otherwise null
 */
const insertCommand = (textareaRef: React.RefObject<HTMLTextAreaElement>, setLocalContent: Dispatch<SetStateAction<string>>, command: string) => {
  let newCursorPosition = null
  if (!textareaRef.current) return newCursorPosition

  console.log("Attempting to clear command query")
  console.log("Current selection start " + textareaRef.current.selectionStart)

  const slashPosition = textareaRef.current.value.lastIndexOf('/', textareaRef.current.selectionStart)

  const cursorPosition = textareaRef.current.selectionStart
  console.log("Clearing from " + slashPosition + " to " + cursorPosition)

  // Clear characters from cursorPosition to the left until '/'
  const updatedValue =
    textareaRef.current.value.slice(0, slashPosition) + 
    command +
    textareaRef.current.value.slice(cursorPosition)

  // textareaRef.current.selectionStart = slashPosition
  setLocalContent(updatedValue)

  /* Determine new cursor position/selection */

  // If command is link, then we want to select the first field
  // TODO: Enable next press of tab to select second field
  if (command === COMMANDS.get('link')) {
    return {start: slashPosition + 1, end: slashPosition + 5}
  } else if (command === COMMANDS.get('image')) {
    return {start: slashPosition + 2, end: slashPosition + 5}
  }
    
  newCursorPosition = slashPosition + command.length
  

  return {start: newCursorPosition, end: newCursorPosition}
}