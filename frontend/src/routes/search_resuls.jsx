import { createLazyFileRoute, createRoute } from '@tanstack/react-router'
import SearchResultsComponent from '../components/searchResults.component'
import { rootRoute } from "./__root"

export const searchResultsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/search",
    component: SearchResults
})

function SearchResults() {
    return <SearchResultsComponent />
}