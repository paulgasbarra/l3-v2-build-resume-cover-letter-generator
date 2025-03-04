import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { baseResumeSchema } from '@/lib/validations';
import { cookies } from 'next/headers';

// Get all base resumes for the current user
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
    
    // Get all base resumes for the user
    const resumes = await prisma.baseResume.findMany({
      where: {
        userId: payload.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    
    return NextResponse.json({ resumes });
  } catch (error) {
    console.error('Get resumes error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

// Create a new base resume
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
    const result = baseResumeSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.format() },
        { status: 400 }
      );
    }
    
    // Create the resume
    const resume = await prisma.baseResume.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: payload.id,
      },
    });
    
    return NextResponse.json(
      { message: 'Resume created successfully', resume },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create resume error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
} 