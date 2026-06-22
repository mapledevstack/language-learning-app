import type { ReactNode } from "react"
import StudyCard from "./StudyCard"
import { motion } from "motion/react"
import { cn } from "@/utils/cn"

type Props = {
  isFlipped: boolean
  flipAnimationEnabled?: boolean
  front: ReactNode
  back: ReactNode
  cardScale?: number
  symmetricFlip?: boolean
  className?: string
}

const FlipCard = ({
  isFlipped = false,
  flipAnimationEnabled = true,
  front,
  back,
  cardScale,
  symmetricFlip = true,
  className = "bg-card",
}: Props) => {
  return (
    <StudyCard
      className={cn("perspective-distant", className)}
      cardScale={cardScale}
    >
      <motion.div
        className="relative size-full"
        initial={{ x: 0, opacity: 1, rotateY: isFlipped ? 180 : 0 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: flipAnimationEnabled
            ? symmetricFlip
              ? 0.3
              : isFlipped
                ? 0.3
                : 0
            : 0,
          ease: "easeInOut",
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute backface-hidden size-full">{front}</div>

        <div className="absolute backface-hidden transform-[rotateY(180deg)] size-full">
          {back}
        </div>
      </motion.div>
    </StudyCard>
  )
}
export default FlipCard
