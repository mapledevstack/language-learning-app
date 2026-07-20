import Card from "@/components/cards/Card"
import DeckSelector from "./DeckSelector"
import DeckContentsFields from "./DeckContentsFields"

const DeckEditor = () => {
  return (
    <Card className="h-full flex flex-col min-h-0 gap-4">
      <DeckSelector />
      <DeckContentsFields />
    </Card>
  )
}
export default DeckEditor
