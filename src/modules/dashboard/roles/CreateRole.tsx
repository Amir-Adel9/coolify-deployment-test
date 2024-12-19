import { useQuery } from "@tanstack/react-query"
import Container from "../layout/Container"
import RoleForm from "./components/RoleForm"
import { getPermissionGroups } from "./api/roles.api"

const CreateRole = () => {
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
      <RoleForm permissionGroups={permissionGroups} />
    </Container>
  )
}

export default CreateRole
