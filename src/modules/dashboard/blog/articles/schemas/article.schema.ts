import { imageSchema } from "@/schemas/image.schema"
import { z } from "zod"

const articleFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  text: z.string().min(1, "Text is required"),
  password: z.string().min(1, "Password is required"),
  acceptTerms: z.boolean(),
  image: imageSchema,
  category: z.string().min(1, "Category is required"),
  country: z.string().min(1, "Country is required"),
  city: z.array(z.string()).min(1, "Select at least one city"),
})

export default articleFormSchema
