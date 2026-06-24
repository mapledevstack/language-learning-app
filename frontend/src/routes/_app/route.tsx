import queryClient from "@/config/queryClient"
import { getCurrentUser } from "@/features/auth/api/authApi"
import AppLayout from "@/layouts/AppLayout"
import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_app")({
  beforeLoad: async () => {
    try {
      await queryClient.ensureQueryData({
        queryKey: ["auth", "me"],
        queryFn: getCurrentUser,
        staleTime: 5 * 60 * 1000,
      })
    } catch {
      throw redirect({ to: "/auth", search: { mode: "login" } })
    }
  },

  component: AppLayout,
})
