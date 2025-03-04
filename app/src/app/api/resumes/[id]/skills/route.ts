import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { skillSchema } from '@/lib/validations';
import { getAuthTokenFromRequest } from '@/lib/cookies';

// Get all skills for a specific resume
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
    
    // Get all skills for the resume
    const skills = await prisma.skill.findMany({
      where: {
        baseResumeId: resumeId,
      },
      orderBy: {
        name: 'asc',
      },
    });
    
    return NextResponse.json({ skills });
  } catch (error) {
    console.error('Get skills error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

// Create a new skill for a specific resume
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
    const result = skillSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.format() },
        { status: 400 }
      );
    }
    
    // Create the skill
    const skill = await prisma.skill.create({
      data: {
        name: result.data.name,
        level: result.data.level,
        category: result.data.category,
        baseResumeId: resumeId,
      },
    });
    
    return NextResponse.json(
      { message: 'Skill created successfully', skill },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create skill error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
} 