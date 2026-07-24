import Card from "@/components/cards/Card"
import { Skeleton } from "@/components/ui/skeleton"

const StudyNowCardSkeleton = () => {
  return (
    <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <Skeleton className="size-20 shrink-0 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <Skeleton className="h-10 w-32 rounded-4xl" />
    </Card>
  )
}
export default StudyNowCardSkeleton
