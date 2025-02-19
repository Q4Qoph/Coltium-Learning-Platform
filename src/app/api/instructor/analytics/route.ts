import { NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma';
// import { auth } from '@/lib/auth';

export async function GET(req: Request) {
    try {
      const session = await auth();
      if (!session || session.user.role !== 'INSTRUCTOR') {
        return new NextResponse('Unauthorized', { status: 401 });
      }
  
      const analytics = await prisma.$transaction(async (tx) => {
        const totalLearners = await tx.enrollment.count({
          where: {
            course: {
              instructorId: session.user.id,
            },
          },
          distinct: ['userId'],
        });
  
        const activeLearners = await tx.enrollment.count({
          where: {
            course: {
              instructorId: session.user.id,
            },
            status: 'IN_PROGRESS',
          },
          distinct: ['userId'],
        });
  
        const completedEnrollments = await tx.enrollment.count({
          where: {
            course: {
              instructorId: session.user.id,
            },
            status: 'COMPLETED',
          },
        });
  
        const totalEnrollments = await tx.enrollment.count({
          where: {
            course: {
              instructorId: session.user.id,
            },
          },
        });
  
        return {
          totalLearners,
          activeLearners,
          completionRate: totalEnrollments > 0 
            ? Math.round((completedEnrollments / totalEnrollments) * 100)
            : 0,
        };
      });
  
      return NextResponse.json(analytics);
    } catch (error) {
      return new NextResponse('Internal Error', { status: 500 });
    }
  }