import TableSearchInput from "@/components/table-component/TableSearchInput"
import { useSearchState } from "@/hooks/use-search-state"
import { getCategories } from "@/modules/dashboard/blog/categories/api/category.api"
import { categoriesColumns } from "@/modules/dashboard/blog/categories/categories-columns"
import DataTableWrapper from "@/modules/dashboard/components/DataTableWrapper"
import Container from "@/modules/dashboard/layout/Container"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute(
  "/(dashboard)/_dashboard/blog/categories/",
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { search, setSearch } = useSearchState()

  return (
    <Container fullWidth>
      <DataTableWrapper
        queryKey={["categories"]}
        queryFn={getCategories}
        columns={categoriesColumns}
        createLink='/blog/categories/create'
        createTitle='Create Category'
        params={{ search }}
      >
        <TableSearchInput
          searchValue={search}
          onDebouncedChange={setSearch}
          className='w-full md:w-96'
          placeholder='Search categories ...'
        />
      </DataTableWrapper>
    </Container>
  )
}
