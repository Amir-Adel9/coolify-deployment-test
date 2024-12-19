import { createLazyFileRoute } from "@tanstack/react-router"
import CreateCategory from "@/modules/dashboard/blog/categories/CreateCategory"

export const Route = createLazyFileRoute(
  "/(dashboard)/_dashboard/blog/categories/create",
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateCategory />
}
