import { useQueries } from "@tanstack/react-query"
import { getDeckStats } from "@/features/decks/api/decksApi"
import useDecks from "@/features/decks/hooks/useDecks"
import type { Deck, DeckStats } from "@/features/decks/schemas/DeckSchema"

export type StudyNowDeck = {
  deck: Deck
  stats: DeckStats
}

const useStudyNowDeck = () => {
  const { data: decks = [], isLoading: isDecksLoading } = useDecks()

  const statsQueries = useQueries({
    queries: decks.map((deck) => ({
      queryKey: ["deckStats", deck.id],
      queryFn: () => getDeckStats(deck.id),
    })),
  })

  const isStatsLoading =
    decks.length > 0 && statsQueries.some((query) => query.isLoading)

  let studyNow: StudyNowDeck | null = null
  let totalDue = 0

  for (let i = 0; i < decks.length; i++) {
    const stats = statsQueries[i]?.data
    if (!stats) continue

    totalDue += stats.dueCards

    if (!studyNow || stats.dueCards > studyNow.stats.dueCards) {
      studyNow = { deck: decks[i], stats }
    }
  }

  return {
    studyNow,
    totalDue,
    decks,
    isLoading: isDecksLoading || isStatsLoading,
  }
}

export default useStudyNowDeck
