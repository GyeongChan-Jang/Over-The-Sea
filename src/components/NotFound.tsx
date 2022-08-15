import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-3xl tracking-tight font-extrabold lg:text-9xl text-blue-600 dark:text-blue-500">
              404
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
              로그인을 먼저 해주세요!
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              로그인된 사용자만 이용할 수 있는 페이지입니다.
            </p>
            <button
              onClick={() => navigate('/auth')}
              className="inline-flex text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-900 my-4 "
            >
              로그인/회원가입 하러가기
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NotFound
