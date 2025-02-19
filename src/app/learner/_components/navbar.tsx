import React, { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Menu, Search, Code, Database, Palette, ChevronRight, 
  Briefcase, GraduationCap, Bell, BookOpen, Layout,
  Settings, LogOut, User, BarChart
} from "lucide-react";
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

export function LearnerNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [notifications] = useState(3); // This would come from your notifications system

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8" />
              <span className="font-bold text-xl">Coltium</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <BookOpen className="mr-2 h-4 w-4" />
                    My Learning
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px]">
                      <Link href="/my-courses" className="flex items-center space-x-2 hover:bg-accent rounded-md p-2">
                        <Layout className="h-4 w-4" />
                        <div>
                          <div className="font-medium">My Courses</div>
                          <div className="text-sm text-muted-foreground">Continue where you left off</div>
                        </div>
                      </Link>
                      <Link href="/progress" className="flex items-center space-x-2 hover:bg-accent rounded-md p-2">
                        <BarChart className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Learning Progress</div>
                          <div className="text-sm text-muted-foreground">Track your achievements</div>
                        </div>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Browse</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px]">
                      {courseCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <Link
                            key={category.title}
                            href={category.href}
                            className="flex items-center space-x-2 hover:bg-accent rounded-md p-2"
                          >
                            <Icon className="h-4 w-4" />
                            <div>
                              <div className="font-medium">{category.title}</div>
                              <div className="text-sm text-muted-foreground">{category.description}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-8"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                  {notifications}
                </Badge>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                    <AvatarFallback>LC</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col space-y-4">
                  <Link href="/my-courses" className="flex items-center space-x-2 p-2" onClick={() => setIsOpen(false)}>
                    <BookOpen className="h-4 w-4" />
                    <span>My Learning</span>
                  </Link>
                  <div className="space-y-2">
                    <div className="font-medium px-2">Browse Categories</div>
                    {courseCategories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <Link
                          key={category.title}
                          href={category.href}
                          className="flex items-center space-x-2 p-2"
                          onClick={() => setIsOpen(false)}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{category.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default LearnerNavbar;