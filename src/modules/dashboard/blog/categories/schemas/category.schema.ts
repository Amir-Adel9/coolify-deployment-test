import {
  arabicTextValidation,
  englishTextValidation,
} from "@/validations/inputs.validations"
import { z } from "zod"

const categoryFormSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  parent_id: z.string().optional(),
  en: z.object({
    name: z.string().min(1, "Name is required"),
    // .regex(englishTextValidation, {
    //   message: "Name must contain English letters.",
    // }),
  }),
  ar: z.object({
    name: z.string().min(1, "Name is required"),
    // .regex(arabicTextValidation, {
    //   message: "Name must contain Arabic letters.",
    // }),
  }),
})

export default categoryFormSchema
