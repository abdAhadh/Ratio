import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Standalone build (deploy to its own Vercel project).
// Base is '/' because the demo lives at the root of its own domain.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
