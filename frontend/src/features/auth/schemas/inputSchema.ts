import z from "zod"

export const loginSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
})

export const SigninSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
  confirmPassword: z.string().min(1),
})

export type LoginInput = z.infer<typeof loginSchema>
export type SigninInput = z.infer<typeof SigninSchema>
