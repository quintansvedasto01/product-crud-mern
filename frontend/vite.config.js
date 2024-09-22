import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Get the API URL from environment variables
const apiUrl = process.env.VITE_API_URL || 'http://localhost:5000'; // Default to local if not set


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api":{
        target: apiUrl,
        changeOrigin: true, // Adjust if needed
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1000, // Set the limit to 1000 kB (1 MB) or any size you prefer
  },
})
