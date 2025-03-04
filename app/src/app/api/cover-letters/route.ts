import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { coverLetterSchema } from '@/lib/validations';

// Get all cover letters for the current user
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
    
    // Get all cover letters for the user
    const coverLetters = await prisma.coverLetter.findMany({
      where: {
        userId: payload.id,
      },
      include: {
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
    
    return NextResponse.json({ coverLetters });
  } catch (error) {
    console.error('Get cover letters error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

// Create a new cover letter
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
    const result = coverLetterSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.format() },
        { status: 400 }
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
    
    // Create the cover letter
    const coverLetter = await prisma.coverLetter.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        jobDescriptionId: result.data.jobDescriptionId,
        userId: payload.id,
      },
    });
    
    return NextResponse.json(
      { message: 'Cover letter created successfully', coverLetter },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create cover letter error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
} 