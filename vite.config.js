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
        drop_console: true,        // Eliminar console.log en producción
        drop_debugger: true,
        pure_funcs: ['console.log'], // Eliminar específicamente console.log
        passes: 2                   // Dos pasadas de minificación
      },
      mangle: {
        safari10: true
      }
    },
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        // Separar vendor chunks grandes
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) {
              return 'framer-motion'
            }
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            if (id.includes('@mui')) {
              return 'mui'
            }
            return 'vendor'
          }
        }
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
