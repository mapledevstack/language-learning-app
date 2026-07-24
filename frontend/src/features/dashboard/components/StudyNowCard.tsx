import Card from "@/components/cards/Card"
import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"
import { LucideCheckCircle2, LucideLayers, LucidePlay } from "lucide-react"
import useStudyNowDeck from "../hooks/useStudyNowDeck"
import StudyNowCardSkeleton from "../skeletons/StudyNowCardSkeleton"

const StudyNowCard = () => {
  const { studyNow, totalDue, decks, isLoading } = useStudyNowDeck()

  if (isLoading) {
    return <StudyNowCardSkeleton />
  }

  if (decks.length === 0) {
    return (
      <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-sidebar-primary/10">
        <div className="flex items-center gap-4">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <LucideLayers className="size-8" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-primary">
              Create your first deck
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Add flashcards and start your study session.
            </p>
          </div>
        </div>

        <Button asChild size="lg">
          <Link to="/decks">Go to Decks</Link>
        </Button>
      </Card>
    )
  }

  if (totalDue === 0) {
    return (
      <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-sidebar-primary/10">
        <div className="flex items-center gap-4">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-green-500">
            <LucideCheckCircle2 className="size-8" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-primary">
              You&apos;re all caught up
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              No cards due right now. Come back later or browse your decks.
            </p>
          </div>
        </div>

        <Button asChild variant="outline" size="lg">
          <Link to="/decks">Browse Decks</Link>
        </Button>
      </Card>
    )
  }

  if (!studyNow) {
    return null
  }

  const { deck, stats } = studyNow
  const progress =
    stats.totalCards === 0 ? 0 : 1 - stats.newCards / stats.totalCards

  return (
    <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-sidebar-primary/10">
      <div className="flex items-center gap-4">
        <div className="relative size-20 shrink-0">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(
                white ${(1 - progress) * 100}%,
                var(--color-primary) 0%
              )`,
            }}
          />
          <div className="absolute inset-1 rounded-full bg-card" />
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-primary">
            {stats.dueCards}
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Study now</p>
          <h2 className="text-2xl font-semibold text-primary">{deck.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {stats.dueCards} {stats.dueCards === 1 ? "card" : "cards"} due
            {totalDue > stats.dueCards &&
              ` · ${totalDue - stats.dueCards} more in other decks`}
          </p>
        </div>
      </div>

      <Button asChild size="lg">
        <Link to="/decks/$deckId" params={{ deckId: deck.id }}>
          <LucidePlay className="size-4" />
          Start Studying
        </Link>
      </Button>
    </Card>
  )
}

export default StudyNowCard
