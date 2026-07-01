import { cn } from "@/utils/cn"
import type { Word } from "../schemas/WordSchema"

type WordFormTabsProps = {
  forms: Word["forms"]
  formIndex: number
  onSelect: (index: number) => void
}

const WordFormTabs = ({ forms, formIndex, onSelect }: WordFormTabsProps) => {
  return (
    <div className="w-full flex gap-2 border p-2 rounded-md bg-accent overflow-x-auto whitespace-nowrap justify-center">
      {forms.map((form, index) => (
        <div
          key={index}
          className={cn(
            "p-2 rounded-md border border-primary text-sm font-bold text-card-foreground transition-colors cursor-pointer",
            formIndex === index
              ? "bg-sidebar-primary"
              : "hover:bg-sidebar-primary/30",
          )}
          onClick={() => onSelect(index)}
        >
          {form.text}
        </div>
      ))}
    </div>
  )
}

export default WordFormTabs
