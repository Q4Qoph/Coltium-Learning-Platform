import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    console.log("Middleware executing for path:", req.nextUrl.pathname) // Debug log
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Define path patterns for each role
    const adminPaths = ["/admin", "/admin-dashboard"]
    const instructorPaths = ["/instructor", "/instructor-dashboard"]
    const learnerPaths = ["/learner", "/learner-dashboard"]
    
    console.log("Token role:", token?.role) // Debug log
    console.log("Checking path:", path) // Debug log

    // Check if user is accessing a protected route
    if (adminPaths.some(p => path.startsWith(p))) {
      console.log("Checking admin path") // Debug log
      if (token?.role !== "ADMIN") {
        return new NextResponse(null, { status: 403 })
      }
    }

    if (instructorPaths.some(p => path.startsWith(p))) {
      console.log("Checking instructor path") // Debug log
      if (token?.role !== "INSTRUCTOR") {
        return new NextResponse(null, { status: 403 })
      }
    }

    if (learnerPaths.some(p => path.startsWith(p))) {
      console.log("Checking learner path") // Debug log
      if (!["LEARNER", "INSTRUCTOR", "ADMIN"].includes(token?.role as string)) {
        return new NextResponse(null, { status: 403 })
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)

// Updated matcher configuration
export const config = {
  matcher: [
    // Exact matches for dashboard routes
    '/learner-dashboard',
    '/admin-dashboard',
    '/instructor-dashboard',
    // Wildcard matches for other routes
    '/learner/:path*',
    '/admin/:path*',
    '/instructor/:path*',
  ]
}