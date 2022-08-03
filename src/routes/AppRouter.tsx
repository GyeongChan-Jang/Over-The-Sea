import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Auth from '~/components/Auth'
import Main from '~/components/Main'
import MyPage from '~/components/MyPage'
import Map from '~/components/KakaoMap'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/map" element={<Map />} />
    </Routes>
  )
}

export default AppRouter
