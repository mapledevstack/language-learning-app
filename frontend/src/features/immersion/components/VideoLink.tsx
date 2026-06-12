import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { LucideCheckCircle2, LucideCircleAlert, Search } from "lucide-react"
import youtubeLogo from "../../../assets/youtube-logo.svg"
import { useState, type KeyboardEvent } from "react"
import getVidId from "../utils/getVidId"
import { useNavigate } from "@tanstack/react-router"

const VideoLink = () => {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const vidId = getVidId(query)

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || !vidId) return

    navigate({
      to: "/immersion/$vidId",
      params: { vidId: vidId },
    })
  }

  return (
    <div className="flex gap-4 items-center justify-center">
      <div className="flex gap-4 w-full">
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noreferrer"
          className="relative size-14 hover:scale-105 transition-all"
        >
          <img
            src={youtubeLogo}
            alt="youtube-logo"
            className="relative z-10 size-full"
          />
          <div className="w-4 h-4 bg-white absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"></div>
        </a>

        <InputGroup className="size-14 w-full">
          <InputGroupInput
            placeholder="Paste Youtube Link here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => handleSearch(e)}
          />
          <InputGroupAddon>
            <Search className="text-primary" />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            {query.trim() &&
              (vidId ? (
                <LucideCheckCircle2 className="size-5 text-green-400" />
              ) : (
                <LucideCircleAlert className="size-5 text-red-600" />
              ))}
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  )
}
export default VideoLink
