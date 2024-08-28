import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows access over the network (e.g., from Docker container)
    port: 5173, // Ensures the correct port is used
  },
})
