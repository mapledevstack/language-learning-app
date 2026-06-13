import { connectDB } from "../src/config/db.js"
import { getVideos } from "../src/features/immersion/immersion.service.js"
import "dotenv/config"

const MONGO_URI = process.env.MONGO_URI
await connectDB(MONGO_URI)

const defaultTopics = [
  { name: "Cooking", jpName: "料理" },
  { name: "Travel", jpName: "旅行" },
  { name: "Gaming", jpName: "ゲーム実況" },
  { name: "Vlogs", jpName: "Vlog" },
  { name: "N5 Practice", jpName: "日本語N5" },
  { name: "Music", jpName: "音楽" },
  { name: "Fashion", jpName: "ファッション" },
  { name: "Cosplay", jpName: "コスプレ" },
  { name: "Drawing", jpName: "イラスト" },
  { name: "Pets", jpName: "ペット" },
  { name: "Culture", jpName: "日本文化" },
]

for (const topic of defaultTopics) {
  await getVideos(topic.jpName)
  console.log(`Added ${topic.name}`)
}
