import clsx from "clsx"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
  className?: string
}

const Card = ({ children, className }: Props) => {
  return (
    <div className={clsx("bg-card rounded-xl shadow-sm p-4 border", className)}>
      {children}
    </div>
  )
}
export default Card
