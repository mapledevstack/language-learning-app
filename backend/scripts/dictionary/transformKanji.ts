import fs from "node:fs"

export const transformKanji = async (PATH: string) => {
  const rawKanji: RawKanji[] = Object.values(
    JSON.parse(fs.readFileSync(`${PATH}/raw/kanji.json`, "utf8")).kanjis,
  )

  const kanji = rawKanji
    .filter((k) => k.grade !== null || k.jlpt !== null)
    .map(transformKanjiEntry)

  fs.writeFileSync(
    `${PATH}/processed/kanji.json`,
    JSON.stringify(kanji, null, 2),
  )

  console.log(`Transformed ${kanji.length} kanji`)
}

transformKanji("data")

function transformKanjiEntry(kanji: RawKanji): Kanji {
  return {
    kanji: kanji.kanji,

    meanings: kanji.meanings,

    onReadings: kanji.on_readings,
    kunReadings: kanji.kun_readings,

    strokeCount: kanji.stroke_count,

    grade: kanji.grade,
    jlpt: kanji.jlpt ? `N${kanji.jlpt}` : null,

    frequency: kanji.freq_mainichi_shinbun,

    notes: kanji.notes,
  }
}

type RawKanji = {
  kanji: string

  kun_readings: string[]
  on_readings: string[]
  name_readings: string[]

  meanings: string[]

  stroke_count: number

  unicode: string

  grade: number | null

  jlpt: number | null

  heisig_en: string | null

  freq_mainichi_shinbun: number | null

  unihan_cjk_compatibility_variant?: string

  notes: string[]
}

type Kanji = {
  kanji: string

  meanings: string[]

  onReadings: string[]
  kunReadings: string[]

  strokeCount: number

  grade: number | null
  jlpt: string | null

  frequency: number | null

  notes: string[]
}
