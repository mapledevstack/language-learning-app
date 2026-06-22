import { cn } from "@/utils/cn"
import type { FlashCard } from "../schemas/FlashCardSchema"

type Props = {
  currentCard: FlashCard
  remainingCount: { new: number; learning: number; review: number }
}

const FlashCardStats = ({ currentCard, remainingCount }: Props) => {
  return (
    <div className="text-muted-foreground whitespace-nowrap">
      <span
        className={cn(
          "text-blue-500",
          currentCard.status === "new" ? "underline" : "",
        )}
      >
        {remainingCount.new}
      </span>{" "}
      {" - "}
      <span
        className={cn(
          "text-red-500",
          currentCard.status === "learning" ? "underline" : "",
        )}
      >
        {remainingCount.learning}
      </span>{" "}
      {" - "}
      <span
        className={cn(
          "text-green-500",
          currentCard.status === "review" ? "underline" : "",
        )}
      >
        {remainingCount.review}
      </span>
    </div>
  )
}
export default FlashCardStats
