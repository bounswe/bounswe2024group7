import { createRoute } from '@tanstack/react-router'
import WorkoutCard from '../components/WorkoutCard.component'
import { rootRoute } from './__root'
import { UserContextProvider } from '../context/UserContext'

export const workoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/training/week/workout',
    component: Workout,
})

function Workout() {
    return (
        <UserContextProvider>
            <WorkoutCard />
        </UserContextProvider>
    )
}