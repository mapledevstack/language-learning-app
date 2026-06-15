import fs from "node:fs"

export const transformDictionary = async (PATH: string) => {
  const data: RawDictionary = JSON.parse(
    fs.readFileSync(`${PATH}/raw/words.json`, "utf8"),
  )

  fs.writeFileSync(
    `${PATH}/processed/tags.json`,
    JSON.stringify(data.tags, null, 2),
  )
  console.log("Updated words tags")

  const words: Word[] = data.words.map(transformWord)

  fs.writeFileSync(
    `${PATH}/processed/words.json`,
    JSON.stringify(words, null, 2),
  )

  console.log(`Transformed ${words.length} words`)
}

transformDictionary("data")

function transformWord(word: RawWord): Word {
  return {
    wordId: word.id,
    forms: getForms(word),
    meanings: getMeanings(word),
  }
}

function getForms(word: RawWord): Form[] {
  const forms: Form[] = []

  // if kanji didnt exist => all kana as a form
  if (word.kanji.length === 0) {
    for (const kana of word.kana) {
      forms.push(createKanaForm(kana))
    }

    return forms
  }

  // all kanji as a form
  for (const kanji of word.kanji) {
    const kana = findKanaForKanji(kanji.text, word.kana)
    if (kana) {
      forms.push(createKanjiForm(kanji, kana))
    } else {
      console.log(`No kana for ${kanji.text} - wordId: ${word.id}`)
    }
  }

  // and standalone kana readings as a form
  for (const kana of word.kana) {
    if (kana.appliesToKanji.length !== 0) continue
    forms.push(createKanaForm(kana))
  }

  return forms
}

function createKanjiForm(kanji: RawKanji, kana: RawKana): Form {
  const form: Form = {
    text: kanji.text,
    reading: kana.text,
    furigana:
      kanji.furigana?.map((part) => {
        const furiganaPart: Furigana = { text: part.ruby }

        if (part.rt) {
          furiganaPart.reading = part.rt
        }

        return furiganaPart
      }) ?? [],
    common: kanji.common,
    tags: kanji.tags,
  }

  const pitchAccent =
    getPitchAccent(kanji.pitchAccent) ?? getPitchAccent(kana?.pitchAccent)

  if (pitchAccent) {
    form.pitchAccent = pitchAccent
  }

  return form
}

function createKanaForm(kana: RawKana): Form {
  const form: Form = {
    text: kana.text,
    reading: kana.text,
    furigana: [],
    common: kana.common,
    tags: kana.tags,
  }

  const pitchAccent = getPitchAccent(kana.pitchAccent)

  if (pitchAccent) {
    form.pitchAccent = pitchAccent
  }

  return form
}

function findKanaForKanji(kanjiText: string, kanaList: RawKana[]) {
  return kanaList.find(
    (kana) =>
      kana.appliesToKanji.includes("*") ||
      kana.appliesToKanji.includes(kanjiText),
  )
}

function getMeanings(word: RawWord): Meaning[] {
  return word.sense.map((sense) => ({
    definitions: sense.gloss
      .filter((gloss) => gloss.lang === "eng")
      .map((gloss) => gloss.text),

    partsOfSpeech: sense.partOfSpeech,
    tags: sense.misc,
    notes: sense.info,
  }))
}

function getPitchAccent(
  pitchAccent: RawKanji["pitchAccent"] | RawKana["pitchAccent"] | undefined,
) {
  if (!pitchAccent || Array.isArray(pitchAccent)) return undefined

  return pitchAccent.zoPatts
}

type RawDictionary = {
  tags: unknown
  words: RawWord[]
}

type RawWord = {
  id: string
  kanji: RawKanji[]
  kana: RawKana[]
  sense: RawSense[]
}

type RawKanji = {
  common: boolean
  text: string
  tags: string[]
  furigana?: {
    ruby: string
    rt?: string
  }[]
  pitchAccent?:
    | {
        zoPatts?: string
      }
    | []
}

type RawKana = {
  common: boolean
  text: string
  tags: string[]
  appliesToKanji: string[]
  pitchAccent?:
    | {
        zoPatts?: string
      }
    | []
}

type RawSense = {
  partOfSpeech: string[]
  misc: string[]
  info: string[]
  gloss: {
    lang: string
    text: string
  }[]
}

type Word = {
  wordId: string
  forms: Form[]
  meanings: Meaning[]
}

type Form = {
  text: string
  reading: string
  furigana: Furigana[]
  common: boolean
  tags: string[]
  pitchAccent?: string
}

type Furigana = {
  text: string
  reading?: string
}

type Meaning = {
  definitions: string[]
  partsOfSpeech: string[]
  tags: string[]
  notes: string[]
}
