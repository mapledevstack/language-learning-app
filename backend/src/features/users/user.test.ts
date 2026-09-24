import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import connectDB from "../../config/db.js"
import { User } from "./user.model.js"
import mongoose from "mongoose"
import request from "supertest"
import app from "../../app.js"
import { CREATED, OK, UNAUTHORIZED } from "../../constants/http.js"
import { COLOR_THEMES } from "../../constants/colorThemes.js"
import { UserActivity } from "./userActivity.model.js"

beforeAll(async () => {
  await connectDB()
})

beforeEach(async () => {
  await User.deleteMany({})
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe("Users", () => {
  describe("GET /api/v1/me", () => {
    it("returns the authenticated user", async () => {
      const registerResponse = await request(app)
        .post("/api/v1/auth/register")
        .send({
          email: "test@example.com",
          password: "123456",
          confirmPassword: "123456",
        })

      expect(registerResponse.status).toBe(CREATED)

      const cookies = registerResponse.headers["set-cookie"]
      const cookiesArray = Array.isArray(cookies)
        ? cookies
        : cookies
          ? [cookies]
          : []

      const accessCookie = cookiesArray.find((cookie) =>
        cookie.startsWith("accessToken="),
      )

      expect(accessCookie).toBeDefined()

      const response = await request(app)
        .get("/api/v1/me")
        .set("Cookie", accessCookie!)

      expect(response.status).toBe(OK)
      expect(response.body).toMatchObject({
        email: "test@example.com",
        verified: false,
      })
      expect(response.body.password).toBeUndefined()
    })

    it("rejects unauthenticated requests", async () => {
      const response = await request(app).get("/api/v1/me")

      expect(response.status).toBe(UNAUTHORIZED)
    })
  })

  describe("PATCH /api/v1/me", () => {
    it("updates the authenticated user", async () => {
      const registerResponse = await request(app)
        .post("/api/v1/auth/register")
        .send({
          email: "test@example.com",
          password: "123456",
          confirmPassword: "123456",
        })

      expect(registerResponse.status).toBe(CREATED)

      const cookies = registerResponse.headers["set-cookie"]
      const cookiesArray = Array.isArray(cookies)
        ? cookies
        : cookies
          ? [cookies]
          : []

      const accessCookie = cookiesArray.find((cookie) =>
        cookie.startsWith("accessToken="),
      )

      expect(accessCookie).toBeDefined()

      const response = await request(app)
        .patch("/api/v1/me")
        .set("Cookie", accessCookie!)
        .send({
          displayName: "Maple",
          preferences: {
            colorTheme: COLOR_THEMES[2],
            animationsEnabled: false,
          },
        })

      expect(response.status).toBe(OK)
      expect(response.body).toMatchObject({
        email: "test@example.com",
        displayName: "Maple",
        preferences: {
          colorTheme: COLOR_THEMES[2],
          animationsEnabled: false,
        },
      })

      expect(response.body.password).toBeUndefined()
    })

    it("rejects unauthenticated requests", async () => {
      const response = await request(app).patch("/api/v1/me").send({
        displayName: "Maple",
      })

      expect(response.status).toBe(UNAUTHORIZED)
    })

    it("updates only the provided fields", async () => {
      const registerResponse = await request(app)
        .post("/api/v1/auth/register")
        .send({
          email: "test@example.com",
          password: "123456",
          confirmPassword: "123456",
        })

      expect(registerResponse.status).toBe(CREATED)

      const cookies = registerResponse.headers["set-cookie"]
      const cookiesArray = Array.isArray(cookies)
        ? cookies
        : cookies
          ? [cookies]
          : []

      const accessCookie = cookiesArray.find((cookie) =>
        cookie.startsWith("accessToken="),
      )

      expect(accessCookie).toBeDefined()

      const response = await request(app)
        .patch("/api/v1/me")
        .set("Cookie", accessCookie!)
        .send({
          displayName: "Maple",
        })

      expect(response.status).toBe(OK)
      expect(response.body.displayName).toBe("Maple")
      expect(response.body.preferences).toMatchObject({
        animationsEnabled: true,
      })
    })
  })

  describe("GET /api/v1/me/activity", () => {
    it("returns the authenticated user's activity", async () => {
      const registerResponse = await request(app)
        .post("/api/v1/auth/register")
        .send({
          email: "test@example.com",
          password: "123456",
          confirmPassword: "123456",
        })

      expect(registerResponse.status).toBe(CREATED)

      const user = await User.findOne({ email: "test@example.com" })
      expect(user).toBeDefined()

      await UserActivity.create([
        {
          userId: user!._id,
          date: new Date("2026-09-20"),
          reviewCount: 10,
        },
        {
          userId: user!._id,
          date: new Date("2026-09-21"),
          reviewCount: 5,
        },
      ])

      const cookies = registerResponse.headers["set-cookie"]
      const cookiesArray = Array.isArray(cookies)
        ? cookies
        : cookies
          ? [cookies]
          : []

      const accessCookie = cookiesArray.find((cookie) =>
        cookie.startsWith("accessToken="),
      )

      expect(accessCookie).toBeDefined()

      const response = await request(app)
        .get("/api/v1/me/activity")
        .set("Cookie", accessCookie!)

      expect(response.status).toBe(OK)
      expect(response.body).toHaveLength(2)
      expect(response.body[0].reviewCount).toBe(10)
      expect(response.body[1].reviewCount).toBe(5)
    })

    it("only returns activity from the last 365 days", async () => {
      const registerResponse = await request(app)
        .post("/api/v1/auth/register")
        .send({
          email: "test@example.com",
          password: "123456",
          confirmPassword: "123456",
        })

      expect(registerResponse.status).toBe(CREATED)

      const user = await User.findOne({ email: "test@example.com" })
      expect(user).toBeDefined()

      const now = new Date()

      const recentDate = new Date(now)
      recentDate.setDate(recentDate.getDate() - 30)
      recentDate.setHours(0, 0, 0, 0)

      const oldDate = new Date(now)
      oldDate.setDate(oldDate.getDate() - 400)
      oldDate.setHours(0, 0, 0, 0)

      await UserActivity.create([
        {
          userId: user!._id,
          date: recentDate,
          reviewCount: 10,
        },
        {
          userId: user!._id,
          date: oldDate,
          reviewCount: 50,
        },
      ])

      const cookies = registerResponse.headers["set-cookie"]
      const cookiesArray = Array.isArray(cookies)
        ? cookies
        : cookies
          ? [cookies]
          : []

      const accessCookie = cookiesArray.find((cookie) =>
        cookie.startsWith("accessToken="),
      )

      const response = await request(app)
        .get("/api/v1/me/activity")
        .set("Cookie", accessCookie!)

      expect(response.status).toBe(OK)
      expect(response.body).toHaveLength(1)
      expect(response.body[0].reviewCount).toBe(10)
    })
  })
})
