
import { configureStore } from '@reduxjs/toolkit'
import markdownReducer from './slices/markdownSlice'

const store = configureStore({
  reducer: {
    markdown: markdownReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store