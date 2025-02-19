import React, { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Menu, Shield, Users, Bell, Settings, LogOut,
  User, BarChart2, Files, AlertCircle, CheckCircle,
  GraduationCap, BookOpen, CircleDollarSign, Globe,
  Gauge, Server, FileCheck, UserPlus, ShieldAlert,
  MonitorCheck
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [alerts] = useState(8);

  return (
    <nav className="border-b bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/admin/dashboard" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">Coltium Admin</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                {/* User Management */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Users className="mr-2 h-4 w-4" />
                    Users
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px]">
                      <Link href="/admin/users" className="flex items-center space-x-2 hover:bg-accent rounded-md p-2">
                        <User className="h-4 w-4" />
                        <div>
                          <div className="font-medium">User Management</div>
                          <div className="text-sm text-muted-foreground">Manage all platform users</div>
                        </div>
                      </Link>
                      <Link href="/admin/users/roles" className="flex items-center space-x-2 hover:bg-accent rounded-md p-2">
                        <ShieldAlert className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Role Management</div>
                          <div className="text-sm text-muted-foreground">Assign and manage user roles</div>
                        </div>
                      </Link>
                      <Link href="/admin/users/new" className="flex items-center space-x-2 hover:bg-accent rounded-md p-2">
                        <UserPlus className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Add New User</div>
                          <div className="text-sm text-muted-foreground">Create new user accounts</div>
                        </div>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Content Management */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Files className="mr-2 h-4 w-4" />
                    Content
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px]">
                      <Link href="/admin/content/approval" className="flex items-center space-x-2 hover:bg-accent rounded-md p-2">
                        <FileCheck className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Content Approval</div>
                          <div className="text-sm text-muted-foreground">Review and approve course content</div>
                        </div>
                      </Link>
                      <Link href="/admin/content/courses" className="flex items-center space-x-2 hover:bg-accent rounded-md p-2">
                        <BookOpen className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Course Management</div>
                          <div className="text-sm text-muted-foreground">Manage platform courses</div>
                        </div>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* System Management */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Server className="mr-2 h-4 w-4" />
                    System
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px]">
                      <Link href="/admin/system/performance" className="flex items-center space-x-2 hover:bg-accent rounded-md p-2">
                        <Gauge className="h-4 w-4" />
                        <div>
                          <div className="font-medium">System Performance</div>
                          <div className="text-sm text-muted-foreground">Monitor platform metrics</div>
                        </div>
                      </Link>
                      <Link href="/admin/system/settings" className="flex items-center space-x-2 hover:bg-accent rounded-md p-2">
                        <Settings className="h-4 w-4" />
                        <div>
                          <div className="font-medium">System Settings</div>
                          <div className="text-sm text-muted-foreground">Configure platform settings</div>
                        </div>
                      </Link>
                      <Link href="/admin/system/logs" className="flex items-center space-x-2 hover:bg-accent rounded-md p-2">
                        <MonitorCheck className="h-4 w-4" />
                        <div>
                          <div className="font-medium">System Logs</div>
                          <div className="text-sm text-muted-foreground">View system activity logs</div>
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
                      <Link href="/admin/analytics/usage" className="flex items-center space-x-2 hover:bg-accent rounded-md p-2">
                        <Globe className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Platform Usage</div>
                          <div className="text-sm text-muted-foreground">Monitor user engagement</div>
                        </div>
                      </Link>
                      <Link href="/admin/analytics/revenue" className="flex items-center space-x-2 hover:bg-accent rounded-md p-2">
                        <CircleDollarSign className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Revenue Analytics</div>
                          <div className="text-sm text-muted-foreground">Track platform revenue</div>
                        </div>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Admin Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* System Alerts */}
            <Button variant="ghost" className="relative">
              <AlertCircle className="h-5 w-5" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                {alerts}
              </Badge>
            </Button>

            {/* Pending Approvals */}
            <Button variant="ghost" className="relative">
              <CheckCircle className="h-5 w-5" />
              <Badge variant="secondary" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                12
              </Badge>
            </Button>

            {/* Admin Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Admin Profile" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Shield className="mr-2 h-4 w-4" />
                  Admin Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Admin Settings
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
                  <Link href="/admin/users" className="flex items-center space-x-2 p-2" onClick={() => setIsOpen(false)}>
                    <Users className="h-4 w-4" />
                    <span>User Management</span>
                  </Link>
                  <Link href="/admin/content/approval" className="flex items-center space-x-2 p-2" onClick={() => setIsOpen(false)}>
                    <Files className="h-4 w-4" />
                    <span>Content Management</span>
                  </Link>
                  <Link href="/admin/system/performance" className="flex items-center space-x-2 p-2" onClick={() => setIsOpen(false)}>
                    <Server className="h-4 w-4" />
                    <span>System</span>
                  </Link>
                  <Link href="/admin/analytics/usage" className="flex items-center space-x-2 p-2" onClick={() => setIsOpen(false)}>
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

export default AdminNavbar;