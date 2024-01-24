import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/blobs': 'http://localhost:5000',
      'api/blob': 'http://localhost:5000',
      '/api/grants': 'http://localhost:5000',
      'api/grant': 'http://localhost:5000'
    }
  }
})
