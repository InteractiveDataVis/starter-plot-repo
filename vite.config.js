import { defineConfig } from 'vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: '/starter-plot-repo/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        interactive: resolve(__dirname, 'interactive/index.html'),
        growing: resolve(__dirname, 'growing/index.html'),
        snowing: resolve(__dirname, 'snowing/index.html'),
      },
    },
  },
})

