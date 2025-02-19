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
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Menu, Search, PlusCircle, BarChart2, Users, Bell,
  BookOpen, Settings, LogOut, User, MessageSquare,
  Video, FileText, ClipboardCheck, Laptop, GraduationCap,
  PenTool
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export function InstructorNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState(5);

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/instructor/dashboard" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8" />
              <span className="font-bold text-xl">Coltium</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Courses Management */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Courses
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px]">
                      <Link href="/instructor/courses" className="flex items-center space-x-2 hover:bg-accent rounded-md p-2">
                        <FileText className="h-4 w-4" />
                        <div>
                          <div className="font-medium">My Courses</div>
                          <div className="text-sm text-muted-foreground">Manage your existing courses</div>
                        </div>
                      </Link>
                      <Link href="/instructor/create" className="flex items-center space-x-2 hover:bg-accent rounded-md p-2">
                        <PlusCircle className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Create New Course</div>
                          <div className="text-sm text-muted-foreground">Start building a new course</div>
                        </div>
                      </Link>
                      <Link href="/instructor/drafts" className="flex items-center space-x-2 hover:bg-accent rounded-md p-2">
                        <PenTool className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Drafts</div>
                          <div className="text-sm text-muted-foreground">Continue working on drafts</div>
                        </div>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Content Creation */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Video className="mr-2 h-4 w-4" />
                    Content
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px]">
                      <Link href="/instructor/studio" className="flex items-center space-x-2 hover:bg-accent rounded-md p-2">
                        <Laptop className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Content Studio</div>
                          <div className="text-sm text-muted-foreground">Create and edit course content</div>
                        </div>
                      </Link>
                      <Link href="/instructor/assessments" className="flex items-center space-x-2 hover:bg-accent rounded-md p-2">
                        <ClipboardCheck className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Assessments</div>
                          <div className="text-sm text-muted-foreground">Create quizzes and assignments</div>
                        </div>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Analytics */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <BarChart2 className="mr-2 h-4 w-4" />
                    Analytics
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px]">
                      <Link href="/instructor/analytics/performance" className="flex items-center space-x-2 hover:bg-accent rounded-md p-2">
                        <BarChart2 className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Course Performance</div>
                          <div className="text-sm text-muted-foreground">Track engagement and completion rates</div>
                        </div>
                      </Link>
                      <Link href="/instructor/analytics/students" className="flex items-center space-x-2 hover:bg-accent rounded-md p-2">
                        <Users className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Student Progress</div>
                          <div className="text-sm text-muted-foreground">Monitor student performance</div>
                        </div>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Instructor Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Messages */}
            <Button variant="ghost" className="relative">
              <MessageSquare className="h-5 w-5" />
              <Badge variant="secondary" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                3
              </Badge>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Instructor Profile" />
                    <AvatarFallback>IN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Instructor Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
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
                  <Link href="/instructor/courses" className="flex items-center space-x-2 p-2" onClick={() => setIsOpen(false)}>
                    <BookOpen className="h-4 w-4" />
                    <span>My Courses</span>
                  </Link>
                  <Link href="/instructor/courses/new" className="flex items-center space-x-2 p-2" onClick={() => setIsOpen(false)}>
                    <PlusCircle className="h-4 w-4" />
                    <span>Create Course</span>
                  </Link>
                  <Link href="/instructor/studio" className="flex items-center space-x-2 p-2" onClick={() => setIsOpen(false)}>
                    <Video className="h-4 w-4" />
                    <span>Content Studio</span>
                  </Link>
                  <Link href="/instructor/analytics" className="flex items-center space-x-2 p-2" onClick={() => setIsOpen(false)}>
                    <BarChart2 className="h-4 w-4" />
                    <span>Analytics</span>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default InstructorNavbar;