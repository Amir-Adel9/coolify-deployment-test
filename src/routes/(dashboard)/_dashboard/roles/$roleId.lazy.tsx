import EditRole from "@/modules/dashboard/roles/EditRole"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute(
  "/(dashboard)/_dashboard/roles/$roleId",
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { roleId } = Route.useParams()

  return <EditRole roleId={parseInt(roleId)} />
}
