import TableActions from "@/components/table-component/TableActions"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table"
import { toast } from "sonner"
import { deleteCategory } from "./api/category.api"
import { TCategory } from "./types/category.type"

export type TCategoryColumn = {
  id: number
  name: string
  slug: string
  parent_id?: number
  parent?: TCategory
}

export const categoriesColumns: ColumnDef<TCategoryColumn>[] = [
  {
    header: "Category",
    cell: ({ row }) => (
      <Link
        to={`/blog/categories/${row.original.id}`}
        className='text-start hover:text-secondary transition-colors'
      >
        {row.original.name}
      </Link>
    ),
  },
  {
    header: "Parent",
    cell: ({ row }) =>
      row.original.parent?.name ? (
        <Link
          to={`/blog/categories/${row.original.parent_id}`}
          className='text-start hover:text-secondary transition-colors'
        >
          {row.original.parent?.name}
        </Link>
      ) : (
        "-"
      ),
  },
  { accessorKey: "slug", header: "Slug" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const categoryId = row.original.id

      const queryClient = useQueryClient()
      const { mutate, isPending } = useMutation({
        mutationFn: () => deleteCategory(categoryId),
        onSuccess: () => {
          toast.success("Category deleted successfully!")

          queryClient.setQueryData(["categories"], (oldData: any) => {
            if (!oldData || !oldData.data) {
              console.error("No data found in the cache.")
              return oldData
            }

            const updatedData = oldData.data.filter(
              (category: TCategory) => category.id !== categoryId,
            )

            return {
              ...oldData,
              data: updatedData,
            }
          })

          queryClient.invalidateQueries({
            queryKey: ["categories"],
          })
        },
        onError: (error: any) => {
          console.error("Error deleting category:", error)
          if (error?.response?.data?.message === "site.category_has_data") {
            toast.error(
              "Can't delete this category, it contain sub-categories.",
              {
                duration: 5000,
              },
            )
          } else {
            toast.error("Failed to delete category.")
          }
        },
      })

      const handleDelete = () => {
        mutate()
      }

      const navigate = useNavigate()

      const handleEdit = () => {
        navigate({ to: `/blog/categories/${categoryId}` })
      }

      return (
        <>
          <TableActions
            onDelete={handleDelete}
            onEdit={handleEdit}
            deleteTitle={`Are you sure to delete (${row.original.name}) category?`}
            isLoading={isPending}
          />
        </>
      )
    },
  },
]
