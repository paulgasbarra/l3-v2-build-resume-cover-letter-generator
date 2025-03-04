import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { jobDescriptionSchema } from '@/lib/validations';

// Get all job descriptions for the current user
export async function GET(request: Request) {
  try {
    // Get the token from cookies
    const token = request.headers.get('Cookie')?.split('; ')
      .find(row => row.startsWith('auth_token='))
      ?.split('=')[1];
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Verify the token
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get all job descriptions for the user
    const jobDescriptions = await prisma.jobDescription.findMany({
      where: {
        userId: payload.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    
    return NextResponse.json({ jobDescriptions });
  } catch (error) {
    console.error('Get job descriptions error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

// Create a new job description
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Get the token from cookies
    const token = request.headers.get('Cookie')?.split('; ')
      .find(row => row.startsWith('auth_token='))
      ?.split('=')[1];
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Verify the token
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Validate the request body
    const result = jobDescriptionSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.format() },
        { status: 400 }
      );
    }
    
    // Create the job description
    const jobDescription = await prisma.jobDescription.create({
      data: {
        title: result.data.title,
        company: result.data.company,
        content: result.data.content,
        userId: payload.id,
      },
    });
    
    return NextResponse.json(
      { message: 'Job description created successfully', jobDescription },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create job description error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
} 