import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { customResumeSchema } from '@/lib/validations';

// Get all custom resumes for the current user
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
    
    // Get all custom resumes for the user
    const customResumes = await prisma.customResume.findMany({
      where: {
        userId: payload.id,
      },
      include: {
        baseResume: {
          select: {
            title: true,
          },
        },
        jobDescription: {
          select: {
            title: true,
            company: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    
    return NextResponse.json({ customResumes });
  } catch (error) {
    console.error('Get custom resumes error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

// Create a new custom resume
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
    const result = customResumeSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.format() },
        { status: 400 }
      );
    }
    
    // Check if base resume exists and belongs to the user
    const baseResume = await prisma.baseResume.findUnique({
      where: {
        id: result.data.baseResumeId,
        userId: payload.id,
      },
    });
    
    if (!baseResume) {
      return NextResponse.json(
        { error: 'Base resume not found or does not belong to you' },
        { status: 404 }
      );
    }
    
    // Check if job description exists and belongs to the user
    const jobDescription = await prisma.jobDescription.findUnique({
      where: {
        id: result.data.jobDescriptionId,
        userId: payload.id,
      },
    });
    
    if (!jobDescription) {
      return NextResponse.json(
        { error: 'Job description not found or does not belong to you' },
        { status: 404 }
      );
    }
    
    // Create the custom resume
    const customResume = await prisma.customResume.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        baseResumeId: result.data.baseResumeId,
        jobDescriptionId: result.data.jobDescriptionId,
        userId: payload.id,
      },
    });
    
    return NextResponse.json(
      { message: 'Custom resume created successfully', customResume },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create custom resume error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
} 