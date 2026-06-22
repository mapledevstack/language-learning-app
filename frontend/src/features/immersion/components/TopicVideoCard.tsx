import Card from "@/components/cards/Card"
import type { Video } from "../schemas/VideoSchema"
import { useNavigate } from "@tanstack/react-router"

type Props = {
  video: Video
}

const TopicVideoCard = ({ video }: Props) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate({
      to: "/immersion/$vidId",
      params: { vidId: video.vidId },
    })
  }

  return (
    <Card className="hover:scale-105 hover:bg-sidebar-primary/60 hover:text-sidebar-primary-foreground transition-all duration-300 cursor-pointer">
      <div className="h-full flex flex-col gap-1" onClick={handleClick}>
        <img
          src={`https://i.ytimg.com/vi/${video.vidId}/hqdefault.jpg`}
          alt={`thumbnail - ${video.vidId}`}
          className="w-full aspect-video object-cover rounded-md"
          draggable={false}
        />
        <p className="line-clamp-2 mt-2 -mb-2">{video.title}</p>
      </div>
    </Card>
  )
}
export default TopicVideoCard
