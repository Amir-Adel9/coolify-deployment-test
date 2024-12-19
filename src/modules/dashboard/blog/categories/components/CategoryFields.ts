import { TCategory } from "../types/category.type"
import { TFormField } from "@/types/form.types"

export function categoryFields(fetchedCategories: TCategory[]) {
  let field: TFormField[] = [
    {
      name: "ar.name",
      label: "Name in Arabic",
      type: "text",
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      name: "en.name",
      label: "Name in English",
      type: "text",
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      name: "parent_id",
      label: "Parent Category",
      type: "combobox",
      className: "col-span-12 md:col-span-6",
      custom: {
        placeholder: "Select Parent Category",
        options: fetchedCategories.map((category) => {
          return {
            label: category.name,
            value: category.id?.toString() || "",
          }
        }),
      },
    },
  ]

  return field
}
