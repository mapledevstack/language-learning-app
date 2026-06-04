import clsx from "clsx"
import Card from "./Card"

type Props = {
  isWriting: boolean
}

const HandWritingCard = ({ isWriting } : Props) => {
  return (
    <Card className={clsx("aspect-square", isWriting ? "mb-4" : "opacity-0 h-0 p-0! mb-0!")}>
      HandWriting
    </Card>
  )
}
export default HandWritingCard
