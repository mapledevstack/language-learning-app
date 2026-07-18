import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import request from "supertest"
import mongoose from "mongoose"
import app from "../../app.js"
import connectDB from "../../config/db.js"
import { User } from "../users/user.model.js"
import { BAD_REQUEST, CONFLICT, CREATED } from "../../constants/http.js"

beforeAll(async () => {
  await connectDB()
})

beforeEach(async () => {
  await User.deleteMany({})
})

afterAll(async () => {
  await mongoose.connection.close()
})

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
})
