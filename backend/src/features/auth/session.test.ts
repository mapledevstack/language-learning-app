import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"

import request from "supertest"
import mongoose from "mongoose"

import app from "../../app.js"
import connectDB from "../../config/db.js"
import { User } from "../users/user.model.js"
import { Session } from "./session.model.js"

import {
  NO_CONTENT,
  NOT_FOUND,
  OK,
  UNAUTHORIZED,
} from "../../constants/http.js"

beforeAll(async () => {
  await connectDB()
})

beforeEach(async () => {
  await User.deleteMany({})
  await Session.deleteMany({})
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe("Sessions", () => {
  describe("GET /api/v1/sessions", () => {
    it("returns the authenticated user's active sessions", async () => {
      const registerResponse = await request(app)
        .post("/api/v1/auth/register")
        .send({
          email: "test@example.com",
          password: "123456",
          confirmPassword: "123456",
        })

      const cookies = registerResponse.headers["set-cookie"]
      const cookiesArray = Array.isArray(cookies) ? cookies : [cookies]

      const accessCookie = cookiesArray.find((cookie) =>
        cookie.startsWith("accessToken="),
      )

      expect(accessCookie).toBeDefined()

      const response = await request(app)
        .get("/api/v1/sessions")
        .set("Cookie", accessCookie!)

      expect(response.status).toBe(OK)
      expect(response.body).toHaveLength(1)
      expect(response.body[0]).toHaveProperty("isCurrent", true)
      expect(response.body[0]).toHaveProperty("createdAt")
    })

    it("marks only the current session", async () => {
      const firstLogin = await request(app).post("/api/v1/auth/register").send({
        email: "test@example.com",
        password: "123456",
        confirmPassword: "123456",
      })

      const firstCookies = firstLogin.headers["set-cookie"]
      const firstCookiesArray = Array.isArray(firstCookies)
        ? firstCookies
        : [firstCookies]

      const firstAccessCookie = firstCookiesArray.find((cookie) =>
        cookie.startsWith("accessToken="),
      )

      expect(firstAccessCookie).toBeDefined()

      const secondLogin = await request(app).post("/api/v1/auth/login").send({
        email: "test@example.com",
        password: "123456",
      })

      const secondCookies = secondLogin.headers["set-cookie"]
      const secondCookiesArray = Array.isArray(secondCookies)
        ? secondCookies
        : [secondCookies]

      const secondAccessCookie = secondCookiesArray.find((cookie) =>
        cookie.startsWith("accessToken="),
      )

      expect(secondAccessCookie).toBeDefined()

      const response = await request(app)
        .get("/api/v1/sessions")
        .set("Cookie", secondAccessCookie!)

      expect(response.status).toBe(OK)
      expect(response.body).toHaveLength(2)

      const currentSessions = response.body.filter(
        (session: { isCurrent?: boolean }) => session.isCurrent,
      )

      expect(currentSessions).toHaveLength(1)
    })

    it("rejects unauthenticated requests", async () => {
      const response = await request(app).get("/api/v1/sessions")

      expect(response.status).toBe(UNAUTHORIZED)
    })
  })

  describe("DELETE /api/v1/sessions/:id", () => {
    it("deletes the specified session", async () => {
      const registerResponse = await request(app)
        .post("/api/v1/auth/register")
        .send({
          email: "test@example.com",
          password: "123456",
          confirmPassword: "123456",
        })

      const cookies = registerResponse.headers["set-cookie"]
      const cookiesArray = Array.isArray(cookies) ? cookies : [cookies]

      const accessCookie = cookiesArray.find((cookie) =>
        cookie.startsWith("accessToken="),
      )

      expect(accessCookie).toBeDefined()

      const user = await User.findOne({ email: "test@example.com" })
      expect(user).not.toBeNull()

      const session = await Session.findOne({ userId: user!._id })
      expect(session).not.toBeNull()

      const response = await request(app)
        .delete(`/api/v1/sessions/${session!._id}`)
        .set("Cookie", accessCookie!)

      expect(response.status).toBe(OK)
      expect(response.body.message).toBe("Session removed")

      const deletedSession = await Session.findById(session!._id)

      expect(deletedSession).toBeNull()
    })

    it("rejects deleting another user's session", async () => {
      const firstUser = await request(app).post("/api/v1/auth/register").send({
        email: "first@example.com",
        password: "123456",
        confirmPassword: "123456",
      })

      const firstUserDoc = await User.findOne({ email: "first@example.com" })
      expect(firstUserDoc).not.toBeNull()

      const firstSession = await Session.findOne({
        userId: firstUserDoc!._id,
      })

      expect(firstSession).not.toBeNull()

      const secondUser = await request(app).post("/api/v1/auth/register").send({
        email: "second@example.com",
        password: "123456",
        confirmPassword: "123456",
      })

      const secondCookies = secondUser.headers["set-cookie"]
      const secondCookiesArray = Array.isArray(secondCookies)
        ? secondCookies
        : [secondCookies]

      const secondAccessCookie = secondCookiesArray.find((cookie) =>
        cookie.startsWith("accessToken="),
      )

      expect(secondAccessCookie).toBeDefined()

      const response = await request(app)
        .delete(`/api/v1/sessions/${firstSession!._id}`)
        .set("Cookie", secondAccessCookie!)

      expect(response.status).toBe(NOT_FOUND)

      const remainingSession = await Session.findById(firstSession!._id)

      expect(remainingSession).not.toBeNull()
    })

    it("cannot delete another user's session", async () => {
      await request(app).post("/api/v1/auth/register").send({
        email: "usera@example.com",
        password: "Password123!",
        confirmPassword: "Password123!",
      })

      const sessionA = await Session.findOne({})

      expect(sessionA).not.toBeNull()

      const userB = await request(app).post("/api/v1/auth/register").send({
        email: "userb@example.com",
        password: "Password123!",
        confirmPassword: "Password123!",
      })

      const accessToken = userB.headers["set-cookie"]

      expect(accessToken).toBeDefined()

      const response = await request(app)
        .delete(`/api/v1/sessions/${sessionA!._id}`)
        .set("Cookie", accessToken!)

      expect(response.status).toBe(NOT_FOUND)

      const sessionStillExists = await Session.findById(sessionA!._id)

      expect(sessionStillExists).not.toBeNull()
    })
  })
})
