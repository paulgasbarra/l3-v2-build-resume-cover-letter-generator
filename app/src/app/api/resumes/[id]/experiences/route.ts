import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { experienceSchema } from '@/lib/validations';
import { getAuthTokenFromRequest } from '@/lib/cookies';

// Get all experiences for a specific resume
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
    
    // Get all experiences for the resume
    const experiences = await prisma.experience.findMany({
      where: {
        baseResumeId: resumeId,
      },
      orderBy: {
        startDate: 'desc',
      },
    });
    
    return NextResponse.json({ experiences });
  } catch (error) {
    console.error('Get experiences error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

// Create a new experience for a specific resume
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
    const result = experienceSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.format() },
        { status: 400 }
      );
    }
    
    // Format dates
    const startDate = new Date(result.data.startDate);
    const endDate = result.data.endDate ? new Date(result.data.endDate) : null;
    
    // Create the experience
    const experience = await prisma.experience.create({
      data: {
        company: result.data.company,
        position: result.data.position,
        location: result.data.location,
        startDate,
        endDate,
        description: result.data.description,
        highlights: result.data.highlights,
        baseResumeId: resumeId,
      },
    });
    
    return NextResponse.json(
      { message: 'Experience created successfully', experience },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create experience error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
} 