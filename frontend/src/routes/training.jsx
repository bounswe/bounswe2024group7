import { createRoute } from '@tanstack/react-router'
import TrainingCard from '../components/TrainingCard.component'
import { rootRoute } from './__root'
import { UserContextProvider } from '../context/UserContext'

export const trainingRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/training',
    component: Training,
})

function Training() {
    return (
        <UserContextProvider>
            <TrainingCard />
        </UserContextProvider>
    )
}