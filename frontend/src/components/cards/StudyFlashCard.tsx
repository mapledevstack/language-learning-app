import type { FlashCard } from "@/schemas-and-types/FlashCardSchema"
import { motion } from "motion/react"
import Card from "./Card"
import StudyFlashCardFront from "./StudyFlashCardFront"
import StudyFlashCardBack from "./StudyFlashCardBack"

type Props = {
  currentCard: FlashCard,
  flip: boolean
}

const StudyFlashCard = ({currentCard : card, flip} : Props) => {
  return (
    <Card className="aspect-3/4 w-[min(20rem,80vh,calc(80vh*3/4))] perspective-distant">
      <motion.div
        className="relative size-full"
        initial={{x: 0, opacity: 1}}
        animate={{rotateY: flip ? 180 : 0}}
        transition={{duration: flip ? 0.3 : 0, ease: "easeInOut"}}
        style={{transformStyle: "preserve-3d"}}
      >
        
        <div className="absolute backface-hidden size-full">
          <StudyFlashCardFront card={card} />
        </div>
        
        <div className="absolute backface-hidden transform-[rotateY(180deg)] size-full">
          <StudyFlashCardBack card={card} />
        </div>
      
      </motion.div>
    </Card>
  )
}

export default StudyFlashCard
