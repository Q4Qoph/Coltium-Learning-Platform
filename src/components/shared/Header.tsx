"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Menu, Search, Code, Database, Palette, ChevronRight, 
         Briefcase, GraduationCap, Bell } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

const courseCategories = [
  {
    title: "Web Development",
    href: "/courses/web-development",
    icon: Code,
    description: "Learn frontend and backend development",
    courses: "120+ courses",
  },
  {
    title: "Data Science",
    href: "/courses/data-science",
    icon: Database,
    description: "Master data analysis and machine learning",
    courses: "85+ courses",
  },
  {
    title: "Graphic Design",
    href: "/courses/graphic-design",
    icon: Palette,
    description: "Create stunning visual designs",
    courses: "65+ courses",
  },
  {
    title: "Business",
    href: "/courses/business",
    icon: Briefcase,
    description: "Develop business and entrepreneurship skills",
    courses: "95+ courses",
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">Coltium</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="space-x-2">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="px-4 py-2 hover:text-primary">
                <GraduationCap className="mr-2 h-4 w-4" />
                Browse
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[500px] p-4 md:w-[500px] lg:w-[600px]">
                  <div className="grid grid-cols-2 gap-4">
                    {courseCategories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <Link
                          key={category.href}
                          href={category.href}
                          className="block space-y-1 rounded-lg p-3 hover:bg-muted"
                        >
                          <div className="flex items-center space-x-2">
                            <Icon className="h-4 w-4 text-primary" />
                            <span className="font-medium">{category.title}</span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {category.description}
                          </p>
                          <Badge variant="secondary" className="mt-1">
                            {category.courses}
                          </Badge>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Search Input */}
            <NavigationMenuItem className="relative">
              <div className={`flex w-[300px] items-center rounded-md border transition-all duration-300 ${
                isSearchFocused ? "w-[400px] border-primary" : ""
              }`}>
                <Search className="ml-2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="border-0 focus-visible:ring-0"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </div>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center space-x-4 md:flex">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
              3
            </span>
          </Button>
          <Button variant="ghost" className="text-sm" asChild>
            <Link href="/become-instructor">Become an Instructor</Link>
          </Button>
          <Button variant="ghost" className="text-sm" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button className="text-sm" asChild>
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
          <SheetContent side="right" className="w-full sm:w-[300px] p-0">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search courses..."
                    className="pl-8 w-full"
                  />
                </div>
              </div>
              <nav className="flex-1 overflow-y-auto">
                <div className="space-y-2 p-4">
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Browse Categories
                  </p>
                  {courseCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <SheetClose asChild key={category.href}>
                        <Link
                          href={category.href}
                          className="flex items-center justify-between rounded-lg p-2 hover:bg-muted"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="flex items-center space-x-2">
                            <Icon className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">{category.title}</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                      </SheetClose>
                    );
                  })}
                </div>
              </nav>
              <div className="border-t p-4 space-y-2">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/become-instructor" onClick={() => setIsOpen(false)}>
                    Become an Instructor
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}