import Card from "@/components/cards/Card"
import { useNavigate } from "@tanstack/react-router"

const QuickActionsCard = () => {
  const navigate = useNavigate()

  return (
    <Card className="flex justify-around gap-4 text-2xl">
      <div className="flex-1" onClick={() => navigate({ to: "/dictionary" })}>
        <Card className="flex-1 bg-sidebar-primary grid place-items-center hover:scale-105 transition-transform cursor-pointer">
          Dictionary
        </Card>
      </div>

      <div className="flex-1" onClick={() => navigate({ to: "/decks" })}>
        <Card className="flex-1 bg-sidebar-primary grid place-items-center hover:scale-105 transition-transform cursor-pointer">
          FlashCards
        </Card>
      </div>

      <div className="flex-1" onClick={() => navigate({ to: "/grammar" })}>
        <Card className="flex-1 bg-sidebar-primary grid place-items-center hover:scale-105 transition-transform cursor-pointer">
          Grammar
        </Card>
      </div>

      <div className="flex-1" onClick={() => navigate({ to: "/profile" })}>
        <Card className="flex-1 bg-sidebar-primary grid place-items-center hover:scale-105 transition-transform cursor-pointer">
          Profile
        </Card>
      </div>
    </Card>
  )
}
export default QuickActionsCard
