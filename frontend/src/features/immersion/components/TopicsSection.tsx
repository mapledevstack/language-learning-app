import { useSuspenseQuery } from "@tanstack/react-query"
import TopicCard from "./TopicCard"
import { getTopics } from "../api/immersionApi"

const TopicsSection = () => {
  const { data: topics } = useSuspenseQuery({
    queryKey: ["topics"],
    queryFn: getTopics,
  })

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden -m-4 p-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {topics.map((topic) => (
          <TopicCard key={topic._id} topic={topic} />
        ))}
      </div>
    </div>
  )
}
export default TopicsSection
