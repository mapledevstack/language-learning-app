import Card from "@/components/cards/Card"
import type { GrammarResourceType } from "../schemas/GrammarResourceSchema"
import { ExternalLink } from "lucide-react"

type Props = {
  GrammarResource: GrammarResourceType
}

const GrammarResource = ({ GrammarResource }: Props) => {
  return (
    <a
      href={GrammarResource.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <Card className="relative flex flex-col gap-2 p-5 pr-12 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <ExternalLink className="absolute top-5 right-5 h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />

        <h3 className="text-lg font-semibold text-primary">
          {GrammarResource.title}
        </h3>

        <p className="text-sm text-muted-foreground">
          {GrammarResource.section}
        </p>

        <p className="text-sm text-muted-foreground">
          Source: <span className="font-medium">{GrammarResource.source}</span>
        </p>
      </Card>
    </a>
  )
}

export default GrammarResource
