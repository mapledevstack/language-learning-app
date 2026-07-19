import { cn } from "@/utils/cn"
import { forwardRef, type ComponentPropsWithoutRef } from "react"

type Props = ComponentPropsWithoutRef<"div"> & {
  label?: string
  hover?: boolean
}

const CircleBadge = forwardRef<HTMLDivElement, Props>(
  ({ children, label, hover = false, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        aria-label={label}
        className={cn(
          "bg-primary p-3 rounded-full",
          hover && "hover:scale-105 transition-transform cursor-pointer",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)

CircleBadge.displayName = "CircleBadge"

export default CircleBadge
