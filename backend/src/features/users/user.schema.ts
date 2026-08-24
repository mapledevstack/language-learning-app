import z from "zod"
import { COLOR_THEMES } from "../../constants/colorThemes.js"

export const updateUserSchema = z.object({
  displayName: z.string().trim().min(1).max(50).optional(),
  preferences: z
    .object({
      colorTheme: z.enum(COLOR_THEMES).optional(),
      animationsEnabled: z.boolean().default(true).optional(),
    })
    .optional(),
})

export type UpdateUser = z.infer<typeof updateUserSchema>
