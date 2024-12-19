import * as React from "react"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute(
  "/(dashboard)/_dashboard/blog/articles/",
)({
  component: RouteComponent,
})

function RouteComponent() {
  return "Hello /_dashboard/blogs/_blogs/!"
}
