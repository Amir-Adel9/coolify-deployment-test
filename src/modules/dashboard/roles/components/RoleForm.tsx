import { useForm } from "react-hook-form"
import { z } from "zod"
import { roleFormSchema } from "../schemas/roles.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import PermissionGroups from "./PermissionGroups"
import Form from "@/components/form-component/Form"
import OtherInput from "@/components/form-component/custom-fields/OtherInput"
import { createRole, updateRole } from "../api/roles.api"
import { toast } from "sonner"
import { Role } from "../types/roles.types"
import { PermissionGroup } from "@/utils/permissions"
import RolesSkeleton from "./RolesSkeleton"
import { useNavigate } from "@tanstack/react-router"

const RoleForm = ({
  permissionGroups,
  existingRole,
}: {
  existingRole?: Role
  permissionGroups: PermissionGroup[]
}) => {
  const roleForm = useForm<z.infer<typeof roleFormSchema>>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      name: existingRole?.name || "",
      permissions: existingRole?.permissions.map((p) => p.id) || [],
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  })

  const navigate = useNavigate()

  const submitRoleCreation = async () => {
    const { name, permissions } = roleForm.getValues()
    await createRole({
      values: { name, permissions },
    })
      .then(() => {
        toast.success("Role created successfully")
        navigate({
          to: "/roles",
        })
      })
      .catch((e) => {
        toast.error(e.message)
      })
  }

  const submitRoleUpdate = async () => {
    if (!existingRole) return
    const { name, permissions } = roleForm.getValues()
    await updateRole({
      roleId: existingRole?.id,
      values: { name, permissions },
    })
      .then(() => {
        toast.success("Role updated successfully")
        navigate({
          to: "/roles",
        })
      })
      .catch((e) => {
        toast.error(e.message)
      })
  }

  if (!permissionGroups) return <RolesSkeleton />

  return (
    <Form
      formData={roleForm}
      onSubmit={!existingRole ? submitRoleCreation : submitRoleUpdate}
      buttonClassName='w-fit'
      buttonText={!existingRole ? "Create Role" : "Update Role"}
      className='gap-8'
    >
      <OtherInput
        field={{
          name: "name",
          label: "Role Name",
          type: "text",
          className: "col-span-full",
        }}
        formData={roleForm}
      />
      <PermissionGroups
        permissionGroups={permissionGroups}
        initialPermissions={existingRole?.permissions}
        setFormValues={roleForm.setValue}
        isError={roleForm.getFieldState("permissions").error}
      />
    </Form>
  )
}

export default RoleForm
