import StudyCard from "@/components/cards/StudyCard"
import CreateDialog from "./CreateDialog"

const CreateDeckCard = () => {
  return (
    <StudyCard className="group bg-accent-muted hover:scale-105 transition-transform relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20">
        <div
          className="p-5 absolute size-20 rounded-full"
          style={{
            background: `conic-gradient(
                  white ${100}%,
                  var(--color-primary) 0%
                )`,
          }}
        ></div>

        <div className="absolute inset-1 rounded-full bg-card"></div>

        <CreateDialog />
      </div>
    </StudyCard>
  )
}
export default CreateDeckCard
