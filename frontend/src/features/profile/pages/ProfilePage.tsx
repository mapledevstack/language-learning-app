import { Button } from "@/components/ui/button"
import ThemePreview from "./components/ThemePreview"
import useUpdateUser from "@/features/auth/hooks/useUpdateUser"
import { useState } from "react"
import useCurrentUser from "@/features/auth/hooks/useCurrentUser"
import { Toaster } from "@/components/ui/sonner"
import { LucideLogOut, LucideMoon, LucideSun } from "lucide-react"
import useLogout from "@/features/auth/hooks/useLogout"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"

const themes = [
  { id: "rose", name: "Rose", color: "oklch(0.525 0.223 4)" },
  { id: "blue", name: "Blue", color: "oklch(0.6 0.25 250)" },
  { id: "green", name: "Green", color: "oklch(0.6 0.2 150)" },
  { id: "purple", name: "Purple", color: "oklch(0.6 0.22 300)" },
  { id: "orange", name: "Orange", color: "oklch(0.65 0.2 55)" },
  { id: "cyan", name: "Cyan", color: "oklch(0.6 0.18 200)" },
]

const ProfilePage = () => {
  const { data: user } = useCurrentUser()

  const [colorTheme, setColorTheme] = useState(user?.preferences?.colorTheme)
  const [displayName, setDisplayName] = useState(user?.displayName)
  const [animationsEnabled, setAnimationsEnabled] = useState(
    user?.preferences?.animationsEnabled,
  )

  const { mutate: updateUser } = useUpdateUser()
  const { mutate: logout } = useLogout()
  const { theme, setTheme } = useTheme()

  return (
    <div className="relative h-full space-y-8 overflow-y-auto p-4">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Display Name</h1>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="p-2 rounded-xl text-2xl border-2 border-primary"
        />
      </div>

      <div className="flex gap-4">
        <h1 className="text-2xl font-bold">Light/Dark Mode</h1>

        <div className="flex items-center gap-2 bg-primary/30 rounded-4xl p-2">
          <LucideSun size={14} />
          <Switch
            checked={theme === "dark"}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          />
          <LucideMoon size={14} />
        </div>
      </div>

      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Color Theme</h1>

        <ThemePreview
          themes={themes}
          selectedTheme={colorTheme}
          onSelect={setColorTheme}
        />
      </div>

      <div className="flex gap-4 items-center">
        <h1 className="text-2xl font-bold">Enable Animations for Flashcards</h1>
        <input
          type="checkbox"
          checked={animationsEnabled}
          onChange={(e) => setAnimationsEnabled(e.target.checked)}
          className="size-6"
        />
      </div>

      <div className="absolute bottom-6 right-6">
        <Button
          className="w-52"
          onClick={() =>
            updateUser({
              displayName,
              preferences: { colorTheme, animationsEnabled },
            })
          }
        >
          Save
        </Button>
      </div>

      <div className="absolute top-6 right-6">
        <Button className="w-40" type="button" onClick={() => logout()}>
          <LucideLogOut />
          Logout
        </Button>
      </div>

      <Toaster />
    </div>
  )
}

export default ProfilePage
