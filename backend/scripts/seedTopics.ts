import { connectDB } from "../src/config/db.js"
import "dotenv/config"
import { createTopic } from "../src/features/immersion/immersion.service.js"

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
  await createTopic(topic.jpName, null, "default")
  console.log(`Added ${topic.name}`)
}

process.exit(0)
