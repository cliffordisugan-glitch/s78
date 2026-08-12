import { defineConfig } from 'vite';
import vue from '@vitejs.plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    cssMinify: 'esbuild' // Replaces lightningcss with esbuild for CSS minification
  }
});