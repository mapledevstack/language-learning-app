import Card from "@/components/cards/Card"
import { Skeleton } from "@/components/ui/skeleton"

const HeatmapCardSkeleton = () => {
  return (
    <Card className="w-full">
      <Skeleton className="h-72 w-full" />
    </Card>
  )
}

export default HeatmapCardSkeleton
