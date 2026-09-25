import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest"
import mongoose from "mongoose"
import request from "supertest"

import app from "../../app.js"
import { OK } from "../../constants/http.js"
import connectDB from "../../config/db.js"
import { GrammarResource } from "./grammar.model.js"
import * as grammarUtils from "./grammar.utils.js"

beforeAll(async () => {
  await connectDB()
})

beforeEach(async () => {
  await GrammarResource.deleteMany({})

  await GrammarResource.create([
    {
      title: "Using ている",
      section: "Enduring states",
      source: "Test source",
      sourceUrl: "https://example.com/teiru",
      embedding: [1, 0, 0],
    },
    {
      title: "Using てある",
      section: "Resultant states",
      source: "Test source",
      sourceUrl: "https://example.com/tearu",
      embedding: [0, 1, 0],
    },
    {
      title: "Using ておく",
      section: "Preparatory actions",
      source: "Test source",
      sourceUrl: "https://example.com/teoku",
      embedding: [0, 0, 1],
    },
  ])

  vi.spyOn(grammarUtils, "getEmbedding").mockResolvedValue([1, 0, 0])

  vi.spyOn(grammarUtils, "vectorSearch").mockImplementation(
    async (_queryVector, limit) => {
      const results = [
        {
          _id: new mongoose.Types.ObjectId(),
          title: "Using ている",
          section: "Enduring states",
          source: "Test source",
          sourceUrl: "https://example.com/teiru",
          score: 1,
        },
        {
          _id: new mongoose.Types.ObjectId(),
          title: "Using てある",
          section: "Resultant states",
          source: "Test source",
          sourceUrl: "https://example.com/tearu",
          score: 0.5,
        },
        {
          _id: new mongoose.Types.ObjectId(),
          title: "Using ておく",
          section: "Preparatory actions",
          source: "Test source",
          sourceUrl: "https://example.com/teoku",
          score: 0.2,
        },
      ]

      return results.slice(0, limit)
    },
  )
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe("Grammar", () => {
  describe("GET /api/v1/grammar/search", () => {
    it("returns grammar search results ordered by similarity", async () => {
      const response = await request(app).get("/api/v1/grammar/search").query({
        q: "ている",
        limit: 5,
      })

      expect(response.status).toBe(OK)
      expect(response.body).toHaveLength(3)

      expect(response.body[0]).toMatchObject({
        title: "Using ている",
        score: 1,
      })
    })

    it("respects the result limit", async () => {
      const response = await request(app).get("/api/v1/grammar/search").query({
        q: "ている",
        limit: 2,
      })

      expect(response.status).toBe(OK)
      expect(response.body).toHaveLength(2)
      expect(response.body[0].title).toBe("Using ている")
    })

    it("rejects a missing query", async () => {
      const response = await request(app)
        .get("/api/v1/grammar/search")
        .query({ limit: 5 })

      expect(response.status).toBe(400)
    })

    it("rejects an empty query", async () => {
      const response = await request(app)
        .get("/api/v1/grammar/search")
        .query({ q: "   " })

      expect(response.status).toBe(400)
    })
  })
})
