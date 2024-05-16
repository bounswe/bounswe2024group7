import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from "./context/index.js"
import { Provider as ContextProvider } from 'react-redux'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ChakraProvider } from '@chakra-ui/react'
import { rootRoute } from "./routes/__root"
import { indexRoute } from './routes/index.jsx'
import { profileRoute } from './routes/profile.jsx'
import { loginRoute } from './routes/login'
import { registerRoute } from './routes/register'

const routeTree = rootRoute.addChildren([
  loginRoute,
  registerRoute,
  indexRoute,
  profileRoute
])

const router = createRouter({ routeTree })

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <ContextProvider store={store}>
      <RouterProvider router={router}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </RouterProvider>
    </ContextProvider>
  </ChakraProvider>
  ,
)
