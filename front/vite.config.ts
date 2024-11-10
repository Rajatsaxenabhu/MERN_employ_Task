import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      }
    },
    open: true,
    cors: true      // Ensure it matches the exposed port
  },
  plugins: [react()],
})
