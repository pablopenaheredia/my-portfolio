import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/  (configuración de Vite)
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/portfolio/' : '/',
})
