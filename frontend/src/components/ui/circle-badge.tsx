import { cn } from "@/utils/cn"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
  label?: string
  hover?: boolean
  className?: string
}

const CircleBadge = ({ children, label, hover = false, className }: Props) => {
  return (
    <div
      className={cn(
        "bg-primary p-3 rounded-full",
        hover && "hover:scale-105 transition-transform cursor-pointer",
        className,
      )}
      aria-label={label}
    >
      {children}
    </div>
  )
}
export default CircleBadge
