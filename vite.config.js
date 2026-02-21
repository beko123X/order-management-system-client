import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/order-management-system-client/',
  build: {
    outDir: 'build',
    sourcemap: true,
    emptyOutDir: true
  },
  server: {
    port: 3000,
    open: true
  }
})