import Card from "@/components/Card"
import { useNavigate } from "@tanstack/react-router"

const TopicCard = ({ topic }: any) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate({
      to: "/immersion/topic/$topic",
      params: { topic: topic.id },
    })
  }

  return (
    <div onClick={() => handleClick()}>
      <Card className="aspect-video text-primary text-3xl grid place-items-center shadow-2xl hover:scale-105 transition-transform cursor-pointer">
        {topic.title}
      </Card>
    </div>
  )
}
export default TopicCard
