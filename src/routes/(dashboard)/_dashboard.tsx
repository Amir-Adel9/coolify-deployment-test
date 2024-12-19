import { appRouter } from "@/main"
import { useUser } from "@/stores/user.store"
import { createFileRoute, Outlet } from "@tanstack/react-router"
import DashboardLayout from "@/modules/dashboard/layout/DashboardLayout"

export const Route = createFileRoute("/(dashboard)/_dashboard")({
  component: RouteComponent,
  beforeLoad: async () => {
    if (!useUser.getState().isAuthenticated) {
      appRouter.navigate({ to: "/login" })
    } else {
      if (useUser.getState().name === "") useUser.getState().getUser()
    }
  },
})

function RouteComponent() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  )
}
