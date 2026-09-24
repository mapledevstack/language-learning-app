import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest"
import request from "supertest"
import mongoose from "mongoose"
import app from "../../app.js"
import connectDB from "../../config/db.js"
import { User } from "../users/user.model.js"
import {
  BAD_REQUEST,
  CONFLICT,
  CREATED,
  NOT_FOUND,
  OK,
  TOO_MANY_REQUESTS,
  UNAUTHORIZED,
} from "../../constants/http.js"
import { Session } from "./session.model.js"
import { VerificationCode } from "./auth.model.js"
import { verifyAccessToken } from "../../utils/jwt.js"
import { DEMO_USER_EMAIL } from "../../constants/env.js"

beforeAll(async () => {
  await connectDB()
})

beforeEach(async () => {
  await User.deleteMany({})
})

afterAll(async () => {
  await mongoose.connection.close()
})

vi.mock("../../utils/sendMail.js", () => ({
  sendMail: vi.fn().mockResolvedValue({
    data: { id: "test-email-id" },
    error: null,
  }),
}))

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

  describe("GET /api/v1/auth/refresh", () => {
    it("rejects when no refresh token is provided", async () => {
      const response = await request(app).get("/api/v1/auth/refresh")

      expect(response.status).toBe(UNAUTHORIZED)
    })

    it("refreshes the access token with a valid refresh token", async () => {
      const loginResponse = await request(app)
        .post("/api/v1/auth/register")
        .send({
          email: "test@example.com",
          password: "123456",
          confirmPassword: "123456",
        })

      const cookies = loginResponse.headers["set-cookie"]
      const cookiesArray = Array.isArray(cookies) ? cookies : [cookies]

      const refreshCookie = cookiesArray.find((cookie) =>
        cookie.startsWith("refreshToken="),
      )

      expect(refreshCookie).toBeDefined()

      const response = await request(app)
        .get("/api/v1/auth/refresh")
        .set("Cookie", refreshCookie!)

      expect(response.status).toBe(OK)

      const responseCookies = response.headers["set-cookie"]
      const responseCookiesArray = Array.isArray(responseCookies)
        ? responseCookies
        : [responseCookies]

      expect(
        responseCookiesArray.some((cookie) =>
          cookie.startsWith("accessToken="),
        ),
      ).toBe(true)
    })

    it("rejects an invalid refresh token", async () => {
      const response = await request(app)
        .get("/api/v1/auth/refresh")
        .set("Cookie", "refreshToken=invalid-token")

      expect(response.status).toBe(UNAUTHORIZED)
    })

    it("rejects when the session has expired", async () => {
      const registerResponse = await request(app)
        .post("/api/v1/auth/register")
        .send({
          email: "test@example.com",
          password: "123456",
          confirmPassword: "123456",
        })

      const cookies = registerResponse.headers["set-cookie"]
      const cookiesArray = Array.isArray(cookies) ? cookies : [cookies]

      const refreshCookie = cookiesArray.find((cookie) =>
        cookie.startsWith("refreshToken="),
      )

      expect(refreshCookie).toBeDefined()

      const user = await User.findOne({ email: "test@example.com" })
      expect(user).not.toBeNull()

      await Session.updateMany(
        { userId: user!._id },
        { expiresAt: new Date(Date.now() - 1000) },
      )

      const response = await request(app)
        .get("/api/v1/auth/refresh")
        .set("Cookie", refreshCookie!)

      expect(response.status).toBe(UNAUTHORIZED)
    })

    it("preserves demo status when refreshing the access token", async () => {
      await User.create({
        email: DEMO_USER_EMAIL,
        password: "123456",
      })

      const loginResponse = await request(app).post("/api/v1/auth/login/demo")

      expect(loginResponse.status).toBe(OK)

      const cookies = loginResponse.headers["set-cookie"]
      const cookiesArray = Array.isArray(cookies)
        ? cookies
        : cookies
          ? [cookies]
          : []

      const refreshCookie = cookiesArray.find((cookie) =>
        cookie.startsWith("refreshToken="),
      )

      expect(refreshCookie).toBeDefined()

      const response = await request(app)
        .get("/api/v1/auth/refresh")
        .set("Cookie", refreshCookie!)

      expect(response.status).toBe(OK)

      const responseCookies = response.headers["set-cookie"]
      const responseCookiesArray = Array.isArray(responseCookies)
        ? responseCookies
        : responseCookies
          ? [responseCookies]
          : []

      const accessCookie = responseCookiesArray.find((cookie) =>
        cookie.startsWith("accessToken="),
      )

      expect(accessCookie).toBeDefined()

      const accessToken = accessCookie!.split(";")[0].split("=")[1]

      const { verifyAccessToken } = await import("../../utils/jwt.js")
      const payload = verifyAccessToken(accessToken)

      expect(payload.isDemo).toBe(true)
    })
  })

  describe("GET /api/v1/auth/email/verify/:code", () => {
    it("verifies a user's email with a valid verification code", async () => {
      await request(app).post("/api/v1/auth/register").send({
        email: "test@example.com",
        password: "123456",
        confirmPassword: "123456",
      })

      const user = await User.findOne({ email: "test@example.com" })
      expect(user).not.toBeNull()
      expect(user?.verified).toBe(false)

      const verification = await VerificationCode.findOne({
        userId: user!._id,
      })

      expect(verification).not.toBeNull()

      const response = await request(app).get(
        `/api/v1/auth/email/verify/${verification!._id}`,
      )

      expect(response.status).toBe(OK)
      expect(response.body.message).toBe("Email successfully verified")

      const updatedUser = await User.findById(user!._id)

      expect(updatedUser?.verified).toBe(true)

      const deletedVerification = await VerificationCode.findById(
        verification!._id,
      )

      expect(deletedVerification).toBeNull()
    })

    it("rejects an invalid verification code", async () => {
      const response = await request(app).get(
        "/api/v1/auth/email/verify/507f1f77bcf86cd799439011",
      )

      expect(response.status).toBe(NOT_FOUND)
    })
  })

  describe("POST /api/v1/auth/password/forgot", () => {
    it("sends a password reset email for an existing user", async () => {
      await request(app).post("/api/v1/auth/register").send({
        email: "test@example.com",
        password: "123456",
        confirmPassword: "123456",
      })

      const response = await request(app)
        .post("/api/v1/auth/password/forgot")
        .send({
          email: "test@example.com",
        })

      expect(response.status).toBe(OK)
      expect(response.body.message).toBe("Password reset email sent")

      const verification = await VerificationCode.findOne({
        type: "password_reset",
      })

      expect(verification).not.toBeNull()
    })

    it("rejects password reset for a non-existent user", async () => {
      const response = await request(app)
        .post("/api/v1/auth/password/forgot")
        .send({
          email: "nouser@example.com",
        })

      expect(response.status).toBe(NOT_FOUND)
    })

    it("rate limits password reset requests", async () => {
      await request(app).post("/api/v1/auth/register").send({
        email: "test@example.com",
        password: "123456",
        confirmPassword: "123456",
      })

      for (let i = 0; i < 6; i++) {
        const response = await request(app)
          .post("/api/v1/auth/password/forgot")
          .send({
            email: "test@example.com",
          })

        expect(response.status).toBe(OK)
      }

      const response = await request(app)
        .post("/api/v1/auth/password/forgot")
        .send({
          email: "test@example.com",
        })

      expect(response.status).toBe(TOO_MANY_REQUESTS)
    })
  })

  describe("POST /api/v1/auth/password/reset", () => {
    it("resets the user's password with a valid verification code", async () => {
      await request(app).post("/api/v1/auth/register").send({
        email: "test@example.com",
        password: "oldpassword",
        confirmPassword: "oldpassword",
      })

      const user = await User.findOne({ email: "test@example.com" })
      expect(user).not.toBeNull()

      const verification = await VerificationCode.create({
        userId: user!._id,
        type: "password_reset",
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      })

      const response = await request(app)
        .post("/api/v1/auth/password/reset")
        .send({
          verificationCode: verification._id,
          password: "newpassword",
        })

      expect(response.status).toBe(OK)
      expect(response.body.message).toBe("Password reset successfully")

      const loginResponse = await request(app).post("/api/v1/auth/login").send({
        email: "test@example.com",
        password: "newpassword",
      })

      expect(loginResponse.status).toBe(OK)

      const oldPasswordResponse = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "test@example.com",
          password: "oldpassword",
        })

      expect(oldPasswordResponse.status).toBe(UNAUTHORIZED)

      const deletedVerification = await VerificationCode.findById(
        verification._id,
      )

      expect(deletedVerification).toBeNull()
    })

    it("rejects an invalid reset code", async () => {
      const response = await request(app)
        .post("/api/v1/auth/password/reset")
        .send({
          verificationCode: "507f1f77bcf86cd799439011",
          password: "newpassword",
        })

      expect(response.status).toBe(NOT_FOUND)
    })
  })
})
