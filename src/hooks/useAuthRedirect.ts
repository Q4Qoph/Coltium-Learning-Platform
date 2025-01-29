import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function useAuthRedirect(requiredRole: "ADMIN" | "INSTRUCTOR" | "LEARNER") {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/login")
      return
    }

    const userRole = session.user?.role

    // Admin can access everything
    if (userRole === "ADMIN") return

    // Instructor can access instructor and learner pages
    if (userRole === "INSTRUCTOR") {
      if (requiredRole === "ADMIN") {
        router.push("/")
      }
      return
    }

    // Learner can only access learner pages
    if (userRole === "LEARNER") {
      if (requiredRole === "ADMIN" || requiredRole === "INSTRUCTOR") {
        router.push("/")
      }
      return
    }

    // No valid role
    router.push("/")
  }, [status, session, requiredRole, router])

  return { session, status }
}