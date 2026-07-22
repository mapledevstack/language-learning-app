import { Route } from "@/routes/_app/decks/$deckId/edit"
import useDeckStats from "../hooks/useDeckStats"

const DeckStats = () => {
  const { deckId } = Route.useParams()
  const { data: stats, isLoading } = useDeckStats(deckId)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!stats) {
    return null
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      <StatCard label="Total Cards" value={stats.totalCards} />
      <StatCard label="Due Today" value={stats.dueCards} />
      <StatCard label="New" value={stats.newCards} />
      <StatCard label="Learning" value={stats.learningCards} />
      <StatCard label="Review" value={stats.reviewCards} />
      <StatCard label="Relearning" value={stats.relearningCards} />
    </div>
  )
}

type StatCardProps = {
  label: string
  value: number
}

const StatCard = ({ label, value }: StatCardProps) => (
  <div className="rounded-lg border bg-card p-4">
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="mt-2 text-3xl font-bold">{value}</p>
  </div>
)

export default DeckStats
