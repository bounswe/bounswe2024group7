import { createRoute } from '@tanstack/react-router'
import ProgramCard from '../components/programCard.component'
import { rootRoute } from './__root'
import { UserContextProvider } from '../context/UserContext'

export const programRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/program',
    component: Program,
})

function Program() {
    return (
        <UserContextProvider>
            <ProgramCard />
        </UserContextProvider>
    )
}