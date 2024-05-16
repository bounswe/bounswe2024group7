import { createLazyFileRoute, createRoute } from '@tanstack/react-router'
import { rootRoute } from "./__root"
import Profile from '../components/profile.component'

export const profileRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/profile",
    component: ProfilePage
})


function ProfilePage() {
    return <Profile />
}