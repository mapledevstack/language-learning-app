import { model, Schema } from "mongoose"

const videoSchema = new Schema({
  vidId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  channelTitle: {
    type: String,
    required: true,
    trim: true,
  },
})

const topicSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  type: {
    type: String,
    enum: ["default", "custom", "watch_later", "history"],
    required: true,
  },

  coverImg: {
    type: String,
    default: null,
  },

  vidIds: {
    type: [String],
    default: [],
  },
})

export const Video = model("Video", videoSchema)
export const Topic = model("Topic", topicSchema)
