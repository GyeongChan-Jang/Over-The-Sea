import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Auth from '~/components/Auth'
import Main from '~/components/Main'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Auth />} />
    </Routes>
  )
}

export default AppRouter
