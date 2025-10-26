import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vitejs.dev/config/  (configuración de Vite)
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: { 
        quality: 75,
        compressionLevel: 9
      },
      jpeg: { quality: 75 },
      jpg: { quality: 75 },
      webp: { quality: 75 },
      avif: { quality: 65 },
      includePublic: true,
      logStats: true
    }),
    visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true
    })
  ],
  base: '/portfolio/',
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Mantener console.log para debugging
        drop_debugger: false,
        pure_funcs: []
      }
    },
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    sourcemap: false
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion']
  }
})
