import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Two build modes:
//  - Default: base '/' + outDir 'dist'. Used by the standalone Vercel
//    deployment at uae-ap-demo.vercel.app.
//  - Embed: BUILD_EMBED=true → base '/demos/ap/' + outDir
//    '../../public/demos/ap'. Used when bundling the demo into the parent
//    Next.js app so it's served same-origin from tryratio.io/demos/ap/.
const isEmbed = process.env.BUILD_EMBED === 'true';

export default defineConfig({
  plugins: [react()],
  base: isEmbed ? '/demos/ap/' : '/',
  build: {
    outDir: isEmbed ? '../../public/demos/ap' : 'dist',
    emptyOutDir: true,
  },
})
