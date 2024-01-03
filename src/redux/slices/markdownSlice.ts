import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface MarkdownState {
  filename: string
  content: string
  shouldSave: boolean
}

// const initialState: MarkdownState = {
//   filename: '',
//   content: '',
// }

const initialState: MarkdownState = (() => {
  const data = require('../../data/data.json')
  if (data) {
    return {
      filename: data[1].name,
      content: data[1].content,
      shouldSave: false
    }
  }

  return {
    filename: '',
    content: '',
    shouldSave: false
  }
})()


export const markdownSlice = createSlice({
  name: 'markdown',
  initialState,
  reducers: {
    setMarkdown: (state, action: PayloadAction<Partial<MarkdownState>>) => {
      console.log("Set Markdown called with", action.payload)
      if (action.payload.filename)
        state.filename = action.payload.filename
      if (action.payload.content !== undefined) {
        state.content = action.payload.content
      }
    },
    setFilename: (state, action: PayloadAction<string>) => {
      console.log("Set Filename called")
      state.filename = action.payload
    },
    setContent: (state, action: PayloadAction<string>) => {
      console.log("Set Content called")
      state.content = action.payload
    },
    setShouldSave: (state, action: PayloadAction<boolean>) => {
      console.log("Set Should Save called")
      state.shouldSave = action.payload
    },
    deleteFile: (state) => {
      console.log("Delete File called")
      state.filename = ''
      state.content = ''
    }
  },
})

export const { setMarkdown, setContent, setFilename, setShouldSave, deleteFile } = markdownSlice.actions

export const selectMarkdown = (state: RootState) => state.markdown

export default markdownSlice.reducer