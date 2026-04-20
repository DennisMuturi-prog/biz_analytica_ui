import AppSidebar from '@/components/shadcn-space/blocks/dashboard-shell-01/app-sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'


export const Route = createRootRoute({
  component: RootComponent,
})
const queryClient = new QueryClient()

function RootComponent() {
  return (
    <>
      <ThemeProvider>
        <TooltipProvider>
          <QueryClientProvider client={queryClient}>
            <AppSidebar>
              <Outlet />
            </AppSidebar>
          </QueryClientProvider>
          <Toaster/>
          <TanStackRouterDevtools />

        </TooltipProvider>


      </ThemeProvider>

    </>
  )
}
