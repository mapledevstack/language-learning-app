import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { LucideCheckCircle2, LucideCircleAlert, Search } from "lucide-react"
import youtubeLogo from "../../../assets/logos/youtube-logo.svg"
import { useState, type KeyboardEvent } from "react"
import getVidId from "../utils/getVidId"
import { useNavigate } from "@tanstack/react-router"

const VideoLink = () => {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const vidId = getVidId(query)

  const handleSearch = () => {
    if (!vidId) return

    navigate({
      to: "/immersion/$vidId",
      params: { vidId },
    })
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex w-full gap-4">
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noreferrer"
          className="relative size-14 transition-transform hover:scale-105"
        >
          <img
            src={youtubeLogo}
            alt="youtube-logo"
            className="relative z-10 size-full"
          />
          <div className="absolute top-1/2 left-1/2 z-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 bg-white" />
        </a>

        <InputGroup className="size-14 w-full">
          <InputGroupInput
            placeholder="Paste YouTube link here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <InputGroupAddon>
            {query.trim() &&
              (vidId ? (
                <LucideCheckCircle2 className="size-5 text-green-400" />
              ) : (
                <LucideCircleAlert className="size-5 text-red-600" />
              ))}
          </InputGroupAddon>

          <InputGroupAddon
            align="inline-end"
            onClick={handleSearch}
            className={`cursor-pointer transition-colors ${
              vidId
                ? "text-primary hover:text-primary/80"
                : "cursor-not-allowed text-muted-foreground"
            }`}
          >
            <Search className="size-5" />
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  )
}

export default VideoLink
