import DeckCard from "../components/DeckCard"
import CreateDeckCard from "../components/CreateDeckCard"
import useDecks from "../hooks/useDecks"

const DecksPage = () => {
  const { data: decks = [] } = useDecks()

  return (
    <div className="h-full w-full flex flex-wrap p-10 gap-8 items-center justify-evenly overflow-y-auto">
      {decks.map((deck) => (
        <DeckCard key={deck.id} deck={deck} />
      ))}

      <CreateDeckCard />
    </div>
  )
}

export default DecksPage
