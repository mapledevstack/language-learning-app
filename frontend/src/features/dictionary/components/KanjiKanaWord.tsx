import { cn } from "@/lib/utils"
import type { WordForm } from "../schemas/WordSchema"

type Props = {
  form: WordForm
  furiganaClassName?: string
}

const KanjiKanaWord = ({ form, furiganaClassName }: Props) => {
  return (
    <div>
      {form?.furigana.length > 0 ? (
        form.furigana.map((part, index) => (
          <ruby key={index}>
            {part.text}
            {part.reading && (
              <rt className={cn("p-2 text-sidebar-primary", furiganaClassName)}>
                {part.reading}
              </rt>
            )}
          </ruby>
        ))
      ) : (
        <ruby>
          {form.text}
          <rt className="invisible p-1"></rt>
        </ruby>
      )}
    </div>
  )
}

export default KanjiKanaWord
