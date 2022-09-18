import React, { useEffect, useRef, useState } from 'react'
import { authService } from '~/firebase/fbase'
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth'
import { useAppDispatch, useUserSelector } from '~/store/store'
import { signInFacebookHandler, signInGoogleHandler, signUpEmail, signInEmail } from '~/store/userSlice'
import { useNavigate, useLocation } from 'react-router-dom'
import { RiUser3Line, RiUser4Fill } from 'react-icons/ri'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { FieldValues, useForm } from 'react-hook-form'
import { FirebaseError } from 'firebase/app'

const AuthForm = () => {
  const [loginMode, setLoginMode] = useState(true)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useUserSelector((state) => state.user)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset
  } = useForm()

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
    reset()
  }

  const signUpEmailHandler = (data: FieldValues) => {
    try {
      console.log(data)
      dispatch(
        signUpEmail({
          name: data.name,
          email: data.email,
          password: data.password
        })
      )
      setLoginMode(true)
      reset()
    } catch (error: any) {
      alert(error.message)
    }
  }

  const signInEmailHandler = (data: FieldValues) => {
    try {
      dispatch(
        signInEmail({
          email: data.email,
          password: data.password
        })
      )
      navigate('/')
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
            <h1 className="text-white font-bold text-4xl font-jalnanche">바다로</h1>
            <p className="text-white mt-1 text-xl font-jalnanche">떠나자!</p>
            <div className="flex justify-center lg:justify-start mt-6"></div>
          </div>
        </div>
        <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
          <div className="w-full px-8 md:px-32 lg:px-24">
            <form className="bg-white rounded-lg shadow-2xl p-5">
              <h1 className="text-blue-800 font-bold text-2xl mb-1">바다어때.</h1>
              <p className="text-sm font-normal text-gray-700 mb-8">해변의 모든 것!</p>
              {/* 회원가입 모드 */}
              {!loginMode && (
                <div className="items-center border-2 mb-8 py-2 px-3 rounded-2xl ">
                  <div className="flex items-center">
                    <RiUser3Line className="mr-2 text-gray-500 h-5 w-5" />
                    <input
                      className="pl-2 w-full outline-none border-none rounded-xl"
                      type="text"
                      id="name"
                      placeholder="이름"
                      {...register('name', {
                        required: '이름을 입력해주세요!',
                        minLength: { value: 2, message: '이름은 2글자 이상 입력해주세요!' }
                      })}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 font-nexonRegular text-sm ml-8">이름은 2글자 이상 입력해주세요!</p>
                  )}
                </div>
              )}
              <div className=" items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                <div className="flex items-center">
                  <MdOutlineAlternateEmail className="mr-2 text-gray-500 h-5 w-5" />
                  <input
                    id="email"
                    className=" pl-2 w-full outline-none border-none rounded-xl"
                    type="email"
                    placeholder="이메일"
                    {...register('email', {
                      required: '이메일은 필수로 입력해야합니다!',
                      pattern: { value: /^\S+@\S+$/i, message: '이메일 형식이 아닙니다!' }
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 font-nexonRegular text-sm ml-8 mt-1 ">이메일 형식이 아닙니다!</p>
                )}
              </div>
              <div className=" items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                <div className="flex items-center">
                  <RiLockPasswordFill className="mr-2 text-gray-500 h-5 w-5" />
                  <input
                    className="pl-2 w-full outline-none border-none rounded-xl"
                    type="password"
                    id="password"
                    placeholder="비밀번호"
                    {...register('password', {
                      required: '비밀번호는 필수로 입력해야합니다!',
                      minLength: { value: 8, message: '비밀번호는 8글자 이상 입력해주세요!' }
                    })}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 font-nexonRegular text-sm ml-8">비밀번호는 8글자 이상 입력해주세요!</p>
                )}
              </div>
              <button
                type="submit"
                className=" block w-full bg-black mt-5 py-3 rounded-2xl hover:bg-gray-800 hover:-translate-y-1 transition-all duration-500 text-white mb-2"
                onClick={
                  loginMode
                    ? handleSubmit((data) => signInEmailHandler(data))
                    : handleSubmit((data) => signUpEmailHandler(data))
                }
                disabled={isSubmitting}
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
                  className="text-sm hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
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
