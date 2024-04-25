import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import dns from "node:dns"

dns.setDefaultResultOrder("verbatim")

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000
  }
})
