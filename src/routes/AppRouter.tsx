import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthForm from '~/components/AuthForm'
import Main from '~/components/Main'
import MyPage from '~/components/MyPage'
import Map from '~/components/KakaoMap'
import Weather from '~/components/Weather'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<AuthForm />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/map" element={<Map />} />
    </Routes>
  )
}

export default AppRouter
