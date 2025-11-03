import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vitejs.dev/config/  (configuración de Vite)
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({

      avif: { quality: 50 },
      webp: { quality: 65 },
      png: { 
        quality: 60,
        compressionLevel: 9
      },
      jpeg: { quality: 65 },
      jpg: { quality: 65 },
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
  base: process.env.NODE_ENV === 'production' ? '/my-portfolio/' : '/',
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 3,
        pure_funcs: ['console.log', 'console.info'],
        dead_code: true,
        unused: true
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
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-animation': ['framer-motion'],
          'vendor-three': ['simplex-noise'],
          'swirl': ['/src/components/SwirlBackground.tsx']
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
