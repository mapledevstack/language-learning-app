import "dotenv/config"
import { createTopic } from "../../src/features/immersion/immersion.service.js"
import connectDB from "../../src/config/db.js"

const MONGO_URI = process.env.MONGO_URI
await connectDB()

const defaultTopics = [
  { name: "Cooking", jpName: "料理", coverImg: "cooking" },
  { name: "Travel", jpName: "旅行", coverImg: "travel" },
  { name: "Gaming", jpName: "ゲーム実況", coverImg: "gaming" },
  { name: "Vlogs", jpName: "Vlog", coverImg: "vlogs" },
  { name: "N5 Practice", jpName: "日本語N5", coverImg: "n5practice" },
  { name: "Music", jpName: "音楽", coverImg: "music" },
  { name: "Fashion", jpName: "ファッション", coverImg: "fashion" },
  { name: "Cosplay", jpName: "コスプレ", coverImg: "cosplay" },
  { name: "Drawing", jpName: "イラスト", coverImg: "drawing" },
  { name: "Pets", jpName: "ペット", coverImg: "pets" },
  { name: "Culture", jpName: "日本文化", coverImg: "culture" },
]

for (const topic of defaultTopics) {
  await createTopic(topic.jpName, topic.coverImg, "default")
  console.log(`Added ${topic.name}`)
}

process.exit(0)
