import { useQuery } from "@tanstack/react-query"
import Container from "../layout/Container"
import RoleForm from "./components/RoleForm"
import { getPermissionGroups, getSingleRole } from "./api/roles.api"
import RolesSkeleton from "./components/RolesSkeleton"

const EditRole = ({
  roleId,
}: {
  roleId: number
}) => {
  const { data: role, isFetching: isFetchingRole } = useQuery({
    queryKey: [`role-${roleId}`],
    queryFn: async () => {
      return await getSingleRole(roleId).then((data) => {
        return data.data
      })
    },
  })

  const { data: permissionGroups } = useQuery({
    queryKey: ["permissionGroups"],
    queryFn: async () => {
      return await getPermissionGroups().then((data) => {
        return data.data
      })
    },
  })

  return (
    <Container>
      {isFetchingRole && <RolesSkeleton />}
      {role && (
        <RoleForm existingRole={role} permissionGroups={permissionGroups} />
      )}
    </Container>
  )
}

export default EditRole
