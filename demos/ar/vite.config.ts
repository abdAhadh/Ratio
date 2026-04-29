import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/demos/ar/',
  build: {
    outDir: '../../public/demos/ar',
    emptyOutDir: true,
  },
})
