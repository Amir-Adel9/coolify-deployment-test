import httpClient from "@/utils/http-client"

export const getCategories = async (page: number = 1, params: any) => {
  const { data } = await httpClient.get(`/dashboard/categories`, {
    params: { page, ...params },
  })
  return data
}

export const getParentCategories = async () => {
  const { data } = await httpClient.get(`/dashboard/categories/select/main`)
  return data
}

export const getCategory = async (categoryID: string) => {
  const { data } = await httpClient.get(`/dashboard/categories/${categoryID}`)
  return data
}

export const createCategory = async (categoryData: any) => {
  const { data } = await httpClient.post(`/dashboard/categories`, categoryData)
  return data
}

export const deleteCategory = async (categoryID: number) => {
  const { data } = await httpClient.delete(
    `/dashboard/categories/${categoryID}`,
  )
  return data
}

export const updateCategory = async (categoryID: string, categoryData: any) => {
  const { data } = await httpClient.put(
    `/dashboard/categories/${categoryID}`,
    categoryData,
  )
  return data
}
