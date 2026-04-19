import AppSidebar from '@/components/shadcn-space/blocks/dashboard-shell-01/app-sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'


export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <ThemeProvider>
        <TooltipProvider>
          <AppSidebar>
            <Outlet />
          </AppSidebar>
          <TanStackRouterDevtools />

        </TooltipProvider>


      </ThemeProvider>

    </>
  )
}
