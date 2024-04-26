import { createLazyFileRoute, createRoute } from '@tanstack/react-router'
import { rootRoute } from "./__root"

const basePath = import.meta.env.VITE_GH_PAGES_PATH !== "/" ? '/bounswe2024group7' : '/';

export const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: basePath,
    component: Index
})

function Index() {
    return (
        <div className="p-2">
            <h3>Welcome Home!</h3>
        </div>
    )
}