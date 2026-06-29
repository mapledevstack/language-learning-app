import type { Sentence } from "../schemas/SentenceSchema"

type Props = {
  sentences: Sentence[]
}

const ExampleSentences = ({ sentences }: Props) => {
  if (!sentences.length) return null

  return (
    <div className="bg-accent w-full p-4 rounded-md space-y-4">
      <h3 className="font-bold text-center tracking-widest text-sidebar-primary">
        Example Sentences
      </h3>

      <ol className="space-y-3">
        {sentences.map((sentence, index) => (
          <li key={index} className="space-y-2">
            <p className="font-bold text-xl leading-relaxed">
              {index + 1}. {sentence.japanese}
            </p>

            {sentence.english && (
              <p className="text-xl italic">{sentence.english}</p>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default ExampleSentences
