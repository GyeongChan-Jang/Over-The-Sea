import { CustomFlowbiteTheme } from 'flowbite-react'

const flowbiteTheme: CustomFlowbiteTheme = {
  navbar: {
    base: 'bg-[#cfe8ef] py-3',
    inner: {
      base: 'mx-auto flex flex-wrap items-center justify-around'
    },
    toggle: {
      base: 'cursor-pointer border-0 bg-inherit ml-3 inline-flex items-center rounded-lg py-1 px-3 text-lg text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'
    },
    collapse: {}
  },
  dropdown: {
    inlineWrapper: 'flex items-center, border-0 bg-inherit cursor-pointer'
  },
  avatar: {
    size: {
      md: 'w-12 h-12'
    }
  }
}

export default flowbiteTheme
