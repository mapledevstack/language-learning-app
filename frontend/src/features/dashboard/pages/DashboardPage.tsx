import DashboardHeader from "../components/DashboardHeader"
import StudyNowCard from "../components/StudyNowCard"
import TodayProgressCard from "../components/TodayProgressCard"
import DueCardsCard from "../components/DueCardsCard"
import HeatmapCard from "../components/HeatmapCard"
import DeckOverviewCard from "../components/DeckOverviewCard"
import WeeklyGoalCard from "../components/WeeklyGoalCard"
import AccuracyTrendCard from "../components/AccuracyTrendCard"
import RecentActivityCard from "../components/RecentActivityCard"
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

      <HeatmapCard />

      <DeckOverviewCard />

      <div className="grid gap-6 lg:grid-cols-2">
        <WeeklyGoalCard />
        <AccuracyTrendCard />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentActivityCard />
        <QuickActionsCard />
      </div>
    </div>
  )
}

export default DashboardPage
