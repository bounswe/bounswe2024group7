import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from "./context/index.js"
import { Provider as ContextProvider } from 'react-redux'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ChakraProvider } from '@chakra-ui/react'
import { rootRoute } from "./routes/__root"
import { indexRoute } from './routes/index'
import { loginRoute } from './routes/login'
import { registerRoute } from './routes/register'
import { registerRoute } from './routes/search_results'


const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  searchResultsRoute
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
