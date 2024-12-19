import { appRouter } from "@/main"
import Login from "@/modules/auth/login/Login"
import { useUser } from "@/stores/user.store"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/_auth/login")({
  component: RouteComponent,
  beforeLoad: () => {
    if (useUser.getState().isAuthenticated) {
      appRouter.navigate({ to: "/" })
    }
  },
})

function RouteComponent() {
  return <Login />
}
