import { Dispatch, SetStateAction } from "react"


const COMMANDS: Map<string, string> = new Map([
  ['bold', '**'],
  ['italic', '_'],
  ['underline', '__'],
  ['strikethrough', '~~'],
  ['code', '```'],
  ['heading1', '# '],
  ['heading2', '## '],
  ['heading3', '### '],
  ['heading4', '#### '],
  ['heading5', '##### '],
  ['heading6', '###### '],
  ['quote', '> '],
])

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
    insertCommand(textareaRef, setLocalContent, selectedCommand)
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
 * @returns 
 */
const insertCommand = (textareaRef: React.RefObject<HTMLTextAreaElement>, setLocalContent: Dispatch<SetStateAction<string>>, command: string) => {
  if (!textareaRef.current) return

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

  return slashPosition
}