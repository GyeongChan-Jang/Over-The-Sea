import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  updateProfile
} from 'firebase/auth'
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { Toast } from 'flowbite-react'
import { authService } from '~/firebase/fbase'
import { db } from '~/firebase/fbase'

interface UserStateTypes {
  loading: boolean
  userData: {
    name: string
    email: string
    userImage?: string
    uid: string
  }
  error: string | null | undefined
}

const initialState: UserStateTypes = {
  loading: false,
  userData: {
    name: '',
    email: '',
    userImage: '',
    uid: ''
  },
  error: ''
}

interface UserSginInput {
  name?: string
  email: string
  password: string
}

// CAT는 첫전째 인수로 slice이름, 두번째 인수로 callback 함수를 받는다.
export const signInGoogleHandler = createAsyncThunk('user/signinGoogleHandler', async () => {
  try {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(authService, provider)
    const user = authService.currentUser?.providerData[0]

    // 타입가드를 통해 예외처리
    if (!user?.displayName || !user.email || !user.photoURL) return

    const docRef = doc(db, 'users', user!.uid)
    const docSnapshot = await getDoc(docRef)
    // 새로운 유저 정보일 경우
    if (!docSnapshot.exists() && user) {
      // users 컬렉션에 새로운 user 정보를 추가한다.
      await setDoc(docRef, {
        name: user.displayName,
        email: user.email,
        userImage: user.photoURL,
        uid: user.uid
      })
      const newUser: UserStateTypes['userData'] = {
        name: user.displayName,
        email: user.email!,
        userImage: user.photoURL,
        uid: user.uid
      }
      console.log(newUser)
      return newUser
    } else {
      return docSnapshot.data()
    }
  } catch (error) {
    console.log(error)
  }
})

export const signInFacebookHandler = createAsyncThunk('user/signinFacebookHandler', async () => {
  try {
    const provider = new FacebookAuthProvider()
    await signInWithPopup(authService, provider)
    const user = authService.currentUser?.providerData[0]
    console.log('currentUser.providerData[0]: ', user)
    if (!user?.displayName || !user.email || !user.photoURL) return

    const docRef = doc(db, 'users', user!.uid)
    const docSnapshot = await getDoc(docRef)
    if (!docSnapshot.exists() && user) {
      console.log('users 컬렉션 없다면 생성')
      await setDoc(docRef, {
        name: user.displayName,
        email: user.email,
        userImage: user.photoURL,
        uid: user.uid
      })
      const newUser: UserStateTypes['userData'] = {
        name: user.displayName,
        email: user.email!,
        userImage: user.photoURL,
        uid: user.uid
      }

      return newUser
    } else {
      return docSnapshot.data()
    }
  } catch (error) {
    console.log(error)
  }
})

export const signUpEmail = createAsyncThunk(
  'user/signUpEmail',
  async ({ name, email, password }: UserSginInput) => {
    try {
      await createUserWithEmailAndPassword(authService, email, password)
      if (authService.currentUser === null) return
      // updateProfile은 비동기!!! await 붙여야함!
      await updateProfile(authService.currentUser, { displayName: name })
      const user = authService.currentUser?.providerData[0]
      console.log('currentUser.providerData[0]: ', user)
      if (!user.displayName || !user.email) return
      console.log('currentUser.providerData[0]: ', user)
      const docRef = doc(db, 'users', user!.uid)
      const docSnapshot = await getDoc(docRef)
      if (!docSnapshot.exists() && user) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          userImage: user.photoURL,
          uid: user.uid
        })
        const newUser: UserStateTypes['userData'] = {
          name: user.displayName,
          email: user.email,
          uid: user.uid
        }
        console.log(newUser)
        return newUser
      } else {
        return docSnapshot.data()
      }
    } catch (error) {
      alert(error)
    }
  }
)

export const signInEmail = createAsyncThunk(
  'user/signInEmail',
  async ({ email, password }: UserSginInput) => {
    try {
      await signInWithEmailAndPassword(authService, email, password)
      const user = authService.currentUser?.providerData[0]
      console.log('currentUser.providerData[0]: ', user)

      if (!user?.displayName || !user.email) return

      const docRef = doc(db, 'users', user!.uid)
      const docSnapshot = await getDoc(docRef)
      console.log(docSnapshot)
      if (!docSnapshot.exists() && user) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          userImage: user.photoURL,
          uid: user.uid
        })
        const newUser: UserStateTypes['userData'] = {
          name: user.displayName,
          email: user.email!,
          uid: user.uid
        }
        console.log(newUser)
        return newUser
      } else {
        return docSnapshot.data()
      }
    } catch (error: any) {
      alert(error.message)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOutHandler: (state) => {
      state.userData = {
        name: '',
        email: '',
        userImage: '',
        uid: ''
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signInGoogleHandler.fulfilled, (state, { payload }) => {
      state.loading = false
      state.error = null
      state.userData.name = payload?.name
      state.userData.email = payload?.email
      state.userData.userImage = payload?.userImage
      state.userData.uid = payload?.uid
    })
    builder.addCase(signInGoogleHandler.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(signInGoogleHandler.rejected, (state, { payload }) => {
      state.loading = false
      console.log(payload)
    })
    builder.addCase(signInFacebookHandler.fulfilled, (state, { payload }) => {
      state.loading = false
      state.error = null
      state.userData.name = payload?.name
      state.userData.email = payload?.email
      state.userData.userImage = payload?.userImage
      state.userData.uid = payload?.uid
    })
    builder.addCase(signUpEmail.fulfilled, (state, { payload }: any) => {
      state.loading = false
      state.error = null
      state.userData.name = payload?.name
      state.userData.email = payload?.email
      state.userData.uid = payload?.uid
      console.log(state.userData)
      alert('회원가입 성공')
    })
    builder.addCase(signUpEmail.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(signUpEmail.rejected, (state, { payload }) => {
      state.loading = false
      state.error = '회원가입 실패'
    })
    builder.addCase(signInEmail.fulfilled, (state, { payload }: any) => {
      state.loading = false
      state.error = null
      state.userData.name = payload?.name
      state.userData.email = payload?.email
      state.userData.uid = payload?.uid
      console.log(state.userData)
      alert('로그인 성공')
    })
    builder.addCase(signInEmail.rejected, (state, { payload }: any) => {
      state.loading = false
      state.error = payload.message
    })
  }
})

export const userReducer = userSlice.reducer
export const { signOutHandler } = userSlice.actions
