// app/(dashboard)/instructor/layout.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import InstructorNavbar from "./_components/navbar";

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <InstructorNavbar />
      {children}
    </SessionProvider>
  );
}