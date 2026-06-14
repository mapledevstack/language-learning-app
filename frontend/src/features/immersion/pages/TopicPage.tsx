import { Route } from "@/routes/_app/immersion/topics.$topicId"

const TopicPage = () => {
  const { topicId } = Route.useParams()

  return <div className="">{topicId}</div>
}
export default TopicPage
