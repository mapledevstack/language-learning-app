import DictionaryPage from "@/features/dictionary/pages/DictionaryPage"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/dictionary")({
  component: DictionaryPage,
})
