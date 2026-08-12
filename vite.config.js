import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    cssMinify: 'esbuild' // Prevents LightningCSS keyframe errors during Vercel builds
  }
})