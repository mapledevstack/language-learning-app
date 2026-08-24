import Card from "@/components/cards/Card"
import { Skeleton } from "@/components/ui/skeleton"

const DueCardsCardSkeleton = () => {
  return (
    <Card>
      <div className="space-y-4">
        <Skeleton className="h-5 w-36" />
        <div className="flex items-baseline gap-3">
          <Skeleton className="h-12 w-16" />
          <Skeleton className="h-7 w-40" />
        </div>
      </div>
    </Card>
  )
}

export default DueCardsCardSkeleton
