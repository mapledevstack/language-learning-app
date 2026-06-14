export type YoutubeSearchResponse = {
  items: {
    id: {
      videoId: string
    }
    snippet: {
      title: string
      channelTitle: string
    }
  }[]
}

export type VideoResult = {
  vidId: string
  title: string
  channelTitle: string
}

export type TopicType = "default" | "custom" | "watch_later" | "history"
