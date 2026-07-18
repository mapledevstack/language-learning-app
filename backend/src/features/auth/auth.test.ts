import { describe, it, expect, beforeEach, afterEach } from "vitest"
import request from "supertest"
import app from "../../app.js"
import { User } from "../users/user.model.js"
import { CREATED } from "../../constants/http.js"

describe("Authentication", () => {
  describe("POST /register", () => {
    it("creates a new user", async () => {
      const response = await request(app).post("/api/v1/auth/register").send({
        email: "test@example.com",
        password: "123456",
      })

      expect(response.status).toBe(CREATED)
    })

    it("rejects duplicate email", async () => {})

    it("rejects invalid email", async () => {})
  })

  // describe("POST /login", () => {
  //   it("logs in with valid credentials", async () => {})

  //   it("rejects invalid password", async () => {})
  // })

  // describe("POST /logout", () => {
  //   it("logs out the user", async () => {})
  // })

  // describe("GET /refresh", () => {
  //   it("refreshes the access token", async () => {})

  //   it("returns 401 without refresh token", async () => {})
  // })

  // describe("GET /email/verify/:code", () => {
  //   it("verifies a valid email verification code", async () => {})

  //   it("rejects an invalid verification code", async () => {})
  // })

  // describe("POST /password/forgot", () => {
  //   it("sends a password reset email", async () => {})
  // })

  // describe("POST /password/reset", () => {
  //   it("resets the password with a valid code", async () => {})
  // })
})
