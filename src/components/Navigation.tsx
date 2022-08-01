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
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
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
        <Navbar.Link>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'text-[#1d4ed8]' : undefined)}>
            Home
          </NavLink>
        </Navbar.Link>
        <Navbar.Link>
          <NavLink
            to="/map"
            className={({ isActive }) => (isActive ? 'text-[#1d4ed8]' : undefined)}
          >
            Map
          </NavLink>
        </Navbar.Link>
        <Navbar.Link>Services</Navbar.Link>
        <Navbar.Link>Pricing</Navbar.Link>
        <Navbar.Link>Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
