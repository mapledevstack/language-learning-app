import Card from "@/components/Card"

const TopicCard = ({ topic }: any) => {
  return (
    <Card className="aspect-video text-primary text-3xl grid place-items-center shadow-2xl hover:scale-105 transition-transform cursor-pointer">
      {topic.title}
    </Card>
  )
}
export default TopicCard
