import { GoogleGenAI } from "@google/genai"
import AppError from "../../utils/appError.js"
import { BAD_GATEWAY } from "../../constants/http.js"
import { GOOGLE_API_KEY } from "../../constants/env.js"
import { GrammarResource } from "./grammar.model.js"

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

export const vectorSearch = async (queryVector: number[], limit: number) => {
  const results = await GrammarResource.aggregate([
    {
      $vectorSearch: {
        index: "grammar_vector_index",
        path: "embedding",
        queryVector,
        numCandidates: 50,
        limit,
      },
    },
    {
      $project: {
        embedding: 0,
        score: {
          $meta: "vectorSearchScore",
        },
      },
    },
  ])

  return results
}
