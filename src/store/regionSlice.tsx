import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const regionSlice = createSlice({
  name: 'region',
  initialState,
  reducers: {
    searchRegion: (state, action) => {}
  },
  extraReducers: {}
})

export const {} = regionSlice.actions

export default regionSlice.reducer
