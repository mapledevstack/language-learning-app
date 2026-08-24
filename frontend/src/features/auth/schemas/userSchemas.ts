import { COLOR_THEMES } from "@/constants/colorThemes"
import z from "zod"

export const UserSchema = z.object({
  email: z.string(),
  displayName: z.string().optional(),
  preferences: z
    .object({
      colorTheme: z.enum(COLOR_THEMES).default(COLOR_THEMES[0]),
      animationsEnabled: z.boolean().default(true),
    })
    .optional(),
})

export type User = z.infer<typeof UserSchema>
