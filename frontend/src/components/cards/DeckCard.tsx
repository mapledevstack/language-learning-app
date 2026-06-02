import type { Deck } from "@/schemas/DeckSchema"
import Card from "./Card"

type Props = {
  deck: Deck
}

const DeckCard = ({ deck } : Props) => {

  const progress = deck.learnedCount / deck.cardCount

  return (
    <Card className="w-xs bg-accent-muted aspect-3/4 hover:scale-105 transition-transform flex flex-col justify-between p-2 items-center text-center relative">
      
      <h1 className="text-3xl text-primary shadow-sm" >{deck.title}</h1>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20">
        
        <div className="p-5 absolute size-20 rounded-full" style={{
          background: `conic-gradient(
            white ${(1 - progress)*100}%,
            var(--color-primary) 0%
          )`
        }}></div>

        <div className="absolute inset-1 rounded-full bg-card"></div>

        <div className="inset-2 flex items-center justify-center absolute text-5xl">{deck.dueCount}</div>
      </div>

      <button className="bg-primary text-2xl p-3 rounded-4xl hover:scale-105 transition-transform text-shadow-md">Study!</button>
    </Card>
  )
}
export default DeckCard
