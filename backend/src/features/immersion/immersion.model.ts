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

  coverImg: {
    type: String,
    default: null,
  },

  vidIds: {
    type: [String],
    default: [],
  },
})

const subtitleSchema = new Schema({
  vidId: {
    type: String,
    required: true,
    unique: true,
  },

  subtitles: [
    {
      _id: false,
      text: String,

      offset: Number,
      duration: Number,

      tokens: [
        {
          _id: false,
          text: String,
          baseForm: String,
          reading: String,
          pos: String,
        },
      ],
    },
  ],
})

const userVideoSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vidId: {
      type: String,
      required: true,
    },
    isFavorited: {
      type: Boolean,
      default: false,
    },
    isWatchLater: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

userVideoSchema.index({ userId: 1, vidId: 1 }, { unique: true })

export const Video = model("Video", videoSchema)
export const Topic = model("Topic", topicSchema)
export const Subtitle = model("Subtitle", subtitleSchema)
export const UserVideo = model("UserVideo", userVideoSchema)
