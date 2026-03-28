import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/myportfolio/',  // ← Add this line (must match your repo name)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
