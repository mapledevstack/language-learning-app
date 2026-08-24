import { useMemo } from "react"

import { useUserActivity } from "../hooks/useUserActivity"
import { HeatmapCalendar } from "@/components/ui/heatmap-calendar"
import HeatmapCardSkeleton from "../skeletons/HeatmapCardSkeleton"

const HeatmapCard = () => {
  const { data: activity = [], isLoading, isError } = useUserActivity()

  const data = useMemo(() => {
    const result = activity.map((item) => ({
      date: item.date.slice(0, 10),
      value: item.reviewCount,
    }))

    return result
  }, [activity])

  if (isLoading) {
    return <HeatmapCardSkeleton />
  }

  if (isError) {
    return <div>Failed to load activity</div>
  }

  return (
    <HeatmapCalendar
      title="Activity"
      data={data}
      weekStartsOn={1}
      axisLabels
      thresholds={[0, 5, 10, 20]}
      className="w-full"
    />
  )
}

export default HeatmapCard
