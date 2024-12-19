import { Permission, PermissionGroup } from "@/utils/permissions"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/shadcn/toggle-group"
import clsx from "clsx"
import { useState } from "react"
import { z } from "zod"
import { roleFormSchema } from "../schemas/roles.schema"
import { FieldError, UseFormSetValue } from "react-hook-form"
import { FormMessage } from "@/components/ui/shadcn/form"

const PermissionGroups = ({
  setFormValues,
  isError,
  initialPermissions,
  permissionGroups,
}: {
  setFormValues: UseFormSetValue<z.infer<typeof roleFormSchema>>
  isError: FieldError | undefined
  initialPermissions?: Permission[] | undefined
  permissionGroups: PermissionGroup[]
}) => {
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(
    initialPermissions || [],
  )

  const selectPermission = (permission: Permission) => {
    if (selectedPermissions.find((p) => p.id === permission.id)) {
      setSelectedPermissions(
        selectedPermissions.filter((p) => p.id !== permission.id),
      )
      setFormValues(
        "permissions",
        selectedPermissions
          .filter((p) => p.id !== permission.id)
          .map((p) => p.id),
      )
    } else {
      setSelectedPermissions([...selectedPermissions, permission])
      setFormValues(
        "permissions",
        [...selectedPermissions, permission].map((p) => p.id),
      )
    }
  }

  return (
    <div className='flex flex-col gap-4 col-span-full relative'>
      <h2 className='font-semibold text-center text-3xl'>Role Permissions</h2>
      {permissionGroups &&
        permissionGroups.map((group) => {
          return (
            <div
              key={group.id}
              className='flex flex-col gap-3 max-md:items-center'
            >
              <h2 className='capitalize text-secondary font-bold text-lg'>
                {group.name}
              </h2>
              <ToggleGroup
                type='multiple'
                className='flex max-md:flex-col max-md:items-center gap-3 justify-start flex-wrap'
              >
                {group.permissions.map((permission) => {
                  return (
                    <ToggleGroupItem
                      value={permission.name}
                      key={permission.id}
                      onClick={() => selectPermission(permission)}
                      className={clsx(
                        selectedPermissions.find((p) => p.id === permission.id)
                          ? "!bg-secondary !opacity-80 !text-white"
                          : "bg-accent",
                        "rounded-full px-4 py-2",
                      )}
                    >
                      {permission.name.split("_").join(":")}
                    </ToggleGroupItem>
                  )
                })}
              </ToggleGroup>
            </div>
          )
        })}
      {isError && (
        <FormMessage className='absolute -bottom-20 md:text-lg'>
          {isError.message}
        </FormMessage>
      )}
    </div>
  )
}

export default PermissionGroups
