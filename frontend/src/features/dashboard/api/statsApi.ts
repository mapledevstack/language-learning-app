import api from "@/utils/api"
import { activitiesSchema } from "../schemas/statsSchema"

export const getActivity = async () => {
  const activities = await api.get("/me/activity")

  return activitiesSchema.parse(activities)
}
