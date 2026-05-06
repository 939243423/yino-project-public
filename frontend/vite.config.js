import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/', // 确保 Nginx 根路径匹配
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 转发到你的 Node 后端
        changeOrigin: true
      },
      '/uploads': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})