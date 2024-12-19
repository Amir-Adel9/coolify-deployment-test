import { z } from "zod"

export const roleFormSchema = z.object({
  name: z.string().min(1, "A role name is required"),
  permissions: z
    .array(z.number())
    .min(1, "At least one permission is required"),
})
