import { useSearchState } from "@/hooks/use-search-state"
import DataTableWrapper from "../components/DataTableWrapper"
import Container from "../layout/Container"
import TableSearchInput from "@/components/table-component/TableSearchInput"
import { getAllRoles } from "./api/roles.api"
import { RolesTableColumns } from "./components/RolesTableColumns"

const RolesTable = () => {
  const { search, setSearch } = useSearchState()

  return (
    <Container>
      <DataTableWrapper
        queryKey={["roles"]}
        queryFn={getAllRoles}
        columns={RolesTableColumns}
        createLink='/roles/create'
        createTitle='Create Role'
        params={{ search }}
      >
        <TableSearchInput
          searchValue={search}
          onDebouncedChange={setSearch}
          className='w-full md:w-96'
          placeholder='Search Roles...'
        />
      </DataTableWrapper>
    </Container>
  )
}

export default RolesTable
