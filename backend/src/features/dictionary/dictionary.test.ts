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

import {
  BAD_GATEWAY,
  BAD_REQUEST,
  NOT_FOUND,
  OK,
} from "../../constants/http.js"

import connectDB from "../../config/db.js"

import { Kanji, Word } from "./dictionary.model.js"

beforeAll(async () => {
  await connectDB()
})

beforeEach(async () => {
  await Word.deleteMany({})
  await Kanji.deleteMany({})
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe("Dictionary", () => {
  describe("GET /api/v1/dictionary/words/:wordId", () => {
    it("returns a word by ID", async () => {
      await Word.create({
        wordId: "123",
        forms: [
          {
            text: "食べる",
            reading: "たべる",
            common: true,
          },
        ],
        meanings: [
          {
            definitions: ["to eat"],
          },
        ],
      })

      const response = await request(app).get("/api/v1/dictionary/words/123")

      expect(response.status).toBe(OK)
      expect(response.body).toMatchObject({
        wordId: "123",
        forms: [
          {
            text: "食べる",
            reading: "たべる",
            common: true,
          },
        ],
        meanings: [
          {
            definitions: ["to eat"],
          },
        ],
      })
    })

    it("returns 404 when the word does not exist", async () => {
      const response = await request(app).get(
        "/api/v1/dictionary/words/nonexistent",
      )

      expect(response.status).toBe(NOT_FOUND)
    })
  })

  describe("GET /api/v1/dictionary/search", () => {
    it("rejects a missing query", async () => {
      const response = await request(app)
        .get("/api/v1/dictionary/search")
        .query({ limit: 5 })

      expect(response.status).toBe(BAD_REQUEST)
    })

    it("rejects an empty query", async () => {
      const response = await request(app)
        .get("/api/v1/dictionary/search")
        .query({ q: "" })

      expect(response.status).toBe(BAD_REQUEST)
    })

    it("rejects an invalid limit", async () => {
      const response = await request(app)
        .get("/api/v1/dictionary/search")
        .query({
          q: "test",
          limit: 0,
        })

      expect(response.status).toBe(BAD_REQUEST)
    })
  })

  describe("GET /api/v1/dictionary/search/meaning", () => {
    it("rejects a missing query", async () => {
      const response = await request(app).get(
        "/api/v1/dictionary/search/meaning",
      )

      expect(response.status).toBe(BAD_REQUEST)
    })

    it("rejects an empty query", async () => {
      const response = await request(app)
        .get("/api/v1/dictionary/search/meaning")
        .query({ q: "" })

      expect(response.status).toBe(BAD_REQUEST)
    })

    it("rejects an invalid limit", async () => {
      const response = await request(app)
        .get("/api/v1/dictionary/search/meaning")
        .query({
          q: "food",
          limit: 0,
        })

      expect(response.status).toBe(BAD_REQUEST)
    })
  })

  describe("GET /api/v1/dictionary/kanji", () => {
    it("returns a kanji", async () => {
      await Kanji.create({
        kanji: "食",
        meanings: ["eat", "food"],
        onReadings: ["ショク"],
        kunReadings: ["た.べる"],
        strokeCount: 9,
        grade: 2,
        jlpt: "N5",
      })

      const response = await request(app)
        .get("/api/v1/dictionary/kanji")
        .query({ q: "食" })

      expect(response.status).toBe(OK)
      expect(response.body).toMatchObject({
        kanji: "食",
        meanings: ["eat", "food"],
        onReadings: ["ショク"],
        kunReadings: ["た.べる"],
        strokeCount: 9,
        grade: 2,
        jlpt: "N5",
      })
    })

    it("returns 404 when the kanji does not exist", async () => {
      const response = await request(app)
        .get("/api/v1/dictionary/kanji")
        .query({ q: "猫" })

      expect(response.status).toBe(NOT_FOUND)
    })

    it("rejects a missing query", async () => {
      const response = await request(app).get("/api/v1/dictionary/kanji")

      expect(response.status).toBe(BAD_REQUEST)
    })

    it("rejects an empty query", async () => {
      const response = await request(app)
        .get("/api/v1/dictionary/kanji")
        .query({ q: "" })

      expect(response.status).toBe(BAD_REQUEST)
    })
  })

  describe("GET /api/v1/dictionary/kanjis", () => {
    it("returns multiple kanji", async () => {
      await Kanji.create([
        {
          kanji: "食",
          meanings: ["eat"],
          onReadings: ["ショク"],
          kunReadings: ["た.べる"],
        },
        {
          kanji: "飲",
          meanings: ["drink"],
          onReadings: ["イン"],
          kunReadings: ["の.む"],
        },
      ])

      const response = await request(app)
        .get("/api/v1/dictionary/kanjis")
        .query({ q: ["食", "飲"] })

      expect(response.status).toBe(OK)
      expect(response.body).toHaveLength(2)

      expect(
        response.body.map((kanji: { kanji: string }) => kanji.kanji),
      ).toEqual(expect.arrayContaining(["食", "飲"]))
    })

    it("accepts a single kanji", async () => {
      await Kanji.create({
        kanji: "食",
        meanings: ["eat"],
        onReadings: ["ショク"],
        kunReadings: ["た.べる"],
      })

      const response = await request(app)
        .get("/api/v1/dictionary/kanjis")
        .query({ q: "食" })

      expect(response.status).toBe(OK)
      expect(response.body).toHaveLength(1)
      expect(response.body[0].kanji).toBe("食")
    })

    it("rejects a missing query", async () => {
      const response = await request(app).get("/api/v1/dictionary/kanjis")

      expect(response.status).toBe(BAD_REQUEST)
    })
  })

  describe("GET /api/v1/dictionary/sentences", () => {
    it("returns translated sentences", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: true,
          json: async () => ({
            results: [
              {
                text: "私は日本語を勉強しています。",
                translations: [
                  [
                    {
                      text: "I am studying Japanese.",
                      lang: "eng",
                    },
                  ],
                ],
              },
            ],
          }),
        }),
      )

      const response = await request(app)
        .get("/api/v1/dictionary/sentences")
        .query({ q: "日本語" })

      expect(response.status).toBe(OK)
      expect(response.body).toEqual([
        {
          japanese: "私は日本語を勉強しています。",
          english: "I am studying Japanese.",
        },
      ])
    })

    it("defaults to 3 sentences", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: true,
          json: async () => ({
            results: Array.from({ length: 5 }, (_, index) => ({
              text: `sentence ${index}`,
              translations: [],
            })),
          }),
        }),
      )

      const response = await request(app)
        .get("/api/v1/dictionary/sentences")
        .query({ q: "test" })

      expect(response.status).toBe(OK)
      expect(response.body).toHaveLength(3)
    })

    it("respects a custom limit", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: true,
          json: async () => ({
            results: Array.from({ length: 5 }, (_, index) => ({
              text: `sentence ${index}`,
              translations: [],
            })),
          }),
        }),
      )

      const response = await request(app)
        .get("/api/v1/dictionary/sentences")
        .query({
          q: "test",
          limit: 2,
        })

      expect(response.status).toBe(OK)
      expect(response.body).toHaveLength(2)
    })

    it("rejects a missing query", async () => {
      const response = await request(app).get("/api/v1/dictionary/sentences")

      expect(response.status).toBe(BAD_REQUEST)
    })

    it("rejects a non-string query", async () => {
      const response = await request(app).get(
        "/api/v1/dictionary/sentences?q[]=test",
      )

      expect(response.status).toBe(BAD_REQUEST)
    })

    it("returns 502 when Tatoeba fails", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: false,
        }),
      )

      const response = await request(app)
        .get("/api/v1/dictionary/sentences")
        .query({ q: "test" })

      expect(response.status).toBe(BAD_GATEWAY)
    })
  })
})
