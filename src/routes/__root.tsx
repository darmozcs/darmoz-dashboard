import { Outlet, createRootRoute } from '@tanstack/react-router'
import { AppProviders } from '@/modules/providers/containers/AppProviders'

function RootComponent() {
  return (
    <AppProviders>
      <Outlet />
    </AppProviders>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})
