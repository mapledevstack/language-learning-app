import DictionaryPage from '@/components/pages/DictionaryPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/dictionary')({
  component: DictionaryPage,
})
