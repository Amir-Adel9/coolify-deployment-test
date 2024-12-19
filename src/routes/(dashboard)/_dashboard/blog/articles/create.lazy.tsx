import * as React from "react"
import { createLazyFileRoute } from "@tanstack/react-router"
import CreateBlog from "@/modules/dashboard/blog/articles/CreateArticle"

export const Route = createLazyFileRoute(
  "/(dashboard)/_dashboard/blog/articles/create",
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateBlog />
}
