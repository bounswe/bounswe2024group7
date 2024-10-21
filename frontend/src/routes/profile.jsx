import { createRoute } from '@tanstack/react-router'
import ProfilePage from '../components/profilePage.component'
import { rootRoute } from './__root'
import { UserContextProvider } from '../context/UserContext'

export const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: Profile,
})

function Profile() {
  return (
    <UserContextProvider>
      <ProfilePage />
    </UserContextProvider>
  )
}