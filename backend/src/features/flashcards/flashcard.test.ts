import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import request from "supertest"
import mongoose, { Types } from "mongoose"
import app from "../../app.js"
import connectDB from "../../config/db.js"
import { User } from "../users/user.model.js"
import {
  BAD_REQUEST,
  CREATED,
  FORBIDDEN,
  NO_CONTENT,
  NOT_FOUND,
  OK,
  UNAUTHORIZED,
} from "../../constants/http.js"
import Deck from "../decks/deck.model.js"
import FlashCard from "./flashcard.model.js"
import { createEmptyCard } from "ts-fsrs"

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

  // Create a test user and an agent to persist cookies
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

  // Create another user for permission testing
  const otherUserRes = await request(app).post("/api/v1/auth/register").send({
    email: "other@example.com",
    password: "password123",
    confirmPassword: "password123",
  })
  otherUser = otherUserRes.body

  // Create decks for both users
  testDeck = await Deck.create({
    userId: new Types.ObjectId(testUser._id),
    title: "Test Deck",
  })

  otherUserDeck = await Deck.create({
    userId: new Types.ObjectId(otherUser._id),
    title: "Other User's Deck",
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe("Flashcards API", () => {
  describe("POST /api/v1/flashcards", () => {
    it("should create a new flashcard for the authenticated user", async () => {
      const flashcardData = {
        deckId: testDeck._id.toString(),
        wordId: "test_word_1",
        front: { text: "Front of Card" },
      }

      const res = await agent
        .post("/api/v1/flashcards")
        .send(flashcardData)
        .expect(CREATED)

      expect(res.body.wordId).toBe(flashcardData.wordId)
      expect(res.body.deckId).toBe(flashcardData.deckId)
      expect(res.body.userId).toBe(testUser._id)

      const flashcardInDb = await FlashCard.findById(res.body._id)
      expect(flashcardInDb).not.toBeNull()
    })

    it("should return 400 for invalid request body", async () => {
      await agent
        .post("/api/v1/flashcards")
        .send({ deckId: testDeck._id.toString() }) // Missing wordId and front
        .expect(BAD_REQUEST)
    })

    it("should return 401 if user is not authenticated", async () => {
      await request(app)
        .post("/api/v1/flashcards")
        .send({})
        .expect(UNAUTHORIZED)
    })
  })

  describe("GET /api/v1/flashcards/deck/:deckId", () => {
    it("should get all flashcards for a specific deck", async () => {
      await FlashCard.create({
        userId: testUser._id,
        deckId: testDeck._id,
        wordId: "test_word_1",
        front: { text: "Card 1" },
        fsrs: createEmptyCard(),
      })

      const res = await agent
        .get(`/api/v1/flashcards/deck/${testDeck._id}`)
        .expect(OK)

      expect(res.body).toBeInstanceOf(Array)
      expect(res.body.length).toBe(1)
      expect(res.body[0].wordId).toBe("test_word_1")
    })

    it("should return an empty array for another user's deck", async () => {
      const res = await agent
        .get(`/api/v1/flashcards/deck/${otherUserDeck._id}`)
        .expect(OK)

      expect(res.body).toEqual([])
    })
  })

  describe("PATCH /api/v1/flashcards/:flashcardId", () => {
    let flashcard: any

    beforeEach(async () => {
      flashcard = await FlashCard.create({
        userId: testUser._id,
        deckId: testDeck._id,
        wordId: "test_word_1",
        front: { text: "Original Front" },
        fsrs: createEmptyCard(),
      })
    })

    it("should update a flashcard", async () => {
      const updatedData = {
        front: { text: "Updated Front" },
        userNotes: "These are my notes.",
      }

      const res = await agent
        .patch(`/api/v1/flashcards/${flashcard._id}`)
        .send(updatedData)
        .expect(OK)

      expect(res.body.front.text).toBe(updatedData.front.text)
      expect(res.body.userNotes).toBe(updatedData.userNotes)
    })

    it("should return 200 if trying to update another user's flashcard", async () => {
      const otherUsersFlashcard = await FlashCard.create({
        userId: otherUser._id,
        deckId: otherUserDeck._id,
        wordId: "other_word",
        front: { text: "Other's card" },
        fsrs: createEmptyCard(),
      })

      await agent
        .patch(`/api/v1/flashcards/${otherUsersFlashcard._id}`)
        .send({ userNotes: "Trying to update" })
        .expect(OK)
    })
  })

  describe("DELETE /api/v1/flashcards/:flashcardId", () => {
    let flashcard: any

    beforeEach(async () => {
      flashcard = await FlashCard.create({
        userId: testUser._id,
        deckId: testDeck._id,
        wordId: "test_word_1",
        front: { text: "To be deleted" },
        fsrs: createEmptyCard(),
      })
    })

    it("should delete a flashcard", async () => {
      await agent
        .delete(`/api/v1/flashcards/${flashcard._id}`)
        .expect(NO_CONTENT)

      const deletedCard = await FlashCard.findById(flashcard._id)
      expect(deletedCard).toBeNull()
    })

    it("should return 204 if trying to delete another user's flashcard", async () => {
      const otherUsersFlashcard = await FlashCard.create({
        userId: otherUser._id,
        deckId: otherUserDeck._id,
        wordId: "other_word",
        front: { text: "Other's card" },
        fsrs: createEmptyCard(),
      })

      await agent
        .delete(`/api/v1/flashcards/${otherUsersFlashcard._id}`)
        .expect(NO_CONTENT)
    })
  })

  describe("POST /api/v1/flashcards/:flashcardId/review", () => {
    it("should review a flashcard and update its FSRS state", async () => {
      const flashcard = await FlashCard.create({
        userId: testUser._id,
        deckId: testDeck._id,
        wordId: "test_word_1",
        front: { text: "Review me" },
        fsrs: createEmptyCard(),
      })

      const res = await agent
        .post(`/api/v1/flashcards/${flashcard._id}/review`)
        .send({ rating: "Good" })
        .expect(OK)

      expect(res.body.fsrs.reps).toBe(1)
      expect(res.body.fsrs.stability).toBeGreaterThan(1)
    })
  })
})
