import { LucideEdit } from "lucide-react"
import Topics from "../components/Topics"
import VideoLink from "../components/VideoLink"

const ImmersionHomePage = () => {
  return (
    <div className="h-full flex flex-col gap-6 p-10">
      <VideoLink />
      <Topics />

      <button className="fixed bg-primary text-2xl p-3 rounded-4xl hover:scale-105 transition-transform text-shadow-md whitespace-nowrap flex items-center justify-center gap-2 z-10 bottom-6 right-6">
        Edit
        <LucideEdit />
      </button>
    </div>
  )
}
export default ImmersionHomePage
