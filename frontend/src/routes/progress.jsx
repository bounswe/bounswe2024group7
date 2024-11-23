import { createRoute } from '@tanstack/react-router'
import ProgressBoard from '../components/ProgressBoard.component'
import { rootRoute } from './__root'
import { UserContextProvider } from '../context/UserContext'

export const progressRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/progress',
    component: Progress,
})

function Progress() {
    return (
        <UserContextProvider>
            <ProgressBoard currentProgress={70} />
        </UserContextProvider>
    )
}