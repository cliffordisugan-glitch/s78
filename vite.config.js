import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; // Fixed slash here

export default defineConfig({
  plugins: [vue()],
  css: {
    transformer: 'postcss',
  },
  build: {
    cssMinify: 'esbuild',
  },
});