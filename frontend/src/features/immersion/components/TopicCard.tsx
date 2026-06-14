import Card from "@/components/Card"
import { useNavigate } from "@tanstack/react-router"
import type { Topic } from "../schemas/TopicSchema"

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
      <Card className="aspect-video text-primary text-3xl grid place-items-center shadow-2xl hover:scale-105 transition-transform cursor-pointer">
        {topic.name}
      </Card>
    </div>
  )
}
export default TopicCard
