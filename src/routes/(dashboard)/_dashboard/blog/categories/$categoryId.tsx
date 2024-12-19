import EditCategory from "@/modules/dashboard/blog/categories/EditCategory"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute(
  "/(dashboard)/_dashboard/blog/categories/$categoryId",
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { categoryId } = Route.useParams()
  return <EditCategory categoryId={categoryId} />
}
