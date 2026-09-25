import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"

import request from "supertest"

import mongoose, { Types } from "mongoose"

import app from "../../app.js"

import connectDB from "../../config/db.js"

import { User } from "../users/user.model.js"

import {
  BAD_REQUEST,
  CREATED,
  NO_CONTENT,
  NOT_FOUND,
  OK,
  UNAUTHORIZED,
} from "../../constants/http.js"

import Deck from "./deck.model.js"
import FlashCard from "../flashcards/flashcard.model.js"

import { createEmptyCard, State } from "ts-fsrs"

let testUser: any
let otherUser: any
let testDeck: any
let otherUserDeck: any
let agent: any

beforeAll(async () => {
  await connectDB()
})

beforeEach(async () => {
  await User.deleteMany({})
  await Deck.deleteMany({})
  await FlashCard.deleteMany({})

  agent = request.agent(app)

  await agent.post("/api/v1/auth/register").send({
    email: "test@example.com",
    password: "password123",
    confirmPassword: "password123",
  })

  const userRes = await agent.post("/api/v1/auth/login").send({
    email: "test@example.com",
    password: "password123",
  })

  testUser = userRes.body.user

  const otherUserRes = await request(app).post("/api/v1/auth/register").send({
    email: "other@example.com",
    password: "password123",
    confirmPassword: "password123",
  })

  otherUser = otherUserRes.body

  testDeck = await Deck.create({
    userId: new Types.ObjectId(testUser._id),
    title: "Test Deck",
    description: "Test description",
  })

  otherUserDeck = await Deck.create({
    userId: new Types.ObjectId(otherUser._id),
    title: "Other User's Deck",
    description: "Other description",
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe("Decks", () => {
  describe("GET /api/v1/decks", () => {
    it("should get all decks for the authenticated user", async () => {
      const res = await agent.get("/api/v1/decks").expect(OK)

      expect(res.body).toHaveLength(1)
      expect(res.body[0]).toEqual({
        id: testDeck._id.toString(),
        title: "Test Deck",
        description: "Test description",
      })
    })

    it("should not return another user's decks", async () => {
      const res = await agent.get("/api/v1/decks").expect(OK)

      expect(res.body).not.toContainEqual({
        id: otherUserDeck._id.toString(),
        title: "Other User's Deck",
        description: "Other description",
      })
    })
  })

  describe("POST /api/v1/decks", () => {
    it("should create a new deck", async () => {
      const deckData = {
        title: "New Deck",
        description: "A new deck",
      }

      const res = await agent
        .post("/api/v1/decks")
        .send(deckData)
        .expect(CREATED)

      expect(res.body.title).toBe(deckData.title)
      expect(res.body.description).toBe(deckData.description)
      expect(res.body.userId).toBe(testUser._id)

      const deckInDb = await Deck.findById(res.body._id)

      expect(deckInDb).not.toBeNull()
      expect(deckInDb?.title).toBe(deckData.title)
    })

    it("should return 400 for invalid request body", async () => {
      await agent.post("/api/v1/decks").send({}).expect(BAD_REQUEST)
    })

    it("should return 401 if user is not authenticated", async () => {
      await request(app)
        .post("/api/v1/decks")
        .send({
          title: "Unauthorized Deck",
        })
        .expect(UNAUTHORIZED)
    })
  })

  describe("GET /api/v1/decks/:deckId", () => {
    it("should get a deck belonging to the authenticated user", async () => {
      const res = await agent.get(`/api/v1/decks/${testDeck._id}`).expect(OK)

      expect(res.body).toEqual({
        id: testDeck._id.toString(),
        title: "Test Deck",
        description: "Test description",
      })
    })

    it("should return 404 for another user's deck", async () => {
      await agent.get(`/api/v1/decks/${otherUserDeck._id}`).expect(NOT_FOUND)
    })

    it("should return 404 for a nonexistent deck", async () => {
      const nonexistentDeckId = new Types.ObjectId()

      await agent.get(`/api/v1/decks/${nonexistentDeckId}`).expect(NOT_FOUND)
    })

    it("should return 400 for an invalid deck ID", async () => {
      await agent.get("/api/v1/decks/not-a-valid-id").expect(BAD_REQUEST)
    })
  })

  describe("GET /api/v1/decks/:deckId/stats", () => {
    it("should return deck statistics", async () => {
      await FlashCard.create([
        {
          userId: testUser._id,
          deckId: testDeck._id,
          wordId: "new-card",
          front: { text: "New card" },
          fsrs: createEmptyCard(),
        },
        {
          userId: testUser._id,
          deckId: testDeck._id,
          wordId: "learning-card",
          front: { text: "Learning card" },
          fsrs: {
            ...createEmptyCard(),
            state: State.Learning,
          },
        },
        {
          userId: testUser._id,
          deckId: testDeck._id,
          wordId: "review-card",
          front: { text: "Review card" },
          fsrs: {
            ...createEmptyCard(),
            state: State.Review,
            due: new Date(Date.now() - 60_000),
          },
        },
        {
          userId: testUser._id,
          deckId: testDeck._id,
          wordId: "relearning-card",
          front: { text: "Relearning card" },
          fsrs: {
            ...createEmptyCard(),
            state: State.Relearning,
          },
        },
      ])

      const res = await agent
        .get(`/api/v1/decks/${testDeck._id}/stats`)
        .expect(OK)

      expect(res.body).toEqual({
        totalCards: 4,
        newCards: 1,
        learningCards: 1,
        reviewCards: 1,
        relearningCards: 1,
        dueCards: 4,
      })
    })

    it("should return 404 for another user's deck", async () => {
      await agent
        .get(`/api/v1/decks/${otherUserDeck._id}/stats`)
        .expect(NOT_FOUND)
    })

    it("should return 404 for a nonexistent deck", async () => {
      const nonexistentDeckId = new Types.ObjectId()

      await agent
        .get(`/api/v1/decks/${nonexistentDeckId}/stats`)
        .expect(NOT_FOUND)
    })

    it("should return 400 for an invalid deck ID", async () => {
      await agent.get("/api/v1/decks/not-a-valid-id/stats").expect(BAD_REQUEST)
    })
  })

  describe("PATCH /api/v1/decks/:deckId", () => {
    it("should update a deck", async () => {
      const updatedData = {
        title: "Updated Deck",
        description: "Updated description",
      }

      const res = await agent
        .patch(`/api/v1/decks/${testDeck._id}`)
        .send(updatedData)
        .expect(OK)

      expect(res.body.title).toBe(updatedData.title)
      expect(res.body.description).toBe(updatedData.description)

      const deckInDb = await Deck.findById(testDeck._id)

      expect(deckInDb?.title).toBe(updatedData.title)
      expect(deckInDb?.description).toBe(updatedData.description)
    })

    it("should return 404 when updating another user's deck", async () => {
      await agent
        .patch(`/api/v1/decks/${otherUserDeck._id}`)
        .send({
          title: "Trying to update",
        })
        .expect(NOT_FOUND)
    })

    it("should return 404 when updating a nonexistent deck", async () => {
      const nonexistentDeckId = new Types.ObjectId()

      await agent
        .patch(`/api/v1/decks/${nonexistentDeckId}`)
        .send({
          title: "Trying to update",
        })
        .expect(NOT_FOUND)
    })

    it("should return 400 for an invalid request body", async () => {
      await agent
        .patch(`/api/v1/decks/${testDeck._id}`)
        .send({
          title: "",
        })
        .expect(BAD_REQUEST)
    })

    it("should return 401 if user is not authenticated", async () => {
      await request(app)
        .patch(`/api/v1/decks/${testDeck._id}`)
        .send({
          title: "Unauthorized update",
        })
        .expect(UNAUTHORIZED)
    })
  })

  describe("DELETE /api/v1/decks/:deckId", () => {
    it("should delete a deck", async () => {
      await agent.delete(`/api/v1/decks/${testDeck._id}`).expect(NO_CONTENT)

      const deletedDeck = await Deck.findById(testDeck._id)

      expect(deletedDeck).toBeNull()
    })

    it("should return 404 when deleting another user's deck", async () => {
      await agent.delete(`/api/v1/decks/${otherUserDeck._id}`).expect(NOT_FOUND)

      const deckInDb = await Deck.findById(otherUserDeck._id)

      expect(deckInDb).not.toBeNull()
    })

    it("should return 404 when deleting a nonexistent deck", async () => {
      const nonexistentDeckId = new Types.ObjectId()

      await agent.delete(`/api/v1/decks/${nonexistentDeckId}`).expect(NOT_FOUND)
    })

    it("should return 401 if user is not authenticated", async () => {
      await request(app)
        .delete(`/api/v1/decks/${testDeck._id}`)
        .expect(UNAUTHORIZED)
    })
  })
})
