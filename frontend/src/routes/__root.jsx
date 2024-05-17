import { createRootRoute, Outlet } from '@tanstack/react-router';
import NavigationResponsive from '../components/navigationResponsive.component';
import { PhaseContextProvider } from '../context/PostContext';

export const rootRoute = createRootRoute({
    component: () => (
        <PhaseContextProvider>
            <NavigationResponsive />
            <Outlet />
        </PhaseContextProvider>
    ),
})