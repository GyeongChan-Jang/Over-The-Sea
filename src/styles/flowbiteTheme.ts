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
  },
  carousel: {
    control: {
      base: 'cursor-pointer inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/50 group-hover:bg-white/70 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10',
      icon: 'h-6 w-6 text-white dark:text-gray-800 sm:h-7 sm:w-7'
    },
    indicators: {
      base: 'cursor-pointer h-3 w-3 rounded-full'
    }
  },
  tab: {
    tablist: {
      base: 'flex flex-wrap items-center justify-center shadow-md rounded-lg py-2',
      tabitem: {
        base: 'whitespace-nowrap cursor-pointer flex items-center justify-between px-6 py-4 rounded-full text-lg font-medium text-gray-700/80 hover:bg-blue-700 hover:text-gray-100 focus:text-gray-100 focus:bg-blue-700 group-focus:outline-none group-focus:ring-2 group-focus:ring-gray-100 dark:text-gray-200 dark:group-hover:bg-gray-700 dark:group-focus:ring-gray-700'
      }
    }
  }
}

export default flowbiteTheme
