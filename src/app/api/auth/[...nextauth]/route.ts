import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import NextAuth from "next-auth/next"
import { User as PrismaUser, Role } from "@prisma/client"

// Extend the built-in User type to include our custom fields
declare module "next-auth" {
  interface User {
    id: string
    email: string
    name: string
    role: Role
  }
  
  interface Session {
    user: User & {
      id: string
      role: Role
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: Role
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required")
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            email: true,
            password: true,
            firstName: true,
            lastName: true,
            role: true,
          }
        })

        if (!user) {
          console.error("No user found with email:", credentials.email)
          throw new Error("No user found with this email")
        }

       if (!user.password) {
          console.error("User has no password set")
          throw new Error("Invalid login method")
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isCorrectPassword) {
          console.error("Invalid password for user:", credentials.email)
          throw new Error("Invalid email or password")
        }

        return {
          id: user.id.toString(), // Convert number to string
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
        }
      }
    })
  ],
  debug: true,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        }
      }
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt"
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }