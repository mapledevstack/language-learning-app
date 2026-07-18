import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import request from "supertest"
import mongoose from "mongoose"
import app from "../../app.js"
import connectDB from "../../config/db.js"
import { User } from "../users/user.model.js"
import {
  BAD_REQUEST,
  CONFLICT,
  CREATED,
  OK,
  UNAUTHORIZED,
} from "../../constants/http.js"

beforeAll(async () => {
  await connectDB()
})

beforeEach(async () => {
  await User.deleteMany({})
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe("Authentication", () => {
  describe("POST /api/v1/auth/register", () => {
    it("creates a new user", async () => {
      const response = await request(app).post("/api/v1/auth/register").send({
        email: "test@example.com",
        password: "123456",
        confirmPassword: "123456",
      })

      expect(response.status).toBe(CREATED)

      const user = await User.findOne({
        email: "test@example.com",
      })

      expect(user).not.toBeNull()
      expect(user?.email).toBe("test@example.com")
    })

    it("rejects duplicate email", async () => {
      await request(app).post("/api/v1/auth/register").send({
        email: "test@example.com",
        password: "123456",
        confirmPassword: "123456",
      })

      const response = await request(app).post("/api/v1/auth/register").send({
        email: "test@example.com",
        password: "123456",
        confirmPassword: "123456",
      })

      expect(response.status).toBe(CONFLICT)
    })

    it("rejects invalid email", async () => {
      const response = await request(app).post("/api/v1/auth/register").send({
        email: "invalid-email",
        password: "123456",
        confirmPassword: "123456",
      })

      expect(response.status).toBe(BAD_REQUEST)
    })

    it("rejects when passwords do not match", async () => {
      const response = await request(app).post("/api/v1/auth/register").send({
        email: "test@example.com",
        password: "123456",
        confirmPassword: "different-password",
      })

      expect(response.status).toBe(BAD_REQUEST)
    })

    it("rejects password shorter than 6 characters", async () => {
      const response = await request(app).post("/api/v1/auth/register").send({
        email: "test@example.com",
        password: "123",
        confirmPassword: "123",
      })

      expect(response.status).toBe(BAD_REQUEST)
    })
  })

  describe("POST /api/v1/auth/login", () => {
    beforeEach(async () => {
      // Create a user to login with
      await request(app).post("/api/v1/auth/register").send({
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password123",
      })
    })

    it("logs in an existing user with correct credentials and sets cookies", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        email: "test@example.com",
        password: "password123",
      })

      expect(response.status).toBe(OK)
      expect(response.body.user.email).toBe("test@example.com")
      expect(response.body.user).not.toHaveProperty("password")

      const cookies = response.headers["set-cookie"]
      expect(cookies).toBeDefined()
      expect(Array.isArray(cookies)).toBe(true)
      const cookiesArray = Array.isArray(cookies) ? cookies : [cookies ?? ""]

      expect(
        cookiesArray.some((cookie) => cookie.startsWith("accessToken=")),
      ).toBe(true)
      expect(
        cookiesArray.some((cookie) => cookie.startsWith("refreshToken=")),
      ).toBe(true)
    })

    it("rejects login with incorrect password", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        email: "test@example.com",
        password: "wrong-password",
      })

      expect(response.status).toBe(UNAUTHORIZED)
    })

    it("rejects login for a non-existent user", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        email: "nouser@example.com",
        password: "password123",
      })

      expect(response.status).toBe(UNAUTHORIZED)
    })
  })

  describe("POST /api/v1/auth/login/demo", () => {
    beforeEach(async () => {
      // Create a demo user to login with
      await request(app).post("/api/v1/auth/register").send({
        email: "demo@example.com",
        password: "123456",
        confirmPassword: "123456",
      })
    })

    it("logs in as the demo user and sets authentication cookies", async () => {
      const response = await request(app).post("/api/v1/auth/login/demo")

      expect(response.status).toBe(OK)

      expect(response.body.user).toBeDefined()
      expect(response.body.user).not.toHaveProperty("password")

      const cookies = response.headers["set-cookie"]
      expect(cookies).toBeDefined()

      const cookiesArray = Array.isArray(cookies) ? cookies : [cookies]

      const accessCookie = cookiesArray.find((cookie) =>
        cookie.startsWith("accessToken="),
      )

      const refreshCookie = cookiesArray.find((cookie) =>
        cookie.startsWith("refreshToken="),
      )

      expect(accessCookie).toBeDefined()
      expect(refreshCookie).toBeDefined()
    })
  })

  describe("POST /api/v1/auth/logout", () => {
    it("clears authentication cookies on logout", async () => {
      const response = await request(app).post("/api/v1/auth/logout")

      expect(response.status).toBe(OK)

      const cookies = response.headers["set-cookie"]
      expect(cookies).toBeDefined()

      const cookiesArray = Array.isArray(cookies) ? cookies : [cookies]

      const accessCookie = cookiesArray.find((cookie) =>
        cookie.startsWith("accessToken="),
      )

      const refreshCookie = cookiesArray.find((cookie) =>
        cookie.startsWith("refreshToken="),
      )

      expect(accessCookie).toBeDefined()
      expect(accessCookie).toContain("Path=/")
      expect(accessCookie).toContain("Expires=")

      expect(refreshCookie).toBeDefined()
      expect(refreshCookie).toContain("Path=/api/v1/auth")
      expect(refreshCookie).toContain("Expires=")
    })
  })
})
