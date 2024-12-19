import CategoryForm from "./components/CategoryForm"
import { useQuery } from "@tanstack/react-query"
import { getCategory } from "./api/category.api"
import { TCategoryForm } from "./types/category.type"
import Container from "../../layout/Container"
import FormSkeleton from "@/components/ui/loading-skeletons/FormSkeleton"

const EditCategory = ({ categoryId }: { categoryId: any }) => {
  const { data, isLoading } = useQuery({
    queryKey: [`category-${categoryId}`],
    queryFn: async () => {
      return getCategory(categoryId)
    },
  })

  return (
    <Container>
      {isLoading || data?.data?.length < 1 ? (
        <FormSkeleton />
      ) : (
        <CategoryForm
          fetchedData={data?.data as TCategoryForm}
          categoryID={categoryId}
        />
      )}
    </Container>
  )
}

export default EditCategory
