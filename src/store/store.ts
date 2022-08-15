import { createSlice, configureStore, combineReducers } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { userReducer } from './userSlice'

export const rootReducer = combineReducers({
  user: userReducer
})

export const store = configureStore({
  reducer: rootReducer
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useUserSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
