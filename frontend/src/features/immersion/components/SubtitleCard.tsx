import Card from "@/components/Card"

type Props = {
  subtitles: any[]
  currentTime: any
  setCurrentTime: (currentTime: any) => void
}

const SubtitleCard = ({ subtitles, currentTime, setCurrentTime }: Props) => {
  const colorCode = () => {}

  return (
    <Card className="flex-1 overflow-y-scroll flex flex-col items-center gap-1">
      {subtitles.map((sub) => {
        return <div className="text-2xl">{sub.text}</div>
      })}
    </Card>
  )
}
export default SubtitleCard
