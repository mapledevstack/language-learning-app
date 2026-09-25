import mongoose from "mongoose"
import {
  beforeAll,
  beforeEach,
  afterAll,
  describe,
  expect,
  it,
  vi,
} from "vitest"
import request from "supertest"

import app from "../../app.js"
import { Subtitle, Topic, Video } from "./immersion.model.js"
import connectDB from "../../config/db.js"
import { FORBIDDEN, NO_CONTENT, NOT_FOUND, OK } from "../../constants/http.js"
import { fetchTranscript } from "youtube-transcript"
import { User } from "../users/user.model.js"
import { DEMO_USER_EMAIL } from "../../constants/env.js"
import { fetchYoutubeVideos } from "./immersion.utils.js"

beforeAll(async () => {
  await connectDB()
})

let accessCookie: string

beforeEach(async () => {
  await Subtitle.deleteMany({})
  await Topic.deleteMany({})
  await Video.deleteMany({})
  await User.deleteMany({})

  await request(app).post("/api/v1/auth/register").send({
    email: "test@example.com",
    password: "password123",
    confirmPassword: "password123",
  })

  const loginResponse = await request(app).post("/api/v1/auth/login").send({
    email: "test@example.com",
    password: "password123",
  })

  const cookies = loginResponse.headers["set-cookie"]

  const cookiesArray = Array.isArray(cookies)
    ? cookies
    : cookies
      ? [cookies]
      : []

  const accessCookieHeader = cookiesArray.find((cookie) =>
    cookie.startsWith("accessToken="),
  )

  expect(accessCookieHeader).toBeDefined()

  accessCookie = accessCookieHeader!.split(";")[0]
})

afterAll(async () => {
  await mongoose.connection.close()
})

vi.mock("youtube-transcript", () => ({
  fetchTranscript: vi.fn(),
}))

vi.mock("./immersion.utils.js", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./immersion.utils.js")>()

  return {
    ...actual,
    fetchYoutubeVideos: vi.fn(),
  }
})

describe("Immersion", () => {
  describe("GET /api/v1/immersion/topics", () => {
    it("returns global topics and the user's own topics", async () => {
      const user = await User.findOne({
        email: "test@example.com",
      })

      expect(user).not.toBeNull()

      const otherUser = await User.create({
        email: "other@example.com",
        password: "123456",
      })

      await Topic.create([
        {
          userId: null,
          name: "Anime",
          coverImg: null,
          vidIds: ["anime-1", "anime-2"],
        },
        {
          userId: user!._id,
          name: "My Anime",
          coverImg: null,
          vidIds: ["my-anime-1"],
        },
        {
          userId: otherUser._id,
          name: "Other Anime",
          coverImg: null,
          vidIds: ["other-1", "other-2"],
        },
      ])

      const response = await request(app)
        .get("/api/v1/immersion/topics")
        .set("Cookie", accessCookie)

      expect(response.status).toBe(OK)
      expect(response.body).toHaveLength(2)

      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Anime",
            coverImg: null,
            vidCount: 2,
          }),
          expect.objectContaining({
            name: "My Anime",
            coverImg: null,
            vidCount: 1,
          }),
        ]),
      )
    })
  })

  describe("POST /api/v1/immersion/topics", () => {
    it("creates a topic for the authenticated user", async () => {
      const response = await request(app)
        .post("/api/v1/immersion/topics")
        .set("Cookie", accessCookie)
        .send({
          name: "My Anime",
          coverImg: "https://example.com/cover.jpg",
        })

      expect(response.status).toBe(201)
      expect(response.body).toEqual(
        expect.objectContaining({
          name: "My Anime",
          coverImg: "https://example.com/cover.jpg",
          vidIds: [],
        }),
      )

      const topic = await Topic.findOne({ name: "My Anime" }).lean()
      const user = await User.findOne({ email: "test@example.com" })

      expect(topic).not.toBeNull()
      expect(topic?.userId).not.toBeNull()
      expect(topic?.userId?.toString()).toBe(user?._id.toString())
    })

    it("rejects demo users", async () => {
      await User.create({
        email: DEMO_USER_EMAIL,
        password: "123456",
      })

      const loginResponse = await request(app).post("/api/v1/auth/login/demo")

      const cookies = loginResponse.headers["set-cookie"]

      const cookiesArray = Array.isArray(cookies)
        ? cookies
        : cookies
          ? [cookies]
          : []

      const demoCookie = cookiesArray.find((cookie) =>
        cookie.startsWith("accessToken="),
      )

      expect(demoCookie).toBeDefined()

      const response = await request(app)
        .post("/api/v1/immersion/topics")
        .set("Cookie", demoCookie!.split(";")[0])
        .send({
          name: "Demo Topic",
          coverImg: null,
        })

      expect(response.status).toBe(FORBIDDEN)
    })
  })

  describe("DELETE /api/v1/immersion/topics/:topicId", () => {
    it("deletes the user's own topic", async () => {
      const user = await User.findOne({
        email: "test@example.com",
      })

      const topic = await Topic.create({
        userId: user!._id,
        name: "My Topic",
        coverImg: null,
        vidIds: [],
      })

      const response = await request(app)
        .delete(`/api/v1/immersion/topics/${topic._id}`)
        .set("Cookie", accessCookie)

      expect(response.status).toBe(NO_CONTENT)

      const deletedTopic = await Topic.findById(topic._id)

      expect(deletedTopic).toBeNull()
    })

    it("cannot delete another user's topic", async () => {
      const otherUser = await User.create({
        email: "other@example.com",
        password: "password123",
      })

      const topic = await Topic.create({
        userId: otherUser._id,
        name: "Other Topic",
        coverImg: null,
        vidIds: [],
      })

      const response = await request(app)
        .delete(`/api/v1/immersion/topics/${topic._id}`)
        .set("Cookie", accessCookie)

      expect(response.status).toBe(NOT_FOUND)

      const existingTopic = await Topic.findById(topic._id)

      expect(existingTopic).not.toBeNull()
    })
  })

  describe("GET /api/v1/immersion/topics/:topicId/videos", () => {
    it("returns videos from a global topic", async () => {
      const topic = await Topic.create({
        userId: null,
        name: "Anime",
        coverImg: null,
        vidIds: ["video-1", "video-2"],
      })

      await Video.create([
        {
          vidId: "video-1",
          title: "First video",
        },
        {
          vidId: "video-2",
          title: "Second video",
        },
      ])

      const response = await request(app)
        .get(`/api/v1/immersion/topics/${topic._id}/videos`)
        .set("Cookie", accessCookie)

      expect(response.status).toBe(OK)
      expect(response.body).toHaveLength(2)
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            vidId: "video-1",
            title: "First video",
          }),
          expect.objectContaining({
            vidId: "video-2",
            title: "Second video",
          }),
        ]),
      )
    })

    it("fetches and caches videos when the topic is empty", async () => {
      const topic = await Topic.create({
        userId: null,
        name: "Anime",
        coverImg: null,
        vidIds: [],
      })

      vi.mocked(fetchYoutubeVideos).mockResolvedValue([
        {
          vidId: "video-1",
          title: "First video",
        },
        {
          vidId: "video-2",
          title: "Second video",
        },
      ])

      const response = await request(app)
        .get(`/api/v1/immersion/topics/${topic._id}/videos`)
        .set("Cookie", accessCookie)

      expect(response.status).toBe(OK)

      expect(fetchYoutubeVideos).toHaveBeenCalledWith("Anime")

      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            vidId: "video-1",
            title: "First video",
          }),
          expect.objectContaining({
            vidId: "video-2",
            title: "Second video",
          }),
        ]),
      )

      const updatedTopic = await Topic.findById(topic._id).lean()

      expect(updatedTopic?.vidIds).toEqual(
        expect.arrayContaining(["video-1", "video-2"]),
      )

      const cachedVideos = await Video.find({
        vidId: { $in: ["video-1", "video-2"] },
      }).lean()

      expect(cachedVideos).toHaveLength(2)
    })

    it("returns videos from the user's own topic", async () => {
      const user = await User.findOne({
        email: "test@example.com",
      })

      const topic = await Topic.create({
        userId: user!._id,
        name: "My Anime",
        coverImg: null,
        vidIds: ["video-1"],
      })

      await Video.create({
        vidId: "video-1",
        title: "My video",
      })

      const response = await request(app)
        .get(`/api/v1/immersion/topics/${topic._id}/videos`)
        .set("Cookie", accessCookie)

      expect(response.status).toBe(OK)
      expect(response.body).toEqual([
        expect.objectContaining({
          vidId: "video-1",
          title: "My video",
        }),
      ])
    })

    it("cannot access another user's topic", async () => {
      const otherUser = await User.create({
        email: "other@example.com",
        password: "password123",
      })

      const topic = await Topic.create({
        userId: otherUser._id,
        name: "Other Anime",
        coverImg: null,
        vidIds: ["video-1"],
      })

      await Video.create({
        vidId: "video-1",
        title: "Other video",
      })

      const response = await request(app)
        .get(`/api/v1/immersion/topics/${topic._id}/videos`)
        .set("Cookie", accessCookie)

      expect(response.status).toBe(NOT_FOUND)

      expect(await Topic.findById(topic._id)).not.toBeNull()
    })
  })

  describe("GET /api/v1/immersion/videos/:vidId/subtitles", () => {
    it("returns cached subtitles", async () => {
      const vidId = "test-video-123"

      const subtitles = [
        {
          text: "こんにちは",
          offset: 0,
          duration: 2,
          tokens: [
            {
              text: "こんにちは",
              baseForm: "こんにちは",
            },
          ],
        },
      ]

      await Subtitle.create({
        vidId,
        subtitles,
      })

      const response = await request(app)
        .get(`/api/v1/immersion/videos/${vidId}/subtitles`)
        .set("Cookie", accessCookie)

      expect(response.status).toBe(OK)
      expect(response.body).toEqual(subtitles)
    })

    it("fetches and caches subtitles when not cached", async () => {
      const vidId = "test-video-456"

      vi.mocked(fetchTranscript).mockResolvedValue([
        {
          text: "こんにちは",
          offset: 0,
          duration: 2,
        },
      ])

      const response = await request(app)
        .get(`/api/v1/immersion/videos/${vidId}/subtitles`)
        .set("Cookie", accessCookie)

      expect(response.status).toBe(OK)
      expect(response.body).toHaveLength(1)
      expect(response.body[0].text).toBe("こんにちは")

      expect(fetchTranscript).toHaveBeenCalledWith(vidId, { lang: "ja" })

      const cachedSubtitle = await Subtitle.findOne({ vidId }).lean()

      expect(cachedSubtitle).not.toBeNull()
      expect(cachedSubtitle?.subtitles).toEqual(response.body)
    })
  })
})
