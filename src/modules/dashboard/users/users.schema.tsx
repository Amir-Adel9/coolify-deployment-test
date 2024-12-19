import { z } from "zod";

export const adminCreateSchema = z
  .object({
    name: z.string().min(2, "User Name is required").regex(/^\S*$/, "User Name must not contain spaces"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    password_confirmation: z.string().min(6),
    role_id: z.string(),
  })
  .superRefine((data, ctx) => {
    const { password, password_confirmation } = data;

    // If both password and password_confirmation are provided, they must match
    if (password && password_confirmation && password !== password_confirmation) {
      ctx.addIssue({
        path: ["password_confirmation"],
        message: "Password confirmation does not match the password",
        code: "custom",
      });
    }
  });

export const adminEditSchema = z
  .object({
    name: z
      .string()
      .min(2, "User Name is required")
      .regex(/^\S*$/, "User Name must not contain spaces")
      .optional()
      .or(z.literal("")),
    email: z.string().email("Invalid email 2").optional().or(z.literal("")),
    password: z.string().min(6, "Password must be at least 6 characters").optional().or(z.literal("")),
    password_confirmation: z.string().optional().or(z.literal("")),
    role_id: z.string(),
  })
  .superRefine((data, ctx) => {
    const { password, password_confirmation } = data;

    // If password is provided, password_confirmation must be filled and match
    if (password && !password_confirmation) {
      ctx.addIssue({
        path: ["password_confirmation"],
        message: "Password confirmation is required",
        code: "custom",
      });
    }

    // If both password and password_confirmation are provided, they must match
    if (password && password_confirmation && password !== password_confirmation) {
      ctx.addIssue({
        path: ["password_confirmation"],
        message: "Password confirmation does not match the password",
        code: "custom",
      });
    }
  });
