import TableActions from "@/components/table-component/TableActions"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table"
import { toast } from "sonner"
import { deleteRole } from "../api/roles.api"
import { Role } from "../types/roles.types"

export type TRoleColumn = {
  id: number
  name: string
}

export const RolesTableColumns: ColumnDef<TRoleColumn>[] = [
  {
    header: "Role",
    cell: ({ row }) => <span>{Number(row.index) + 1}</span>,
  },
  {
    header: "Name",
    cell: ({ row }) => (
      <Link
        to={`/roles/${row.original.id}`}
        className='text-start hover:text-secondary transition-colors'
      >
        {row.original.name}
      </Link>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      if (row.original.id === 1) return null

      const roleId = row.original.id

      const queryClient = useQueryClient()
      const { mutate, isPending } = useMutation({
        mutationFn: () => deleteRole(roleId),
        onSuccess: () => {
          toast.success("Role deleted successfully!")

          queryClient.setQueryData(["roles"], (oldData: any) => {
            if (!oldData || !oldData.data) {
              console.error("No data found in the cache.")
              return oldData
            }

            const updatedData = oldData.data.filter(
              (role: Role) => role.id !== roleId,
            )

            return {
              ...oldData,
              data: updatedData,
            }
          })

          queryClient.invalidateQueries({
            queryKey: ["roles"],
          })
        },
        onError: (error: any) => {
          console.error("Error deleting role:", error)
        },
      })

      const handleDelete = () => {
        mutate()
      }

      const navigate = useNavigate()

      const handleEdit = () => {
        navigate({ to: `/roles/${roleId}` })
      }

      return (
        <>
          <TableActions
            onDelete={handleDelete}
            onEdit={handleEdit}
            deleteTitle={`Are you sure to delete the following role: (${row.original.name})?`}
            isLoading={isPending}
          />
        </>
      )
    },
  },
]
