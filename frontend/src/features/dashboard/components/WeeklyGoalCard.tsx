import { useMemo } from "react"

import { useUserActivity } from "../hooks/useUserActivity"

import Card from "@/components/cards/Card"
import { toDateKey } from "../utils/date"
import WeeklyGoalCardSkeleton from "../skeletons/WeeklyGoalCardSkeleton"

const WeeklyGoalCard = () => {
  const { data: activity = [], isLoading, isError } = useUserActivity()

  const { daysStudied, currentStreak } = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const activityMap = new Map(
      activity.map((item) => [item.date.slice(0, 10), item.reviewCount]),
    )

    let daysStudied = 0

    // Current week's Monday -> today
    const dayOfWeek = today.getDay()
    const daysFromMonday = (dayOfWeek + 6) % 7

    const monday = new Date(today)
    monday.setDate(today.getDate() - daysFromMonday)

    for (let i = 0; i <= daysFromMonday; i++) {
      const date = new Date(monday)
      date.setDate(monday.getDate() + i)

      const key = toDateKey(date)

      if ((activityMap.get(key) ?? 0) > 0) {
        daysStudied++
      }
    }

    let currentStreak = 0
    const date = new Date(today)

    while (true) {
      const key = toDateKey(date)

      if ((activityMap.get(key) ?? 0) <= 0) {
        break
      }

      currentStreak++

      date.setDate(date.getDate() - 1)
    }

    return {
      daysStudied,
      currentStreak,
    }
  }, [activity])

  if (isLoading) {
    return <WeeklyGoalCardSkeleton />
  }

  if (isError) {
    return <div>Failed to load weekly goal</div>
  }

  const goal = 7
  const progress = Math.min((daysStudied / goal) * 100, 100)

  return (
    <Card className="w-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Weekly Goal</p>

          <h2 className="mt-1 text-2xl font-semibold">
            <span className="text-primary">{currentStreak}</span> day streak
          </h2>
        </div>
      </div>

      <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-2 text-sm text-muted-foreground">
        {daysStudied === goal
          ? "Weekly goal complete! 🎉"
          : `${goal - daysStudied} more ${
              goal - daysStudied === 1 ? "day" : "days"
            } to reach your goal`}
      </p>
    </Card>
  )
}

export default WeeklyGoalCard
