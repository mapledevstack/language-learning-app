import { Button } from "@/components/ui/button"
import ThemePreview from "./components/ThemePreview"
import useUpdateUser from "@/features/auth/hooks/useUpdateUser"
import { useEffect, useState } from "react"
import useCurrentUser from "@/features/auth/hooks/useCurrentUser"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

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

  const [theme, setTheme] = useState(user?.preferences?.colorTheme)
  const { mutate: updateUser, isSuccess } = useUpdateUser()

  useEffect(() => {
    if (isSuccess) {
      toast.message(`Theme changed to ${theme?.toUpperCase()}`)
    }
  }, [isSuccess])

  return (
    <div className="relative h-full space-y-8 overflow-y-auto p-4">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Color Theme</h1>

        <ThemePreview
          themes={themes}
          selectedTheme={theme}
          onSelect={setTheme}
        />
      </div>

      <div className="absolute bottom-6 right-6">
        <Button
          className="w-52"
          onClick={() => updateUser({ preferences: { colorTheme: theme } })}
        >
          Save
        </Button>
      </div>

      <Toaster />
    </div>
  )
}

export default ProfilePage
