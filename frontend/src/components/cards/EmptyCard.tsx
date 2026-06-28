import Card from "./Card"
import { LucideInbox, type LucideIcon } from "lucide-react"
import { cn } from "@/utils/cn"

type Props = {
  text: string
  className?: string
  icon?: LucideIcon
}

const EmptyCard = ({ text, className, icon }: Props) => {
  const Icon = icon ?? LucideInbox

  return (
    <Card
      className={cn(
        "h-full flex flex-col items-center justify-center gap-4 text-muted-foreground",
        className,
      )}
    >
      <Icon className="size-10" />
      <p>{text}</p>
    </Card>
  )
}

export default EmptyCard
