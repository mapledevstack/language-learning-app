import Card from "@/components/cards/Card"
import { Skeleton } from "@/components/ui/skeleton"

const TodayProgressCardSkeleton = () => {
  return (
    <Card>
      <div className="space-y-2">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-16 w-40" />
      </div>
    </Card>
  )
}

export default TodayProgressCardSkeleton
