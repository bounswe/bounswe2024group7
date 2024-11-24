import { createFileRoute, createRoute } from '@tanstack/react-router'
import SearchPageComp from '../components/searchPage.component'
import { rootRoute } from './__root'

export const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/search',
  component: SearchPageComp,
})
