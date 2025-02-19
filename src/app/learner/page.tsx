"use client";

import { Navbar } from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, BarChart, Clock, Trophy } from "lucide-react";
import Link from "next/link";
import LearnerNavbar from "./_components/navbar";

export default function LearnerDashboard() {
  // Example data for enrolled and recommended courses (replace with dynamic data from an API or database)
  const enrolledCourses = [
    { id: 1, title: "Introduction to Quantum Computing", progress: 65 },
    { id: 2, title: "AI and Machine Learning Basics", progress: 40 },
    { id: 3, title: "IoT for Beginners", progress: 80 },
  ];

  const recommendedCourses = [
    { id: 4, title: "Blockchain Fundamentals", instructor: "John Doe" },
    { id: 5, title: "Cybersecurity Essentials", instructor: "Jane Smith" },
    { id: 6, title: "Renewable Energy Systems", instructor: "Alice Johnson" },
  ];

  const learnerStats = {
    completedCourses: 5,
    activeCourses: 3,
    learningHours: 120,
    achievements: 10,
  };

  return (
    <>
      <LearnerNavbar/>
      <main className="flex min-h-screen flex-col bg-slate-50">
        <div className="container mx-auto flex-1 px-4 py-16">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold">Welcome, Learner!</h1>
            <p className="text-muted-foreground mt-4">
              This is your learner dashboard. Here, you can access your courses, track progress, and explore new topics.
            </p>
          </div>

          {/* Quick Stats Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Completed Courses</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{learnerStats.completedCourses}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{learnerStats.activeCourses}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{learnerStats.learningHours}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{learnerStats.achievements}</p>
              </CardContent>
            </Card>
          </div>

          {/* Enrolled Courses Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Your Enrolled Courses</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-semibold">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <Button variant="outline" className="w-full mt-4" asChild>
                      <Link href={`/courses/${course.id}`}>Continue Learning</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recommended Courses Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Recommended Courses</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedCourses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Instructor: {course.instructor}</p>
                    <Button className="w-full" asChild>
                      <Link href={`/courses/${course.id}`}>Enroll Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}