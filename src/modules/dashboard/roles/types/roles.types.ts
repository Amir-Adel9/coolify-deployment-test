import { Permission } from "@/utils/permissions"

export type Role = {
  id: number
  name: string
  permissions: Permission[]
}
