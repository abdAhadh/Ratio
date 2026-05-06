import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Built directly into the parent Next.js app's public folder.
// Mirrors the AR demo's setup so asset URLs resolve correctly when served
// from /demos/ap/ on tryratio.io.
export default defineConfig({
  plugins: [react()],
  base: '/demos/ap/',
  build: {
    outDir: '../../public/demos/ap',
    emptyOutDir: true,
  },
})
