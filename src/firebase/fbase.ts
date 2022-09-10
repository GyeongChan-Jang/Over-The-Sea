// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
// }

const firebaseConfig = {
  apiKey: 'AIzaSyAhY7p7NQgMmWo1sjzI90DB4zgBXf_c_4k',
  authDomain: 'allofsea-988e1.firebaseapp.com',
  projectId: 'allofsea-988e1',
  storageBucket: 'allofsea-988e1.appspot.com',
  messagingSenderId: '487454487157',
  appId1: '487454487157:web:de0bd0e0a1beadfafdfe3c',
  measurementId: 'G-PK4L3B23W0'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const authService = getAuth()
export const db = getFirestore()
export const storage = getStorage()
