import Card from "@/components/cards/Card"
import DeckSelector from "./DeckSelector"
import DeckContentsFields from "./DeckContentsFields"
import DeckStats from "./DeckStats"

const DeckEditor = () => {
  return (
    <Card className="h-full flex flex-col min-h-0 gap-4">
      <DeckSelector />
      <DeckContentsFields />
      <DeckStats />
    </Card>
  )
}
export default DeckEditor
