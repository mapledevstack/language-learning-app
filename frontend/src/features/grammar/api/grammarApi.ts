import api from "@/utils/api"
import type { GrammarResourceType } from "../schemas/GrammarResourceSchema"

export const getGrammarResources = async (search: string) =>
  api.get<GrammarResourceType[]>(
    `/grammar/search?q=${encodeURIComponent(search)}`,
  )
