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

const AppRouter = () => {
  const { userData } = useUserSelector((state) => state.user)
  const [atAuth, setAtAuth] = useState(false)

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
        <Route path="/auth" element={<AuthForm setAtAuth={setAtAuth} />} />
        {userData.uid && <Route path="/mypage" element={<MyPage />} />}
        {userData.uid && <Route path="/map" element={<Map />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Flowbite>
  )
}

export default AppRouter
