/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SearchImport } from './routes/search'
import { Route as RegisterImport } from './routes/register'
import { Route as ProgressImport } from './routes/progress'
import { Route as ProgramImport } from './routes/program'
import { Route as ProfileImport } from './routes/profile'
import { Route as LoginImport } from './routes/login'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const SearchRoute = SearchImport.update({
  id: '/search',
  path: '/search',
  getParentRoute: () => rootRoute,
} as any)

const RegisterRoute = RegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const ProgressRoute = ProgressImport.update({
  id: '/progress',
  path: '/progress',
  getParentRoute: () => rootRoute,
} as any)

const ProgramRoute = ProgramImport.update({
  id: '/program',
  path: '/program',
  getParentRoute: () => rootRoute,
} as any)

const ProfileRoute = ProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/profile': {
      id: '/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileImport
      parentRoute: typeof rootRoute
    }
    '/program': {
      id: '/program'
      path: '/program'
      fullPath: '/program'
      preLoaderRoute: typeof ProgramImport
      parentRoute: typeof rootRoute
    }
    '/progress': {
      id: '/progress'
      path: '/progress'
      fullPath: '/progress'
      preLoaderRoute: typeof ProgressImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/search': {
      id: '/search'
      path: '/search'
      fullPath: '/search'
      preLoaderRoute: typeof SearchImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/login': typeof LoginRoute
  '/profile': typeof ProfileRoute
  '/program': typeof ProgramRoute
  '/progress': typeof ProgressRoute
  '/register': typeof RegisterRoute
  '/search': typeof SearchRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/login': typeof LoginRoute
  '/profile': typeof ProfileRoute
  '/program': typeof ProgramRoute
  '/progress': typeof ProgressRoute
  '/register': typeof RegisterRoute
  '/search': typeof SearchRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/login': typeof LoginRoute
  '/profile': typeof ProfileRoute
  '/program': typeof ProgramRoute
  '/progress': typeof ProgressRoute
  '/register': typeof RegisterRoute
  '/search': typeof SearchRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/login'
    | '/profile'
    | '/program'
    | '/progress'
    | '/register'
    | '/search'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/login'
    | '/profile'
    | '/program'
    | '/progress'
    | '/register'
    | '/search'
  id:
    | '__root__'
    | '/'
    | '/login'
    | '/profile'
    | '/program'
    | '/progress'
    | '/register'
    | '/search'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  LoginRoute: typeof LoginRoute
  ProfileRoute: typeof ProfileRoute
  ProgramRoute: typeof ProgramRoute
  ProgressRoute: typeof ProgressRoute
  RegisterRoute: typeof RegisterRoute
  SearchRoute: typeof SearchRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  LoginRoute: LoginRoute,
  ProfileRoute: ProfileRoute,
  ProgramRoute: ProgramRoute,
  ProgressRoute: ProgressRoute,
  RegisterRoute: RegisterRoute,
  SearchRoute: SearchRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.jsx",
      "children": [
        "/",
        "/login",
        "/profile",
        "/program",
        "/progress",
        "/register",
        "/search"
      ]
    },
    "/": {
      "filePath": "index.jsx"
    },
    "/login": {
      "filePath": "login.jsx"
    },
    "/profile": {
      "filePath": "profile.jsx"
    },
    "/program": {
      "filePath": "program.jsx"
    },
    "/progress": {
      "filePath": "progress.jsx"
    },
    "/register": {
      "filePath": "register.jsx"
    },
    "/search": {
      "filePath": "search.jsx"
    }
  }
}
ROUTE_MANIFEST_END */
