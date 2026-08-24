import { useNavigate } from "@tanstack/react-router"
import { LucideArrowLeft } from "lucide-react"

const BackToDeck = () => {
  const navigate = useNavigate()

  return (
    <div
      className="p-3 bg-accent rounded-2xl"
      onClick={() => navigate({ to: "/decks" })}
    >
      <LucideArrowLeft />
    </div>
  )
}
export default BackToDeck
