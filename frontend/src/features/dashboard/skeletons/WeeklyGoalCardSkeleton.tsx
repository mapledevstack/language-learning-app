import Card from "@/components/cards/Card"

import { Skeleton } from "@/components/ui/skeleton"

const WeeklyGoalCardSkeleton = () => {
  return (
    <Card className="w-full">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-7 w-32" />
      </div>

      <Skeleton className="mt-5 h-2 w-full" />

      <Skeleton className="mt-2 h-4 w-48" />
    </Card>
  )
}

export default WeeklyGoalCardSkeleton
