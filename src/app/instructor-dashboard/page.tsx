"use client";

import { Navbar } from "@/components/shared/Header";

export default function InstructorDashboard() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col bg-slate-50">
        <div className="container mx-auto flex-1 px-4 py-16">
          <h1 className="text-3xl font-bold text-center">Welcome, Instructor!</h1>
          <p className="text-center mt-4">
            This is your instructor dashboard. Here, you can create courses, track learners, and view insights.
          </p>
        </div>
      </main>
    </>
  );
}
