import { createRootRoute, Outlet } from '@tanstack/react-router';
import NavigationResponsive from '../components/navigationResponsive.component';

export const rootRoute = createRootRoute({
    component: () => (
        <>
            <NavigationResponsive />
            <Outlet />
        </>
    ),
})