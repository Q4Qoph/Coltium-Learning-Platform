import { NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma';
// import { auth } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'INSTRUCTOR') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const courses = await prisma.course.findMany({
      where: {
        instructorId: session.user.id,
      },
      include: {
        _count: {
          select: { enrollments: true },
        },
      },
    });

    return NextResponse.json(courses);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}