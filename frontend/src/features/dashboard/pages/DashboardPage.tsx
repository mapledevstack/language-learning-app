import EmptyCard from "@/components/cards/EmptyCard"
import { LucideHammer } from "lucide-react"

const DashboardPage = () => {
  return (
    <div className="h-full">
      <EmptyCard text="Work in Progress" icon={LucideHammer} />
    </div>
  )
}
export default DashboardPage
