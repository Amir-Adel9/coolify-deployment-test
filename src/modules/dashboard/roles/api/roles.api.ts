import httpClient from "@/utils/http-client"
import { roleFormSchema } from "../schemas/roles.schema"
import { z } from "zod"

export async function getPermissionGroups() {
  return await httpClient
    .get("/dashboard/roles/permissions")
    .then((res) => res.data)
}

export async function createRole({
  values,
}: {
  values: z.infer<typeof roleFormSchema>
}) {
  return await httpClient
    .post("/dashboard/roles", values)
    .then((res) => {
      console.log(res.status, res.data)
    })
    .catch((e) => {
      throw new Error(e.response.data.data.errors.name[0])
    })
}

export async function getSingleRole(roleId: number) {
  return await httpClient
    .get(`/dashboard/roles/${roleId}`)
    .then((res) => res.data)
}

export async function updateRole({
  roleId,
  values,
}: {
  roleId: number
  values: z.infer<typeof roleFormSchema>
}) {
  return await httpClient
    .put(`/dashboard/roles/${roleId}`, values)
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(
        e.response.data.data.errors.alert ??
          e.response.data.data.errors.name[0] ??
          e.response.data.data.errors.permissions[0],
      )
    })
}

export async function getAllRoles(page: number = 1, params: any) {
  return await httpClient
    .get("/dashboard/roles", {
      params: { page, ...params },
    })
    .then((res) => res.data)
}

export async function deleteRole(roleId: number) {
  return await httpClient.delete(`/dashboard/roles/${roleId}`)
}
