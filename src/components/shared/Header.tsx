"use client";
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input"
import { Menu, Search } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">Coltium</span>
        </Link>
        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="px-4 py-2 hover:text-primary">
                Browse
              </NavigationMenuTrigger>
              <NavigationMenuContent className="w-64 bg-white shadow-lg rounded-md p-4">
                <ul className="space-y-2">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/courses/web-development" className="block hover:text-primary">
                        Web Development
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/courses/data-science" className="block hover:text-primary">
                        Data Science
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/courses/graphic-design" className="block hover:text-primary">
                        Graphic Design
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/courses/business" className="block hover:text-primary">
                        Business
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {/* Search Input */}
            <NavigationMenuItem>
              <div className="flex-1 max-w-md mx-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search courses..."
                    className="pl-8 w-full"
                  />
                </div>
              </div>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {/* Authentication Buttons */}
        <div className="hidden space-x-4 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/become-instructor">Become an Instructor</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col space-y-4">
              <Link href="/courses" onClick={() => setIsOpen(false)}>
                Courses
              </Link>
              <Input
                type="text"
                placeholder="Search anything..."
                className="w-full"
              />
              <Button variant="ghost" asChild>
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              </Button>
              <Button asChild>
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}