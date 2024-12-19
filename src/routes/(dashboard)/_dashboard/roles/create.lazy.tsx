import { createLazyFileRoute } from "@tanstack/react-router"

import CreateRole from "@/modules/dashboard/roles/CreateRole"

import { isAuthorized } from "@/utils/permissions"
import Forbidden from "@/modules/dashboard/layout/Forbidden"

export const Route = createLazyFileRoute(
  "/(dashboard)/_dashboard/roles/create",
)({
  component: () => {
    if (!isAuthorized({ requiredPermissions: ["role_create"] })) {
      return <Forbidden />
    }

    return <CreateRole />
  },
})
