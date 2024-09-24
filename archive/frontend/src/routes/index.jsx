import { createLazyFileRoute, createRoute } from '@tanstack/react-router'
import { rootRoute } from "./__root"
import { Component } from 'react'
import { PhaseContextProvider } from '../context/PostContext'
import PostFeed from '../components/PostFeed,component'

export const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Index
})

function Index() {
    return (
        <PhaseContextProvider>
            <PostFeed />
        </PhaseContextProvider>
    )
}