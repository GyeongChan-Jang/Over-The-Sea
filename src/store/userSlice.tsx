import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FacebookAuthProvider
} from 'firebase/auth'
import { authService } from '~/firebase/fbase'

interface UserStateTypes {
  loading: boolean
  error: string | null | undefined
  userData: {
    name: string
    email: string
    userImage: string
    uid: string
    timeStamp: number | null
    username: string
  }
}

const initialState: UserStateTypes = {
  loading: false,
  userData: {
    name: '',
    email: '',
    userImage: '',
    uid: '',
    timeStamp: null,
    username: ''
  },
  error: ''
}

// CAT는 첫전째 인수로 slice이름, 두번째 인수로 callback 함수를 받는다.
export const signInGoogleHandler = createAsyncThunk('user/signinGoogleHandler', async () => {
  try {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(authService, provider)
  } catch (error) {
    console.log(error)
  }
})

export const signInFacebookHandler = createAsyncThunk('user/signinFacebookHandler', async () => {
  try {
    const provider = new FacebookAuthProvider()
    await signInWithPopup(authService, provider)
  } catch (error) {
    console.log(error)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signInGoogleHandler.fulfilled, (state, { payload }) => {
      state.loading = false
      state.error = null
      // state.userData.email = payload.email
      // state.userData.name = payload.username
      // state.userData.userImage = payload.userImage
      // state.userData.uid = payload.uid
      // state.userData.timestamp = payload.timestamp
      // state.userData.username = payload.username
    })
  }
})

export const userReducer = userSlice.reducer
