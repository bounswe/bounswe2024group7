import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import dns from "node:dns"
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

dns.setDefaultResultOrder("verbatim")

const loadEnvironmentVariables = (mode) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    ghPagesPath: env.VITE_GH_PAGES_PATH || '/bounswe2024group7',
  }
}

export default defineConfig(({ mode }) => {
  const { ghPagesPath } = loadEnvironmentVariables(mode);

  return {
    base: ghPagesPath,
    plugins: [
      react(),
      TanStackRouterVite()
    ],
    server: {
      host: "0.0.0.0",
      port: 3000
    }
  };
});
