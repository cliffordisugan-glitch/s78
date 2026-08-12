import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    cssMinify: false, // Disables CSS minifiers so neither LightningCSS nor Esbuild crash the build
  },
});