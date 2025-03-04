import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { educationSchema } from '@/lib/validations';
import { getAuthTokenFromRequest } from '@/lib/cookies';

// Get all educations for a specific resume
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const resumeId = params.id;
    
    // Get the token from cookies
    const token = getAuthTokenFromRequest(request);
    
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
    
    // Check if the resume exists and belongs to the user
    const resume = await prisma.baseResume.findUnique({
      where: {
        id: resumeId,
        userId: payload.id,
      },
    });
    
    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found or does not belong to you' },
        { status: 404 }
      );
    }
    
    // Get all educations for the resume
    const educations = await prisma.education.findMany({
      where: {
        baseResumeId: resumeId,
      },
      orderBy: {
        startDate: 'desc',
      },
    });
    
    return NextResponse.json({ educations });
  } catch (error) {
    console.error('Get educations error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

// Create a new education for a specific resume
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const resumeId = params.id;
    const body = await request.json();
    
    // Get the token from cookies
    const token = getAuthTokenFromRequest(request);
    
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
    
    // Check if the resume exists and belongs to the user
    const resume = await prisma.baseResume.findUnique({
      where: {
        id: resumeId,
        userId: payload.id,
      },
    });
    
    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found or does not belong to you' },
        { status: 404 }
      );
    }
    
    // Validate the request body
    const result = educationSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.format() },
        { status: 400 }
      );
    }
    
    // Format dates
    const startDate = new Date(result.data.startDate);
    const endDate = result.data.endDate ? new Date(result.data.endDate) : null;
    
    // Create the education
    const education = await prisma.education.create({
      data: {
        institution: result.data.institution,
        degree: result.data.degree,
        fieldOfStudy: result.data.fieldOfStudy,
        location: result.data.location,
        startDate,
        endDate,
        gpa: result.data.gpa,
        description: result.data.description,
        baseResumeId: resumeId,
      },
    });
    
    return NextResponse.json(
      { message: 'Education created successfully', education },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create education error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
} 