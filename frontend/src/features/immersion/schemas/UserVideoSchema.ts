import { z } from "zod"

export const UserVideoSchema = z.object({
  userId: z.string(),
  vidId: z.string(),
  isFavorited: z.boolean(),
  isWatchLater: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
