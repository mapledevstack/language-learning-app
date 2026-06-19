import { z } from "zod"

const emailSchema = z.email()
const passwordSchema = z.string().min(6).max(255)

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export const registerSchema = loginSchema
  .extend({
    confirmPassword: z.string().min(6).max(255),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    error: "Passwords do not match",
  })
