import FormComponent from "@/components/form-component/FormComponent"
import { categoryFields } from "./CategoryFields"
import { useForm } from "react-hook-form"
import categoryFormSchema from "../schemas/category.schema"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  createCategory,
  getParentCategories,
  updateCategory,
} from "../api/category.api"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"
import { showFormErrors } from "@/validations/showFormErrors.validations"
import { TCategoryForm } from "../types/category.type"
import queryClient from "@/lib/query-client"
import Container from "@/modules/dashboard/layout/Container"
import { slugTrim } from "@/utils/slug-trim"

const CategoryForm = ({
  fetchedData,
  categoryID,
}: { fetchedData?: TCategoryForm; categoryID?: string }) => {
  const navigation = useNavigate()

  const categoryForm = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      slug: fetchedData?.slug || "",
      parent_id: fetchedData?.parent_id?.toString() || "",
      en: {
        name: fetchedData?.en.name,
      },
      ar: {
        name: fetchedData?.ar.name || "",
      },
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  })

  const nameEnValue = categoryForm.watch("en.name")
  const slugValue = categoryForm.watch("slug")

  // Update slug value when nameEn changes
  useEffect(() => {
    if (!categoryID) {
      if (nameEnValue) {
        const updatedSlug = slugTrim(nameEnValue.trim())
        categoryForm.setValue("slug", updatedSlug, { shouldValidate: true })
      }
    }
  }, [nameEnValue])

  // Update slug value when slug changes
  useEffect(() => {
    const updatedSlug = slugTrim(slugValue)
    if (slugValue !== updatedSlug) {
      categoryForm.setValue("slug", updatedSlug)
    }
  }, [slugValue])

  const { mutate: CategoryMutate, isPending } = useMutation({
    mutationFn: async (categoryData: any) => {
      if (categoryID) {
        await updateCategory(categoryID, categoryData)
        queryClient.invalidateQueries({
          queryKey: [`category-${categoryID}`],
        })
      } else {
        return createCategory(categoryData)
      }
    },
    onMutate: () => {
      toast.info(`${categoryID ? "Updating" : "Creating"} Please wait ...`)
    },
    onSuccess: () => {
      toast.success(
        `Category ${categoryID ? "updated" : "created"} successfully`,
      )
      navigation({ to: "/blog/categories" })
    },
    onError: (error: any) => {
      const errors = error.response?.data?.data?.errors
      console.log(errors)

      showFormErrors(errors, categoryForm)
      toast.error(`Error: ${error.response?.data?.message}`)
    },
  })

  const onSubmit = async (data: z.infer<typeof categoryFormSchema>) => {
    CategoryMutate({
      ...data,
      parent_id: Number(data.parent_id) || "",
    })
  }

  const { data: parentCategoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getParentCategories(),
  })

  return (
    <FormComponent
      fields={categoryFields(parentCategoriesData?.data || [])}
      formData={categoryForm}
      handleSubmit={onSubmit}
      buttonText={categoryID ? "Update Category" : "Create Category"}
      buttonClassName='w-fit justify-self-end'
      formTitle={categoryID ? "Edit Existing Category" : "Create new Category"}
      isLoading={isPending}
    />
  )
}

export default CategoryForm
