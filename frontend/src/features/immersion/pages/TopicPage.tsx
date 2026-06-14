import { Route } from "@/routes/_app/immersion/topics.$topicId"
import TopicVideoCard from "../components/TopicVideoCard"
import { useSuspenseQuery } from "@tanstack/react-query"
import { getTopicVideos } from "../api/immersionApi"

const TopicPage = () => {
  const { topicId } = Route.useParams()

  const { data: videos } = useSuspenseQuery({
    queryKey: ["videos", topicId],
    queryFn: () => getTopicVideos(topicId),
  })

  return (
    <div className="h-full flex-1 overflow-y-auto overflow-x-hidden p-10">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
        {videos.map((video) => (
          <TopicVideoCard key={video.vidId} video={video} />
        ))}
      </div>
    </div>
  )
}
export default TopicPage
