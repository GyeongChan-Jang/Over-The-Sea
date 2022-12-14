import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Navbar, Dropdown, Avatar, Button } from 'flowbite-react'
import { useAppDispatch, useUserSelector } from '~/store/store'
import { signOut } from 'firebase/auth'
import { authService } from '~/firebase/fbase'
import { signOutHandler } from '~/store/userSlice'

const NavBar = () => {
  const { userData } = useUserSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const navigation = useNavigate()

  const signOutButton = () => {
    signOut(authService).then(() => {
      console.log('로그아웃 되었습니다.')
      dispatch(signOutHandler())
      alert('로그아웃 되었습니다.')
      navigation('/')
    })
  }

  return (
    <Navbar fluid={true}>
      <Navbar.Brand onClick={() => navigation('/')}>
        <img src="/assets/images/overthesea.png" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
        <span className="self-center whitespace-nowrap text-2xl bg-gradient-to-r text-transparent bg-clip-text from-[#0099ff] to-blue-900 dark:text-white">
          바다어때.
        </span>
      </Navbar.Brand>
      {!!userData.uid ? (
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={
              <Avatar
                alt="User settings"
                img={
                  userData.userImage ? userData.userImage : 'https://source.boringavatars.com/beam'
                }
                rounded={true}
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm mb-2">
                {userData.name ? userData.name : '이름 없음'}
              </span>
              <span className="block truncate text-sm font-medium">
                {userData.email ? userData.email : '이메일 없음'}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to="/profile">프로필</Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={signOutButton}>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
      ) : (
        <div className="flex md:order-2">
          <button className="hover:text-blue-700 text-gray-700" onClick={() => navigation('/auth')}>
            로그인
          </button>
        </div>
      )}
      <Navbar.Collapse>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'text-[#1d4ed8] block py-2 pr-4 pl-3 md:p-0 bg-white dark:text-white md:bg-transparent md:text-blue-700'
              : ' block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white'
          }
        >
          홈
        </NavLink>
        <NavLink
          to="/map"
          className={({ isActive }) =>
            isActive
              ? 'text-[#1d4ed8] block py-2 pr-4 pl-3 md:p-0 bg-white dark:text-white md:bg-transparent md:text-blue-700'
              : 'block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white'
          }
        >
          지도
        </NavLink>
        <NavLink
          to="/beach"
          className={({ isActive }) =>
            isActive
              ? 'text-[#1d4ed8] block py-2 pr-4 pl-3 md:p-0 bg-white dark:text-white md:bg-transparent md:text-blue-700'
              : 'block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white'
          }
        >
          해변
        </NavLink>
        <NavLink
          to="/review"
          className={({ isActive }) =>
            isActive
              ? 'text-[#1d4ed8] block py-2 pr-4 pl-3 md:p-0 bg-white dark:text-white md:bg-transparent md:text-blue-700'
              : 'block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white'
          }
        >
          후기
        </NavLink>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
