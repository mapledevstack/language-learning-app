import { cn } from "@/utils/cn"
import type { ReactNode } from "react"
import Card from "./Card"

type Props = {
  children: ReactNode
  className?: string
  cardScale?: number
}

const StudyCard = ({ children, className, cardScale = 1 }: Props) => {
  return (
    <Card
      style={{
        width: `calc(var(--card-width) * ${cardScale})`,
      }}
      className={cn(
        "aspect-3/4 flex flex-col justify-between p-4 items-center text-center",
        className,
      )}
    >
      {children}
    </Card>
  )
}
export default StudyCard
