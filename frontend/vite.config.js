import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import dns from "node:dns"
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

dns.setDefaultResultOrder("verbatim")

const loadEnvironmentVariables = (mode) => {
  const env = loadEnv(mode, `${process.cwd()}/..`, '')
  return {
    ghPagesPath: env.VITE_GH_PAGES_PATH || '/bounswe2024group7',
    API_URL: env.VITE_API_URL || "https://bounswe2024group7-yslcfqdwna-oa.a.run.app"
  }
}

export default defineConfig(({ mode }) => {
  const { ghPagesPath, API_URL } = loadEnvironmentVariables(mode);

  return {
    base: ghPagesPath,
    define: {
      VITE_API_URL: JSON.stringify(API_URL),
      VITE_BASE_PATH: JSON.stringify(ghPagesPath)
    },
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
