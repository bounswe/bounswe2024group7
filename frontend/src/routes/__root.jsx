import { createRootRoute, Outlet } from '@tanstack/react-router';
import NavigationResponsive from '../components/navigationResponsive.component';
import { PhaseContextProvider } from '../context/PostContext';
import { UserContextProvider } from '../context/UserContext';
import { AppContextProvider } from '../context/AppContext';

export const rootRoute = createRootRoute({
    component: () => (
        <AppContextProvider>
            <UserContextProvider>
                <PhaseContextProvider>
                    <NavigationResponsive />
                    <Outlet />
                </PhaseContextProvider>
            </UserContextProvider>
        </AppContextProvider>
    ),
})