import { z } from "zod"

export const emailViewSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
})

export const otpViewSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 characters long."),
})

export const newPasswordViewSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .regex(/[A-Z]/, {
        message: "Include a mix of uppercase and lowercase letters",
      })
      .regex(/[a-z]/, {
        message: "Include a mix of uppercase and lowercase letters",
      })
      .regex(/[0-9]/, { message: "Contain at least one numeric digit (0-9)" })
      .regex(/[\!\@\#\$\%\^\&\*\?]/, {
        message: "Special character required (e.g., !, @, #, $, %, ^, &, *, ?)",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })
