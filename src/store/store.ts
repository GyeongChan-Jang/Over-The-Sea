import { createSlice, configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {}
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
