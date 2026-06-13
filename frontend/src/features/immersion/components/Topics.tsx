import TopicCard from "./TopicCard"

const Topics = () => {
  return (
    <div className="flex-1  overflow-y-auto overflow-x-hidden -m-4 p-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  )
}
export default Topics

export const topics = [
  {
    id: "cooking",
    title: "Cooking",
    videoIds: ["C3oPjuudXas", "abc123def45", "xyz987uvw65"],
  },
  {
    id: "gaming",
    title: "Gaming",
    videoIds: ["aaa111bbb22", "ccc333ddd44"],
  },
  {
    id: "travel",
    title: "Travel",
    videoIds: ["eee555fff66", "ggg777hhh88"],
  },
  {
    id: "daily-life",
    title: "Daily Life",
    videoIds: ["iii999jjj00", "kkk111lll22"],
  },
  {
    id: "saved",
    title: "Saved Videos",
    videoIds: ["iii999jjj00", "kkk111lll22"],
  },
  {
    id: "history",
    title: "Watch History",
    videoIds: ["iii999jjj00", "kkk111lll22"],
  },
]
