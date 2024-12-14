import { createRoute } from '@tanstack/react-router'
import Training from '../components/Training.component'
import { rootRoute } from './__root'
import { UserContextProvider } from '../context/UserContext'

export const trainingRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/training',
    component: Training_func,
})

function Training_func() {
    return (
        <UserContextProvider>
            <Training />
        </UserContextProvider>
    )
}