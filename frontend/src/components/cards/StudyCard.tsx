import { cn } from "@/utils/cn"
import type { ReactNode } from "react"
import Card from "./Card"

type Props = {
  children: ReactNode
  className?: string
}

const StudyCard = ({ children, className }: Props) => {
  return (
    <Card
      className={cn(
        "w-(--card-width) aspect-3/4 flex flex-col justify-between p-4 items-center text-center",
        className,
      )}
    >
      {children}
    </Card>
  )
}
export default StudyCard
