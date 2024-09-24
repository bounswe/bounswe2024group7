import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import dns from "node:dns"
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

dns.setDefaultResultOrder("verbatim")

const loadEnvironmentVariables = (mode) => {
  const env = loadEnv(mode, `${process.cwd()}/..`, '')
  return {
      API_URL: env.VITE_API_URL
  }
}

export default defineConfig(({ mode }) => {
  const { API_URL } = loadEnvironmentVariables(mode);

  return {
    define: {
      VITE_API_URL: JSON.stringify(API_URL),
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
