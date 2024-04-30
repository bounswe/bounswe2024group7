import { createLazyFileRoute, createRoute } from '@tanstack/react-router'
import LoginCard from "../components/LoginCard.component"
import { rootRoute } from "./__root"

export const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/login",
    component: Login
})


function Login() {
    return <LoginCard />
}