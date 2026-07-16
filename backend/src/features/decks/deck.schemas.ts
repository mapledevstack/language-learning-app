import { z } from "zod"

export const createDeckSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().optional().default(""),
})

export type CreateDeckSchema = z.infer<typeof createDeckSchema>
