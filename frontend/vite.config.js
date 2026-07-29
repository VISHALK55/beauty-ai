import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: true
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
