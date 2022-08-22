import React, { useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import AuthForm from '~/components/AuthForm'
import Main from '~/components/Main'
import MyPage from '~/components/MyPage'
import Map from '~/components/KakaoMap'
import { useUserSelector } from '~/store/store'
import { Flowbite } from 'flowbite-react'
import Navigation from '~/components/Navigation'
import flowbiteTheme from '~/styles/flowbiteTheme'
import NotFound from '~/components/NotFound'
import Banner from '~/components/Banner'
import Beach from '~/components/Beach'
import BeachPost from '~/components/BeachPost'
import ReviewDetail from '~/components/BeachDetail'

const AppRouter = () => {
  const { userData } = useUserSelector((state) => state.user)

  return (
    <Flowbite
      theme={{
        dark: true,
        theme: flowbiteTheme
      }}
    >
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/auth" element={<AuthForm />} />
        {userData.uid && <Route path="/mypage" element={<MyPage />} />}
        {userData.uid && <Route path="/map" element={<Map />} />}
        <Route path="/beach" element={<Beach />} />
        <Route path="/review" element={<BeachPost />} />
        <Route path="/review/:id" element={<ReviewDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Flowbite>
  )
}

export default AppRouter
