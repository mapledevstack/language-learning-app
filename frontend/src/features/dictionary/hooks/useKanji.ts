import { useQuery } from "@tanstack/react-query"
import { isKanji } from "wanakana"
import { getKanjis } from "../api/dictionaryApi"
import type { Word } from "../schemas/WordSchema"

const useKanji = (word: Word | null) => {
  const forms = word?.forms.map((form) => form.text)
  const kanjisGroup =
    forms?.map((word) => [
      ...new Set([...word].filter((char) => isKanji(char))),
    ]) ?? []

  return useQuery({
    queryKey: ["kanjis", word?.wordId],
    queryFn: () => getKanjis(kanjisGroup),
    enabled: !!word,
  })
}

export default useKanji
