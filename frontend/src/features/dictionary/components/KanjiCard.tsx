import Card from "@/components/Card"
import type { Kanji } from "../schemas/KanjiSchema"
import type { ReactNode } from "react"

type Props = {
  kanji: Kanji
}

const KanjiCard = ({ kanji }: Props) => {
  return (
    <Card className="w-full relative flex flex-col items-center gap-8 py-8">
      <Badge position="left">{kanji.jlpt ?? "N/A"}</Badge>
      <Badge position="right">{kanji.grade ?? "—"}</Badge>

      <span className="text-sm text-muted-foreground italic">
        freq: {kanji.frequency ?? "—"}
      </span>

      <h1 className="text-8xl font-bold text-primary bg-sidebar-primary/10 rounded-2xl p-12">
        {kanji.kanji}
      </h1>

      <div className="w-full grid grid-cols-1 gap-3">
        <ReadingBox title="Onyomi" readings={kanji.onReadings} />
        <ReadingBox title="Kunyomi" readings={kanji.kunReadings} />
      </div>

      <p className="text-xl font-medium text-center">
        {kanji.meanings.join(", ")}
      </p>

      <p className="text-sm text-muted-foreground italic">
        {kanji.strokeCount} {kanji.strokeCount === 1 ? "stroke" : "strokes"}
      </p>

      {kanji.notes.length > 0 && (
        <div className="text-center text-sm">
          <p className="text-muted-foreground mb-1">Notes</p>
          <p>{kanji.notes.join(", ")}</p>
        </div>
      )}
    </Card>
  )
}

type BadgeProps = {
  children: ReactNode
  position: "left" | "right"
}

const Badge = ({ children, position }: BadgeProps) => {
  return (
    <div
      className={`absolute top-4 ${
        position === "left" ? "left-4" : "right-4"
      } bg-primary size-10 lg:size-12 lg:text-2xl grid place-items-center rounded-full text-primary-foreground font-bold`}
    >
      {children}
    </div>
  )
}

type ReadingBoxProps = {
  title: string
  readings: string[]
}

const ReadingBox = ({ title, readings }: ReadingBoxProps) => {
  return (
    <section className="text-center p-4 rounded-xl bg-card/50">
      <p className="text-xs text-muted-foreground mb-3 tracking-wider uppercase">
        {title}
      </p>

      <div className="font-medium text-sidebar-primary flex flex-wrap justify-center gap-2">
        {readings.length > 0 ? (
          readings.map((reading) => (
            <span key={reading} className="px-4 py-2 rounded-md bg-primary/20">
              {reading}
            </span>
          ))
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </div>
    </section>
  )
}

export default KanjiCard
