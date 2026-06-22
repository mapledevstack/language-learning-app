import { cn } from "@/utils/cn"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
  className?: string
  style?: object
}

const Card = ({ children, className, style }: Props) => {
  return (
    <div
      className={cn("bg-card rounded-xl shadow-sm p-4 border", className)}
      style={style}
    >
      {children}
    </div>
  )
}
export default Card
