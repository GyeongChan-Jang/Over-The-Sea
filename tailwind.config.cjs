/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  corePlugins: {
    preflight: false
  },
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  important: '#root',
  theme: {
    extend: {
      fontFamily: {
        jalnanche: ['Jalnanche'],
        nexonLight: ['NexonGothicLight'],
        nexonRegular: ['NexonGothicMedium']
      }
    },
    screens: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    }
  },
  plugins: [require('flowbite/plugin'), require('tailwind-scrollbar')]
}
