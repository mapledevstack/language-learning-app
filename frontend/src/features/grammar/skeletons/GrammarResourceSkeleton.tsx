import Card from "@/components/cards/Card"
import { Skeleton } from "@/components/ui/skeleton"

const GrammarResourceSkeleton = () => {
  return (
    <Card className="relative flex flex-col gap-2 p-5 pr-12">
      <Skeleton className="h-6 w-3/4" />

      <Skeleton className="h-4 w-1/2" />

      <Skeleton className="mt-1 h-4 w-1/3" />

      <Skeleton className="absolute top-5 right-5 h-4 w-4 rounded-full" />
    </Card>
  )
}

export default GrammarResourceSkeleton
