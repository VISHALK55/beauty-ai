import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: true,
    proxy: {
      '/api/v1/salons': 'http://localhost:8081',
      '/api/v1/auth': 'http://localhost:8084',
      '/api/v1/bookings': 'http://localhost:8082',
      '/api/v1/ai': 'http://localhost:8083',
      '/api/v1/notifications': 'http://localhost:8085',
      '/api/v1/payments': 'http://localhost:8086',
      '/api/v1/analytics': 'http://localhost:8087',
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor_react';
            return 'vendor'; // all other node_modules in one chunk
          }
          if (id.includes('src/salonsData')) {
            return 'salons_data'; // separate the heavy database
          }
        }
      }
    }
  }
})
