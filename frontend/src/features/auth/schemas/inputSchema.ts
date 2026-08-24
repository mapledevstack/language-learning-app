import { COLOR_THEMES } from "@/constants/colorThemes"
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

export const ResetSchema = z.object({
  verificationCode: z.string(),
  password: z.string(),
})

export const updateUserSchema = z.object({
  displayName: z.string().optional(),
  preferences: z
    .object({
      colorTheme: z.enum(COLOR_THEMES).optional(),
      animationsEnabled: z.boolean().optional(),
    })
    .optional(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type SigninInput = z.infer<typeof SigninSchema>
export type ResetInput = z.infer<typeof ResetSchema>
export type updateUserInput = z.infer<typeof updateUserSchema>
