import z from "zod"

export const UserSchema = z.object({
  email: z.string(),
})

export type User = z.infer<typeof UserSchema>
