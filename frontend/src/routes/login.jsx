import { createLazyFileRoute, createRoute } from '@tanstack/react-router'
import LoginCard from "../components/loginCard.component"
import { rootRoute } from "./__root"

const basePath = import.meta.env.VITE_GH_PAGES_PATH !== "/" ? '/bounswe2024group7/login' : '/login';

export const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: basePath,
    component: Login
})


function Login() {
    return <LoginCard />
}