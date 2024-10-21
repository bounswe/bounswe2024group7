import { createFileRoute, createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import { Component } from 'react'
import { PhaseContextProvider } from '../context/PostContext'
import PostFeed from '../components/PostFeed.component'
import { UserContextProvider } from '../context/UserContext'

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
})

function Index() {
  return (
    <UserContextProvider>
      <PhaseContextProvider>
        <PostFeed />
      </PhaseContextProvider>
    </UserContextProvider>
  )
}
