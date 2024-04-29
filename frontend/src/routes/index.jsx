import { createLazyFileRoute, createRoute } from '@tanstack/react-router'
import { rootRoute } from "./__root"

export const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Index
})

function Index() {
    return (
        <div className="p-2">
            <h3>Welcome Home!</h3>
        </div>
    )
}