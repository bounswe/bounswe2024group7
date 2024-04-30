import { createRootRoute, Outlet } from '@tanstack/react-router';
import NavigationResponsive from '../components/NavigationResponsive.component'

export const rootRoute = createRootRoute({
    component: () => (
        <>
            <NavigationResponsive />
            <Outlet />
        </>
    ),
})