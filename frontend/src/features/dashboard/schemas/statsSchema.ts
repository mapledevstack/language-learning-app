import z from "zod"

export const activitySchema = z.object({
  date: z.string(),
  reviewCount: z.number(),
})

export const activitiesSchema = z.array(activitySchema)

export type UserActivity = z.infer<typeof activitySchema>
export type userActivities = z.infer<typeof activitiesSchema>
