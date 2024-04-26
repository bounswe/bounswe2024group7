import { createLazyFileRoute, createRoute } from '@tanstack/react-router'
import RegisterComponent from '../components/register.component'
import { rootRoute } from "./__root"

const basePath = import.meta.env.VITE_GH_PAGES_PATH !== "/" ? '/bounswe2024group7/register' : '/register';

export const registerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: basePath,
    component: Register
})

function Register() {
    return <RegisterComponent />
}