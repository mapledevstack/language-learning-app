import { Button } from "@/components/ui/button"
import { Rating } from "ts-fsrs"

type Props = {
  isFlipped: boolean
  onReveal: () => void
  onRate: (rating: Rating) => void
}

const StudyControls = ({ isFlipped, onReveal, onRate }: Props) => {
  if (!isFlipped) {
    return (
      <Button className="w-full" onClick={onReveal}>
        Reveal
      </Button>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <Button variant="destructive" onClick={() => onRate(Rating.Again)}>
        Again
      </Button>

      <Button onClick={() => onRate(Rating.Good)}>Good</Button>
    </div>
  )
}

export default StudyControls
