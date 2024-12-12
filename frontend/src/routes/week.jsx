import { createRoute } from '@tanstack/react-router'
import WeekCard from '../components/WeekCard.component'
import { rootRoute } from './__root'
import { UserContextProvider } from '../context/UserContext'

export const weekRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/training/week',
    component: TrainingWeek,
})

function TrainingWeek() {
    return (
        <UserContextProvider>
            <WeekCard />
        </UserContextProvider>
    )
}