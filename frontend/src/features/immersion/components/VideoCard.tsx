import Card from "@/components/Card"
import YouTube, { type YouTubePlayer } from "react-youtube"

type Props = {
  vidId: string
  setPlayer: (player: YouTubePlayer) => void
  setCurrentTime: (currentTime: number) => void
}

const VideoCard = ({ vidId, setPlayer, setCurrentTime }: Props) => {
  return (
    <Card>
      <YouTube
        videoId={vidId}
        onReady={(event) => {
          setPlayer(event.target)
        }}
        className="w-full aspect-video"
        iframeClassName="w-full h-full rounded-xl"
      />
    </Card>
  )
}
export default VideoCard
