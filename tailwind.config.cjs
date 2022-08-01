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
        jalnanche: ['Jalnanche']
      }
    }
  },
  plugins: [require('flowbite/plugin')]
}
