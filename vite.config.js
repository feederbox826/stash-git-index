import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  // Relative URLs (`./assets/...`) so deploys under a subpath or non-root hosting work
  base: "./",
  plugins: [svelte()],
})
