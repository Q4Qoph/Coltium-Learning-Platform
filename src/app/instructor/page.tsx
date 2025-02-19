"use client";

import { Navbar } from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users, BarChart, BookOpen, MessageCircle } from "lucide-react";
import Link from "next/link";
import InstructorNavbar from "./_components/navbar";

export default function InstructorDashboard() {
  // Example data for courses and learners (replace with dynamic data from an API or database)
  const courses = [
    { id: 1, title: "Introduction to Quantum Computing", learners: 120 },
    { id: 2, title: "AI and Machine Learning Basics", learners: 95 },
    { id: 3, title: "IoT for Beginners", learners: 80 },
  ];

  const learnerStats = {
    totalLearners: 300,
    activeLearners: 250,
    completionRate: "85%",
  };

  return (
    <>
      {/* <InstructorNavbar/> */}
      <main className="flex min-h-screen flex-col bg-slate-50">
        <div className="container mx-auto flex-1 px-4 py-16">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold">Welcome, Instructor!</h1>
            <p className="text-muted-foreground mt-4">
              This is your instructor dashboard. Here, you can create courses, track learners, and view insights.
            </p>
          </div>

          {/* Quick Actions Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Button className="h-24" asChild>
              <Link href="/instructor/courses/create" className="flex flex-col items-center justify-center gap-2">
                <Plus className="h-6 w-6" />
                <span>Create New Course</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24" asChild>
              <Link href="/instructor/courses" className="flex flex-col items-center justify-center gap-2">
                <BookOpen className="h-6 w-6" />
                <span>View Your Courses</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24" asChild>
              <Link href="/instructor/learners" className="flex flex-col items-center justify-center gap-2">
                <Users className="h-6 w-6" />
                <span>Manage Learners</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24" asChild>
              <Link href="/instructor/analytics" className="flex flex-col items-center justify-center gap-2">
                <BarChart className="h-6 w-6" />
                <span>View Analytics</span>
              </Link>
            </Button>
          </div>

          {/* Courses Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Your Courses</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{course.learners} Learners</span>
                    </div>
                    <Button variant="outline" className="w-full mt-4" asChild>
                      <Link href={`/instructor/courses/${course.id}`}>Manage Course</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Learner Analytics Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Learner Analytics</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Learners</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{learnerStats.totalLearners}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Active Learners</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{learnerStats.activeLearners}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{learnerStats.completionRate}</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <MessageCircle className="h-5 w-5 text-muted-foreground" />
                    <p>You received a new question on <span className="font-semibold">Introduction to Quantum Computing</span>.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <p>5 new learners enrolled in <span className="font-semibold">AI and Machine Learning Basics</span>.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}