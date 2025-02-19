"use client";

import { Navbar } from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, BarChart, Settings, Plus } from "lucide-react";
import Link from "next/link";
import AdminNavbar from "./_components/navbar";

export default function AdminDashboard() {
  // Example data for users and courses (replace with dynamic data from an API or database)
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Instructor" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Learner" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "Learner" },
  ];

  const courses = [
    { id: 1, title: "Introduction to Quantum Computing", instructor: "John Doe", learners: 120 },
    { id: 2, title: "AI and Machine Learning Basics", instructor: "Jane Smith", learners: 95 },
    { id: 3, title: "IoT for Beginners", instructor: "Alice Johnson", learners: 80 },
  ];

  const systemStats = {
    totalUsers: 500,
    activeUsers: 450,
    totalCourses: 30,
    activeCourses: 25,
  };

  return (
    <>
      <AdminNavbar/>
      <main className="flex min-h-screen flex-col bg-slate-50">
        <div className="container mx-auto flex-1 px-4 py-16">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold">Welcome, Admin!</h1>
            <p className="text-muted-foreground mt-4">
              This is your admin dashboard. Here, you can manage users, courses, and other system settings.
            </p>
          </div>

          {/* Quick Actions Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Button className="h-24" asChild>
              <Link href="/admin/users/create" className="flex flex-col items-center justify-center gap-2">
                <Plus className="h-6 w-6" />
                <span>Add New User</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24" asChild>
              <Link href="/admin/users" className="flex flex-col items-center justify-center gap-2">
                <Users className="h-6 w-6" />
                <span>Manage Users</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24" asChild>
              <Link href="/admin/courses" className="flex flex-col items-center justify-center gap-2">
                <BookOpen className="h-6 w-6" />
                <span>Manage Courses</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24" asChild>
              <Link href="/admin/settings" className="flex flex-col items-center justify-center gap-2">
                <Settings className="h-6 w-6" />
                <span>System Settings</span>
              </Link>
            </Button>
          </div>

          {/* System Analytics Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">System Analytics</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{systemStats.totalUsers}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Active Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{systemStats.activeUsers}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Total Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{systemStats.totalCourses}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Active Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{systemStats.activeCourses}</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Users Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Recent Users</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{user.role}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Courses Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Recent Courses</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{course.title}</p>
                        <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{course.learners} Learners</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}