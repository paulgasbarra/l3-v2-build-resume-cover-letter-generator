import { NextResponse } from 'next/server';
import { hashPassword } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { registerSchema } from '@/lib/validations';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.format() },
        { status: 400 }
      );
    }
    
    const { name, email, password } = result.data;
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    // Hash the password
    const hashedPassword = await hashPassword(password);
    
    // Create the user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    
    // Return the user without the password
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json(
      { message: 'User registered successfully', user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
} 