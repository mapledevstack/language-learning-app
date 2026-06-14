import { TopicsSchema } from "../schemas/TopicSchema"

export const getTopics = async () => {
  const res = await fetch(`http://localhost:3000/api/v1/immersion/topics`)

  if (!res.ok) {
    throw new Error("failed to fetch")
  }

  const data = await res.json()

  return TopicsSchema.parse(data)
}
