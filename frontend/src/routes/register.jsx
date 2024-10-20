import { createFileRoute, createRoute } from '@tanstack/react-router'
import RegisterComponent from '../components/RegisterComponent.component'
import { rootRoute } from './__root'

export const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: Register,
})

function Register() {
  return <RegisterComponent />
}
