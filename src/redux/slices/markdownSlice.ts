import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface MarkdownState {
  filename: string
  content: string
}

const initialState: MarkdownState = {
  filename: '',
  content: '',
}

export const markdownSlice = createSlice({
  name: 'markdown',
  initialState,
  reducers: {
    setMarkdown: (state, action: PayloadAction<MarkdownState>) => {
      state.filename = action.payload.filename
      state.content = action.payload.content
    },
  },
})

export const { setMarkdown } = markdownSlice.actions

export const selectMarkdown = (state: RootState) => state.markdown

export default markdownSlice.reducer