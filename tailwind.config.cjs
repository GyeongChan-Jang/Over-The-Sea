/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false
  },
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: '#root',
  theme: {
    extend: {
      fontFamily: {
        jalnanche: ['Jalnanche']
      }
    }
  },
  plugins: []
}
