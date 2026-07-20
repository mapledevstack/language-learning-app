import DeckEditor from "../components/DeckEditor"
import DeckFlashCards from "../components/DeckFlashCards"

const DeckEditPage = () => {
  return (
    <div className="grid md:grid-cols-[30%_70%] gap-4 h-full md:overflow-y-hidden p-6 overflow-x-hidden">
      <DeckEditor />
      <DeckFlashCards />
    </div>
  )
}
export default DeckEditPage
