import Card from "@/components/Card"
import YouTube, { type YouTubePlayer } from "react-youtube"

const vidId = "C3oPjuudXas"

type Props = {
  setPlayer: (player: YouTubePlayer) => void
  setCurrentTime: (currentTime: any) => void
}

const VideoCard = ({ setPlayer, setCurrentTime }: Props) => {
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
