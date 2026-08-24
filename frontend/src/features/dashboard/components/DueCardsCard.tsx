import Card from "@/components/cards/Card"

import useStudyNowDeck from "../hooks/useStudyNowDeck"
import DueCardsCardSkeleton from "../skeletons/DueCardsCardSkeleton"

const DueCardsCard = () => {
  const { totalDue, isLoading } = useStudyNowDeck()

  if (isLoading) {
    return <DueCardsCardSkeleton />
  }

  return (
    <Card>
      <h2 className="text-lg font-semibold">Total Due Cards</h2>

      <div className="mt-4 flex items-baseline gap-3">
        <p className="text-5xl font-bold text-primary">{totalDue}</p>

        <p className="text-2xl text-muted-foreground">
          {totalDue === 1 ? "card" : "cards"} due for review
        </p>
      </div>
    </Card>
  )
}

export default DueCardsCard
