import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from '../auth/[...nextauth]/route';


export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if user is an instructor
    if (session.user.role !== "INSTRUCTOR") {
      return new NextResponse("Only instructors can create courses", { status: 403 });
    }

    const body = await req.json();
    const {
      title,
      description,
      category,
      price,
      language,
      difficulty,
      hasAITutor,
    } = body;

    if (!title || !description || !category || !language || !difficulty) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        category,
        price: parseInt(price),
        language,
        difficulty,
        hasAITutor,
        teacherId: session.user.id,
        teacherName: session.user.name,
        status: "DRAFT"
      }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get instructor's courses
    const courses = await prisma.course.findMany({
      where: {
        teacherId: session.user.id
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}