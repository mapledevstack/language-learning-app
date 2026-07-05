import EmptyCard from "@/components/cards/EmptyCard"
import useCurrentUser from "@/features/auth/hooks/useCurrentUser"
import { LucideHammer } from "lucide-react"

const DashboardPage = () => {
  const { data: user } = useCurrentUser()

  return (
    <div className="h-full">
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
        Welcome to your dashboard {user?.email}
      </div>
      <EmptyCard text={`Work in progress...`} icon={LucideHammer} />
    </div>
  )
}
export default DashboardPage
