import RolesTable from "@/modules/dashboard/roles/RolesTable"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/(dashboard)/_dashboard/roles/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <RolesTable />
}
