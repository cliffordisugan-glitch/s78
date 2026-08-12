import { defineConfig } from 'vite';
import vue from '@vitejs.plugin-vue';

export default defineConfig({
  plugins: [vue()],
  css: {
    transformer: 'postcss', // Forces Vite away from LightningCSS entirely
  },
  build: {
    cssMinify: 'esbuild',
  },
});