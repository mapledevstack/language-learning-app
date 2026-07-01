import { cn } from "@/utils/cn"
import type { Kanji } from "../schemas/KanjiSchema"

type Props = {
  selectedKanjis: Kanji[]
  kanjiIndex: number
  setKanjiIndex: (index: number) => void
}

const KanjiTabs = ({ selectedKanjis, kanjiIndex, setKanjiIndex }: Props) => {
  return (
    <div className="w-full flex gap-2 border p-2 rounded-md bg-accent overflow-x-auto whitespace-nowrap justify-center">
      {selectedKanjis.map((kanji, index) => (
        <div
          key={index}
          className={cn(
            "p-2 rounded-md border border-primary text-sm font-bold text-card-foreground transition-colors cursor-pointer",
            kanjiIndex === index
              ? "bg-sidebar-primary"
              : "hover:bg-sidebar-primary/30",
          )}
          onClick={() => setKanjiIndex(index)}
        >
          {kanji.kanji}
        </div>
      ))}
    </div>
  )
}

export default KanjiTabs
