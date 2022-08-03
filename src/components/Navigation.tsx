import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Dropdown, Avatar } from 'flowbite-react'

const NavBar = () => {
  const activeStyle = {
    color: '#1d4ed8'
  }

  return (
    <Navbar fluid={true}>
      <Navbar.Brand href="#">
        <img
          src="../../public/assets/overthesea.png"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span className="self-center whitespace-nowrap text-2xl bg-gradient-to-r text-transparent bg-clip-text from-blue-400 to-blue-900 dark:text-white">
          OVER THE SEA
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={<Avatar alt="User settings" img="../../public/assets/6912.png" rounded={true} />}
        >
          <Dropdown.Header>
            <span className="block text-sm">GyeongChan</span>
            <span className="block truncate text-sm font-medium">cham9994@gmail.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'text-[#1d4ed8] block py-2 pr-4 pl-3 md:p-0 bg-blue-700 text-white dark:text-white md:bg-transparent md:text-blue-700'
              : ' block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/map"
          className={({ isActive }) =>
            isActive
              ? 'text-[#1d4ed8] block py-2 pr-4 pl-3 md:p-0 bg-blue-700 text-white dark:text-white md:bg-transparent md:text-blue-700'
              : 'block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white'
          }
        >
          Map
        </NavLink>
        <NavLink
          to="/weather"
          className={({ isActive }) =>
            isActive
              ? 'text-[#1d4ed8] block py-2 pr-4 pl-3 md:p-0 bg-blue-700 text-white dark:text-white md:bg-transparent md:text-blue-700'
              : 'block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white'
          }
        >
          Weather
        </NavLink>
        <Navbar.Link>Pricing</Navbar.Link>
        <Navbar.Link>Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
