import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
const __dirname = 'src'
export default defineConfig({
  plugins: [react()],
  resolve: {
    // 절대 경로 설정
    alias: [{ find: '~', replacement: resolve(__dirname) }]
  }
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://apis.data.go.kr',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //       secure: false,
  //       ws: true
  //     }
  //   }
  // }
})
