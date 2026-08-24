import { useUserActivity } from "../hooks/useUserActivity"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TodayProgressCardSkeleton from "../skeletons/TodayProgressCardSkeleton"

const TodayProgressCard = () => {
  const { data: activity = [], isLoading, isError } = useUserActivity()

  if (isLoading) {
    return <TodayProgressCardSkeleton />
  }

  if (isError) {
    return <div>Failed to load today's progress</div>
  }

  const today = new Date().toISOString().slice(0, 10)

  const todayActivity = activity.find(
    (item) => item.date.slice(0, 10) === today,
  )

  const reviewCount = todayActivity?.reviewCount ?? 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Progress</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="text-3xl font-bold">
          <span className="text-primary text-5xl pr-3">{reviewCount}</span>{" "}
          Reviews
        </div>
      </CardContent>
    </Card>
  )
}

export default TodayProgressCard
