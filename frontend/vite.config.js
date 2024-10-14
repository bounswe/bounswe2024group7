import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import dns from "node:dns"
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

dns.setDefaultResultOrder("verbatim")

const loadEnvironmentVariables = (mode) => {
  const env = loadEnv(mode, `${process.cwd()}/..`, '')
  return {
      API_URL: env.VITE_API_URL,
      PORT: env.VITE_PORT
  }
}

export default defineConfig(({ mode }) => {
  const { API_URL, PORT } = loadEnvironmentVariables(mode);

  return {
    define: {
      VITE_API_URL: JSON.stringify(API_URL),
    },
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin']
        }
      }),
      TanStackRouterVite()
    ],
    server: {
      host: "0.0.0.0",
      port: PORT,
    }
  };
});
