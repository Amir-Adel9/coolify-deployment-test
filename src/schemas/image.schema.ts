import { z } from "zod"

const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]

const imageTypeValidation = z.object({
  id: z.number(),
  full_path_large: z.string().url("Invalid URL format for large image"),
  full_path_small: z.string().url("Invalid URL format for small image"),
  order: z.number(),
})

export const imageSchema = z.union([
  z.array(
    z
      .any()
      .refine(
        (file) => (file?.size ? file?.size < 5 * 1024 * 1024 : true),
        "Image size is too large.",
      )
      .refine(
        (file) =>
          file?.type ? ACCEPTED_IMAGE_MIME_TYPES.includes(file?.type) : true,
        "Only .jpg, .jpeg, .png and .webp formats are supported.",
      ),
  ),
  z.array(imageTypeValidation),
])
