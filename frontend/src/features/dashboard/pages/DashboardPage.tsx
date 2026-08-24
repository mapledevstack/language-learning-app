import DashboardHeader from "../components/DashboardHeader"
import StudyNowCard from "../components/StudyNowCard"
import TodayProgressCard from "../components/TodayProgressCard"
import DueCardsCard from "../components/DueCardsCard"
import HeatmapCard from "../components/HeatmapCard"
import WeeklyGoalCard from "../components/WeeklyGoalCard"
import LogoutAndDemo from "../components/LogoutAndDemo"
import QuickActionsCard from "../components/QuickActionsCard"

const DashboardPage = () => {
  return (
    <div className="flex max-full flex-col gap-6 p-6">
      <DashboardHeader />

      <StudyNowCard />

      <div className="grid gap-6 lg:grid-cols-2">
        <TodayProgressCard />
        <DueCardsCard />
      </div>

      <div className="w-full">
        <HeatmapCard />
      </div>

      <div className="grid gap-6 ">
        <WeeklyGoalCard />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <LogoutAndDemo />
        <QuickActionsCard />
      </div>
    </div>
  )
}

export default DashboardPage
