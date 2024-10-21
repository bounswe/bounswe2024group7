import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from "./context/index.js"
import { Provider as ContextProvider } from 'react-redux'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ChakraProvider } from '@chakra-ui/react'
import { rootRoute } from "./routes/__root"
import { indexRoute } from './routes/index'
import { loginRoute } from './routes/login'
import React from 'react'
import { registerRoute } from './routes/register'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

import './index.css'

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
])

const router = createRouter({ routeTree })

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <ContextProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </RouterProvider>
      </QueryClientProvider>
    </ContextProvider>
  </ChakraProvider>
  ,
)
