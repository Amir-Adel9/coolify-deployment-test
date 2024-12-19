export type TCategory = {
  id: number
  name: string
  slug: string
  parent_id?: number
}

export type TCategoryForm = {
  id?: number
  parent_id: number
  parent?: TCategory
  slug: string
  en: {
    name: string
  }
  ar: {
    name: string
  }
}
