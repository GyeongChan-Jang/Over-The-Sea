import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  updateProfile
} from 'firebase/auth'
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { authService, storage } from '~/firebase/fbase'
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

export const signUpEmail = createAsyncThunk('user/signUpEmail', async ({ name, email, password }: UserSginInput) => {
  try {
    await createUserWithEmailAndPassword(authService, email, password)
    if (authService.currentUser === null) return
    // updateProfile은 비동기!!! await 붙여야함!
    await updateProfile(authService.currentUser, { displayName: name })
    const user = authService.currentUser?.providerData[0]

    if (!user.displayName || !user.email) return

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
})

export const signInEmail = createAsyncThunk('user/signInEmail', async ({ email, password }: UserSginInput) => {
  try {
    await signInWithEmailAndPassword(authService, email, password)
    const user = authService.currentUser?.providerData[0]

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
})

type updateProfileInput = {
  uid: string
  userImage?: string
  userName?: string
}

export const updateUserProfileName = createAsyncThunk(
  'user/updateUserProfileName',
  async ({ uid, userName }: updateProfileInput) => {
    try {
      const docRef = doc(db, 'users', uid)
      await updateDoc(docRef, {
        name: userName
      })
      return { userName: userName }
    } catch (error) {
      console.log(error)
    }
  }
)

export const updateUserProfileImage = createAsyncThunk(
  'user/updateProfileImage',
  async (currentUser: updateProfileInput) => {
    try {
      const image = currentUser.userImage
      const docRef = await doc(db, 'users', currentUser.uid)
      const imageRef = ref(storage, `user/${docRef.id}/profileImage`)
      console.log(image)

      uploadString(imageRef, image as string, 'data_url').then(async (snapshot) => {
        const downloadURL = await getDownloadURL(snapshot.ref)
        await updateDoc(doc(db, 'users', docRef.id), {
          userImage: downloadURL
        })
      })
      return { userImage: currentUser.userImage }
    } catch (error) {
      console.log(error)
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
      if (payload === undefined) {
        alert('이미 존재하는 이메일입니다.')
      }
      state.loading = false
      state.error = null
      alert('회원가입이 완료되었습니다.')
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
      if (payload === undefined) {
        alert('로그인에 실패하였습니다!')
        return
      }
      state.loading = false
      state.error = null
      state.userData.name = payload.name
      state.userData.email = payload.email
      state.userData.uid = payload.uid
      console.log(state.userData)
      alert('로그인 성공')
    })
    builder.addCase(signInEmail.rejected, (state, { payload }: any) => {
      state.loading = false
      state.error = payload.message
    })
    builder.addCase(updateUserProfileImage.fulfilled, (state, { payload }: any) => {
      state.loading = false
      state.error = null
      state.userData.userImage = payload?.userImage
      alert('이미지가 변경되었습니다.')
    })
    builder.addCase(updateUserProfileName.fulfilled, (state, { payload }: any) => {
      state.loading = false
      state.error = null
      state.userData.name = payload?.userName
      alert('이름이 변경되었습니다.')
    })
  }
})

export const userReducer = userSlice.reducer
export const { signOutHandler } = userSlice.actions
