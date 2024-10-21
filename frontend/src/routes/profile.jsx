import { createFileRoute, createRoute } from '@tanstack/react-router'
import ProfilePage from '../components/profilePage.component'
import { rootRoute } from './__root'

export const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: Profile,
})

function Profile() {
  return <ProfilePage />
}