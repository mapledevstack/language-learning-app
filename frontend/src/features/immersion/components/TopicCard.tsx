import Card from "@/components/Card"
import { useNavigate } from "@tanstack/react-router"
import type { Topic } from "../schemas/TopicSchema"
import { topicImages } from "../utils/topicImages"

type Props = {
  topic: Topic
}

const TopicCard = ({ topic }: Props) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate({
      to: "/immersion/topics/$topicId",
      params: { topicId: topic._id },
    })
  }

  return (
    <div onClick={() => handleClick()}>
      <Card className="aspect-video hover:scale-105 transition-transform cursor-pointer relative">
        <div className="group">
          <img
            src={topicImages[topic.coverImg || "defaultImg"]}
            alt={topic.name ?? "cover"}
            className="absolute object-cover h-full w-full inset-0 p-2 rounded-2xl brightness-50 group-hover:brightness-100 transition-all duration-300"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-foreground text-3xl shadow-2xl capitalize z-10 font-semibold transition-all group-hover:text-destructive">
            {topic.name}
          </div>
          <div className="absolute bottom-2 text-muted-foreground right-4">
            {topic.vidCount}
          </div>
        </div>
      </Card>
    </div>
  )
}
export default TopicCard
