import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from "vite-plugin-node-polyfills";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  nodePolyfills({
    // Whether to polyfill `global`, `process`, and `Buffer`.
    // By default, all are true.
    protocolImports: true,
  }),],
  server: {
    port: 3000  // Change this to your desired port
  }
})
