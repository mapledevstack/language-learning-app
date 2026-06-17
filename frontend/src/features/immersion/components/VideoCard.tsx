import Card from "@/components/Card"
import YouTube, { type YouTubePlayer } from "react-youtube"

type Props = {
  vidId: string
  setPlayer: (player: YouTubePlayer) => void
}

const VideoCard = ({ vidId, setPlayer }: Props) => {
  return (
    <Card>
      <YouTube
        videoId={vidId}
        onReady={(event) => {
          setPlayer(event.target)
        }}
        onStateChange={() => window.focus()}
        className="relative w-full aspect-video"
        iframeClassName="w-full h-full rounded-xl"
        opts={{
          playerVars: {
            disablekb: 1,
            autoplay: 1,
            hl: "ja",
          },
        }}
      />
    </Card>
  )
}
export default VideoCard
