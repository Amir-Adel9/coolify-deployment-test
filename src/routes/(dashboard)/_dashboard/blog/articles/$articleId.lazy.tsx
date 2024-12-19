import { createLazyFileRoute } from "@tanstack/react-router"
import EditBlog from "@/modules/dashboard/blog/articles/EditArticle"

export const Route = createLazyFileRoute(
  "/(dashboard)/_dashboard/blog/articles/$articleId",
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <EditBlog />
    </div>
  )
}
