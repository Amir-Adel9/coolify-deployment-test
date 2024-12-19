import { DataTable } from "@/components/data-table"
import { TableSkeleton } from "@/components/ui/loading-skeletons/TableSkeleton"
import { Button } from "@/components/ui/shadcn/button"
import { useQuery } from "@tanstack/react-query"
import { Link, useNavigate, useSearch } from "@tanstack/react-router"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"

interface DataTableWrapperProps<T extends Record<string, any>> {
  queryKey: string[]
  queryFn: (page: number, params: any) => Promise<T>
  columns: any[]
  createLink?: string
  createTitle?: string
  dataKey?: string
  children?: React.ReactNode
  params?: {
    [key: string]: any
  }
}

const DataTableWrapper = <T extends Record<string, any>>({
  queryKey,
  queryFn,
  columns,
  createLink,
  createTitle,
  dataKey = "data",
  children,
  params,
}: DataTableWrapperProps<T>) => {
  const { page: pagePrams, ...otherParams }: any = useSearch({ strict: false })
  const [page, setPage] = useState(Number(pagePrams) || 1)

  useEffect(() => {
    if (pagePrams) {
      setPage(Number(pagePrams))
    }
  }, [pagePrams])

  const { isPending, error, data, isLoading, isFetching } = useQuery<T, Error>({
    queryKey: [...queryKey, page, params],
    queryFn: () => queryFn(page, params),
    placeholderData: (prev) => prev,
  })

  const navigate: any = useNavigate()
  function handleNextPage() {
    navigate({
      search: {
        page: page + 1,
        ...otherParams,
      },
    })
  }

  function handlePreviousPage() {
    navigate({
      search: {
        page: page - 1,
        ...otherParams,
      },
    })
  }

  // if (isPending) return <TableSkeleton />

  if (error) return `An error has occurred: ${error.message}`

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between flex-wrap gap-3 w-full'>
        {children && (
          <div className='flex justify-between items-center'>{children}</div>
        )}

        {createLink && (
          <Button variant='default' className='' asChild>
            <Link to={createLink} className='flex items-center gap-1'>
              {createTitle ? createTitle : "Create"} <Plus />
            </Link>
          </Button>
        )}
      </div>

      <div className='mt-4 mb-4 bg-white bg-opacity-60'>
        {isLoading || isPending || isFetching ? (
          <TableSkeleton columns={columns} />
        ) : (
          <DataTable
            columns={columns}
            data={data?.[dataKey as keyof T]}
            currentPage={page}
            totalPages={Math.ceil(
              data?.paginate?.total / data?.paginate?.per_page,
            )}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        )}
      </div>
    </div>
  )
}

export default DataTableWrapper
