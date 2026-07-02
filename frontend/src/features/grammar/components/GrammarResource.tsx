import Card from "@/components/cards/Card"
import type { GrammarResourceType } from "../schemas/GrammarResourceSchema"

type Props = {
  GrammarResource: GrammarResourceType
}
const GrammarResource = ({ GrammarResource }: Props) => {
  return (
    <Card className="flex flex-col gap-2 p-4">
      <h3 className="text-lg font-semibold">{GrammarResource.title}</h3>
      <p className="text-sm text-muted-foreground">{GrammarResource.section}</p>
      <p className="text-sm text-muted-foreground">
        Source:{" "}
        <a
          href={GrammarResource.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {GrammarResource.source}
        </a>
      </p>
    </Card>
  )
}
export default GrammarResource
