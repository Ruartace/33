import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 5173,
      proxy: {
        '/api': {
<<<<<<< HEAD
          target: 'http://8.140.210.30:6660',
=======
          // 与 .env.development 中的 VITE_APP_BASE_URL 对齐（统一指向 8089）
          target: 'http://8.140.210.30:8089',
>>>>>>> main
          changeOrigin: true,
        },
      },
    },
  }
})
