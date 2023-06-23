import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      external: ["loading.jpg"]}},
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    },
  },
  base: './'
})
