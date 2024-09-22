import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api":{
        target: "https://product-crud-mern.onrender.com",
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1000, // Set the limit to 1000 kB (1 MB) or any size you prefer
  },
})
