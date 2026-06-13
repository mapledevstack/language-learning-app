import { model, Schema } from "mongoose"

const VideoSchema = new Schema(
  {},
  {
    strict: false,
    versionKey: false,
    collection: "videos",
  },
)

export const Video = model("Video", VideoSchema)
