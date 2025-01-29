"use client"

import { useState } from "react"
import { Navbar } from "@/components/shared/Header";
// import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { getSession, signIn } from "next-auth/react"
import router from "next/router";
import { useRouter } from "next/navigation" 


export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  


// In your handleSubmit function:
const handleSubmit = async (e) => {
  e.preventDefault()
  setIsLoading(true)
  setError("")

  try {
    const result = await signIn("credentials", {
      email: e.target.email.value,
      password: e.target.password.value,
      redirect: false,
    })

    if (result?.error) {
      console.error("Sign in error:", result.error) 
      setError(result.error)  
    }

    const session = await getSession()
    console.log("Session after sign in:", session)  // Add this line

    if (!session?.user) {
      setError("Failed to get user session")
      return
    }

    // Redirect based on role
    // const session = await getSession()
    switch (session.user.role) {
      case "ADMIN":
        router.push("/admin-dashboard")
        break
      case "INSTRUCTOR":
        router.push("/instructor-dashboard")
        break
      case "LEARNER":
        router.push("/learner-dashboard")
        break
      default:
        router.push("/")
    }
  } catch (err) {
    console.error("Login error:", err) 
    setError(err.message || "An error occurred during sign in")
  } finally {
    setIsLoading(false)
  }
}

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col bg-slate-50">
        <div className="container mx-auto flex-1 px-4 py-16">
          <Card className="mx-auto max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
              <CardDescription className="text-center">
                Sign in to your Coltium account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>

                <div className="flex items-center justify-between text-sm">
                  <Link href="/forgot-password" className="text-primary hover:underline">
                    Forgot your password?
                  </Link>
                </div>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-background px-2 text-muted-foreground">
                      New to Coltium?
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/register">Register as a Learner</Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/become-instructor">Become an Instructor</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  )
}