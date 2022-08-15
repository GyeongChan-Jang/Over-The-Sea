import React, { useEffect, useRef, useState } from 'react'
import { authService } from '~/firebase/fbase'
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth'
import { useAppDispatch } from '~/store/store'
import {
  signInFacebookHandler,
  signInGoogleHandler,
  signUpEmail,
  signInEmail
} from '~/store/userSlice'
import { useNavigate, useLocation } from 'react-router-dom'

const AuthForm = ({ setAtAuth }: any) => {
  const [loginMode, setLoginMode] = useState(true)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setAtAuth(location.pathname === '/auth' ? true : false)
  }, [])

  const emailInputRef = useRef<any>('')
  const passwordInputRef = useRef<any>('')

  const googleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    try {
      dispatch(signInGoogleHandler())
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const facebookLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    try {
      dispatch(signInFacebookHandler())
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const loginToggleHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setLoginMode((prev) => !prev)
  }

  const signUpEmailHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    try {
      dispatch(
        signUpEmail({
          email: emailInputRef.current?.value,
          password: passwordInputRef.current?.value
        })
      )
      setLoginMode(true)
    } catch (error) {
      console.log(error)
    }
  }

  const signInEmailHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    console.log(emailInputRef.current?.value)
    try {
      dispatch(
        signInEmail({
          email: emailInputRef.current?.value,
          password: passwordInputRef.current?.value
        })
      )
      navigate('/')
      setAtAuth(false)
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div>
      <div className="h-screen flex">
        <div
          className="hidden lg:flex w-full lg:w-1/2 login_img_section
          justify-around items-center bg-no-repeat"
        >
          <div
            className=" 
                  bg-black 
                  opacity-20 
                  inset-0 
                  z-0"
          ></div>
          <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
            <h1 className="text-white font-bold text-4xl font-sans">바다로</h1>
            <p className="text-white mt-1">떠나자!</p>
            <div className="flex justify-center lg:justify-start mt-6">
              {/* <a
                href="#"
                className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2"
              >
                Get Started
              </a> */}
            </div>
          </div>
        </div>
        <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
          <div className="w-full px-8 md:px-32 lg:px-24">
            <form className="bg-white rounded-lg shadow-2xl p-5">
              <h1 className="text-blue-800 font-bold text-2xl mb-1">바다어때.</h1>
              <p className="text-sm font-normal text-gray-700 mb-8">해변의 모든 것!</p>
              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  id="email"
                  className=" pl-2 w-full outline-none border-none rounded-xl"
                  type="email"
                  name="email"
                  placeholder="이메일"
                  ref={emailInputRef}
                />
              </div>
              <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  className="pl-2 w-full outline-none border-none rounded-xl"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="비밀번호"
                  ref={passwordInputRef}
                />
              </div>
              <button
                type="submit"
                className=" block w-full bg-black mt-5 py-3 rounded-2xl hover:bg-gray-800 hover:-translate-y-1 transition-all duration-500 text-white mb-2"
                onClick={loginMode ? signInEmailHandler : signUpEmailHandler}
              >
                {loginMode ? 'Login' : 'Sign Up'}
              </button>
              {loginMode && (
                <>
                  <button
                    type="submit"
                    className="block w-full bg-[#EA4335] text-white hover:bg-red-600 focus:bg-red-700 mt-5 py-3 rounded-2xl hover:-translate-y-1 transition-all duration-500 mb-2"
                    onClick={googleLogin}
                  >
                    Google Login
                  </button>
                  <button
                    type="submit"
                    className="block w-full bg-blue-600 mt-5 py-3 rounded-2xl hover:bg-blue-700  hover:-translate-y-1 transition-all duration-500 text-white mb-2"
                    onClick={facebookLogin}
                  >
                    Facebook Login
                  </button>
                </>
              )}
              <div className="flex justify-between mt-4">
                <button
                  onClick={loginToggleHandler}
                  className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
                >
                  {loginMode ? '회원가입' : '로그인'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
