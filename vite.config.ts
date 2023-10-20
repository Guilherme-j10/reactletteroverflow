import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve("src", "index.tsx"),
      name: 'reactletteroverflow',
      fileName: (format) => `reactletteroverflow.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
        }
      }
    }
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true
    })
  ],
})
