// app/api/auth/register/route.ts
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import  prisma  from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, firstName, lastName, role, expertise, bio } = body

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return new NextResponse("User already exists", { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user based on role
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: role || "LEARNER",
        ...(role === "INSTRUCTOR" ? { expertise, bio } : {})
      }
    })

    // Remove password from response
    const { password: _, ...userWithoutPass } = user

    return NextResponse.json(userWithoutPass)
  } catch (error) {
    console.error("Registration error:", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}