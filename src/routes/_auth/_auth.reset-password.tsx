import ResetPassword from "@/modules/auth/reset-password/ResetPassword"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/_auth/reset-password")({
  component: RouteComponent,
})

function RouteComponent() {
  return <ResetPassword />
}
