import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        blog: resolve(__dirname, 'src/blog.html'),
        admin: resolve(__dirname, 'src/admin.html'),
        article: resolve(__dirname, 'src/article.html'),
        archive: resolve(__dirname, 'src/archive.html'),
        about: resolve(__dirname, 'src/about.html'),
      },
    },
  },
  server: {
    port: 5173,
  },
})
