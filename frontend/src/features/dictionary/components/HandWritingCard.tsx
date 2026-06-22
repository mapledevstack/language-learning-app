import Card from "@/components/cards/Card"
import { cn } from "@/utils/cn"

type Props = {
  isWriting: boolean
}

const HandWritingCard = ({ isWriting }: Props) => {
  return (
    <Card
      className={cn(
        "aspect-square",
        isWriting ? "mb-4" : "opacity-0 h-0 p-0 mb-0",
      )}
    >
      HandWriting
    </Card>
  )
}
export default HandWritingCard
