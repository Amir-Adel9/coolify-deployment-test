import { useUser } from "@/stores/user.store"

export const PERMISSION_GROUP_MAP = {
  users: ["user_view", "user_edit", "user_delete"],
  roles: ["role_create", "role_read", "role_update", "role_delete"],
  categories: ["category_view", "category_edit", "category_delete"],
  blog: ["article_view", "article_edit", "article_delete"],
  pages: ["page_view", "page_edit", "page_delete"],
} as const

export type Permission = {
  id: number
  name: string
}

export type PermissionGroup = {
  id: number
  name: string
  permissions: Permission[]
}

export function isAuthorized({
  requiredPermissions,
}: {
  requiredPermissions: string[]
}): boolean {
  console.log(useUser.getState().permissions, requiredPermissions)
  return requiredPermissions.every((requiredPermission) =>
    useUser.getState().permissions.includes(requiredPermission),
  )
}
