import { GoogleGenAI } from "@google/genai"
import AppError from "../../utils/appError.js"
import { BAD_GATEWAY } from "../../constants/http.js"
import { GOOGLE_API_KEY } from "../../constants/env.js"
import { GrammarResource } from "./grammar.model.js"
import { GrammarResourceWithEmbedding } from "./grammar.types.js"

const ai = new GoogleGenAI({
  apiKey: GOOGLE_API_KEY,
})

export const getEmbedding = async (text: string): Promise<number[]> => {
  const res = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
  })

  const embedding = res.embeddings?.[0]?.values

  if (!embedding) {
    throw new AppError("Failed to get embedding from Gemini API", BAD_GATEWAY)
  }

  return embedding
}

export const cosineSimilarity = (a: number[], b: number[]) => {
  let dot = 0
  let aMagnitude = 0
  let bMagnitude = 0

  for (let i = 0; i < a.length; i++) {
    dot += a[i]! * b[i]!
    aMagnitude += a[i]! * a[i]!
    bMagnitude += b[i]! * b[i]!
  }

  if (aMagnitude === 0 || bMagnitude === 0) return 0

  return dot / (Math.sqrt(aMagnitude) * Math.sqrt(bMagnitude))
}

let grammarCache: GrammarResourceWithEmbedding[] | null = null

export const getGrammarResources = async () => {
  if (grammarCache) return grammarCache

  grammarCache =
    await GrammarResource.find().lean<GrammarResourceWithEmbedding[]>()

  return grammarCache
}

const queryEmbeddingCache = new Map<string, number[]>()

export const getCachedEmbedding = async (q: string) => {
  const key = q.trim().toLowerCase()

  const cached = queryEmbeddingCache.get(key)
  if (cached) return cached

  const embedding = await getEmbedding(key)
  queryEmbeddingCache.set(key, embedding)

  return embedding
}
