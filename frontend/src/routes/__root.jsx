import { createRootRoute, Outlet } from '@tanstack/react-router';
import NavigationResponsive from '../components/navigationResponsive.component';
import { PhaseContextProvider } from '../context/PostContext';
import { UserContextProvider } from '../context/UserContext';

export const rootRoute = createRootRoute({
    component: () => (
        <UserContextProvider>
            <PhaseContextProvider>
                <NavigationResponsive />
                <Outlet />
            </PhaseContextProvider>
        </UserContextProvider>
    ),
})