import { useRef } from "react"

import { cn } from "@/utils/cn"
import { setColorTheme } from "@/utils/theme"
import { COLOR_THEMES } from "@/constants/colorThemes"

type Theme = {
  id: string
  name: string
  color: string
}

interface ThemePreviewProps {
  themes: Theme[]
  selectedTheme?: string
  onSelect?: (theme: string) => void
}

const ThemePreview = ({
  themes,
  selectedTheme,
  onSelect,
}: ThemePreviewProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (event.deltaY === 0) return

    event.preventDefault()

    if (scrollRef.current) {
      scrollRef.current.scrollLeft += event.deltaY
    }
  }

  setColorTheme(selectedTheme || COLOR_THEMES[0])

  return (
    <div
      ref={scrollRef}
      onWheel={handleWheel}
      className="scrollbar-hide flex w-full min-w-0 gap-4 overflow-x-auto p-4"
    >
      {themes.map((theme) => (
        <button
          key={theme.id}
          type="button"
          onClick={() => onSelect?.(theme.id)}
          className={cn(
            "group w-40 lg:w-72 shrink-0 text-left transition-all",
            selectedTheme === theme.id && "scale-[1.02]",
          )}
        >
          <div
            className={cn(
              "overflow-hidden rounded-xl border-2 bg-background shadow-sm transition-all",
              "group-hover:-translate-y-1 group-hover:shadow-lg",
              selectedTheme === theme.id
                ? "border-primary shadow-md"
                : "border-border",
            )}
          >
            <div className="flex h-44">
              {/* Sidebar */}
              <div className="w-14 border-r bg-muted/60 p-2">
                <div
                  className="mx-auto mb-6 size-6 rounded-md"
                  style={{ backgroundColor: theme.color }}
                />

                <div className="space-y-2">
                  <div
                    className="h-2 rounded-full"
                    style={{ backgroundColor: theme.color }}
                  />

                  <div className="h-2 rounded-full bg-muted-foreground/20" />
                  <div className="h-2 rounded-full bg-muted-foreground/20" />
                  <div className="h-2 rounded-full bg-muted-foreground/20" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-4">
                <div className="mb-5 flex items-center justify-between">
                  <div className="space-y-1.5">
                    <div className="h-2.5 w-20 rounded-full bg-muted-foreground/30" />
                    <div className="h-2 w-14 rounded-full bg-muted-foreground/15" />
                  </div>

                  <div
                    className="size-5 rounded-full"
                    style={{ backgroundColor: theme.color }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="h-16 rounded-lg border bg-card p-2">
                    <div className="h-2 w-10 rounded-full bg-muted-foreground/20" />

                    <div
                      className="mt-3 h-2 w-7 rounded-full"
                      style={{ backgroundColor: theme.color }}
                    />
                  </div>

                  <div className="h-16 rounded-lg border bg-card p-2">
                    <div className="h-2 w-12 rounded-full bg-muted-foreground/20" />
                    <div className="mt-3 h-2 w-9 rounded-full bg-muted-foreground/15" />
                  </div>
                </div>

                <div
                  className="mt-3 h-6 w-16 rounded-md"
                  style={{ backgroundColor: theme.color }}
                />
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 px-1">
            <div
              className="size-3 rounded-full"
              style={{ backgroundColor: theme.color }}
            />

            <span className="text-sm font-medium">{theme.name}</span>
          </div>
        </button>
      ))}
    </div>
  )
}

export default ThemePreview
