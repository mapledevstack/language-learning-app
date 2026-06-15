export type YoutubeSearchResponse = {
  items: {
    id: {
      videoId: string
    }
    snippet: {
      title: string
    }
  }[]
}

export type VideoResult = {
  vidId: string
  title: string
}

export type TopicType = "default" | "custom" | "watch_later" | "history"
