import { configureStore } from '@reduxjs/toolkit'
import langReducer from './langSlice'

const store = configureStore({
  reducer: {
    lang: langReducer
  }
})

export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
